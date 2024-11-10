package com.narcissus.backend.service.auth.impl;

import com.narcissus.backend.dto.auth.AuthResponseDto;
import com.narcissus.backend.dto.user.LoginDto;
import com.narcissus.backend.dto.user.RegisterDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.user.Role;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.user.RoleRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private TokenGenerator tokenGenerator;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, TokenGenerator tokenGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
    }

    @Override
    public boolean register(RegisterDto registerDto) {
        if (!userRepository.existsByEmail(registerDto.getEmail())){
            UserEntity user = new UserEntity();
            Role role = roleRepository.findByName("CUSTOMER").orElseThrow(() -> new NotFoundException("Cannot find role 'CUSTOMER'"));

            user.setEmail(registerDto.getEmail());
            user.setUserName(registerDto.getUsername());
            user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
            user.setPhoneNumber(registerDto.getPhoneNumber());
            user.setRole(role);
            user.setDate(registerDto.getDate());

            userRepository.save(user);

            return true;
        }
        return false;
    }

    @Override
    public AuthResponseDto login(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenGenerator.generatorToken(authentication);
            return new AuthResponseDto(token);
        } catch (Exception e) {
            return null;
        }
    }
}
