package com.narcissus.backend.controllers.sse;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalTime;


@Controller
@RequestMapping("api/sse")
public class SSEController {
    @GetMapping(value = "/ordersStatus", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamEvents() {
        return Flux.interval(Duration.ofSeconds(1))
                .map(sequence -> "SSE - "+ LocalTime.now().toString());
    }
}
