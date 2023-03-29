package config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// configuration file that sets up the WebSocket message broker.
// annotated with @Configuration to mark the class as a source of bean definitions for the application context.
// @EnableWebSocketMessageBroker: This annotation enables the WebSocket message handling, backed by a message broker.
// implements the WebSocketMessageBrokerConfigurer interface to configure WebSocket message handling.
@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    // configureMessageBroker(): This method sets up the message broker registry, defining the prefixes for message destinations.
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // /app: Prefix for application-specific messages.
        registry.setApplicationDestinationPrefixes("/app");
        // /chat and /user: Simple broker destinations for public and private messages, respectively.
        registry.enableSimpleBroker("/chat", "/user");
        // /user: Prefix for user-specific messages, used for private messaging.
        registry.setUserDestinationPrefix("/user");
    }

    // registerStompEndpoints(): This method registers a STOMP endpoint, allowing clients to connect using the WebSocket protocol.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
        // /ws: The endpoint for WebSocket connections.
        // setAllowedOriginPatterns("*"): Allows any origin to connect.
        // withSockJS(): Enables SockJS fallback options in case WebSocket is not available.
    }
}