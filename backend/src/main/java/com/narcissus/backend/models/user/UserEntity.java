package com.narcissus.backend.models.user;

import com.narcissus.backend.models.orders.Orders;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.models.product.Review;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;


@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    private String email;
    private String password;
//    private boolean admin;
    @Column(name = "username")
    private String userName;
    private String phoneNumber;
    private String address;
    private Date date;

    @Override
    public int hashCode() {return Objects.hash(userId, userName);}

    @Override
    public String toString() {
        return "UserEntity{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", date=" + date +
                '}';
    }

    @ManyToOne(fetch = FetchType.EAGER)
    private Role role = new Role();

    @OneToMany(mappedBy = "user", fetch =FetchType.EAGER)
    Set<UserCart> userCarts;

    @OneToMany(mappedBy = "userEntity", fetch = FetchType.EAGER)
    private List<Orders> orders = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch =FetchType.EAGER)
    List<Review> reviews;

    @ManyToMany
    Set<Product> products;


}
