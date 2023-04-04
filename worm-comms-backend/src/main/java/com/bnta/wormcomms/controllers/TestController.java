package com.bnta.wormcomms.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/test")
    //@SendTo("/topic/test")
    public String handleTestMessage() {
        System.out.println("Authenticated response??");
        return "Hello from backend!";
    }
}