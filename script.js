
// Replace G-WKDY9VLFPM with your real GA4 Measurement ID
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

// GA4 config is loaded in each HTML page head using G-WKDY9VLFPM

const plans = [
  { name: 'Atlas International', price: 26.08, medical: '$100,000', evacuation: '$1,000,000' },
  { name: 'Atlas MultiTrip', price: 193.00, medical: '$1,000,000', evacuation: '$1,000,000' },
  { name: 'Safe Travels USA', price: 48.25, medical: '$50,000', evacuation: '$500,000' },
  { name: 'Patriot America Plus', price: 72.40, medical: '$250,000', evacuation: '$1,000,000' },
  { name: 'Travel Medical Basic', price: 19.99, medical: '$25,000', evacuation: '$250,000' },
  { name: 'Travel Medical Choice', price: 34.90, medical: '$100,000', evacuation: '$500,000' },
  { name: 'GlobeHopper Senior', price: 112.50, medical: '$500,000', evacuation: '$1,000,000' },
  { name: 'World Explorer Elite', price: 214.00, medical: '$2,000,000', evacuation: '$2,000,000' },
  { name: 'Student Secure Smart', price: 41.75, medical: '$200,000', evacuation: '$300,000' },
  { name: 'Student Secure Budget', price: 27.60, medical: '$100,000', evacuation: '$250,000' },
  { name: 'Adventure Travel Protect', price: 156.45, medical: '$750,000', evacuation: '$1,500,000' },
  { name: 'Nomad Explorer', price: 88.10, medical: '$300,000', evacuation: '$750,000' },
  { name: 'Cruise Trip Saver', price: 59.90, medical: '$150,000', evacuation: '$500,000' },
  { name: 'Business Travel Shield', price: 97.55, medical: '$400,000', evacuation: '$1,000,000' },
  { name: 'Global Care Premium', price: 138.80, medical: '$1,500,000', evacuation: '$2,000,000' },
  { name: 'Family Vacation Plus', price: 124.35, medical: '$600,000', evacuation: '$1,200,000' },
  { name: 'Europe Trip Secure', price: 69.25, medical: '$200,000', evacuation: '$750,000' },
  { name: 'Asia Budget Traveler', price: 18.40, medical: '$50,000', evacuation: '$100,000' },
  { name: 'Backpacker Flex', price: 44.80, medical: '$120,000', evacuation: '$300,000' },
  { name: 'Premium International Gold', price: 265.99, medical: '$3,000,000', evacuation: '$3,000,000' }
];

function money(value) {
  return '$' + Number(value).toFixed(2);
}

function trackEvent(eventName, params = {}) {
  gtag('event', eventName, {
    page_path: window.location.pathname,
    event_time: new Date().toISOString(),
    ...params
  });
}

function saveQuoteAndGo() {
  const quote = {
    destination: document.getElementById('destination')?.value || 'India',
    departDate: document.getElementById('departDate')?.value || '',
    returnDate: document.getElementById('returnDate')?.value || '',
    travelers: document.getElementById('travelers')?.value || '1',
    age: document.getElementById('age')?.value || '30',
    tripCost: document.getElementById('tripCost')?.value || '$200'
  };

  localStorage.setItem('quoteData', JSON.stringify(quote));
  gtag('event', 'quote_submit', {
    destination: quote.destination,
    departure_date: quote.departDate,
    return_date: quote.returnDate,
    travelers: Number(quote.travelers),
    traveler_age: Number(quote.age),
    trip_cost: quote.tripCost,
    currency: 'USD'
  });

  window.location.href = 'results.html';
}

function selectPlan(index) {
  const plan = plans[index];
  localStorage.setItem('selectedPlan', JSON.stringify(plan));

  gtag('event', 'select_plan', {
    plan_name: plan.name,
    provider_name: 'WorldTrips',
    plan_price: plan.price,
    medical_limit: plan.medical,
    evacuation_limit: plan.evacuation,
    currency: 'USD'
  });

  gtag('event', 'plan-action__select', {
    plan_name: plan.name,
    provider_name: 'WorldTrips',
    plan_price: plan.price,
    currency: 'USD'
  });

  window.location.href = 'buy.html';
}

function addCompare(index, btn) {
  let selected = JSON.parse(localStorage.getItem('comparePlans') || '[]');
  if (!selected.includes(index)) selected.push(index);
  if (selected.length > 2) selected = selected.slice(selected.length - 2);
  localStorage.setItem('comparePlans', JSON.stringify(selected));

  btn.textContent = '✓ COMPARE';
  btn.style.background = '#075bd8';
  btn.style.color = 'white';

  gtag('event', 'compare_plan', {
    plan_name: plans[index].name,
    plan_price: plans[index].price
  });
}

