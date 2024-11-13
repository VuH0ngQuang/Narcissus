package com.narcissus.backend.models.user;

import com.narcissus.backend.models.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UserCart {
    @EmbeddedId
    private UserCartKey id;
    private int quantity;

    @Override
    public int hashCode() {return Objects.hash(id, quantity);}

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    UserEntity user;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    Product product;
}
