package com.narcissus.backend.service.userentity;

import com.narcissus.backend.dto.orders.ConsistOfDto;

import java.util.List;

public interface UserCartService {
    ConsistOfDto addToCart(ConsistOfDto consistOfDto, String token);
    ConsistOfDto deleteFromCart(ConsistOfDto consistOfDto, String token);
    String deleteAllFromCart(ConsistOfDto consistOfDto, String token);
    List<ConsistOfDto> getCart(String token);
}