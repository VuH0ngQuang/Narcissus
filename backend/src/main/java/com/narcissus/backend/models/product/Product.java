package com.narcissus.backend.models.product;

import com.narcissus.backend.models.orders.ConsistOf;
import com.narcissus.backend.models.user.UserCart;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(exclude = "consistOfs")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;
    private String productName;
    private String productInfo;
    private String productType;
    private int productStockQuantity;
    private long productPrice;
    private Date productDate;

    @OneToMany(mappedBy = "product", fetch =FetchType.EAGER)
    Set<ConsistOf> consistOfs;

    @OneToMany(mappedBy = "product", fetch =FetchType.EAGER)
    Set<UserCart> userCarts;

    @OneToMany(mappedBy = "product", fetch =FetchType.EAGER)
    List<Review> reviews;

    @Lob
    private byte[] productImage;
}
