package com.BNTA.AuthServer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.formLogin()
                .and()
                .authorizeHttpRequests()
                .anyRequest().authenticated()
                .and().build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        //get the users from a database??
        var user1 = User.withUsername("bill").password("12345").authorities("read").build();

        //saving the users to a user data service
        var uds =  new InMemoryUserDetailsManager();
        uds.createUser(user1);
        return uds;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        //this is a sensible password encoder to use
        //return new BCryptPasswordEncoder();

        //this is not sensible, but will do for the time being
        return NoOpPasswordEncoder.getInstance();
    }
}
