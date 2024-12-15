package com.narcissus.backend.dto.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CancelPaymentDto {
    private long orderId;
    private String reason;
}
