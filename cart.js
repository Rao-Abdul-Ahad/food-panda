import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
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

const cartContainer = document.getElementById("cartItems");

// Load Cart Items
async function loadCart() {
  const querySnapshot = await getDocs(collection(db, "CartItems"));
  cartContainer.innerHTML = "";

  let grandTotal = 0;

  querySnapshot.forEach((docSnap) => {
    const item = docSnap.data();

    const price = parseFloat(item.price) || 0;
    const delivery = parseFloat(item.delivery) || 0;
    const quantity = parseInt(item.quantity) || 0;

    const productTotal = (price * quantity) + delivery;
    grandTotal += productTotal;

    cartContainer.innerHTML += `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Price: Rs ${price} × ${quantity}</p>
              <p class="card-text">Delivery: Rs ${delivery}</p>
              <p class="card-text fw-bold">Total: Rs ${productTotal}</p>
              <div class="d-flex align-items-center">
                <button class="btn btn-secondary me-2" onclick="decreaseQty('${docSnap.id}', ${quantity})">-</button>
                <span class="me-2">${quantity}</span>
                <button class="btn btn-secondary me-4" onclick="increaseQty('${docSnap.id}', ${quantity})">+</button>
                <button class="btn btn-danger" onclick="removeItem('${docSnap.id}')">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cartContainer.innerHTML += `
    <div class="text-end mt-4">
      <h4 class="fw-bold">Grand Total: Rs ${grandTotal}</h4>
    </div>
  `;
}

// Quantity +/-
window.increaseQty = async (id, qty) => {
  await updateDoc(doc(db, "CartItems", id), { quantity: qty + 1 });
  loadCart();
};

window.decreaseQty = async (id, qty) => {
  const newQty = qty > 1 ? qty - 1 : 1;
  await updateDoc(doc(db, "CartItems", id), { quantity: newQty });
  loadCart();
};

// Remove Item
window.removeItem = async (id) => {
  await deleteDoc(doc(db, "CartItems", id));
  loadCart();
};

// Initial load
loadCart();
