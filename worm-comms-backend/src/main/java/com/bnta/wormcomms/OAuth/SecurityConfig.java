package com.bnta.wormcomms.OAuth;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/user/info", "/api/users/**")
                .hasAuthority("SCOPE_read")
                .requestMatchers(HttpMethod.POST, "/api/foos")
                .hasAuthority("SCOPE_write")
                .anyRequest()
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();
        return http.build();
    }
}
