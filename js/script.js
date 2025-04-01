const nameInput = document.getElementById('name');
const jobRoleSelect = document.getElementById("title");
const otherJobRoleInput = document.getElementById("other-job-role");
const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");


document.addEventListener('DOMContentLoaded', () => {
  nameInput.focus();
  otherJobRoleInput.style.display = "none";
  colorSelect.disabled = true;
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