const nameInput = document.getElementById('name');
const jobRoleSelect = document.getElementById("title");
const otherJobRoleInput = document.getElementById("other-job-role");
const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
const activitiesFieldset = document.getElementById("activities");
const checkboxes = activitiesFieldset.querySelectorAll('input[type="checkbox"]');
const totalCostElement = document.getElementById("activities-cost");
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
const activitiesBox = document.getElementById("activities-box");



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
  const cost = parseInt(selectedCheckbox.getAttribute('data-cost'), 10);
  
  if (selectedCheckbox.checked) {
    totalCost += cost;
  } else {
    totalCost -= cost;
  }

  totalCostElement.innerText = `Total: $${totalCost}`;

  // Conflicting activities
  const selectedTime = selectedCheckbox.dataset.dayAndTime;
  const conflictingTime = document.querySelectorAll(`[data-day-and-time="${selectedTime}"]`);

  for(let i = 0; i < conflictingTime.length; i++) {
    if (conflictingTime[i] !== selectedCheckbox) {
      conflictingTime[i].disabled = selectedCheckbox.checked;
      conflictingTime[i].parentElement.classList.toggle('disabled', selectedCheckbox.checked);
    }
  }
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

// Validation functions
const isValidEmail = (email) => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email);
const isValidCCNum = (ccNum) => /^\d{13,16}$/.test(ccNum);
const isValidZip = (zip) => /^\d{5}$/.test(zip); 
const isValidCVV = (cvv) => /^\d{3}$/.test(cvv);
const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name.trim());
const isValidActivities = () => totalCost > 0;

// Function to show/hide hints
const showHint = (element, isValid) => {
  const hint = element.parentElement.querySelector(".hint");
  if (hint) {
    hint.style.display = isValid ? "none" : "block";
  }
};

//Function to add/remove valid class

const toggleValidClass = (element, isValid) => {
  const parent = element.parentElement;
  parent.classList.toggle("valid", isValid);
  parent.classList.toggle("not-valid", !isValid);
};

// Function to validate the whole form
function isValidForm() {
  let valid = true;

  // Name
  if (!isValidName(nameInput.value)) {
    showHint(nameInput, false);
    toggleValidClass(nameInput, false);
    valid = false;
  } else {
    showHint(nameInput, true);
    toggleValidClass(nameInput, true);
  }
  // Email
  if (!isValidEmail(emailInput.value)) {
    showHint(emailInput, false);
    toggleValidClass(emailInput, false);
    valid = false;
  } else {
    showHint(emailInput, true);
    toggleValidClass(emailInput, true);
  }
  // Activities
  if (!isValidActivities()) {
    showHint(activitiesBox, false);
    toggleValidClass(activitiesBox, false);
    valid = false;
  } else {
    showHint(activitiesBox, true);
    toggleValidClass(activitiesBox , true);
  }
  // Credit Card validation (only if Credit Card is selected)
  if (paymentSelect.value === "credit-card") {
    if (!isValidCCNum(ccNumInput.value)) {
      showHint(ccNumInput, false);
      toggleValidClass(ccNumInput, false);
      valid = false;
    } else {
      showHint(ccNumInput, true);
      toggleValidClass(ccNumInput, true);
    }

    if (!isValidZip(zipInput.value)) {
      showHint(zipInput, false);
      toggleValidClass(zipInput, false);
      valid = false;
    } else {
      showHint(zipInput, true);
      toggleValidClass(zipInput, true);
    }

    if (!isValidCVV(cvvInput.value)) {
      showHint(cvvInput, false);
      toggleValidClass(cvvInput, false);
      valid = false;
    } else {
      showHint(cvvInput, true);
      toggleValidClass(cvvInput, true);
    }
  }

  return valid;
}

// Form submit event listener
form.addEventListener("submit", (e) => {
  if (!isValidForm()) {
    e.preventDefault(); // Prevent form submission if any field is invalid
  }
});

// Focus indicators for checkboxes 


for (let i=0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus');
  });
  checkboxes[i].addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus');
  });
}






