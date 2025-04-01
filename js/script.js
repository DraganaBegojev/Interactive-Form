const nameInput = document.getElementById('name');

//Other job role elements
const jobRoleSelect = document.getElementById("title");
const otherJobRoleInput = document.getElementById("other-job-role");

// T-shirt info elements
const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");

// Activities elements
const activitiesFieldset = document.getElementById("activities");
const totalCostElement = document.getElementById("activities-cost");

// Payment method elements
const paymentSelect = document.getElementById("payment");
const creditCardSection = document.getElementById("credit-card");
const paypalSection = document.getElementById("paypal");
const bitcoinSection = document.getElementById("bitcoin");

// Setup on page load

document.addEventListener('DOMContentLoaded', () => {
  nameInput.focus();
  otherJobRoleInput.style.display = "none";
  colorSelect.disabled = true;
  paymentSelect.value = "credit-card"; // Set default payment method to credit card
  creditCardSection.style.display = "block";
  paypalSection.style.display = "none";
  bitcoinSection.style.display = "none";
});

// otherJobRoleInput is hidden by default and only shown when the user selects "other" from the job role dropdown.

jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === "other") {
    otherJobRoleInput.style.display = "block";
  } else {
    otherJobRoleInput.style.display = "none";
  }
});


// When a design is chosen, the color select element is enabled and the options are filtered based on the selected design.

designSelect.addEventListener("change", (e) => {
  const selectedDesign = e.target.value;
  colorSelect.disabled = false;
  
  // Reset the color selection
  colorSelect.selectedIndex = 0; 

  for (let colorOption of colorSelect.children) {
    const dataTheme = colorOption.getAttribute("data-theme");
    colorOption.hidden = selectedDesign !== dataTheme;
  }
});


// The total cost of the selected activities

let totalCost = 0;

activitiesFieldset.addEventListener('change', (e) => {
  const selectedCheckbox = e.target;
  const cost = parseInt(selectedCheckbox.getAttribute('data-cost'));
  
  if (selectedCheckbox.checked) {
    totalCost += cost;
  } else {
    totalCost -= cost;
  }

  totalCostElement.innerText = `Total: $${totalCost}`;
});


// The payment methods display

paymentSelect.addEventListener("change", (e) => {
  const selectedPayment = e.target.value;

  // Hide all payment sections by default
  creditCardSection.style.display = "none";
  paypalSection.style.display = "none";
  bitcoinSection.style.display = "none";

  // Show the selected payment section
  document.getElementById(selectedPayment).style.display = "block";
});