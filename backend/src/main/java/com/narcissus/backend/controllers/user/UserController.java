package com.narcissus.backend.controllers.user;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.service.userentity.UserCartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/user")
public class UserController {
    UserCartService userCartService;

    @Autowired
    public UserController(UserCartService userCartService) {
        this.userCartService = userCartService;
    }

    @PostMapping("/addToCart")
    public ResponseEntity<ConsistOfDto> addToCart (@RequestBody ConsistOfDto consistOfDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userCartService.addToCart(consistOfDto, token), HttpStatus.OK);
    }

    @PostMapping("/removeFromCart")
    public ResponseEntity<ConsistOfDto> removeFromCart (@RequestBody ConsistOfDto consistOfDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userCartService.deleteFromCart(consistOfDto, token), HttpStatus.OK);
    }

    @PostMapping("/removeAllFromCart")
    public ResponseEntity<String> removeAllFromCart (@RequestBody ConsistOfDto consistOfDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userCartService.deleteAllFromCart(consistOfDto, token), HttpStatus.OK);
    }

    @GetMapping("/getCart")
    public ResponseEntity<List<ConsistOfDto>> getCart (@RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(userCartService.getCart(token), HttpStatus.OK);
    }
}
