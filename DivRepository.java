package com.example.ZapinAdmin.Repository;

import com.example.ZapinAdmin.Entity.Div;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DivRepository extends JpaRepository<Div , Integer> {

}
