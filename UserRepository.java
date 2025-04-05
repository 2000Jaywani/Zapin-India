package com.example.ZapinAdmin.Repository;

import com.example.ZapinAdmin.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User ,Integer> {
    User findByUserName(String username);
    User findByPassword(String password);
    User findByRole(String role);
}
