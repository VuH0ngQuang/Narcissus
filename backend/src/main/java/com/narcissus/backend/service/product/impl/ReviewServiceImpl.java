package com.narcissus.backend.service.product.impl;

import com.narcissus.backend.dto.product.ReviewDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.models.product.Review;
import com.narcissus.backend.models.product.ReviewKey;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.repository.product.ReviewRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.product.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final TokenGenerator tokenGenerator;

    @Autowired
    public ReviewServiceImpl(ProductRepository productRepository, ReviewRepository reviewRepository, UserRepository userRepository, TokenGenerator tokenGenerator) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
    }

    @Override
    public ReviewDto addReview(String token, long id, ReviewDto reviewDto) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Cannot find product with id " + id));
        String jwtToken = token.substring(7);
        UserEntity user = userRepository
                .findByEmail(tokenGenerator.getEmailFromJWT(jwtToken))
                .orElseThrow(() -> new NotFoundException("Invalid Token"));

        ReviewKey reviewKey = new ReviewKey();
        reviewKey.setProductId(product.getProductId());
        reviewKey.setUserId(user.getUserId());

        Review review = new Review();
        review.setId(reviewKey);
        review.setUser(user);
        review.setProduct(product);
        review.setStars(reviewDto.getStars());
        review.setDate(new Date());
        review.setContent(reviewDto.getContent());

        reviewRepository.save(review);

        return toDto(review, new ReviewDto());
    }

    @Override
    public List<ReviewDto> getReview(Long productId) {
        List<Review> reviews = reviewRepository.getReviewsByProductId(productId);

        return reviews
                .parallelStream()
                .map(review -> toDto(review, new ReviewDto()))
                .toList();
    }

    public ReviewDto toDto (Review review, ReviewDto reviewDto) {
        reviewDto.setContent(review.getContent());
        reviewDto.setStars(review.getStars());
        reviewDto.setUserName(review.getUser().getUserName());
        reviewDto.setDate(review.getDate());

        return reviewDto;
    }
}
