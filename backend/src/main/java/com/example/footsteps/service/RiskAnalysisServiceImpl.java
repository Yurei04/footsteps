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

        try {
            // Query Firebase for existing analysis
            Optional<RiskHotspot> hotspotOptional = repository.findByLocation(location);

            if (hotspotOptional.isPresent()) {
                RiskHotspot hotspot = hotspotOptional.get();
                log.info("Found analysis for location '{}': risk level = {}, temp = {}, humidity = {}",
                        location, hotspot.getRiskLevel(), hotspot.getTemperature(), hotspot.getHumidity());

                // Convert RiskHotspot to LocationAnalysis
                LocationAnalysis analysis = convertToLocationAnalysis(hotspot);
                log.info("Successfully converted RiskHotspot to LocationAnalysis for: {}", location);
                return analysis;

            } else {
                log.warn("No analysis found in Firebase for location: '{}'. " +
                         "The n8n workflow may not have processed this location yet.", location);

                // Return partial response with pending message
                return LocationAnalysis.builder()
                        .location(location)
                        .country("")
                        .latitude(0.0)
                        .longitude(0.0)
                        .riskLevel("PENDING")
                        .riskType("Awaiting Analysis")
                        .riskReason("Analysis data not yet available. " +
                                "Please ensure the n8n workflow has been configured to process '" + location + "'. " +
                                "Check back in a moment.")
                        .precipitationProbability(0)  // CHANGE from 0.0 to 0 (int)
                        .temperature(0.0)
                        .humidity(0.0)
                        .windSpeed(0.0)
                        .aiActionPlan("Waiting for data...")
                        .date("")
                        .build();
            }
        } catch (Exception e) {
            log.error("Error analyzing location: {}", location, e);
            throw new RuntimeException("Failed to fetch location analysis for: " + location, e);
        }
    }

    /**
     * Convert RiskHotspot (from Firebase) to LocationAnalysis (API response)
     */
    private LocationAnalysis convertToLocationAnalysis(RiskHotspot hotspot) {
        return LocationAnalysis.builder()
                .location(hotspot.getLocation() != null ? hotspot.getLocation() : "Unknown")
                .country(hotspot.getCountry() != null ? hotspot.getCountry() : "Unknown")
                .latitude(hotspot.getLatitude() != null ? hotspot.getLatitude() : 0.0)
                .longitude(hotspot.getLongitude() != null ? hotspot.getLongitude() : 0.0)
                .riskLevel(hotspot.getRiskLevel() != null ? hotspot.getRiskLevel() : "LOW")
                .riskType(hotspot.getRiskType() != null ? hotspot.getRiskType() : "Normal Weather")
                .riskReason(hotspot.getRiskReason() != null ? hotspot.getRiskReason() : 
                        "Weather conditions are within normal levels.")
                .precipitationProbability((int) (hotspot.getPrecipitation() != null ? hotspot.getPrecipitation() : 0.0))  // CAST to int
                .temperature(hotspot.getTemperature() != null ? hotspot.getTemperature() : 0.0)
                .humidity(hotspot.getHumidity() != null ? hotspot.getHumidity() : 0.0)
                .windSpeed(hotspot.getWindSpeed() != null ? hotspot.getWindSpeed() : 0.0)
                .aiActionPlan(generateActionPlan(hotspot.getRiskLevel()))
                .date(hotspot.getDate() != null ? hotspot.getDate().toString() : "")
                .build();
    }

    /**
     * Generate AI action plan based on risk level
     */
    private String generateActionPlan(String riskLevel) {
        if (riskLevel == null) {
            return "Monitor the situation and stay informed.";
        }

        return switch (riskLevel) {
            case "CRITICAL" -> "🚨 CRITICAL ALERT: Evacuate immediately to a safe location. Contact local emergency services. Follow official evacuation orders. Do not delay.";
            case "HIGH" -> "⚠️ HIGH RISK: Avoid unnecessary outdoor activities. Stay indoors and monitor weather updates. Keep emergency supplies ready. Listen to local authorities.";
            case "MEDIUM" -> "⚡ MODERATE RISK: Exercise caution in outdoor activities. Monitor weather updates regularly. Have emergency plans ready. Stay informed.";
            case "LOW" -> "✅ LOW RISK: Conditions are within normal range. Continue normal activities with general awareness. Stay informed about weather changes.";
            default -> "Monitor the situation and stay informed.";
        };
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
            .precipitation(Double.valueOf(analysis.getPrecipitationProbability()))  // CONVERT to Double
            .temperature(analysis.getTemperature())
            .humidity(analysis.getHumidity())
            .windSpeed(analysis.getWindSpeed())
            .riskReason(analysis.getRiskReason())
            .build();

        repository.save(hotspot);
    }
}