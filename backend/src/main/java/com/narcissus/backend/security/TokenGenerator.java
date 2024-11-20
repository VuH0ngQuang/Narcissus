package com.narcissus.backend.security;

import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class TokenGenerator {

    private final long JWT_EXPERATION = 900000;
    private final String JWT_SECRET = "                           " +
            "                        _ooOoo_\n" +
            "                       o8888888o\n" +
            "                       88\" . \"88\n" +
            "                       (| -_- |)\n" +
            "                       O\\  =  /O\n" +
            "                    ____/`---'\\____\n" +
            "                  .'  \\\\|     |//  `.\n" +
            "                 /  \\\\|||  :  |||//  \\\n" +
            "                /  _||||| -:- |||||_  \\\n" +
            "                |   | \\\\\\  -  /'| |   |\n" +
            "                | \\_|  `\\`---'//  |_/ |\n" +
            "                \\  .-\\__ `-. -'__/-.  /\n" +
            "              ___`. .'  /--.--\\  `. .'___\n" +
            "           .\"\" '<  `.___\\_<|>_/___.' _> \\\"\".\n" +
            "          | | :  `- \\`. ;`. _/; .'/ /  .' ; |\n" +
            "          \\  \\ `-.   \\_\\_`. _.'_/_/  -' _.' /\n" +
            "===========`-.`___`-.__\\ \\___  /__.-'_.'_.-'================";
    private final SecretKey key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    private UserRepository userRepository;

    @Autowired
    public TokenGenerator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generatorToken(Authentication authentication) {
        String email =authentication.getName();
        Date currentDate = new Date();
        Date exprireDate = new Date(currentDate.getTime() + JWT_EXPERATION);

        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Email not found"));

        String role = "ROLE_"+user.getRole().getName();

        String token = Jwts.builder()
                .subject(email)
                .claim("role",role)
                .issuedAt(currentDate)
                .expiration(exprireDate)
                .signWith(key)
                .compact();

        return token;
    }

    public String getEmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    public String getRoleFromJWT(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get("role", String.class);
    }

    public boolean validToken (String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (Exception ex) {
//            throw new AuthenticationCredentialsNotFoundException("JWT is expire or incorrect");
            throw new NotFoundException("JWT is expire or incorrect");
        }
    }
}
