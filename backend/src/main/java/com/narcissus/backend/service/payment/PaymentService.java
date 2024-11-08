package com.narcissus.backend.service.payment;

import com.narcissus.backend.models.orders.ConsistOf;

import vn.payos.PayOS;
import vn.payos.type.*;

import java.util.List;

public class PaymentService {
    private final String PAYOSID = "e77b6cdb-4a17-4af9-9900-501cee1f7dc7";
    private final String PAYOSAPI = "e0a0ec2b-2981-44e0-a94d-a7b5edad57eb";
    private final String PAYOSCHECKSUM = "0f81aaf3911f6f3724f7def8d6927422a511fbbe2be15d2fdf1939d11a1c836d";

    PayOS payOS = new PayOS(PAYOSID, PAYOSAPI, PAYOSCHECKSUM);

    public void createPayment (ConsistOf consistOf) {
        List<ItemData> itemData = consistOf.
    }
}
