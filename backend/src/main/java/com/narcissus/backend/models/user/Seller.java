package com.narcissus.backend.models.user;

import com.narcissus.backend.models.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Seller extends UserEntity{
    private String accountNumber;
    private String bankName;

    @OneToMany(mappedBy = "seller", fetch = FetchType.EAGER)
    Set<Product> products;
}
