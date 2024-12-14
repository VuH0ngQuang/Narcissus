package com.narcissus.backend.dto.product;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class ProductDto {
    private Long productID;
    private String productName;
    private String productInfo;
    private String productType;
    private Integer productStockQuantity;
    private Long productPrice;
    private Date productDate;
    private MultipartFile productImage;
    private String productImageBase64;
}
