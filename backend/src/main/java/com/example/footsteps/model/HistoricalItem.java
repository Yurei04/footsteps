package com.example.footsteps.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoricalItem {
    private String date;
    private Double rainfall;
    private Double temperature;
    private Double maxTemperature;
    private Double windSpeed;
}