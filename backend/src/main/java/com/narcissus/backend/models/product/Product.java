package com.narcissus.backend.models.product;

import com.narcissus.backend.models.orders.ConsistOf;
import com.narcissus.backend.models.user.Role;
import com.narcissus.backend.models.user.Seller;
import com.narcissus.backend.models.user.UserCart;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ProductId;
    private String ProductName;
    private String ProductInfo;
    private int ProductStockQuantity;
    private long ProductPrice;
    private Date ProductDate;

    @OneToMany(mappedBy = "product", fetch =FetchType.EAGER)
    Set<ConsistOf> consistOfs;

    @OneToMany(mappedBy = "product", fetch =FetchType.EAGER)
    Set<UserCart> userCarts;

    @OneToMany(mappedBy = "product", fetch =FetchType.EAGER)
    List<Review> reviews;

    @ManyToOne(fetch = FetchType.EAGER)
    private Seller seller;

    @Lob
    private byte[] ProductImage;
}
