package com.narcissus.backend.repository.product;

import com.narcissus.backend.models.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Product p WHERE p.productId = :productId")
    void deleteByProductId(@Param("productId") Long productId);
}
