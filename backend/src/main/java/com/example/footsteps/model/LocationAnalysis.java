package com.example.footsteps.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationAnalysis {
    private String location;
    private String country;
    private Double latitude;
    private Double longitude;
    private String riskLevel;
    private String riskType;
    private String riskReason;
    private Integer precipitationProbability;
    private Double temperature;
    private Double humidity;
    private Double windSpeed;
    private String historicalRisk;
    private List<HistoricalItem> historicalData;
    private String aiActionPlan;
    private String date;
}