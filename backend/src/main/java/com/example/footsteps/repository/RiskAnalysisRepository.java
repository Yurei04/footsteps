package com.example.footsteps.repository;

import com.example.footsteps.model.RiskHotspot;
import java.util.List;
import java.util.Optional;

public interface RiskAnalysisRepository {
    List<RiskHotspot> findAllLatestByLocation();
    Optional<RiskHotspot> findById(String id);
    Optional<RiskHotspot> findByLocation(String location); 
    List<RiskHotspot> findAll();
    void save(RiskHotspot hotspot);
    void delete(String id);
}