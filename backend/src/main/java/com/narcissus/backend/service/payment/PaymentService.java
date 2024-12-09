package com.narcissus.backend.service.payment;

import com.narcissus.backend.dto.orders.CancelPaymentDto;
import com.narcissus.backend.models.orders.Orders;
import vn.payos.type.*;

public interface PaymentService {
    public String createPayment (Orders order) throws Exception;
    public PaymentLinkData getPaymentData(long orderId) throws Exception;
    public String cancelPayment(CancelPaymentDto cancelPaymentDto) throws Exception;
    public void verifyPayment (Webhook webhook) throws Exception;
}
