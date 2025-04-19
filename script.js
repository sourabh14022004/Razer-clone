const RegisterUsers = JSON.parse(localStorage.getItem("RegisterUsers")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
// Handle form submission (Login/Registration)
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  // Check if user data exists
  let isValidUser = false;
  // Validate user credentials
  for (let i = 0; i < RegisterUsers.length; i++) {
    if (RegisterUsers[i].email === email && RegisterUsers[i].password === password) {
      isValidUser = true;
      currentUser.push(RegisterUsers[i]);
      break;
    }
  }
  if (!isValidUser) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  // Show success message and redirect
  alert("Hey welcome back!");
  window.location.href= "index.html"; 
  document.getElementById("profile-section").style.display = "block";
  document.getElementById("login-form").style.display = "none";
});
