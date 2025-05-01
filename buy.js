import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth();

// Element to display order number in the cart icon
let num = 0;
const cart = document.getElementById("orderNumber");

// Function to read products from Firestore and display them
async function ReadData() {
  const container = document.getElementById("userdiv");
  if (!container) return;

  const querySnapshot = await getDocs(collection(db, "My Products"));
  container.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    container.innerHTML += `
      <div class="read33">
        <h4>${data.Restaurant_Name}</h4><br>
        <img src="${data.Image_Url}" width="100%" height="300px" alt="Product Image">
        <h3><strong>Product:</strong> ${data.Product_Name}</h3>
        <h3><strong>Price:</strong> Rs ${data.Product_Price}</h3>
        <h5><strong>Delivery:</strong> Rs ${data.Delivery_Price}</h5>
        <h5><strong>Location:</strong> ${data.Location}</h5><br>
        <button onclick='addtocart("${docSnap.id}", "${data.Product_Name}", "${data.Product_Price}", "${data.Delivery_Price}", "${data.Location}", "${data.Image_Url}")' class="btn btn-primary">Add To Cart</button>
      </div>
    `;
  });
}

// Call ReadData to fetch and display products on the page
ReadData();

// Add product to cart and update the cart icon
async function addtocart(id, name, price, delivery, location, image) {
  const cartItem = {
    id,
    name,
    price,
    delivery,
    location,
    image,
    quantity: 1,
  };

  try {
    // Add product to the Firebase CartItems collection with product ID as the doc ID
    await setDoc(doc(db, "CartItems", id), cartItem);
    console.log("Item added to Firebase cart");

    // Update the cart number and redirect to cart page
    num++;
    cart.innerText = num;
    window.location.href = "cart.html"; // Navigate to cart page
  } catch (error) {
    console.error("Error adding to cart: ", error);
  }
}

window.addtocart = addtocart;

// Log out user
function log() {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error during sign out:", error);
    });
}

window.log = log;

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
  } else {
    location.href = "index.html"; // Redirect to login if not signed in
  }
});

// Redirect user to cart page
document.getElementById("cartIcon").addEventListener("click", function () {
  window.location.href = "cart.html";
});
