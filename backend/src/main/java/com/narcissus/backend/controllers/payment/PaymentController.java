package com.narcissus.backend.controllers.payment;

import com.narcissus.backend.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.payos.type.Webhook;

import java.util.Map;

@RequestMapping("/api/payment")
@Controller
public class PaymentController {

    PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/webhook")
    public ResponseEntity<Map<String, Object>> webhook(@RequestBody Webhook webhook) {
        try {
            paymentService.verifyPayment(webhook);
            System.out.println(webhook.toString());
            Map<String, Object> response = Map.of(
                    "error", 0,
                    "message", "Webhook delivered",
                    "data", null
            );
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                    "error", -1,
                    "message", e.getMessage(),
                    "data", null
            );
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        }
    }

    @PostMapping("/confirm-webhook/")
    public ResponseEntity<String> confirmWebHook(@RequestBody String url) throws Exception {
        return new ResponseEntity<>(paymentService.confirmWebHook(url), HttpStatus.OK);
    }
}
