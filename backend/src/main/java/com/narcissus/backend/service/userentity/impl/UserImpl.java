package com.narcissus.backend.service.userentity.impl;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.user.RegisterDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.user.UserCart;
import com.narcissus.backend.models.user.UserCartKey;
import com.narcissus.backend.models.user.UserEntity;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.repository.user.UserCartRepository;
import com.narcissus.backend.repository.user.UserRepository;
import com.narcissus.backend.security.TokenGenerator;
import com.narcissus.backend.service.userentity.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserImpl implements UserService {
    private final TokenGenerator tokenGenerator;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final UserCartRepository userCartRepository;

    @Autowired
    public UserImpl(UserCartRepository userCartRepository, TokenGenerator tokenGenerator, UserRepository userRepository, ProductRepository productRepository) {
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

    @Override
    public RegisterDto getDetails(String token) {
        String jwtToken = token.substring(7);
        String email = tokenGenerator.getEmailFromJWT(jwtToken);
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        return accToDto(user, new RegisterDto());
    }

    @Override
    public RegisterDto updateDetails(String token, RegisterDto registerDto) {
        String jwtToken = token.substring(7);
        String email = tokenGenerator.getEmailFromJWT(jwtToken);
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        if (registerDto.getUsername() != null ) user.setUserName(registerDto.getUsername());
//        if (registerDto.getEmail() != null) user.setEmail(registerDto.getEmail());
        if (registerDto.getAddress() != null) user.setAddress(registerDto.getAddress());
        if (registerDto.getPhoneNumber() != null) user.setPhoneNumber(registerDto.getPhoneNumber());

        userRepository.save(user);

        return accToDto(user, registerDto);
    }

    public List<ConsistOfDto> getCart(String token) {
        String jwtToken = token.substring(7);
        String email = tokenGenerator.getEmailFromJWT(jwtToken);
        UserEntity user =  userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        List<ConsistOfDto> consistOfs = userCartRepository
                .findAllByUserId(user.getUserId())
                .parallelStream()
                .map(userCart -> toDto(userCart, new ConsistOfDto())).collect(Collectors.toList());

        return consistOfs;
    }

    public RegisterDto accToDto (UserEntity userEntity, RegisterDto registerDto) {
        registerDto.setUsername(userEntity.getUserName());
        registerDto.setEmail(userEntity.getEmail());
        registerDto.setAddress(userEntity.getAddress());
        registerDto.setPhoneNumber(userEntity.getPhoneNumber());

        return  registerDto;
    }

    public ConsistOfDto toDto (UserCart userCart, ConsistOfDto consistOfDto) {
        consistOfDto.setProductId(userCart.getId().getProductId());
        consistOfDto.setQuantity(userCart.getQuantity());

        return consistOfDto;
    }
}
