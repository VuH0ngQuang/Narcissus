package com.narcissus.backend.service.SSE.impl;

import com.narcissus.backend.service.SSE.SSEService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import vn.payos.type.WebhookData;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class SSEServiceImpl implements SSEService {
    private final ConcurrentHashMap<Long, Sinks.Many<WebhookData>> clientSinks = new ConcurrentHashMap<>();
    private final Logger logger = LoggerFactory.getLogger(SSEServiceImpl.class);

    @Override
    public Flux<WebhookData> streamEvents(Long id) {
//        logger.info("Client connected: {}", id);
        Sinks.Many<WebhookData> sink = clientSinks.computeIfAbsent(id, key -> Sinks.many().multicast().onBackpressureBuffer());
        return sink.asFlux()
                .doFinally(signalType -> {
//                    logger.info("Client disconnected: {}", id);
                    clientSinks.remove(id);
                });
    }

    @Override
    public void publishEvent(Long id, WebhookData event) {
        Sinks.Many<WebhookData> sink = clientSinks.get(id);
        if (sink != null) {
//            logger.info("Publishing event to client {}: {}", id, event);
            sink.tryEmitNext(event);
        } else {
//            logger.warn("No sink found for client {}", id);
        }
    }
}