package com.narcissus.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ProductDto {
    private long ProductID;
    private String ProductName;
    private String ProductInfo;
    private int ProductStockQuantity;
    private long ProductPrice;
    private Date ProductDate;
}
