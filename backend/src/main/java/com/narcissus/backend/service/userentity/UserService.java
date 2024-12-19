package com.narcissus.backend.service.userentity;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.user.RegisterDto;

import java.util.List;

public interface UserService {
    ConsistOfDto addToCart(ConsistOfDto consistOfDto, String token);
    ConsistOfDto deleteFromCart(ConsistOfDto consistOfDto, String token);
    String deleteAllFromCart(ConsistOfDto consistOfDto, String token);
    List<ConsistOfDto> getCart(String token);
    RegisterDto getDetails(String token);
    RegisterDto updateDetails(String token, RegisterDto registerDto);
}
