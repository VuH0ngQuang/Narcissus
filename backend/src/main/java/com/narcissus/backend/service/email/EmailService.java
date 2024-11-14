package com.narcissus.backend.service.email;

import com.narcissus.backend.models.email.EmailDetails;
import com.narcissus.backend.models.orders.ConsistOf;

import java.util.Set;
import java.util.stream.Collectors;

public interface EmailService {
    String sendEmail(EmailDetails emailDetails);
    public String mailResetPassword(String userName, String password);
    public String mailRegister(String userName);
    public String mailOrder(String userName,long totalPrice, Set<ConsistOf> consistOfs);
}
