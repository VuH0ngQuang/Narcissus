package com.narcissus.backend.service.auth.impl;

import com.narcissus.backend.dto.auth.AuthResponseDto;
import com.narcissus.backend.dto.user.LoginDto;
import com.narcissus.backend.dto.user.RegisterDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.email.EmailDetails;
import com.narcissus.backend.models.user.Role;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.user.RoleRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.auth.AuthService;
import com.narcissus.backend.service.email.EmailService;
import com.narcissus.backend.service.email.impl.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;


@Service
public class AuthServiceImpl implements AuthService {
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenGenerator tokenGenerator;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, TokenGenerator tokenGenerator, EmailServiceImpl emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
        this.emailService = emailService;
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

            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(user.getEmail());
            emailDetails.setSubject("Welcome to Narcissus! Your Account is Ready to Bloom");
            emailDetails.setMsgBody(emailService.mailRegister(user.getUserName()));
            emailService.sendEmail(emailDetails);

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

    @Override
    public String forgetPassword(String email) {
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        try {
            String newPassword = generateString();
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(user.getEmail());
            emailDetails.setSubject("Here’s Your New Narcissus Password");
            emailDetails.setMsgBody(emailService.mailResetPassword(user.getUserName(), newPassword));
            emailService.sendEmail(emailDetails);
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public String generateString() {
        int length = 64;
        String characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?,./;[]-=~";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characterSet.length());
            sb.append(characterSet.charAt(randomIndex));
        }

        System.out.println(sb);

        return sb.toString();
    }
}
