package com.narcissus.backend.dto.orders;

import lombok.Data;

@Data
public class ClosedTabDto {
    private long orderId;
    private String authToken;
    private String reason;
}
