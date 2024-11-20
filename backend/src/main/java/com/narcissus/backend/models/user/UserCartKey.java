package com.narcissus.backend.models.user;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class UserCartKey {
    private Long userId;
    private Long productId;
}
