package com.narcissus.backend.models.product;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewKey {
    private Long userId;
    private Long productId;
}
