package com.example.ZapinAdmin.Repository;

import com.example.ZapinAdmin.Entity.OfferCupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OfferCuponRepository extends JpaRepository<OfferCupon , Integer> {
    Optional<OfferCupon> findByOfferuponId(int availableOfferId);
}
