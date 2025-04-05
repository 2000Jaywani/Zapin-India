package com.example.ZapinAdmin.Repository;

import com.example.ZapinAdmin.Entity.EndUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EndUserRepository extends JpaRepository<EndUser , Integer> {

    List<EndUser> findByRole(String role);

}
