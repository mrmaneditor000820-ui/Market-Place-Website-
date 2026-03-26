// Mobile menu toggle functionality
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your Firebase configuration
// IMPORTANT: Replace this with your actual Firebase config from your Firebase project

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
// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupBtn = document.getElementById('signupbtn');

// Create elements for messages and password strength
let errorDiv = null;
let successDiv = null;
let strengthBar = null;
let strengthText = null;

// Add password strength indicator
function addPasswordStrength() {
  const container = document.querySelector('div');
  const passwordGroup = document.createElement('div');
  passwordGroup.className = 'password-strength';
  passwordGroup.innerHTML = `
    <div class="strength-bar">
      <span></span><span></span><span></span><span></span>
    </div>
    <div class="strength-text">Password strength</div>
  `;
  
  // Insert after password input
  passwordInput.parentNode.insertBefore(passwordGroup, passwordInput.nextSibling);
  
  strengthBar = passwordGroup.querySelectorAll('.strength-bar span');
  strengthText = passwordGroup.querySelector('.strength-text');
  
  // Add password strength checker
  passwordInput.addEventListener('input', checkPasswordStrength);
}

// Check password strength
function checkPasswordStrength() {
  const password = passwordInput.value;
  let strength = 0;
  
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  
  // Update strength bars
  strengthBar.forEach((bar, index) => {
    if (index < strength) {
      if (strength === 1) bar.style.background = '#ef4444';
      else if (strength === 2) bar.style.background = '#f97316';
      else if (strength === 3) bar.style.background = '#eab308';
      else if (strength >= 4) bar.style.background = '#10b981';
    } else {
      bar.style.background = '#374151';
    }
  });
  
  // Update strength text
  if (password.length === 0) {
    strengthText.textContent = 'Password strength';
    strengthText.style.color = '#9ca3af';
  } else if (strength <= 1) {
    strengthText.textContent = 'Weak password - use at least 6 characters';
    strengthText.style.color = '#ef4444';
  } else if (strength === 2) {
    strengthText.textContent = 'Fair password - add numbers or symbols';
    strengthText.style.color = '#f97316';
  } else if (strength === 3) {
    strengthText.textContent = 'Good password!';
    strengthText.style.color = '#eab308';
  } else if (strength >= 4) {
    strengthText.textContent = 'Strong password!';
    strengthText.style.color = '#10b981';
  }
}

// Show error message
function showError(message) {
  // Remove existing error message
  if (errorDiv) errorDiv.remove();
  
  // Create error div
  errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  // Insert at top of container
  const container = document.querySelector('div');
  container.insertBefore(errorDiv, container.firstChild);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (errorDiv) errorDiv.remove();
  }, 4000);
}

// Show success message
function showSuccess(message) {
  // Remove existing success message
  if (successDiv) successDiv.remove();
  
  // Create success div
  successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  
  // Insert at top of container
  const container = document.querySelector('div');
  container.insertBefore(successDiv, container.firstChild);
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show loading state
function setLoading(isLoading) {
  if (isLoading) {
    signupBtn.classList.add('loading');
    signupBtn.disabled = true;
    signupBtn.textContent = '';
  } else {
    signupBtn.classList.remove('loading');
    signupBtn.disabled = false;
    signupBtn.textContent = 'Sign Up';
  }
}

// Redirect to home page
function redirectToHome() {
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

// Sign up function
async function signUp() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Validate inputs
  if (!email || !password) {
    showError('Please fill in all fields');
    return;
  }
  
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address');
    return;
  }
  
  if (password.length < 6) {
    showError('Password must be at least 6 characters long');
    return;
  }
  
  // Set loading state
  setLoading(true);
  
  try {
    // Create user with Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name (optional - you can add name field)
    await updateProfile(user, {
      displayName: email.split('@')[0]
    });
    
    console.log('User signed up successfully:', user.email);
    
    // Show success message
    showSuccess('Account created successfully! Redirecting to home page...');
    
    // Store user info in localStorage for session persistence
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || email.split('@')[0]
    };
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
    // Redirect to home page after 1.5 seconds
    redirectToHome();
    
  } catch (error) {
    console.error('Sign up error:', error);
    
    // Handle specific Firebase errors
    switch (error.code) {
      case 'auth/email-already-in-use':
        showError('This email is already registered. Please use a different email or sign in.');
        break;
      case 'auth/weak-password':
        showError('Password is too weak. Please use at least 6 characters.');
        break;
      case 'auth/invalid-email':
        showError('Invalid email address format.');
        break;
      case 'auth/operation-not-allowed':
        showError('Email/password sign-up is not enabled. Please contact support.');
        break;
      default:
        showError('Failed to create account. Please try again.');
    }
  } finally {
    setLoading(false);
  }
}

// Add event listener to sign up button
signupBtn.addEventListener('click', signUp);

// Add event listener for Enter key press
emailInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') signUp();
});
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') signUp();
});

// Add password strength indicator when page loads
document.addEventListener('DOMContentLoaded', () => {
  addPasswordStrength();
  
  // Add info text
  const container = document.querySelector('div');
  const infoText = document.createElement('div');
  infoText.className = 'info-text';
  infoText.innerHTML = 'By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>';
  container.appendChild(infoText);
});