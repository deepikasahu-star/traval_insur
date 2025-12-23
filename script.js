function pushEvent(eventName, data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...data
    });
}

// Travel page submit
function travelSubmit() {
    pushEvent("travel_form_submit", {
        page: "travel_info",
        product: "travel_insurance"
    });
}

// Billing page submit
function paymentSubmit() {
    pushEvent("payment_submit", {
        page: "billing",
        payment_method: "credit_card"
    });
}
