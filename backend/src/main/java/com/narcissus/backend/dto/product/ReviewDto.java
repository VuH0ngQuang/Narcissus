package com.narcissus.backend.dto.product;

import lombok.Data;

import java.util.Date;

@Data
public class ReviewDto {
    String userName;
    String content;
    int stars;
    Date date;
}
