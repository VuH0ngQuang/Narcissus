package com.narcissus.backend.models.orders;

import jakarta.persistence.Embeddable;

@Embeddable
public class DisburseKey {
    private long userId;
    private long ordersId;
}
