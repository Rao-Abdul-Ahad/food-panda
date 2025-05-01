import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs ,doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpMFsbbB-P-PXWAGaChiHIXoDh8LiRC9w",
  authDomain: "sign-in-and-sign-up-335b4.firebaseapp.com",
  projectId: "sign-in-and-sign-up-335b4",
  storageBucket: "sign-in-and-sign-up-335b4.firebasestorage.app",
  messagingSenderId: "832961840852",
  appId: "1:832961840852:web:6d963abfb8f9de9fef5d41",
  measurementId: "G-XVVF0TPN0Y"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get reference to the button and set up the event listener
let btn = document.getElementById("btn");
btn.addEventListener("click", async function () {
  // Get values from input fields
  let resname = document.getElementById("res").value;
  let prodname = document.getElementById("prod").value;
  let prodprice = document.getElementById("price").value;
  let delivery = document.getElementById("delivery").value;
  let imgurl = document.getElementById("img").value;
  let location = document.getElementById("location").value;

  // Ensure all required fields are filled out
  if (!resname || !prodname || !prodprice || !delivery || !imgurl || !location) {
    alert("All fields must be filled out!");
    return;
  }

  try {
    // Adding the document to Firestore
    const docRef = await addDoc(collection(db, "My Products"), {
      Restaurant_Name: resname,
      Image_Url: imgurl,
      Product_Name: prodname,
      Product_Price: prodprice,
      Location: location,
      Delivery_Price: delivery,
      AddedAt: Timestamp.now() // Corrected Timestamp usage
    });
    alert("Product added successfully");
    console.log("Document written with ID: ", docRef.id);
    ReadData();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error adding document");
  }

});
let getread = document.getElementById("read1");
async function ReadData() {
  getread.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "My Products"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    getread.innerHTML += `<div class="read" id="read">
                          <h2>Restaurant: ${doc.data().Restaurant_Name} </h2><br>
                          <img src="${doc.data().Image_Url}" width="100%" height="300px" alt="Image">
                          <h3>Product: ${doc.data().Product_Name}</h3>
                          <h3>Price: ${doc.data().Product_Price}</h3>
                          <h5>Location: ${doc.data().Location}</h5>
                          <h5>Delivery: Rs ${doc.data().Delivery_Price} 
                          <button onclick="del('${doc.id}')" class="btn btn-secondary" id="del">Delete</button>
     <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addProduct">Edit</button>

<!-- Modal -->
<div class="modal fade" id="addProduct" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addProductModalLabel">Add New Product Information</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="productForm">
          <!-- Restaurant Name -->
          <div class="mb-4">
            <label for="restaurantName" class="form-label">Restaurant Name:</label>
            <input type="text" class="form-control" id="restaurantName" required>
          </div>

          <!-- Product Name -->
          <div class="mb-4">
            <label for="productName" class="form-label">Product Name:</label>
            <input type="text" class="form-control" id="productName" required>
          </div>

          <!-- Product Price -->
          <div class="mb-4">
            <label for="productPrice" class="form-label">Product Price:</label>
            <input type="text" class="form-control" id="productPrice" required>
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label for="productLocation" class="form-label">Location:</label>
            <input type="text" class="form-control" id="productLocation" required>
          </div>

          <!-- Delivery Price -->
          <div class="mb-4">
            <label for="deliveryCharge" class="form-label">Delivery Price:</label>
            <input type="text" class="form-control" id="deliveryCharge" required>
          </div>

          <!-- Image URL -->
          <div class="mb-4">
            <label for="imageURL" class="form-label">Image URL:</label>
            <input type="text" class="form-control" id="imageURL" required>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
        <button onclick="edit('${doc.id}')" id="submitProduct" type="button" class="btn btn-success">Edit Products</button>
      </div>
    </div>
  </div>
</div>`            
  });
}
ReadData();

async function del(id) {

  const cityRef = doc(db, 'My Products', id);
  await deleteDoc(cityRef, {
  });
  console.log("Deleted");
  ReadData()
}
window.del = del;

async function edit(id) { 
  
  const editres = document.getElementById('restaurantName');
  const editprod = document.getElementById('productName');
  const editprice = document.getElementById('productPrice');
  const editlocat = document.getElementById('productLocation');
  const editdeli = document.getElementById('deliveryCharge');
  const editimg = document.getElementById('imageURL');

const cityRef = doc(db, 'My Products', id);
await updateDoc(cityRef, {
 
  Restaurant_Name: editres.value,
  Product_Name: editprod.value,
  Product_Price: editprice.value,
  Location: editlocat.value,
  Delivery_Price: editdeli.value,
  Image_Url: editimg.value,
  AddedAt: Timestamp.now()
});
  alert("Updated");
 ReadData()
}

window.edit = edit;

async  function  log() {

  const auth = getAuth();
  signOut(auth)
  .then(() => {
    window.location.href = "index.html";
    console.log("user is signed out")
  }) .catch((error) => {
    // An error happened.
  })
}
  window.log = log;
  const auth = getAuth();
