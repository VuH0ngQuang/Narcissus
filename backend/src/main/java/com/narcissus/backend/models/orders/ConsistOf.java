package com.narcissus.backend.models.orders;

import com.narcissus.backend.models.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(exclude = "orders") //avoid hashcode and equals run to infinity loops
public class ConsistOf {
    @EmbeddedId
    private ConsistOfKey id;
    private int quantity;

    @ManyToOne
    @MapsId("ordersId")
    @JoinColumn(name = "orders_id")
    Orders orders;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    Product product;
}
