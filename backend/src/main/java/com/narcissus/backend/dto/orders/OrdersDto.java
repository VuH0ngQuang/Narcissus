package com.narcissus.backend.dto.orders;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class OrdersDto {
    private long orderId;
    private long money;
    private boolean shipped;
    private String address;
    private String status;
    private Date date;
    private String cancellationReason;
    private String canceledAt;


    Set<ConsistOfDto> consistOfDtos;
}
