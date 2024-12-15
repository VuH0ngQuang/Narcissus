package com.narcissus.backend.repository.user;

import com.narcissus.backend.models.user.UserCart;
import com.narcissus.backend.models.user.UserCartKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserCartRepository  extends JpaRepository<UserCart, UserCartKey> {
    @Query("SELECT uc FROM UserCart uc WHERE uc.user.userId = :userId AND uc.product.productId = :productId")
    UserCart findByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);

    @Query("DELETE FROM UserCart uc WHERE uc.user.userId = :userId AND uc.product.productId = :productId")
    @Modifying
    @Transactional
    void deleteByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);

    @Query("SELECT uc FROM UserCart uc WHERE uc.user.userId = :userId")
    List<UserCart> findAllByUserId(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserCart uc WHERE uc.product.productId = :productId")
    void deleteByProductId(@Param("productId") Long productId);
}
