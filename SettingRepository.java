package com.example.ZapinAdmin.Repository;

import com.example.ZapinAdmin.Entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SettingRepository extends JpaRepository<Setting , Integer> {
    Optional<Setting> findByemail(String email);
}