function clearCompare() {
  localStorage.removeItem('comparePlans');
  document.querySelectorAll('.compare-btn').forEach(btn => {
    btn.textContent = 'COMPARE';
    btn.style.background = 'white';
    btn.style.color = '#075bd8';
  });

  trackEvent('compare_clear_click');
}

function goCompare() {
  let selected = JSON.parse(localStorage.getItem('comparePlans') || '[]');

  if (selected.length < 2) selected = [0, 1];
  selected = selected.slice(0, 2);
  localStorage.setItem('comparePlans', JSON.stringify(selected));

  const selectedPlanDetails = selected.map(index => ({
    plan_name: plans[index].name,
    plan_price: plans[index].price,
    medical_limit: plans[index].medical,
    evacuation_limit: plans[index].evacuation
  }));

  const selectedPlanCodes = selected.map(index => {
    if (plans[index].name === 'Atlas International') return 'MNUAI';
    if (plans[index].name === 'Atlas MultiTrip') return 'MNUAP';
    return plans[index].name.replace(/\s+/g, '_').toUpperCase();
  });

  gtag('event', 'plan_action_compare_footer', {
    hierarchical_layer_1: 'Compare 2 Plans Compare Footer',
    hierarchical_layer_2: 'Plans to Compare: ' + selectedPlanCodes.join(','),
    compared_plans_count: selected.length,
    compared_plan_names: selected.map(index => plans[index].name).join(', '),
    compared_plan_prices: selected.map(index => plans[index].price).join(', '),
    compared_plans: JSON.stringify(selectedPlanDetails)
  });

  window.location.href = 'compare.html';
}

