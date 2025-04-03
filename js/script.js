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

// Validation elements
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const ccNumInput = document.getElementById("cc-num");
const zipInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");
const nameHint = document.getElementById("name-hint");
const emailHint = document.getElementById("email-hint");
const activitiesHint = document.getElementById("activities-hint");
const ccNumHint = document.getElementById("cc-hint");
const zipHint = document.getElementById("zip-hint");
const cvvHint = document.getElementById("cvv-hint");



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

// Form validation
const isValidEmail = (email) => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email);
const isValidCCNum = (ccNum) => /^\d{13,16}$/.test(ccNum);
const isValidZip = (zip) => /^\d{5}$/.test(zip); 
const isValidCVV = (cvv) => /^\d{3}$/.test(cvv);
const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name.trim());
const isValidActivities = () => totalCost > 0;

// Function to show/hide hints
const showHint = (element, isValid) => {
  const hint = element.nextElementSibling; 
  hint.style.display = isValid ? "none" : "block";
};

// Function to validate the whole form
const isValidForm = () => {
  let valid = true;

  // Name
  if (!isValidName(nameInput.value)) {
    showHint(nameInput, false);
    valid = false;
  } else {
    showHint(nameInput, true);
  }
  // Email
  if (!isValidEmail(emailInput.value)) {
    showHint(emailInput, false);
    valid = false;
  } else {
    showHint(emailInput, true);
  }
  // Activities
  if (!isValidActivities()) {
    showHint(totalCostElement, false);
    valid = false;
  } else {
    showHint(totalCostElement, true);
  }
 // Credit Card validation (only if Credit Card is selected)
 if (paymentSelect.value === "credit-card") {
  if (!isValidCCNum(ccNumInput.value)) {
    showHint(ccNumInput, false);
    valid = false;
  } else {
    showHint(ccNumInput, true);
  }

  if (!isValidZip(zipInput.value)) {
    showHint(zipInput, false);
    valid = false;
  } else {
    showHint(zipInput, true);
  }

  if (!isValidCVV(cvvInput.value)) {
    showHint(cvvInput, false);
    valid = false;
  } else {
    showHint(cvvInput, true);
  }
}

return valid;
};

// Form submit event listener
form.addEventListener("submit", (e) => {
  if (!isValidForm()) {
    e.preventDefault(); // Prevent form submission if any field is invalid
  } else {
    alert("Form submitted successfully!");
    form.submit();
  }
});

// Focus indicators for checkboxes 

const checkboxes = activitiesFieldset.querySelectorAll('input[type="checkbox"]');

for (i=0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus');
  });
  checkboxes[i].addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus');
  });
}
