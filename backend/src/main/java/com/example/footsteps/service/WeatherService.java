package com.example.footsteps.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class WeatherService {

    private final RestClient restClient;

    public WeatherService() {
        this.restClient = RestClient.create();
    }

    public String getWeather() {

        String url = "https://api.open-meteo.com/v1/forecast"
                + "?latitude=16.4023"
                + "&longitude=120.5960"
                + "&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m";

        return restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
    }
}