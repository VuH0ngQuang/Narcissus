package com.narcissus.backend.service.payment.impl;

import com.narcissus.backend.dto.orders.CancelPaymentDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.orders.Orders;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.repository.orders.OrdersRepository;
import com.narcissus.backend.service.SSE.SSEService;
import com.narcissus.backend.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.type.*;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PaymentServiceImpl implements PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);
    private final String PAYOSID = "e77b6cdb-4a17-4af9-9900-501cee1f7dc7";
    private final String PAYOSAPI = "e0a0ec2b-2981-44e0-a94d-a7b5edad57eb";
    private final String PAYOSCHECKSUM = "0f81aaf3911f6f3724f7def8d6927422a511fbbe2be15d2fdf1939d11a1c836d";
    private final String HOSTIP = "20.89.177.142";
    private final OrdersRepository ordersRepository;
    private final SSEService sseService;

    @Autowired
    public PaymentServiceImpl(SSEService sseService, OrdersRepository ordersRepository) {
        this.sseService = sseService;
        this.ordersRepository = ordersRepository;
    }

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
    }

    public PaymentLinkData getPaymentData(long orderId) throws Exception {
        return payOS.getPaymentLinkInformation(orderId);
    }

    public String cancelPayment(CancelPaymentDto cancelPaymentDto) throws Exception {
        Orders orders = ordersRepository.findById(cancelPaymentDto.getId()).orElseThrow(() -> new NotFoundException("Cannot find order with id: "+cancelPaymentDto.getId()));
        PaymentLinkData result = payOS.cancelPaymentLink(cancelPaymentDto.getId(), cancelPaymentDto.getReason());

        orders.setStatus(result.getStatus());
        orders.setCanceledAt(result.getCanceledAt());
        orders.setCancellationReason(result.getCancellationReason());

        ordersRepository.save(orders);

        if(!result.getStatus().equals("CANCELLED")) return "Failed";
        return "Successfully";
    }

//    public String confirmWebHook(String url) throws Exception {
//        logger.info("confirmWebHook service ran");
//        try {
//            // Call to PayOS.confirmWebhook()
//            String result = payOS.confirmWebhook(url);
//            System.out.println(result);
//            return result;
//        } catch (PayOSException e) {
//            logger.error("Failed to confirm webhook: {}", e.getMessage(), e);
//        }
//        return "okay";
//    }

    public void verifyPayment (Webhook webhook) throws Exception{
        logger.info("verifyPayment() run");
        WebhookData result = payOS.verifyPaymentWebhookData(webhook);
        Orders orders = ordersRepository.findById(result.getOrderCode()).orElseThrow(() -> new NotFoundException("Cannot find order with id: "+result.getOrderCode()));
        if (result.getDesc().equals("success")) {
            orders.setStatus("PAID");
            orders.setTransactionDateTime(result.getTransactionDateTime());
            ordersRepository.save(orders);
        }

        sseService.publishEvent(orders.getOrdersId(), result);
    }
}
