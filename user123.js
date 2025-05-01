import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4HjZrg-5yC2fPcpfF7orTbqV9wWrGhWc",
  authDomain: "admin-1c35c.firebaseapp.com",
  projectId: "admin-1c35c",
  storageBucket: "admin-1c35c.firebasestorage.app",
  messagingSenderId: "903699108373",
  appId: "1:903699108373:web:e5f81b02556bdb7f6af41c",
  measurementId: "G-JYREGEMW72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Open Modal (either signup or signin)
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

window.openModal = openModal;

// Close Modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

window.closeModal = closeModal;

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modals = ['signInModal', 'signUpModal'];
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

// Handle Sign-Up
document.getElementById('signup-button').addEventListener('click', function () {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  if (!email || !password) {
    alert('Please fill in both email and password');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    Swal.fire({
      title: 'Sign-up Successful!',
      text: 'You are being redirected...',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-z-index'
      }
    }).then(() => {
      window.location.href = 'indexadmin.html';
    })
  .catch((error) => {
    Swal.fire({
      title: 'Sign-up Failed',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
});
});
// Handle Sign-In
document.getElementById('signin-button').addEventListener('click', function () {
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  if (!email || !password) {
    alert('Please fill in both email and password');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
   
  .then((userCredential) => {
    Swal.fire({
      title: 'Sign-in Successful!',
      text: 'You are being redirected...',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-swal-zindex' // Adding custom class to control z-index
      }
    }).then(() => {
      window.location.href = 'indexadmin.html';
    })
  .catch((error) => {
    Swal.fire({
      title: 'Sign-in Failed',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
});
});

// Event listener for opening modals (signup or signin)
document.getElementById('open-signup-modal-btn').addEventListener('click', function () {
  openModal('signUpModal');
});

document.getElementById('open-signin-modal-btn').addEventListener('click', function () {
  openModal('signInModal');
});

// Event listener for closing modals
document.getElementById('close-signup-modal-btn').addEventListener('click', function () {
  closeModal('signUpModal');
});

document.getElementById('close-signin-modal-btn').addEventListener('click', function () {
  closeModal('signInModal');
});

// Switching between Sign-Up and Sign-In modals
document.getElementById('signup-link').addEventListener('click', function () {
  closeModal('signInModal');
  openModal('signUpModal');
});

document.getElementById('signin-link').addEventListener('click', function () {
  closeModal('signUpModal');
  openModal('signInModal');
});
// Get current page name (e.g., 'buy.html')
const currentPage = window.location.pathname.split('/').pop().toLowerCase();
console.log("Current page:", currentPage);
async  function  log() {

  const auth = getAuth();
  signOut(auth)
  .then(() => {
    window.location.href = "index.html";
  }) .catch((error) => {
    // An error happened.
  })

        
       
}
  window.log = log;
