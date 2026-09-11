package com.example.footsteps.repository;

import com.example.footsteps.model.RiskHotspot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Slf4j
@Repository
public class FirebaseRiskAnalysisRepository implements RiskAnalysisRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "riskAnalysis";

    public FirebaseRiskAnalysisRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public List<RiskHotspot> findAllLatestByLocation() {
        try {
            QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME).get().get();

            Map<String, RiskHotspot> latestByLocation = new HashMap<>();

            snapshot.getDocuments().forEach(doc -> {
                Map<String, Object> data = doc.getData();
                String location = String.valueOf(data.getOrDefault("location", "Unknown"));

                RiskHotspot current = mapToHotspot(doc.getId(), data);

                if (!latestByLocation.containsKey(location)) {
                    latestByLocation.put(location, current);
                } else {
                    RiskHotspot existing = latestByLocation.get(location);

                    if (isNewer(current, existing)) {
                        latestByLocation.put(location, current);
                    }
                }
            });

            return new ArrayList<>(latestByLocation.values());

        } catch (InterruptedException | ExecutionException e) {
            log.error("Error fetching risk analysis data", e);
            Thread.currentThread().interrupt();
            return Collections.emptyList();
        }
    }

    @Override
    public Optional<RiskHotspot> findById(String id) {
        try {
            var doc = firestore.collection(COLLECTION_NAME).document(id).get().get();

            if (doc.exists()) {
                return Optional.of(mapToHotspot(doc.getId(), doc.getData()));
            }

            return Optional.empty();

        } catch (InterruptedException | ExecutionException e) {
            log.error("Error fetching risk analysis by id", e);
            Thread.currentThread().interrupt();
            return Optional.empty();
        }
    }

    @Override
    public Optional<RiskHotspot> findByLocation(String location) {
        try {
            QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME)
                    .whereEqualTo("location", location)
                    .orderBy("analyzed_at", com.google.cloud.firestore.Query.Direction.DESCENDING)
                    .limit(1)
                    .get()
                    .get();

            if (!snapshot.isEmpty()) {
                var doc = snapshot.getDocuments().get(0);
                log.info("Found hotspot for location: {} with doc id: {}", location, doc.getId());
                return Optional.of(mapToHotspot(doc.getId(), doc.getData()));
            }

            log.warn("No hotspot found for location: {}", location);
            return Optional.empty();

        } catch (InterruptedException | ExecutionException e) {
            log.error("Error fetching risk analysis by location: {}", location, e);
            Thread.currentThread().interrupt();
            return Optional.empty();
        }
    }

    @Override
    public List<RiskHotspot> findAll() {
        try {
            QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME).get().get();

            List<RiskHotspot> hotspots = new ArrayList<>();
            snapshot.getDocuments().forEach(doc -> {
                hotspots.add(mapToHotspot(doc.getId(), doc.getData()));
            });

            return hotspots;

        } catch (InterruptedException | ExecutionException e) {
            log.error("Error fetching all risk analysis data", e);
            Thread.currentThread().interrupt();
            return Collections.emptyList();
        }
    }

    @Override
    public void save(RiskHotspot hotspot) {
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("location", hotspot.getLocation());
            data.put("country", hotspot.getCountry());
            data.put("latitude", hotspot.getLatitude());
            data.put("longitude", hotspot.getLongitude());
            data.put("risk_level", hotspot.getRiskLevel());
            data.put("risk_type", hotspot.getRiskType());
            data.put("precipitation", hotspot.getPrecipitation());
            data.put("temperature", hotspot.getTemperature());
            data.put("humidity", hotspot.getHumidity());
            data.put("wind_speed", hotspot.getWindSpeed());
            data.put("weather_code", hotspot.getWeatherCode());
            data.put("risk_reason", hotspot.getRiskReason());
            data.put("date", hotspot.getDate());
            data.put("analyzed_at", hotspot.getAnalyzedAt());

            if (hotspot.getId() != null) {
                firestore.collection(COLLECTION_NAME).document(hotspot.getId()).set(data).get();
            } else {
                firestore.collection(COLLECTION_NAME).add(data).get();
            }

            log.info("Risk hotspot saved successfully");

        } catch (InterruptedException | ExecutionException e) {
            log.error("Error saving risk analysis", e);
            Thread.currentThread().interrupt();
        }
    }

    @Override
    public void delete(String id) {
        try {
            firestore.collection(COLLECTION_NAME).document(id).delete().get();
            log.info("Risk hotspot deleted successfully");

        } catch (InterruptedException | ExecutionException e) {
            log.error("Error deleting risk analysis", e);
            Thread.currentThread().interrupt();
        }
    }

    private RiskHotspot mapToHotspot(String id, Map<String, Object> data) {
        return RiskHotspot.builder()
                .id(id)
                .location(String.valueOf(data.getOrDefault("location", "Unknown")))
                .country(String.valueOf(data.getOrDefault("country", "Unknown")))
                .latitude(getDoubleValue(data, "latitude"))
                .longitude(getDoubleValue(data, "longitude"))
                .riskLevel(String.valueOf(data.getOrDefault("risk_level", "LOW")))
                .riskType(String.valueOf(data.getOrDefault("risk_type", "Normal Weather")))
                .precipitation(getDoubleValue(data, "precipitation"))
                .temperature(getDoubleValue(data, "temperature"))
                .humidity(getDoubleValue(data, "humidity"))
                .windSpeed(getDoubleValue(data, "wind_speed"))
                .weatherCode(getIntegerValue(data, "weather_code"))
                .riskReason(String.valueOf(data.getOrDefault("risk_reason", "Weather conditions are currently within normal levels.")))
                .date(getLocalDateTime(data, "date"))
                .analyzedAt(getLocalDateTime(data, "analyzed_at"))
                .build();
    }

    private Double getDoubleValue(Map<String, Object> data, String key) {
        Object value = data.get(key);
        if (value == null) return 0.0;
        if (value instanceof Number) return ((Number) value).doubleValue();
        return 0.0;
    }

    private Integer getIntegerValue(Map<String, Object> data, String key) {
        Object value = data.get(key);
        if (value == null) return null;
        if (value instanceof Number) return ((Number) value).intValue();
        return null;
    }

    private LocalDateTime getLocalDateTime(Map<String, Object> data, String key) {
        Object value = data.get(key);
        if (value == null) return null;
        
        try {
            if (value instanceof String) {
                return LocalDateTime.parse((String) value, DateTimeFormatter.ISO_DATE_TIME);
            } else if (value instanceof com.google.cloud.Timestamp) {
                return ((com.google.cloud.Timestamp) value).toDate().toInstant()
                        .atZone(java.time.ZoneId.systemDefault()).toLocalDateTime();
            }
        } catch (Exception e) {
            log.warn("Error parsing date for key: {}", key, e);
        }
        
        return null;
    }

    private boolean isNewer(RiskHotspot current, RiskHotspot existing) {
        LocalDateTime currentDate = current.getAnalyzedAt() != null ? 
                current.getAnalyzedAt() : current.getDate();
        LocalDateTime existingDate = existing.getAnalyzedAt() != null ? 
                existing.getAnalyzedAt() : existing.getDate();

        if (currentDate == null && existingDate == null) return false;
        if (currentDate == null) return false;
        if (existingDate == null) return true;

        return currentDate.isAfter(existingDate);
    }
}