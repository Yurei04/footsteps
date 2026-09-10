package com.example.footsteps.service;

import com.example.footsteps.model.LocationAnalysis;
import com.example.footsteps.model.RiskHotspot;
import com.example.footsteps.repository.RiskAnalysisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class RiskAnalysisServiceImpl implements RiskAnalysisService {

    private final RiskAnalysisRepository repository;

    public RiskAnalysisServiceImpl(RiskAnalysisRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<RiskHotspot> getAllLatestHotspots() {
        log.info("Fetching all latest risk hotspots");
        return repository.findAllLatestByLocation();
    }

    @Override
    public Optional<RiskHotspot> getHotspotById(String id) {
        log.info("Fetching hotspot with id: {}", id);
        return repository.findById(id);
    }

    @Override
    public LocationAnalysis analyzeLocation(String location) {
        log.info("Analyzing location: {}", location);

        // This would integrate with your n8n workflow or external API
        // For now, returning a stub that can be expanded
        return LocationAnalysis.builder()
                .location(location)
                .build();
    }

    @Override
    public void saveAnalysis(LocationAnalysis analysis) {
        log.info("Saving analysis for location: {}", analysis.getLocation());

        RiskHotspot hotspot = RiskHotspot.builder()
                .location(analysis.getLocation())
                .country(analysis.getCountry())
                .latitude(analysis.getLatitude())
                .longitude(analysis.getLongitude())
                .riskLevel(analysis.getRiskLevel())
                .riskType(analysis.getRiskType())
                .precipitation(analysis.getTemperature())
                .temperature(analysis.getTemperature())
                .humidity(analysis.getHumidity())
                .windSpeed(analysis.getWindSpeed())
                .riskReason(analysis.getRiskReason())
                .build();

        repository.save(hotspot);
    }
}