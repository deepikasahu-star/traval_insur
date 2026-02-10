/* =========================================================
   script.js (COMPLETE)
   - Keeps your existing Web GTM dataLayer.push() events
   - Adds direct sending of the SAME events to Server-side GTM
   - Server endpoint: https://idlxatxt.euo.stape.net
   ========================================================= */

/* 1) Ensure dataLayer exists (required for Web GTM) */
window.dataLayer = window.dataLayer || [];

/* 2) NEW: Send events to Server-side GTM (Stape) */
function sendToServerGTM(eventName, eventData = {}) {
  // Your server-side GTM endpoint (Stape). We send to /event for clarity.
  const url = "https://idlxatxt.euo.stape.net/event";

  // Build a simple JSON payload that server GTM can receive
  const payload = {
    event: eventName,
    ...eventData,
    timestamp: Date.now()
  };

  const body = JSON.stringify(payload);

  // Best for redirects/navigation (still sends even when page unloads)
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(url, blob);
    return;
  }

  // Fallback if sendBeacon isn't available
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => {});
}

/* 3) Submit travel details (no extra fields captured as requested) */
function saveTravelDetails() {
  // Web GTM event
  dataLayer.push({ event: "travel_details_submitted" });

  // Server GTM event
  sendToServerGTM("travel_details_submitted");
}

/* 4) Select a plan -> add_to_cart + redirect to cart.html */
function selectPlan(id, name, price) {
  // Save chosen plan for cart page
  localStorage.setItem("selectedPlan", JSON.stringify({ id, name, price }));

  // Build the event payload once (reuse for both Web + Server)
  const dlEvent = {
    event: "add_to_cart",
    ecommerce: {
      items: [
        {
          item_id: String(id),
          item_name: String(name),
          price: Number(price),
          quantity: 1
        }
      ]
    }
  };

  // Web GTM event
  dataLayer.push(dlEvent);

  // Server GTM event (send only what you need; here ecommerce)
  sendToServerGTM("add_to_cart", { ecommerce: dlEvent.ecommerce });

  // Delay redirect slightly so beacon/fetch can complete
  setTimeout(() => {
    window.location.href = "cart.html";
  }, 150);
}

/* 5) Load cart (reads localStorage and renders on cart.html) */
function loadCart() {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const planNameEl = document.getElementById("planName");
  const planPriceEl = document.getElementById("planPrice");

  if (planNameEl) planNameEl.innerText = plan.name;
  if (planPriceEl) planPriceEl.innerText = plan.price;
}

/* 6) Purchase -> sends Web + Server event, then clears storage */
function purchase() {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const transactionId =
    Date.now() + "_" + Math.floor(Math.random() * 1000000);

  const dlEvent = {
    event: "purchase", // GA4 recommended lowercase
    transaction_id: transactionId,
    ecommerce: {
      value: Number(plan.price),
      currency: "INR",
      items: [
        {
          item_id: String(plan.id),
          item_name: String(plan.name),
          price: Number(plan.price),
          quantity: 1
        }
      ]
    }
  };

  // Web GTM event
  dataLayer.push(dlEvent);

  // Server GTM event
  sendToServerGTM("purchase", {
    transaction_id: transactionId,
    ecommerce: dlEvent.ecommerce
  });

  // Clear cart
  localStorage.clear();
}
