package com.narcissus.backend.service.orders.impl;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.orders.OrdersDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.orders.ConsistOf;
import com.narcissus.backend.models.orders.ConsistOfKey;
import com.narcissus.backend.models.orders.Orders;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.repository.orders.OrdersRepository;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.orders.OrdersService;
import com.narcissus.backend.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrdersServiceImpl implements OrdersService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final TokenGenerator tokenGenerator;
    private final OrdersRepository ordersRepository;
    private PaymentService paymentService;

    @Autowired
    public OrdersServiceImpl(OrdersRepository ordersRepository, ProductRepository productRepository, UserRepository userRepository, TokenGenerator tokenGenerator, PaymentService paymentService) {
        this.ordersRepository = ordersRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
        this.paymentService = paymentService;
    }

    @Override
    public OrdersDto createOrders(Set<ConsistOfDto> consistOfDtos, String token) throws Exception {
        Orders orders = new Orders();

        //get all price from product list and calculate total
        Set<Long> productIds = consistOfDtos.stream()
                .map(ConsistOfDto::getProductId)
                .collect(Collectors.toSet());

        long totalPrice = productRepository.findAllById(productIds)
                .stream()
                .mapToLong(Product::getProductPrice)
                .sum();

        orders.setMoney(totalPrice);
        orders.setShipped(false);
        orders.setStatus("PENDING");
        orders.setDate(new Date());
        String jwtToken = token.substring(7);
        orders.setUserEntity(
                userRepository.findByEmail(
                        tokenGenerator.getEmailFromJWT(jwtToken)
                ).orElseThrow(() -> new NotFoundException("Invalid Token")));

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

        paymentService.createPayment(orders);

        return toDto(orders, new OrdersDto());
    }

    @Override
    public OrdersDto getDetailsOrders(long id) {
        return null;
    }

    @Override
    public OrdersDto updateOrders(long id, OrdersDto ordersDto) {
        return null;
    }

    @Override
    public String deleteOrders(long id) {
        return "";
    }

    public OrdersDto toDto (Orders orders, OrdersDto ordersDto) {
        ordersDto.setMoney(orders.getMoney());
        ordersDto.setShipped(orders.isShipped());
        ordersDto.setStatus(orders.getStatus());
        ordersDto.setDate(orders.getDate());
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
