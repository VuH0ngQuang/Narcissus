package com.narcissus.backend.controllers.user;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.user.RegisterDto;
import com.narcissus.backend.service.userentity.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/user")
public class UserController {
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addToCart")
    public ResponseEntity<ConsistOfDto> addToCart (@RequestBody ConsistOfDto consistOfDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userService.addToCart(consistOfDto, token), HttpStatus.OK);
    }

    @PostMapping("/removeFromCart")
    public ResponseEntity<ConsistOfDto> removeFromCart (@RequestBody ConsistOfDto consistOfDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userService.deleteFromCart(consistOfDto, token), HttpStatus.OK);
    }

    @PostMapping("/removeAllFromCart")
    public ResponseEntity<String> removeAllFromCart (@RequestBody ConsistOfDto consistOfDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userService.deleteAllFromCart(consistOfDto, token), HttpStatus.OK);
    }

    @GetMapping("/getCart")
    public ResponseEntity<List<ConsistOfDto>> getCart (@RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userService.getCart(token), HttpStatus.OK);
    }

    @GetMapping("/getDetails")
    public ResponseEntity<RegisterDto> getDetails (@RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userService.getDetails(token), HttpStatus.OK);
    }

    @PostMapping("/updateDetails")
    public ResponseEntity<RegisterDto> updateDetails (@RequestBody RegisterDto registerDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userService.updateDetails(token, registerDto), HttpStatus.OK);
    }
}
