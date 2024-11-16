package com.narcissus.backend.service.orders.impl;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.orders.OrdersDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.email.EmailDetails;
import com.narcissus.backend.models.orders.ConsistOf;
import com.narcissus.backend.models.orders.ConsistOfKey;
import com.narcissus.backend.models.orders.Orders;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.orders.OrdersRepository;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.email.EmailService;
import com.narcissus.backend.service.orders.OrdersService;

import com.narcissus.backend.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class OrdersServiceImpl implements OrdersService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final TokenGenerator tokenGenerator;
    private final OrdersRepository ordersRepository;
    private final PaymentService paymentService;
    private final EmailService emailService;

    @Autowired
    public OrdersServiceImpl(EmailService emailService, OrdersRepository ordersRepository, ProductRepository productRepository, UserRepository userRepository, TokenGenerator tokenGenerator, PaymentService paymentService) {
        this.ordersRepository = ordersRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
        this.paymentService = paymentService;
        this.emailService = emailService;
    }

    @Override
    public OrdersDto createOrders(Set<ConsistOfDto> consistOfDtos, String token) throws Exception {
        Orders orders = new Orders();

        long totalPrice = consistOfDtos.stream()
                .mapToLong(dto -> {
                    Product product = productRepository.findById(dto.getProductId())
                            .orElseThrow(() -> new NotFoundException("Product not found"));
                    return product.getProductPrice() * dto.getQuantity();
                })
                .sum();

        orders.setMoney(totalPrice);
        orders.setShipped(false);
        orders.setStatus("PENDING");
        orders.setDate(new Date());
        String jwtToken = token.substring(7);
        UserEntity user = userRepository.findByEmail(tokenGenerator.getEmailFromJWT(jwtToken))
                .orElseThrow(() -> new NotFoundException("Invalid Token"));
        orders.setUserEntity(user);

        Set<ConsistOf> consistOfs = new HashSet<>();

        consistOfDtos.forEach(dto -> {
            ConsistOf consistOf = new ConsistOf();
            ConsistOfKey id = new ConsistOfKey(orders.getOrdersId(), dto.getProductId());

            consistOf.setId(id);
            consistOf.setQuantity(dto.getQuantity());
            consistOf.setOrders(orders);

            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new NotFoundException("Product not found"));
            consistOf.setProduct(product);

            consistOfs.add(consistOf);
        });
        orders.setConsistOfs(consistOfs);

        ordersRepository.save(orders);

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(user.getEmail());
        emailDetails.setSubject("Thank you for your order! Your flowers are on their way");
        emailDetails.setMsgBody(emailService.mailOrder(user.getUserName(),totalPrice, consistOfs));

//        //make asynchronously
//        CompletableFuture<Void> emailFuture = CompletableFuture.runAsync(() -> emailService.sendEmail(emailDetails));
//        CompletableFuture<Void> paymentFuture = CompletableFuture.runAsync(() -> {
//            try {
//                paymentService.createPayment(orders);
//            } catch (Exception e) {
//                throw new RuntimeException(e);
//            }
//        });
//
//        //waits for both tasks to complete
//        CompletableFuture.allOf(emailFuture, paymentFuture).join();

        return toDto(orders, new OrdersDto());
    }

    @Override
    public OrdersDto getDetailsOrders(long id) {
        return toDto(
                ordersRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new NotFoundException("Cannot found order with id: "+id)
                        ), new OrdersDto()
        );
    }

//    @Override
//    public OrdersDto updateOrders(long id, OrdersDto ordersDto) {
//        return null;
//    }
//
//    @Override
//    public String deleteOrders(long id) {
//        return "";
//    }
    public OrdersDto toDto (Orders orders, OrdersDto ordersDto) {
        ordersDto.setMoney(orders.getMoney());
        ordersDto.setShipped(orders.isShipped());
        ordersDto.setStatus(orders.getStatus());
        ordersDto.setDate(orders.getDate());
        ordersDto.setCanceledAt(orders.getCanceledAt());
        ordersDto.setCancellationReason(orders.getCancellationReason());
        ordersDto.setConsistOfDtos(orders.getConsistOfs()
                .stream()
                .map(
                        consistOf -> consistOfToDto(consistOf, new ConsistOfDto()))
                .collect(Collectors.toSet()));

        return ordersDto;
    }

    public ConsistOfDto consistOfToDto (ConsistOf consistOf, ConsistOfDto consistOfDto) {
        consistOfDto.setProductId(consistOf.getId().getProductId());
        consistOfDto.setQuantity(consistOf.getQuantity());

        return consistOfDto;
    }
}
