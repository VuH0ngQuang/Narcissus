package com.narcissus.backend.models.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "role")
@Data
public class Role {
    @Id
    private long id;
    private String name;
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserEntity> users;

    @Override
    public int hashCode() {return Objects.hash(id, name);}
}
