package com.narcissus.backend.service.product;

import com.narcissus.backend.dto.product.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto addReview(String token, long id ,ReviewDto reviewDto);
    List<ReviewDto> getReview(Long productId);
}
