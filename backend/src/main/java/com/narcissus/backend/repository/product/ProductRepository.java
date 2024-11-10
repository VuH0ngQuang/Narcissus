package com.narcissus.backend.repository.product;

import com.narcissus.backend.models.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
