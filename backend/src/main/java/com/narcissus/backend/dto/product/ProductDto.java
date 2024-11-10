package com.narcissus.backend.dto.product;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class ProductDto {
    private Long ProductID;
    private String ProductName;
    private String ProductInfo;
    private Integer ProductStockQuantity;
    private Long ProductPrice;
    private Date ProductDate;
    private MultipartFile ProductImage;
    private String ProductImageBase64;
}
