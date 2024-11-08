package com.narcissus.backend.models.product;

import com.narcissus.backend.models.orders.ConsistOf;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ProductID;
    private String ProductName;
    private String ProductInfo;
    private int ProductStockQuantity;
    private long ProductPrice;
    private Date ProductDate;

    @OneToMany(mappedBy = "product")
    Set<ConsistOf> consistOfs;

    @Lob
    private byte[] ProductImage;
}
