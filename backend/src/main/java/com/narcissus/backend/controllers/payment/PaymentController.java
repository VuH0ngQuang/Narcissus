package com.narcissus.backend.controllers.payment;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.narcissus.backend.dto.orders.CancelPaymentDto;
import com.narcissus.backend.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.payos.type.Webhook;


@RequestMapping("/api/payment")
@Controller
public class PaymentController {

    PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/webhook")
    public ResponseEntity<ObjectNode> webhook(@RequestBody Webhook webhook) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            paymentService.verifyPayment(webhook);
            response.put("error", 0);
            response.put("message", "Webhook delivered");
            response.set("data", null);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/confirm-webhook/")
//    public ResponseEntity<String> confirmWebHook(@RequestBody String url) throws Exception {
//        return new ResponseEntity<>(paymentService.confirmWebHook(url), HttpStatus.OK);
//    }

    @PostMapping("/cancel-payment")
    public ResponseEntity<String> cancelPayment(@RequestBody CancelPaymentDto cancelPaymentDto) throws Exception {
        return new ResponseEntity<>(paymentService.cancelPayment(cancelPaymentDto), HttpStatus.OK);
    }
}
