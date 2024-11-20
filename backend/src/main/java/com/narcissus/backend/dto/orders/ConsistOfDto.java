package com.narcissus.backend.dto.orders;

import com.narcissus.backend.models.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsistOfDto {
    private Long productId;
    private int quantity;
}
