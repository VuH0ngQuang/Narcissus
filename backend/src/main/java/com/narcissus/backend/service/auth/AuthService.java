package com.narcissus.backend.service.auth;

import com.narcissus.backend.dto.auth.AuthResponseDto;
import com.narcissus.backend.dto.user.LoginDto;
import com.narcissus.backend.dto.user.RegisterDto;

public interface AuthService {

    boolean register (RegisterDto registerDto);
    AuthResponseDto login (LoginDto loginDto);
    String forgetPassword(String email);
}
