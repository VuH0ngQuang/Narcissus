package com.narcissus.backend.models.orders;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ConsistOfKey implements Serializable {
    private Long ordersId;
    private Long productId;
}
