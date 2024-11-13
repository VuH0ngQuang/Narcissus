package com.narcissus.backend.service.userentity.impl;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.orders.ConsistOf;
import com.narcissus.backend.models.user.UserCart;
import com.narcissus.backend.models.user.UserCartKey;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.repository.user.UserCartRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.userentity.UserCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class  UserCartImpl implements UserCartService {
    private final TokenGenerator tokenGenerator;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private UserCartRepository userCartRepository;

    @Autowired
    public UserCartImpl(UserCartRepository userCartRepository, TokenGenerator tokenGenerator, UserRepository userRepository, ProductRepository productRepository) {
        this.userCartRepository = userCartRepository;
        this.tokenGenerator = tokenGenerator;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public ConsistOfDto addToCart(ConsistOfDto consistOfDto, String token) {

        String jwtToken = token.substring(7);
        String email = tokenGenerator.getEmailFromJWT(jwtToken);
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        UserCart userCarts = userCartRepository.findByUserIdAndProductId(user.getUserId(), consistOfDto.getProductId());

        if (userCarts == null) {
            userCarts = new UserCart();
            UserCartKey id = new UserCartKey(user.getUserId(), consistOfDto.getProductId());
            userCarts.setId(id);
            userCarts.setQuantity(consistOfDto.getQuantity());
            userCarts.setUser(user);
            userCarts.setProduct(productRepository.findById(consistOfDto.getProductId()).orElseThrow(() -> new NotFoundException("Product not found")));
            userCartRepository.save(userCarts);

            return toDto(userCarts, new ConsistOfDto());
        }
        userCarts.setQuantity(userCarts.getQuantity() + consistOfDto.getQuantity());
        userCartRepository.save(userCarts);

        return toDto(userCarts, new ConsistOfDto());
    }

    public ConsistOfDto deleteFromCart(ConsistOfDto consistOfDto, String token) {
        String jwtToken = token.substring(7);
        String email = tokenGenerator.getEmailFromJWT(jwtToken);
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        UserCart userCart = userCartRepository.findByUserIdAndProductId(user.getUserId(), consistOfDto.getProductId());
        userCart.setQuantity(userCart.getQuantity() - consistOfDto.getQuantity());

        userCartRepository.save(userCart);

        return toDto(userCart, new ConsistOfDto());

    }

    public String deleteAllFromCart(ConsistOfDto consistOfDto, String token) {
        String jwtToken = token.substring(7);
        String email = tokenGenerator.getEmailFromJWT(jwtToken);
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        try {
            userCartRepository.deleteByUserIdAndProductId(user.getUserId(), consistOfDto.getProductId());
            return "Item removed from cart";
        } catch (DataAccessException e) {
            return "Error removing item from cart: " + e.getMessage();
        } catch (Exception e) {
            return "An unexpected error occurred: " + e.getMessage();
        }
    }

    public List<ConsistOfDto> getCart(String token) {
        String jwtToken = token.substring(7);
        String email = tokenGenerator.getEmailFromJWT(jwtToken);
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        List<ConsistOfDto> consistOfs = userCartRepository
                .findAllByUserId(user.getUserId())
                .stream()
                .map(userCart -> toDto(userCart, new ConsistOfDto())).collect(Collectors.toList());

        return consistOfs;
    }

    public ConsistOfDto toDto (UserCart userCart, ConsistOfDto consistOfDto) {
        consistOfDto.setProductId(userCart.getId().getProductId());
        consistOfDto.setQuantity(userCart.getQuantity());

        return consistOfDto;
    }
}