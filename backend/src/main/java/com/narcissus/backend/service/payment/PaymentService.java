package com.narcissus.backend.service.payment;

import com.narcissus.backend.models.orders.Orders;
import com.narcissus.backend.models.product.Product;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.exception.PayOSException;
import vn.payos.type.*;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    private final String PAYOSID = "e77b6cdb-4a17-4af9-9900-501cee1f7dc7";
    private final String PAYOSAPI = "e0a0ec2b-2981-44e0-a94d-a7b5edad57eb";
    private final String PAYOSCHECKSUM = "0f81aaf3911f6f3724f7def8d6927422a511fbbe2be15d2fdf1939d11a1c836d";
    private final String HOSTIP = "20.89.177.142";

    PayOS payOS = new PayOS(PAYOSID, PAYOSAPI, PAYOSCHECKSUM);

    public void createPayment (Orders order) throws Exception {
        List<ItemData> itemData = new ArrayList<>();
        order.getConsistOfs().forEach(consistOf -> {
            Product product = consistOf.getProduct();
            ItemData item = ItemData
                    .builder()
                    .name(product.getProductName())
                    .quantity(consistOf.getQuantity())
                    .price((int) product.getProductPrice())
                    .build();

            itemData.add(item);
        });

        PaymentData paymentData = PaymentData.builder()
                .orderCode(order.getOrdersId())
                .amount((int) order.getMoney())
                .description("Order id: "+order.getOrdersId()+" NARCISSUS")
                .returnUrl(HOSTIP+"/success")
                .cancelUrl(HOSTIP+"/cancel")
                .items(itemData).build();

        CheckoutResponseData responseData = payOS.createPaymentLink(paymentData);
        System.out.println(responseData.toString());
        System.out.println(responseData.getCheckoutUrl());
        return ;
    }

    public PaymentLinkData getPaymentData(long orderId) throws Exception {
        return payOS.getPaymentLinkInformation(orderId);
    }

    public String cancelPayment(long orderId, String reason) throws Exception {

        PaymentLinkData result = payOS.cancelPaymentLink(orderId, reason);

        if(!result.getStatus().equals("CANCELLED")) return "Failed";
        return "Successfully";
    }

    public String confirmWebHook(String url) throws Exception {
        try {
            // Call to PayOS.confirmWebhook()
            String result = payOS.confirmWebhook(url);
            System.out.println(result);
            return result;
        } catch (PayOSException e) {
            logger.error("Failed to confirm webhook: {}", e.getMessage(), e);
            // Handle the exception, e.g., return an error response
        }
        return "okay";
    }

    public void verifyPayment (Webhook webhook) throws Exception{
        WebhookData result = payOS.verifyPaymentWebhookData(webhook);
        logger.info("Webhook verify: {}", result);
        System.out.println(result.toString());
        return;
    }
}
