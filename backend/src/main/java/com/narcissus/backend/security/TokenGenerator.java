package com.narcissus.backend.security;

import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.user.TokenData;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.user.TokenRepository;
import com.narcissus.backend.repository.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class TokenGenerator {

    private final long JWT_EXPERATION = 300000;
    private final String JWT_SECRET = """
                                       \
                                    _ooOoo_
                                   o8888888o
                                   88" . "88
                                   (| -_- |)
                                  O\\  =  /O
                                ____/`---'\\____
                              .'  \\\\|     |//  `.
                             /  \\\\|||  :  |||//  \\
                            /  _||||| -:- |||||_  \\
                            |   | \\\\\\  -  /'| |   |
                            | \\_|  `\\`---'//  |_/ |
                            \\  .-\\__ `-. -'__/-.  /
                          ___`. .'  /--.--\\  `. .'___
                       ."" '<  `.___\\_<|>_/___.' _> \\"".
                      | | :  `- \\`. ;`. _/; .'/ /  .' ; |
                      \\  \\ `-.   \\_\\_`. _.'_/_/  -' _.' /
            ===========`-.`___`-.__\\ \\___  /__.-'_.'_.-'================""";
    private final SecretKey key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    @Autowired
    public TokenGenerator(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
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

        TokenData tokenData = new TokenData();
        tokenData.setToken(token);
        tokenData.setExpireDate(exprireDate);

        tokenRepository.save(tokenData);

        return token;
    }

    public String getEmailFromJWT(String token) {
        if (tokenRepository.existsByToken(token)) {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        } else {
            throw new NotFoundException("Token not found or not valid");
        }
    }

    public String getRoleFromJWT(String token) {
        if (tokenRepository.existsByToken(token)) {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.get("role", String.class);
        } else {
            throw new NotFoundException("Token not found or not valid");
        }
    }

    public String renewToken(String oldToken) {

        if (validToken(oldToken) && tokenRepository.existsByToken(oldToken)) {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(oldToken)
                    .getPayload();

            String email = claims.getSubject();
            String role = claims.get("role", String.class);

            Date currentDate = new Date();
            Date newExpireDate = new Date(currentDate.getTime() + JWT_EXPERATION);

            String newToken = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(email)
                    .claim("role", role)
                    .setIssuedAt(currentDate)
                    .setExpiration(newExpireDate)
                    .signWith(key)
                    .compact();

            tokenRepository.removeToken(oldToken);

            TokenData tokenData = new TokenData();
            tokenData.setToken(newToken);
            tokenData.setExpireDate(newExpireDate);

            tokenRepository.save(tokenData);

            return newToken;
        } else {
            throw new NotFoundException("Token not found or not valid");
        }
    }

    public boolean validToken (String token) {
        if (tokenRepository.existsByToken(token)) {
            try {
                Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
                return true;
            } catch (Exception ex) {
    //          throw new AuthenticationCredentialsNotFoundException("JWT is expire or incorrect");
                throw new NotFoundException("JWT is expire or incorrect");
            }
        } else {
            throw new NotFoundException("Token not found or not valid");
        }
    }
}
