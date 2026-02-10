/* =========================================================
   script.js (GA4 gtag ONLY)
   Measurement ID: G-JQ2DF8NVXT
   ========================================================= */

/* Safety fallback */
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

/* ✅ OneTrust event helper (push via dataLayer) */
function pushOneTrustEvent(activeGroups) {
  window.dataLayer.push({
    event: "OneTrust",
    OnetrustActiveGroups: String(activeGroups || "")
    // DO NOT set gtm.uniqueEventId manually — GTM will generate it
  });
}

/* OPTIONAL: If you want to fire it immediately on page load */
pushOneTrustEvent(",C0001,C0002,C0003,C0004,");

/* 1️⃣ Travel details submit */
function saveTravelDetails() {
  gtag('event', 'travel_details_submitted');

  // OPTIONAL: fire OneTrust event at this moment too (if desired)
  // pushOneTrustEvent(",C0001,C0002,C0003,C0004,");
}

/* 2️⃣ Select plan → add_to_cart */
function selectPlan(id, name, price) {
  localStorage.setItem("selectedPlan", JSON.stringify({ id, name, price }));

  gtag('event', 'add_to_cart', {
    currency: 'INR',
    value: Number(price),
    items: [{
      item_id: String(id),
      item_name: String(name),
      price: Number(price),
      quantity: 1
    }]
  });

  // OPTIONAL: fire OneTrust event when cart action happens
  // pushOneTrustEvent(",C0001,C0002,C0003,C0004,");

  // Allow GA4 request to fire before redirect
  setTimeout(() => {
    window.location.href = "cart.html";
  }, 200);
}

/* 3️⃣ Load cart page */
function loadCart() {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const planNameEl = document.getElementById("planName");
  const planPriceEl = document.getElementById("planPrice");

  if (planNameEl) planNameEl.innerText = plan.name;
  if (planPriceEl) planPriceEl.innerText = plan.price;
}

/* 4️⃣ Purchase */
function purchase() {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const transactionId =
    Date.now() + "_" + Math.floor(Math.random() * 1000000);

  gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency: 'INR',
    value: Number(plan.price),
    items: [{
      item_id: String(plan.id),
      item_name: String(plan.name),
      price: Number(plan.price),
      quantity: 1
    }]
  });

  // OPTIONAL: fire OneTrust event on purchase too
  // pushOneTrustEvent(",C0001,C0002,C0003,C0004,");

  localStorage.clear();
}
