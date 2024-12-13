package com.narcissus.backend.service.email.impl;

import com.narcissus.backend.models.email.EmailDetails;
import com.narcissus.backend.models.orders.ConsistOf;
import com.narcissus.backend.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;
    @Value("${spring.mail.username}") private String sender;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public String sendEmail(EmailDetails details)
    {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    @Override
    public String mailResetPassword(String userName, String password) {
        return "Hi "+userName+",\n" +
                "\n" +
                "Your password reset request was successful. You can now log in to your Narcissus account with the new password provided below:\n" +
                "\n" +
                "New Password: "+password+"\n" +
                "\n" +
                "If you didn’t request a password reset, please contact us immediately at support@narcissus.com, and we’ll help secure your account.\n" +
                "\n" +
                "Best regards,\n" +
                "The Narcissus Team";
    }

    @Override
    public String mailRegister(String userName) {
        return "Hi "+userName+",\n" +
                "\n" +
                "Welcome to Narcissus, your go-to platform for beautiful and fresh flowers! We're excited to have you join our community of flower enthusiasts and buyers. Your registration was successful, and your account is now active.\n" +
                "\n" +
                "If you have any questions or need assistance, feel free to reach out to us at support@narcissus.com.\n" +
                "\n" +
                "Happy shopping!\n" +
                "\n" +
                "Best regards,\n" +
                "\n" +
                "The Narcissus Team";
    }

    @Override
    public String mailOrder(String userName, String address,long totalPrice, Set<ConsistOf> consistOfs) {

        return "Hi " + userName + ",\n" +
                "\n" +
                "Thank you for choosing Narcissus! We’re delighted to be part of your special moment, and we’re dedicated to delivering fresh, beautiful flowers just for you.\n" +
                "\n" +
                "\uD83C\uDF38 Order Details:\n" +
                consistOfs.stream()
                        .map(consistOf -> "  " +
                                consistOf.getProduct().getProductName() +
                                "  Price: " +
                                consistOf.getProduct().getProductPrice() +
                                "$/bouquet  Quantity: " +
                                consistOf.getQuantity())
                        .collect(Collectors.joining("\n")) + "\n" +
                "\uD83D\uDC90 Total Amount: "+totalPrice+"\n" +
                "\n" +
                "\n" +
                "\n" +
                "Delivery Address: "+address+"\n" +
                "\n" +
                "Estimated Delivery Time: about 1 hours\n" +
                "\n" +
                "Your flowers are being prepared with utmost care, ensuring they arrive fresh and perfect for the occasion.\n" +
                "\n" +
                "If you have any questions or would like to make any adjustments to your order, feel free to reach out to us at support@narcissus.com. We’re here to help!\n" +
                "\n" +
                "Thank you once again for choosing Narcissus to brighten up your special moments.\n" +
                "\n" +
                "Warm regards,\n" +
                "The Narcissus Team";
    }
}
