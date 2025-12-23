function pushEvent(eventName, data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...data
    });
}

// Navigation clicks
function navClick(label) {
    pushEvent("navigation_click", {
        link_name: label
    });
}

// Add policy
function addToCart() {
    pushEvent("add_to_cart", {
        product: "travel_insurance",
        price: 2999,
        currency: "INR"
    });
}

// Travel form submit
function travelSubmit() {
    pushEvent("travel_form_submit", {
        step: "travel_info"
    });
}

// Payment submit
function paymentSubmit() {
    pushEvent("payment_submit", {
        step: "billing"
    });
}
