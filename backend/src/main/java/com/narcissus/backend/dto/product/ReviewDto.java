package com.narcissus.backend.dto.product;

import lombok.Data;

@Data
public class ReviewDto {
    String userName;
    String content;
    int stars;
}
