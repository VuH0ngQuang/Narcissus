package com.narcissus.backend.dto.user;

import lombok.Data;

import java.util.Date;

@Data
public class RegisterDto {
    private String email;
    private String password;
//    private boolean admin;
    private String username;
    private String address;
    private String phoneNumber;
    private Date date = new Date();
}
