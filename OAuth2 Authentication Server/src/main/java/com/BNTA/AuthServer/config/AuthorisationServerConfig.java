package com.BNTA.AuthServer.config;

import com.BNTA.AuthServer.config.Keys.JwksKeys;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;


import java.time.Duration;
import java.util.List;
import java.util.UUID;

// the localhost:8081/oauth2/authorize to authorize and get a code
// http://localhost:8081/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://192.169.0.61:5173/authorized&code_challenge=QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&code_challenge_method=S256
// use this one to send the code to /oauth2/token to get a token
// http://localhost:8081/oauth2/token?client_id=client&redirect_uri=http://192.168.0.61:5173/authorized&grant_type=authorization_code&code=MJ5WmUiOAnVFHi9BS6PS5dqHvO56fHkQVqR8gUg-yOmpgohvsFmH4xU6lFcwwDN0nkAcYdldOROnhAhf0cDROu-PgSup94fx28geM4p08TSEZ_c9c9vkL_yy34WBfnyY&code_verifier=qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI


@Configuration
public class AuthorisationServerConfig {

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain securityASFilterChain(HttpSecurity http) throws Exception{
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
                .oidc(Customizer.withDefaults());

        http.cors(c -> {
            CorsConfigurationSource source = s -> {
                CorsConfiguration cc = new CorsConfiguration();
                cc.setAllowCredentials(true);
                //the front end
                cc.setAllowedOrigins(List.of("http://localhost:8080","http://192.168.0.61:5173"));
                cc.setAllowedHeaders(List.of("*"));
                cc.setAllowedMethods(List.of("*"));
                return cc;
            };
            c.configurationSource(source);
        });

        return http.formLogin().and().build();
    }

    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        //for the clients - UUID is "cheat" work around - this is internal id in this server
        var rc = RegisteredClient.withId(UUID.randomUUID().toString())
                //this is an external id
                //these are the app's details i.e. wormcomm's backend
                .clientId("client")
                .clientSecret("secret")
                //secret is meant to be secret (not as plain text like here
                .scope(OidcScopes.OPENID)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                //need to add authorized as a path in the backend
                .redirectUri("http://192.168.0.61:5173/authorized")
                //access token lifespan
                .tokenSettings(TokenSettings.builder()
                        .accessTokenTimeToLive((Duration.ofHours(1)))
                        .refreshTokenTimeToLive(Duration.ofHours(1))
                        .build())
                .clientSettings(ClientSettings.builder()
                        .requireAuthorizationConsent(true)
                        .build())
                .build();

        return new InMemoryRegisteredClientRepository(rc);
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings(){
        //something about the endpoints? shouldn't need to set them here
        return AuthorizationServerSettings.builder()
                //issuer is itself silly
                .issuer("http://localhost:8081")
                .build();
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        RSAKey rsaKey = JwksKeys.generateRSAKey();
        JWKSet set = new JWKSet(rsaKey);
        return (j, sc) -> j.select(set);
    }

}
