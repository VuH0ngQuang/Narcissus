package com.narcissus.backend.models.orders;

import com.narcissus.backend.models.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(exclude = "consistOfs") //avoid hashcode and equals run to infinity loops
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ordersId;
    private long money;
    private boolean shipped;
    private String status;
    private Date date;
    private String cancellationReason;
    private String canceledAt;
    private String transactionDateTime;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    Set<ConsistOf> consistOfs;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    Set<Disburse> disburses;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
