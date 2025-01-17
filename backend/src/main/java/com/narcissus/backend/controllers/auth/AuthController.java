package com.narcissus.backend.controllers.auth;

import com.narcissus.backend.dto.auth.AuthResponseDto;
import com.narcissus.backend.dto.user.LoginDto;
import com.narcissus.backend.dto.user.RegisterDto;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/auth")
public class AuthController {

    private final TokenGenerator tokenGenerator;
    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService, TokenGenerator tokenGenerator) {
        this.authService = authService;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        return authService.register(registerDto) ? new ResponseEntity<>("Successful", HttpStatus.CREATED) : new ResponseEntity<>("Email already used", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        AuthResponseDto responseDto = authService.login(loginDto);
        return responseDto.getAccessToken() != null ? new ResponseEntity<>(responseDto, HttpStatus.OK) : new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/forgetPassword")
    public ResponseEntity<String>  forgetPassword(@RequestBody LoginDto loginDto) {
        return new ResponseEntity<>(authService.forgetPassword(loginDto.getEmail()), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        authService.logout(token);
        return new ResponseEntity<>("Fuck off", HttpStatus.OK);
    }

    @PostMapping("/renew")
    public ResponseEntity<AuthResponseDto> renewToken(@RequestHeader("Authorization") String oldToken) {
        AuthResponseDto responseDto = authService.renewToken(oldToken);
        return responseDto.getAccessToken() != null ? new ResponseEntity<>(responseDto, HttpStatus.OK) : new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/getRole")
    public ResponseEntity<String> getRole(@RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(tokenGenerator.getRoleFromJWT(token.substring(7)), HttpStatus.OK);
    }
}
