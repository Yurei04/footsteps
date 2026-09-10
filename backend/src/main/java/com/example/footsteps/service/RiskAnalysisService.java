package com.example.footsteps.service;

import com.example.footsteps.model.LocationAnalysis;
import com.example.footsteps.model.RiskHotspot;
import java.util.List;
import java.util.Optional;

public interface RiskAnalysisService {
    List<RiskHotspot> getAllLatestHotspots();
    Optional<RiskHotspot> getHotspotById(String id);
    LocationAnalysis analyzeLocation(String location);
    void saveAnalysis(LocationAnalysis analysis);
}