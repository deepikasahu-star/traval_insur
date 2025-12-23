window.dataLayer = window.dataLayer || [];

function saveTravelDetails() {
    dataLayer.push({ event: "travel_details_submitted" });
}

function selectPlan(id, name, price) {
    localStorage.setItem("selectedPlan", JSON.stringify({ id, name, price }));

    dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
            items: [{
                item_id: id,
                item_name: name,
                price: price
            }]
        }
    });

    window.location.href = "cart.html";
}

function loadCart() {
    let plan = JSON.parse(localStorage.getItem("selectedPlan"));
    if (!plan) return;

    document.getElementById("planName").innerText = plan.name;
    document.getElementById("planPrice").innerText = plan.price;
}

function purchase() {
    let plan = JSON.parse(localStorage.getItem("selectedPlan"));

    dataLayer.push({
        event: "purchase",
        ecommerce: {
            value: plan.price,
            currency: "INR",
            items: [plan]
        }
    });

    localStorage.clear();
}
