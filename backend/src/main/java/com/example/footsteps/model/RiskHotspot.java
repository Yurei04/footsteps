package com.example.footsteps.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RiskHotspot {
    private String id;
    private String location;
    private String country;
    private Double latitude;
    private Double longitude;
    private String riskLevel;
    private String riskType;
    private Double precipitation;
    private Double temperature;
    private Double humidity;
    private Double windSpeed;
    private Integer weatherCode;
    private String riskReason;
    private LocalDateTime date;
    private LocalDateTime analyzedAt;
}