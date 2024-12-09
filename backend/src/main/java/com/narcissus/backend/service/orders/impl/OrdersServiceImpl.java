package com.narcissus.backend.service.orders.impl;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.orders.OrdersDto;
import com.narcissus.backend.dto.orders.OrdersResponse;
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
import java.util.List;
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
    public OrdersResponse createOrders(Set<ConsistOfDto> consistOfDtos, String token) throws Exception {
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

        Set<ConsistOf> consistOfs = consistOfDtos.stream()
                .map(dto -> {
                    ConsistOf consistOf = new ConsistOf();
                    ConsistOfKey id = new ConsistOfKey(orders.getOrdersId(), dto.getProductId());

                    consistOf.setId(id);
                    consistOf.setQuantity(dto.getQuantity());
                    consistOf.setOrders(orders);

                    Product product = productRepository.findById(dto.getProductId())
                            .orElseThrow(() -> new NotFoundException("Product not found"));
                    consistOf.setProduct(product);

                    return consistOf;
                })
                .collect(Collectors.toSet());
        orders.setConsistOfs(consistOfs);

        // fucking stupid CompletableFuture dont let me reassign orders so have to change the name to get orderId
        Orders newOrder = ordersRepository.save(orders);

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(user.getEmail());
        emailDetails.setSubject("Thank you for your order! Your flowers are on their way");
        emailDetails.setMsgBody(emailService.mailOrder(user.getUserName(), totalPrice, consistOfs));

        CompletableFuture<Void> emailFuture = CompletableFuture.runAsync(() -> emailService.sendEmail(emailDetails));

        CompletableFuture<String> paymentFuture = CompletableFuture.supplyAsync(() -> {
            try {
                return paymentService.createPayment(orders);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        String checkoutUrl = paymentFuture.get();

        CompletableFuture.allOf(emailFuture, paymentFuture).join();

        OrdersResponse ordersResponse = new OrdersResponse();
        ordersResponse.setOrdersId(newOrder.getOrdersId());
        ordersResponse.setCheckoutUrl(checkoutUrl);

        return ordersResponse;
    }



    @Override
    public List<OrdersDto> getAll() {
        List<Orders> orders = ordersRepository.findAll();
        return orders.parallelStream()
                .map(order -> toDto(order, new OrdersDto()))
                .collect(Collectors.toList());
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
public OrdersDto toDto(Orders orders, OrdersDto ordersDto) {
    if (orders == null || ordersDto == null) {
        throw new IllegalArgumentException("Orders and OrdersDto must not be null");
    }

    ordersDto.setMoney(orders.getMoney());
    ordersDto.setShipped(orders.isShipped());
    ordersDto.setStatus(orders.getStatus());
    ordersDto.setDate(orders.getDate());
    ordersDto.setCanceledAt(orders.getCanceledAt());
    ordersDto.setCancellationReason(orders.getCancellationReason());

    if (orders.getConsistOfs() != null) {
        ordersDto.setConsistOfDtos(orders.getConsistOfs()
                .parallelStream()
                .filter(consistOf -> consistOf != null && consistOf.getId() != null)
                .map(consistOf -> consistOfToDto(consistOf, new ConsistOfDto()))
                .collect(Collectors.toSet()));
    } else {
        ordersDto.setConsistOfDtos(new HashSet<>());
    }

    return ordersDto;
}

    public ConsistOfDto consistOfToDto(ConsistOf consistOf, ConsistOfDto consistOfDto) {
        if (consistOf == null || consistOfDto == null) {
            System.out.println("ConsistOf is null: " + (consistOf == null));
            System.out.println("ConsistOfDto is null: " + (consistOfDto == null));
            if (consistOf != null) {
                System.out.println("Orders in ConsistOf is null: " + (consistOf.getOrders() == null));
            }
            throw new IllegalArgumentException("ConsistOf and ConsistOfDto must not be null");
        }

        consistOfDto.setProductId(consistOf.getId().getProductId());
        consistOfDto.setQuantity(consistOf.getQuantity());

        return consistOfDto;
    }
}
