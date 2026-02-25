/* =========================================================
   GA4 + SERVER GTM (STAPE) IMPLEMENTATION
   Measurement ID: G-JQ2DF8NVXT
   ========================================================= */

/* =========================
   SAFETY INIT
========================= */
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

/* =========================
   GA4 INIT + SERVER ROUTING
========================= */
gtag('js', new Date());
gtag('config','G-JQ2DF8NVXT');
/*
gtag('config', 'G-JQ2DF8NVXT',{
   transport_url:'https://idlxatxt.euo.stape.net'
}); */


/* =========================
   ONETRUST HELPER
========================= */
function pushOneTrustEvent(activeGroups) {
  window.dataLayer.push({
    event: "OneTrust",
    OnetrustActiveGroups: String(activeGroups || "")
  });
}

/* Fire if consent already known */
pushOneTrustEvent(",C0001,C0002,C0003,C0004,");


/* =========================
   1️⃣ TRAVEL DETAILS
========================= */
function saveTravelDetails() {
  gtag('event', 'travel_details_sub', {
    send_to: 'G-JQ2DF8NVXT'
  });
}

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("travelForm");
  const destination = document.getElementById("destination");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const travelers = document.getElementById("travelers");

  if (!form) return; // safety check

  // Track field changes (optional)
  if (destination) {
    destination.addEventListener("change", function () {
      gtag('event', 'destination_selected', {
        destination_country: this.value
      });
    });
  }

  if (startDate) {
    startDate.addEventListener("change", function () {
      gtag('event', 'start_date_selected', {
        start_date: this.value
      });
    });
  }

  if (endDate) {
    endDate.addEventListener("change", function () {
      gtag('event', 'end_date_selected', {
        end_date: this.value
      });
    });
  }

  if (travelers) {
    travelers.addEventListener("change", function () {
      gtag('event', 'travelers_selected', {
        number_of_travelers: this.value
      });
    });
  }

  // Track main submit event
  form.addEventListener("submit", function () {

    gtag('event', 'generate_quote', {
      destination_country: destination?.value || '',
      start_date: startDate?.value || '',
      end_date: endDate?.value || '',
      number_of_travelers: travelers?.value || '',
      event_category: 'Travel Insurance',
      event_label: 'View Plans Click'
    });

  });

});
/* =========================
   2️⃣ SELECT PLAN → ADD TO CART
========================= */
function selectPlan(id, name, price) {

  localStorage.setItem("selectedPlan", JSON.stringify({ id, name, price }));

  gtag('event', 'add_to_cart', {
    send_to: 'G-JQ2DF8NVXT',
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


/* =========================
   3️⃣ LOAD CART PAGE
========================= */
function loadCart() {

  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const planNameEl = document.getElementById("planName");
  const planPriceEl = document.getElementById("planPrice");

  if (planNameEl) planNameEl.innerText = plan.name;
  if (planPriceEl) planPriceEl.innerText = plan.price;
}


/* =========================
   4️⃣ PURCHASE CLICK
========================= */
function purchase() {

  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const transactionId =
    Date.now() + "_" + Math.floor(Math.random() * 1000000);

  gtag('event', 'bpurchase', {
    send_to: 'G-JQ2DF8NVXT',
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


/* =========================
   5️⃣ SUCCESS PAGE LOAD
   (Use this on thank you page)
========================= */
function pushPurchaseSuccessEvent() {

  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  if (!plan) return;

  const transactionId =
    Date.now() + "_" + Math.floor(Math.random() * 1000000);

  gtag('event', 'Apurchase', {
    send_to: 'G-JQ2DF8NVXT',
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
