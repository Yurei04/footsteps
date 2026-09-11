package com.example.footsteps.controller;

import com.example.footsteps.model.LocationAnalysis;
import com.example.footsteps.model.RiskHotspot;
import com.example.footsteps.service.RiskAnalysisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/risk")
public class RiskAnalysisController {

    private final RiskAnalysisService riskAnalysisService;

    public RiskAnalysisController(RiskAnalysisService riskAnalysisService) {
        this.riskAnalysisService = riskAnalysisService;
    }

    @GetMapping
    public ResponseEntity<List<RiskHotspot>> getAllLatestHotspots() {
        try {
            log.info("Fetching all latest risk hotspots");
            List<RiskHotspot> hotspots = riskAnalysisService.getAllLatestHotspots();
            return ResponseEntity.ok(hotspots);
        } catch (Exception e) {
            log.error("Error fetching hotspots", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<RiskHotspot> getHotspotById(@PathVariable String id) {
        try {
            log.info("Fetching hotspot with id: {}", id);
            return riskAnalysisService.getHotspotById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("Error fetching hotspot", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<LocationAnalysis> analyzeLocation(@RequestBody AnalyzeLocationRequest request) {
        try {
            log.info("Analyzing location: {}", request.getLocation());
            
            if (request.getLocation() == null || request.getLocation().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            LocationAnalysis analysis = riskAnalysisService.analyzeLocation(request.getLocation());
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            log.error("Error analyzing location", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/analyze")
    public ResponseEntity<LocationAnalysis> analyzeLocationAlt(@RequestBody AnalyzeLocationRequest request) {
        try {
            log.info("Analyzing location (alternate route): {}", request.getLocation());
            
            if (request.getLocation() == null || request.getLocation().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            LocationAnalysis analysis = riskAnalysisService.analyzeLocation(request.getLocation());
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            log.error("Error analyzing location", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class AnalyzeLocationRequest {
        private String location;
    }
}