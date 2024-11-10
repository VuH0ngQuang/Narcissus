package com.narcissus.backend.dto.orders;

import lombok.Data;

@Data
public class CancelPaymentDto {
    private long id;
    private String reason;
}
