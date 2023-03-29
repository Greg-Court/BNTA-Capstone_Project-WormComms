package com.bnta.wormcomms.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TestController {

    @MessageMapping("/test")
    @SendTo("/topic/test")
    public String handleTestMessage(String message) {
        System.out.println("Received test message from frontend: " + message);
        return "Hello from backend!";
    }
}