const nameInput = document.getElementById('name');
const jobRoleSelect = document.getElementById("title");
const otherJobRoleInput = document.getElementById("other-job-role");

otherJobRoleInput.style.display = "none";

document.addEventListener('DOMContentLoaded', () => {
  nameInput.focus();
});

jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === "other") {
    otherJobRoleInput.style.display = "block";
  } else {
    otherJobRoleInput.style.display = "none";
  }
});