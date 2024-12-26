package com.narcissus.backend.service.notification.impl;

import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.email.EmailDetails;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.email.EmailService;
import com.narcissus.backend.service.notification.RestockNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestockNotificationServiceImpl implements RestockNotificationService {

    private final EmailService emailService;
    private final UserRepository userRepository;
    private final TokenGenerator tokenGenerator;
    private final ProductRepository productRepository;

    @Autowired
    public RestockNotificationServiceImpl(EmailService emailService, UserRepository userRepository, TokenGenerator tokenGenerator, ProductRepository productRepository) {
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
        this.productRepository = productRepository;
    }

    @Override
    public void notifyRestock(Product product) {
        product.getNotifyList().parallelStream().forEach(user -> {
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(user.getEmail());
            emailDetails.setSubject("Good News! Your Favorite Product is Back in Stock \uD83C\uDF38");
            emailDetails.setMsgBody(emailService.mailRestock(user.getUserName(), product));
            emailService.sendEmail(emailDetails);

            product.getNotifyList().remove(user);
        });
    }

    @Override
    public void addRestockNotification(String token, Long productId) {
        String jwtToken = token.substring(7);
        UserEntity user = userRepository.findByEmail(tokenGenerator.getEmailFromJWT(jwtToken))
                .orElseThrow(() -> new NotFoundException("Invalid Token"));

        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Not found product with id: "+productId));
        product.getNotifyList().add(user);

        productRepository.save(product);
    }
}
