package com.narcissus.backend.repository.user;

import com.narcissus.backend.models.user.TokenData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface TokenRepository extends JpaRepository<TokenData, String> {
    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM TokenData t WHERE t.token = :token")
    Boolean existsByToken(@Param("token") String token);

    @Query("DELETE FROM TokenData t WHERE t.token = :token")
    @Modifying
    @Transactional
    void removeToken(@Param("token") String token);

    @Query("DELETE FROM TokenData t WHERE t.expireDate < :cutOffTime")
    @Modifying
    @Transactional
    void removeByExpireDateBefore(@Param("cutOffTime") Date cutOffTime);
}