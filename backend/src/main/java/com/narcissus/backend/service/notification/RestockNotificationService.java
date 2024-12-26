package com.narcissus.backend.service.notification;

import com.narcissus.backend.models.product.Product;

public interface RestockNotificationService {
    public void notifyRestock(Product product);
    public void addRestockNotification(String token, Long productId);
}
