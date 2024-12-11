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
    private final String PAYOSID = "f83ace68-bc25-4af4-b557-d842b7fbe511"; //this is for testing only, this will be invalid after this repo public
    private final String PAYOSAPI = "80dbd91f-fd92-424d-88e6-4369e6682bf8"; //this is for testing only, this will be invalid after this repo public
    private final String PAYOSCHECKSUM = "3738cedd62709316a25ad065a9e3f68ee111db2f3cb76e81ab239255c91b97bc"; //this is for testing only, this will be invalid after this repo public
    private final String HOSTIP = "http://localhost:5173";
    private final OrdersRepository ordersRepository;
    private final SSEService sseService;
    private final PayOS payOS = new PayOS(PAYOSID, PAYOSAPI, PAYOSCHECKSUM);

    @Autowired
    public PaymentServiceImpl(SSEService sseService, OrdersRepository ordersRepository) {
        this.sseService = sseService;
        this.ordersRepository = ordersRepository;
    }

    public String createPayment (Orders order) throws Exception {
        List<ItemData> itemData = new ArrayList<>();
        order.getConsistOfs().parallelStream().forEach(consistOf -> {
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
                .returnUrl(HOSTIP)
                .cancelUrl(HOSTIP)
                .items(itemData).build();

        CheckoutResponseData responseData = payOS.createPaymentLink(paymentData);
        System.out.println(responseData.toString());
        System.out.println(responseData.getCheckoutUrl());

        return responseData.getCheckoutUrl();
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
