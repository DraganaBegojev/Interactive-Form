const nameInput = document.getElementById('name');
const jobRoleSelect = document.getElementById("title");
const otherJobRoleInput = document.getElementById("other-job-role");


document.addEventListener('DOMContentLoaded', () => {
  nameInput.focus();
  otherJobRoleInput.style.display = "none";
});

jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === "other") {
    otherJobRoleInput.style.display = "block";
  } else {
    otherJobRoleInput.style.display = "none";
  }
});