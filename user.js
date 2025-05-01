
document.getElementById('close-banner-btn').addEventListener('click', function() {
  document.getElementById('main-banner').style.display = 'none';
});
    function openModal(id) {
      document.getElementById(id).style.display = 'flex';
    }
    window.openModal = openModal;
    
    function closeModal(id) {
      document.getElementById(id).style.display = 'none';
    }
    window.closeModal = closeModal;
    // Close modal when clicking outside the box
    window.onclick = function(event) {
      const modals = ['signinModal', 'signupModal'];
      modals.forEach(id => {
        const modal = document.getElementById(id);
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    };
   window.closeModal = closeModal;
    function togglePassword(fieldId, icon) {
        const field = document.getElementById(fieldId);
        if (field.type === "password") {
          field.type = "text";
          icon.textContent = "🙈";
        } else {
          field.type = "password";
          icon.textContent = "👁️";
        }
      }
window.togglePassword = togglePassword;

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
  getAuth,
   createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword 
   } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpMFsbbB-P-PXWAGaChiHIXoDh8LiRC9w",
  authDomain: "sign-in-and-sign-up-335b4.firebaseapp.com",
  projectId: "sign-in-and-sign-up-335b4",
  storageBucket: "sign-in-and-sign-up-335b4.firebasestorage.app",
  messagingSenderId: "832961840852",
  appId: "1:832961840852:web:6d963abfb8f9de9fef5d41",
  measurementId: "G-XVVF0TPN0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

let getbtn = document.getElementById('btn');

getbtn.addEventListener('click', function () {
  const email = document.getElementById('semail').value;
  const password = document.getElementById('spass').value;

  if (!email || !password) {
    alert('Please fill in both email and password');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Don't manually redirect here — let onAuthStateChanged handle it.
      alert('Sign up successful.');
      location.href = 'buy.html';
    })
    .catch((error) => {
      alert(`Sign up unsuccessful: ${error.message}`);
    });
});

// Auth state observer (runs fast after sign-up or reload)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Authenticated — redirect
    window.location.href = 'buy.html';
  }
  else {
    
  }
});
let getbtn2 = document.getElementById('btn2');

getbtn2.addEventListener('click', function() {
  const email = document.getElementById('s2email').value;
  const password = document.getElementById('s2pass').value;

  // Simple validation check
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Sign in with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;

      window.location.href = "buy.html";
    })
    .catch((error) => {
      // Handle errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Sign In Unsuccessful: ${errorMessage}`);
    });

});
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    location.href = "buy.html";
  } else {
    console.log("User is not signed in");
    
    
  }
});
var typed = new Typed(".typing", {
  strings: ["Discount On Your First Order!"],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
})
