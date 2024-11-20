package com.narcissus.backend.service.SSE;

import reactor.core.publisher.Flux;
import vn.payos.type.WebhookData;

public interface SSEService {
    Flux<WebhookData> streamEvents(Long id);
    void publishEvent(Long id, WebhookData event);
}