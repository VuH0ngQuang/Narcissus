package com.narcissus.backend.models.orders;

import com.narcissus.backend.models.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Disburse {
    @EmbeddedId
    private DisburseKey id;
    private long money;
    private boolean paid;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    UserEntity user;

    @ManyToOne
    @MapsId("ordersId")
    @JoinColumn(name = "orders_id")
    Orders orders;
}
