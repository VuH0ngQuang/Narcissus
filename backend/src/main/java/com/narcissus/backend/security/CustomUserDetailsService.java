package com.narcissus.backend.security;

import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Email not found"));
        SimpleGrantedAuthority authorities = new SimpleGrantedAuthority("ROLE_" + user.getRole());

        return new User(user.getEmail(), user.getPassword(), Collections.singleton(authorities));
    }
}