function renderResultsPage() {
  const list = document.getElementById('planList');
  if (!list) return;

  list.innerHTML = plans.map((p, i) => `
    <div class="plan-card">
      <div>
        <div style="font-size:13px;color:#777;font-weight:800">INTERNATIONAL MEDICAL</div>
        <div class="plan-title">🌐 WorldTrips &nbsp; ${p.name}</div>
        <div class="features">
          <div>MEDICAL LIMITS <b>${p.medical}</b></div>
          <div>TRIP CANCELLATION <b style="color:#d00">X Not included</b></div>
          <div>TRAVEL DELAY <b>$200</b></div>
          <div>BAGGAGE DELAY <b style="color:#d00">X Not included</b></div>
          <div>LOOKBACK PERIOD <b>2 Years</b></div>
          <div>EVACUATION <b>${p.evacuation}</b></div>
          <div>TRIP INTERRUPTION <b>See details</b></div>
          <div>BAGGAGE LOSS <b>$1,000</b></div>
          <div>ACCIDENTAL DEATH <b>See details</b></div>
          <div>PRE-EX WAIVER <b style="color:#d00">X Not included</b></div>
        </div>
      </div>
      <div>
        <div class="price">${money(p.price)} <small>TOTAL</small></div>
        <button class="green-btn" style="width:100%" onclick="selectPlan(${i})">SELECT</button>
        <div class="actions">
          <button class="outline-btn compare-btn" onclick="addCompare(${i}, this)">COMPARE</button>
          <button class="outline-btn">DETAILS⌃</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderComparePage() {
  const box = document.getElementById('compareBox');
  if (!box) return;

  let selected = JSON.parse(localStorage.getItem('comparePlans') || '[0,1]');
  selected = selected.slice(0, 2);
  const p1 = plans[selected[0]] || plans[0];
  const p2 = plans[selected[1]] || plans[1];

  box.innerHTML = `
    <div class="compare-plans">
      <div class="compare-col">
        <h2>${p1.name}</h2>
        <div class="price">${money(p1.price)} <small>TOTAL</small></div>
        <button class="green-btn" onclick="selectPlan(${plans.indexOf(p1)})">SELECT</button>
      </div>
      <div class="compare-col">
        <h2>${p2.name}</h2>
        <div class="price">${money(p2.price)} <small>TOTAL</small></div>
        <button class="green-btn" onclick="selectPlan(${plans.indexOf(p2)})">SELECT</button>
      </div>
    </div>
    <table>
      <tr><th>Rating</th><td>WorldTrips</td><td>WorldTrips</td></tr>
      <tr><th>Medical Limits</th><td>${p1.medical}</td><td>${p2.medical}</td></tr>
      <tr><th>Emergency Evacuation</th><td>${p1.evacuation}</td><td>${p2.evacuation}</td></tr>
      <tr><th>Trip Cancellation</th><td>Not Included</td><td>Not Included</td></tr>
      <tr><th>Travel Delay</th><td>$200</td><td>$200</td></tr>
      <tr><th>Baggage Loss</th><td>$1,000</td><td>$1,000</td></tr>
    </table>
  `;
}

function renderBuyPage() {
  const plan = JSON.parse(localStorage.getItem('selectedPlan') || JSON.stringify(plans[0]));
  const cartPlan = document.getElementById('cartPlan');
  if (!cartPlan) return;

  cartPlan.textContent = plan.name;
  document.getElementById('cartPrice').textContent = money(plan.price);
  document.getElementById('cartTotal').textContent = money(plan.price);
}

function buyNow() {
  const first = document.getElementById('firstName').value.trim();
  const last = document.getElementById('lastName').value.trim();

  if (!first || !last) {

    gtag('event', 'buy-page_error', {
      error_type: 'validation_error',
      error_field: 'traveler_name',
      error_message: 'First Name or Last Name missing'
    });

    alert('Please fill First Name and Last Name.');
    return;
  }

  const plan = JSON.parse(localStorage.getItem('selectedPlan') || JSON.stringify(plans[0]));

  const transactionId = 'IMT-' + Date.now();
  localStorage.setItem('transactionId', transactionId);

  gtag('event', 'add_traveler_details', {
    traveler_count: 1,
    citizenship: 'United States'
  });

  gtag('event', 'buy-page_completed-section', {
    completed_section: 'traveler_details'
  });

  gtag('event', 'payment_info_entered', {
    payment_type: 'credit_card'
  });

  gtag('event', 'buy-page_options-selected', {
    selected_option: 'credit_card',
    option_category: 'payment_method'
  });

  gtag('event', 'buy_button_click', {
    plan_name: plan.name,
    provider_name: 'WorldTrips',
    value: plan.price,
    currency: 'USD'
  });

  // GTM Purchase Trigger Event
  window.dataLayer.push({
    event: 'purchase_complete',
    transaction_id: transactionId,
    value: plan.price,
    currency: 'USD',
    plan_name: plan.name,
    provider_name: 'WorldTrips',
    customer_name: first + ' ' + last
  });

  window.location.href = 'confirmation.html';
}

function searchSite() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const result = document.getElementById('searchResults');
  if (!q) {
    result.innerHTML = '';
    return;
  }

  gtag('event', 'search', {
    search_term: q
  });

  gtag('event', 'view_search_results', {
    search_term: q,
    results_count: matchedPlans.length
  });

  const matchedPlans = plans.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.medical.toLowerCase().includes(q) ||
    p.evacuation.toLowerCase().includes(q)
  );

  result.innerHTML = matchedPlans.map(p => `
    <div class="form-panel" style="margin-bottom:12px">
      <h3>${p.name}</h3>
      <p>Medical: ${p.medical} | Price: ${money(p.price)}</p>
    </div>
  `).join('') || '<p>No results found.</p>';
}



function pushOneTrustEvent(activeGroups) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "OneTrust",
    OnetrustActiveGroups: String(activeGroups || "")
  });
}

function fireOneTrustGroupsUpdated() {
  pushOneTrustEvent(",C0001,C0002,C0003,C0004,");
}

function getQuoteData() {
  return JSON.parse(localStorage.getItem('quoteData') || JSON.stringify({
    destination: 'India',
    departDate: '2026-05-15',
    returnDate: '2026-05-30',
    travelers: '1',
    age: '30',
    tripCost: '$200'
  }));
}

function getSelectedPlan() {
  return JSON.parse(localStorage.getItem('selectedPlan') || JSON.stringify(plans[0]));
}

function firePageOpenEvent() {
  const page = document.body.getAttribute('data-page');
  const quote = getQuoteData();
  const plan = getSelectedPlan();

  if (page === 'home') {
    gtag('event', 'home_page_view', {
      page_name: 'home'
    });
  }

  if (page === 'quote') {
    gtag('event', 'quote_start', {
      destination: quote.destination,
      travelers: Number(quote.travelers),
      traveler_age: Number(quote.age)
    });
  }

  if (page === 'results') {
    gtag('event', 'view_results', {
      destination: quote.destination,
      departure_date: quote.departDate,
      return_date: quote.returnDate,
      travelers: Number(quote.travelers),
      traveler_age: Number(quote.age),
      trip_cost: quote.tripCost,
      plans_count: plans.length,
      sort_type: 'Most Popular',
      currency: 'USD'
    });
  }

  if (page === 'compare') {
    const selected = JSON.parse(localStorage.getItem('comparePlans') || '[0,1]');
    const plan1 = plans[selected[0]] || plans[0];
    const plan2 = plans[selected[1]] || plans[1];

    gtag('event', 'view_compare_page', {
      compared_plans: selected.length,
      plan_1: plan1.name,
      plan_2: plan2.name,
      plan_1_price: plan1.price,
      plan_2_price: plan2.price,
      currency: 'USD'
    });
  }

  if (page === 'buy') {
    gtag('event', 'begin_checkout', {
      plan_name: plan.name,
      provider_name: 'WorldTrips',
      value: plan.price,
      currency: 'USD'
    });
  }

  if (page === 'confirmation') {
    gtag('event', 'purchase_complete', {
      transaction_id: localStorage.getItem('transactionId') || 'IMT-' + Date.now(),
      plan_name: plan.name,
      provider_name: 'WorldTrips',
      value: plan.price,
      currency: 'USD'
    });
  }
}



function setupQuoteFormActionEvents() {
  const page = document.body.getAttribute('data-page');
  if (page !== 'quote') return;

  let formStarted = false;

  function fireFormStartOnce(fieldName) {
    if (formStarted) return;
    formStarted = true;

    gtag('event', 'form_start', {
      form_name: 'quote_form',
      first_interacted_field: fieldName
    });
  }

  function fireOnChangeOrBlur(element, fieldName, callback) {
    if (!element) return;

    element.addEventListener('change', function() {
      fireFormStartOnce(fieldName);
      callback(this);
    });

    element.addEventListener('blur', function() {
      if (this.value) {
        fireFormStartOnce(fieldName);
        callback(this);
      }
    });
  }

  fireOnChangeOrBlur(document.getElementById('destination'), 'destination', function(el) {
    gtag('event', 'destination', {
      destination_name: el.value,
      destination_region: 'Asia'
    });

    gtag('event', 'destination_country_updated', {
      destination_country: el.value
    });
  });

  fireOnChangeOrBlur(document.getElementById('state'), 'citizenship_residence', function(el) {
    gtag('event', 'citizenship_residence', {
      citizenship: 'United States',
      residence_country: 'United States',
      residence_state: el.value
    });

    gtag('event', 'residence_state_updated', {
      residence_state: el.value,
      residence_country: 'United States'
    });
  });

  fireOnChangeOrBlur(document.getElementById('travelers'), 'traveler_info', function(el) {
    gtag('event', 'traveler_info', {
      traveler_count: Number(el.value),
      traveler_age: Number(document.getElementById('age')?.value || 30),
      traveler_type: 'primary'
    });

    gtag('event', 'traveler_ages_updated', {
      traveler_count: Number(el.value),
      traveler_age: Number(document.getElementById('age')?.value || 30)
    });
  });

  fireOnChangeOrBlur(document.getElementById('age'), 'traveler_info', function(el) {
    gtag('event', 'traveler_info', {
      traveler_count: Number(document.getElementById('travelers')?.value || 1),
      traveler_age: Number(el.value),
      traveler_type: 'primary'
    });

    gtag('event', 'traveler_ages_updated', {
      traveler_count: Number(document.getElementById('travelers')?.value || 1),
      traveler_age: Number(el.value)
    });
  });

  fireOnChangeOrBlur(document.getElementById('departDate'), 'departure_date', function(el) {
    gtag('event', 'departure_date_updated', {
      departure_date: el.value
    });
  });

  fireOnChangeOrBlur(document.getElementById('returnDate'), 'return_date', function(el) {
    gtag('event', 'return_date_updated', {
      return_date: el.value
    });
  });

  fireOnChangeOrBlur(document.getElementById('tripCost'), 'trip_cost_deposited_date', function(el) {
    gtag('event', 'trip-cost_deposited_date', {
      trip_cost: el.value,
      currency: 'USD',
      deposit_date: document.getElementById('firstDepositDate')?.value || ''
    });

    gtag('event', 'trip_cost_updated', {
      trip_cost: el.value,
      currency: 'USD'
    });
  });

  fireOnChangeOrBlur(document.getElementById('firstDepositDate'), 'initial_trip_payment_date', function(el) {
    gtag('event', 'trip-cost_deposited_date', {
      trip_cost: document.getElementById('tripCost')?.value || '',
      currency: 'USD',
      deposit_date: el.value
    });

    gtag('event', 'itp_updated', {
      initial_trip_payment_date: el.value
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
renderResultsPage();
  renderComparePage();
  renderBuyPage();
  setupQuoteFormActionEvents();
  // Address interaction tracking
  document.querySelectorAll('input').forEach(field => {

    if(field.previousElementSibling && field.previousElementSibling.innerText.includes('Street Address')) {
      field.addEventListener('focus', function() {
        gtag('event', 'residenceAddress_address_line_interacted', {
          interaction_type: 'typing',
          address_type: 'residence'
        });
      });
    }

    if(field.previousElementSibling && field.previousElementSibling.innerText.includes('Card Number')) {
      field.addEventListener('focus', function() {
        gtag('event', 'billingAddress_address_line_interacted', {
          interaction_type: 'typing',
          address_type: 'billing'
        });
      });
    }

  });


});

