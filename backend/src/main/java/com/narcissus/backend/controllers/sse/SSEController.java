package com.narcissus.backend.controllers.sse;

import com.narcissus.backend.service.SSE.SSEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import reactor.core.publisher.Flux;
import vn.payos.type.WebhookData;



@Controller
@RequestMapping("api/sse")
public class SSEController {
    private final SSEService sseService;

    @Autowired
    public SSEController(SSEService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(value = "/ordersStatus/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<WebhookData> streamEvents(@PathVariable Long id) {
        return sseService.streamEvents(id);
    }

}
