/* =========================================================
   GA4 gtag IMPLEMENTATION
   Measurement ID: G-JQ2DF8NVXT
   ========================================================= */

/* Safety fallback */
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

/* 🔹 Ensure config fires FIRST */
gtag('js', new Date());
gtag('config', 'G-JQ2DF8NVXT', {
  transport_url: 'https://idlxatxt.euo.stape.net'
});

/* =========================================================
   🔹 OneTrust helper (for GTM use)
   ========================================================= */
function pushOneTrustEvent(activeGroups) {
  window.dataLayer.push({
    event: "OneTrust",
    OnetrustActiveGroups: String(activeGroups || "")
  });
}

/* Optional — fire if consent already known */
pushOneTrustEvent(",C0001,C0002,C0003,C0004,");


/* =========================================================
   1️⃣ Travel Details Submit
   ========================================================= */
function saveTravelDetails() {
  gtag('event', 'travel_details');
}


/* =========================================================
   2️⃣ Select Plan → Add to Cart
   ========================================================= */
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
    }],
    event_callback: function() {
      window.location.href = "cart.html";
    }
  });

}


/* =========================================================
   3️⃣ Load Cart Page
   ========================================================= */
function loadCart() {

  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const planNameEl = document.getElementById("planName");
  const planPriceEl = document.getElementById("planPrice");

  if (planNameEl) planNameEl.innerText = plan.name;
  if (planPriceEl) planPriceEl.innerText = plan.price;
}


/* =========================================================
   4️⃣ Purchase Click
   ========================================================= */
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

  localStorage.clear();
}


/* =========================================================
   5️⃣ Success Page Load (Important for server GTM)
   ========================================================= */
function pushPurchaseSuccessEvent() {

  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const transactionId =
    Date.now() + "_" + Math.floor(Math.random() * 1000000);

  gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency: "INR",
    value: Number(plan.price),
    items: [{
      item_id: String(plan.id),
      item_name: String(plan.name),
      price: Number(plan.price),
      quantity: 1
    }]
  });

  localStorage.clear();
}
