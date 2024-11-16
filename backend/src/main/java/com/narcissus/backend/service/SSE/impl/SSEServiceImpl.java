package com.narcissus.backend.service.SSE.impl;

import com.narcissus.backend.service.SSE.SSEService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import vn.payos.type.WebhookData;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class SSEServiceImpl implements SSEService {
    private final ConcurrentHashMap<Long, Sinks.Many<WebhookData>> clientSinks = new ConcurrentHashMap<>();

    public Flux<WebhookData> streamEvents(Long id) {
        // Create or retrieve a sink for the given client ID
        Sinks.Many<WebhookData> sink = clientSinks.computeIfAbsent(id, key -> Sinks.many().multicast().onBackpressureBuffer());
        return sink.asFlux()
                .doFinally(signalType -> clientSinks.remove(id)); // Remove sink when the client disconnects
    }

    public void publishEvent(Long id, WebhookData event) {
        Sinks.Many<WebhookData> sink = clientSinks.get(id);
        if (sink != null) {
            sink.tryEmitNext(event); // Emit the event to the specific client's sink
        }
    }
}
