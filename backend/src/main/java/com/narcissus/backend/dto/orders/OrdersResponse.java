package com.narcissus.backend.dto.orders;

import lombok.Data;

@Data
public class OrdersResponse {
    private long ordersId;
    private String checkoutUrl;
}
