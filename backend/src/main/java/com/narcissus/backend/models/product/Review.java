package com.narcissus.backend.models.product;

import com.narcissus.backend.models.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Review {
    @EmbeddedId
    ReviewKey id;
    int stars;
    String content;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_Id")
    UserEntity user;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_Id")
    Product product;
}
