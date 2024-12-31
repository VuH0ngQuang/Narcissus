package com.narcissus.backend.service.orders.impl;

import com.narcissus.backend.dto.orders.CancelPaymentDto;
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
import com.narcissus.backend.repository.user.UserCartRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.email.EmailService;
import com.narcissus.backend.service.orders.OrdersService;

import com.narcissus.backend.service.payment.PaymentService;
import com.narcissus.backend.service.payment.impl.PaymentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.type.PaymentLinkData;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class OrdersServiceImpl implements OrdersService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final TokenGenerator tokenGenerator;
    private final OrdersRepository ordersRepository;
    private final PaymentService paymentService;
    private final EmailService emailService;
    private final UserCartRepository userCartRepository;
    private final PaymentServiceImpl paymentServiceImpl;

    @Autowired
    public OrdersServiceImpl(EmailService emailService, OrdersRepository ordersRepository, ProductRepository productRepository, UserRepository userRepository, TokenGenerator tokenGenerator, PaymentService paymentService, UserCartRepository userCartRepository, PaymentServiceImpl paymentServiceImpl) {
        this.ordersRepository = ordersRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
        this.paymentService = paymentService;
        this.emailService = emailService;
        this.userCartRepository = userCartRepository;
        this.paymentServiceImpl = paymentServiceImpl;
    }

    @Override
    public OrdersResponse createOrders(Set<ConsistOfDto> consistOfDtos, String token) throws Exception {
        Orders orders = new Orders();

        long timestamp = System.currentTimeMillis() % 1000000000;
        long randomNum = ThreadLocalRandom.current().nextLong(1000, 9999);
        long orderId = timestamp * 10000 + randomNum;
        orders.setOrdersId(orderId);

        long totalPrice = consistOfDtos.stream()
                .mapToLong(dto -> {
                    Product product = productRepository.findById(dto.getProductId())
                            .orElseThrow(() -> new NotFoundException("Product not found"));
                    product.setProductStockQuantity(product.getProductStockQuantity() - dto.getQuantity());
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
                    userCartRepository.deleteByUserIdAndProductId(user.getUserId(), dto.getProductId());
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

        ordersRepository.save(orders);
//        // fucking stupid CompletableFuture dont let me reassign orders so have to change the name to get orderId
//        Orders newOrders = ordersRepository.save(orders);

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(user.getEmail());
        emailDetails.setSubject("Thank you for your order! Your flowers are on their way");
        emailDetails.setMsgBody(emailService.mailOrder(user.getUserName(), user.getAddress(), totalPrice, consistOfs));

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
        ordersResponse.setOrdersId(orders.getOrdersId());
        ordersResponse.setCheckoutUrl(checkoutUrl);

        return ordersResponse;
    }

//    @Override
//    public OrdersResponse createOrders(Set<ConsistOfDto> consistOfDtos, String token) throws Exception {
//        Orders orders = new Orders();
//
//        long timestamp = System.currentTimeMillis() % 1000000000;
//        long randomNum = ThreadLocalRandom.current().nextLong(1000, 9999);
//        long orderId = timestamp * 10000 + randomNum;
//        orders.setOrdersId(orderId);
//
//        long totalPrice = consistOfDtos.stream()
//                .mapToLong(dto -> {
//                    Product product = productRepository.findById(dto.getProductId())
//                            .orElseThrow(() -> new NotFoundException("Product not found"));
//                    product.setProductStockQuantity(product.getProductStockQuantity() - 1);
//                    return product.getProductPrice() * dto.getQuantity();
//                })
//                .sum();
//        orders.setMoney(totalPrice);
//        orders.setShipped(false);
//        orders.setStatus("PENDING");
//        orders.setDate(new Date());
//
//        String jwtToken = token.substring(7);
//        UserEntity user = userRepository.findByEmail(tokenGenerator.getEmailFromJWT(jwtToken))
//                .orElseThrow(() -> new NotFoundException("Invalid Token"));
//        orders.setUserEntity(user);
//
//        Set<ConsistOf> consistOfs = consistOfDtos.stream()
//                .map(dto -> {
//                    userCartRepository.deleteByUserIdAndProductId(user.getUserId(), dto.getProductId());
//                    ConsistOf consistOf = new ConsistOf();
//                    ConsistOfKey id = new ConsistOfKey(orders.getOrdersId(), dto.getProductId());
//
//                    consistOf.setId(id);
//                    consistOf.setQuantity(dto.getQuantity());
//                    consistOf.setOrders(orders);
//
//                    Product product = productRepository.findById(dto.getProductId())
//                            .orElseThrow(() -> new NotFoundException("Product not found"));
//                    consistOf.setProduct(product);
//
//                    return consistOf;
//                })
//                .collect(Collectors.toSet());
//        orders.setConsistOfs(consistOfs);
//
//        ordersRepository.save(orders);
//
//        EmailDetails emailDetails = new EmailDetails();
//        emailDetails.setRecipient(user.getEmail());
//        emailDetails.setSubject("Thank you for your order! Your flowers are on their way");
//        emailDetails.setMsgBody(emailService.mailOrder(user.getUserName(), user.getAddress(), totalPrice, consistOfs));
//
//        emailService.sendEmail(emailDetails);
//
//        String checkoutUrl;
//        try {
//            checkoutUrl = paymentService.createPayment(orders);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//
//        OrdersResponse ordersResponse = new OrdersResponse();
//        ordersResponse.setOrdersId(orders.getOrdersId());
//        ordersResponse.setCheckoutUrl(checkoutUrl);
//
//        return ordersResponse;
//    }
//
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

    @Override
    public List<OrdersDto> get(String token) {
        String jwtToken = token.substring(7);
        UserEntity user = userRepository.findByEmail(tokenGenerator.getEmailFromJWT(jwtToken))
                .orElseThrow(() -> new NotFoundException("Invalid Token"));

        List<Orders> orders = ordersRepository.findOrdersByUserEntityUserId(user.getUserId());
        return orders.parallelStream()
                .map(order -> toDto(order, new OrdersDto()))
                .collect(Collectors.toList());
    }

    @Override
    @Scheduled(fixedRate = 60000)
    public void checkPendingOrders() {
        final String CANCELREASON = "SYSTEM: CANCELLED BY SYSTEM, CONTACT ADMIN FOR MORE DETAILS";
        long sixMinutesAgo = System.currentTimeMillis() - 6 * 60 * 1000;
        Date cutOffTime = new Date(sixMinutesAgo);

        List<Orders> pendingOrders = ordersRepository.findByStatusAndDateBefore("PENDING", cutOffTime);
        pendingOrders.parallelStream().forEach(orders -> {
            CancelPaymentDto cancelPaymentDto = new CancelPaymentDto(orders.getOrdersId(), CANCELREASON);
            try {
                paymentServiceImpl.cancelPayment(cancelPaymentDto);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
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

    ordersDto.setOrderId(orders.getOrdersId());
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
