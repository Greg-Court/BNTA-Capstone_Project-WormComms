package com.bnta.wormcomms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {
    //put this somewhere in the application properties
    private final String keyUri = "http://localhost:8081/oauth2/jwks";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(c -> {
            CorsConfigurationSource source = s -> {
                CorsConfiguration cc = new CorsConfiguration();
                cc.setAllowCredentials(true);
                cc.setAllowedOrigins(List.of("http://localhost:8080","http://192.168.0.61:5173"));
                cc.setAllowedHeaders(List.of("*"));
                cc.setAllowedMethods(List.of("*"));
                return cc;
            };
            c.configurationSource(source);
        });

        return http.oauth2ResourceServer(
                j-> j.jwt().jwkSetUri(keyUri)
        ).authorizeHttpRequests()
                .anyRequest().authenticated()
                 .and().build();

    }
}
