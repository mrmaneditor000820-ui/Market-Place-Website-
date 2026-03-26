// ================= MOBILE MENU =================
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
}


// ================= FIREBASE SETUP =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxWy54p37na-NPWlk4Qs6dVY46_H2wfOw",
  authDomain: "abdurehman-app.firebaseapp.com",
  projectId: "abdurehman-app",
  storageBucket: "abdurehman-app.firebasestorage.app",
  messagingSenderId: "1069858262240",
  appId: "1:1069858262240:web:07c13d163a93266e9f5485",
  measurementId: "G-CCX68B9RV2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ================= SIGNUP =================
const signupBtn = document.getElementById("signupbtn");

if (signupBtn) {
  signupBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("✅ Account Created Successfully!");
        window.location.href = "login.html"; // ya home.html
    })
    .catch((error) => {
        let message = "";

        if (error.code === "auth/email-already-in-use") {
            message = "⚠️ Email already in use!";
        } 
        else if (error.code === "auth/invalid-email") {
            message = "⚠️ Invalid email!";
        } 
        else if (error.code === "auth/weak-password") {
            message = "⚠️ Password must be at least 6 characters!";
        } 
        else {
            message = "❌ Something went wrong!";
        }

        alert(message);
    });

  });
}


// ================= LOGOUT =================
const logoutBtn = document.getElementById("logBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
    .then(() => {
        alert("✅ Logout Successfully!");
        window.location.href = "signup.html";
    })
    .catch(() => {
        alert("❌ Logout Failed!");
    });
  });
}


// ================= AUTH PROTECTION =================
// Sirf home page pe lagana hai (optional but recommended)

onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname;

  // Agar user login nahi hai aur home page pe hai
  if (!user && currentPage.includes("index.html")) {
    window.location.href = "signup.html";
  }

  // Agar user login hai aur signup page pe hai
  if (user && currentPage.includes("signup.html")) {
    window.location.href = "index.html";
  }
});