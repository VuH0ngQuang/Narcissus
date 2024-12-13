package com.narcissus.backend.controllers.orders;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.orders.OrdersDto;
import com.narcissus.backend.dto.orders.OrdersResponse;
import com.narcissus.backend.service.orders.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.payos.type.CheckoutResponseData;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/api/orders")
public class OrdersController {

    private OrdersService ordersService;

    @Autowired
    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("/create")
    public ResponseEntity<OrdersResponse> create(@RequestBody Set<ConsistOfDto> consistOfDtos,
                                                 @RequestHeader("Authorization") String token) throws Exception {
        System.out.println("Received payload: " + consistOfDtos);
        return new ResponseEntity<>(ordersService.createOrders(consistOfDtos, token), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdersDto> getDetails(@PathVariable long id) {
        return new ResponseEntity<>(ordersService.getDetailsOrders(id), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<OrdersDto>> getAll() {
        return new ResponseEntity<>(ordersService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<List<OrdersDto>> get(@RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(ordersService.get(token),HttpStatus.OK);
    }

    @PostMapping("/forTesting")
    public ResponseEntity<String> testing(@RequestBody String text){
        System.out.println(text);
        return new ResponseEntity<>( text, HttpStatus.OK);
    }
}
