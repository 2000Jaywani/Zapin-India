package com.example.ZapinAdmin.Repository;

import com.example.ZapinAdmin.Entity.Outlet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OutletRepository extends JpaRepository<Outlet, Integer>{



    Outlet findByoutletId(int outletId);
}
