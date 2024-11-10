package com.narcissus.backend.dto.orders;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class OrdersDto {
    private long money;
    private boolean shipped;
    private String status;
    private Date date;

    Set<ConsistOfDto> consistOfDtos;
}
