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
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getDatabase, 
  ref, 
  push, 
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const db = getDatabase(app);


// ================= SIGNUP =================
const signupBtn = document.getElementById("signupbtn");

if (signupBtn) {
  signupBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("✅ Account Created Successfully!");
        window.location.href = "index.html";
    })
    .catch((error) => {

        if (error.code === "auth/email-already-in-use") {
            alert("⚠️ Email already in use!");
        } 
        else if (error.code === "auth/invalid-email") {
            alert("⚠️ Invalid email!");
        } 
        else if (error.code === "auth/weak-password") {
            alert("⚠️ Password must be 6+ characters!");
        } 
        else {
            alert("❌ Something went wrong!");
        }

    });

  });
}


// ================= LOGOUT =================
const logoutBtn = document.getElementById("logBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
    .then(() => {
        alert("✅ Logged out!");
        window.location.href = "signup.html";
    })
    .catch(() => {
        alert("❌ Logout failed!");
    });
  });
}


// ================= ADD PRODUCT =================
const addProductBtn = document.getElementById("addProductBtn");

if (addProductBtn) {
  addProductBtn.addEventListener("click", () => {

    const name = document.getElementById("pname").value;
    const price = document.getElementById("pprice").value;
    const image = document.getElementById("pimage").value;

    if (!name || !price || !image) {
      alert("⚠️ Please fill all fields");
      return;
    }

    push(ref(db, "products"), {
      name,
      price,
      image
    })
    .then(() => {
      alert("✅ Product Added!");

      document.getElementById("pname").value = "";
      document.getElementById("pprice").value = "";
      document.getElementById("pimage").value = "";
    })
    .catch(() => {
      alert("❌ Error adding product");
    });

  });
}


// ================= SHOW PRODUCTS (REALTIME) =================
const productsGrid = document.getElementById("productsGrid");

if (productsGrid) {

  const productRef = ref(db, "products");

  onValue(productRef, (snapshot) => {

    productsGrid.innerHTML = "";

    snapshot.forEach((child) => {

      const product = child.val();
      const id = child.key;

      productsGrid.innerHTML += `
        <div class="product-card">
          <img src="${product.image}" />
          <h3>${product.name}</h3>
          <p>$${product.price}</p>

          <div class="btn-group">
            <button class="delete-btn" onclick="deleteProduct('${id}')">Delete</button>
            <button class="edit-btn" onclick="editProduct('${id}', '${product.name}', '${product.price}', '${product.image}')">Edit</button>
          </div>
        </div>
      `;

    });

  });

}


// ================= DELETE PRODUCT =================
window.deleteProduct = function(id) {

  if (!confirm("Delete this product?")) return;

  remove(ref(db, "products/" + id))
  .then(() => {
    alert("🗑️ Product deleted");
  })
  .catch(() => {
    alert("❌ Delete failed");
  });

};


// ================= EDIT PRODUCT =================
window.editProduct = function(id, oldName, oldPrice, oldImage) {

  const newName = prompt("Enter name:", oldName);
  const newPrice = prompt("Enter price:", oldPrice);
  const newImage = prompt("Enter image URL:", oldImage);

  if (!newName || !newPrice || !newImage) {
    alert("⚠️ All fields required");
    return;
  }

  update(ref(db, "products/" + id), {
    name: newName,
    price: newPrice,
    image: newImage
  })
  .then(() => {
    alert("✏️ Product updated");
  })
  .catch(() => {
    alert("❌ Update failed");
  });

};