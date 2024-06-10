import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAW97PNgZ16f2RUAAku6nkbXukgbQlLFr8",
    authDomain: "dunkstore-90a39.firebaseapp.com",
    projectId: "dunkstore-90a39",
    storageBucket: "dunkstore-90a39.appspot.com",
    messagingSenderId: "999323308917",
    appId: "1:999323308917:web:d1b37b2d34ebc29e45393c",
    measurementId: "G-53VNCH7HE6"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              // Atualiza o nome do usuário, mantendo o ícone
              if (document.getElementById('userName')) {
                document.getElementById('userName').textContent = userData.firstName;
              }
              if (document.getElementById('loggedUserEmail')) {
                document.getElementById('loggedUserEmail').innerText = userData.email;
              }
              if (document.getElementById('loggedUserLName')) {
                document.getElementById('loggedUserLName').innerText = userData.lastName;
              }
            } else {
              console.log("no document found matching id");
            }
          })
          .catch((error) => {
            console.log("Error getting document", error);
          });
      } else {
        console.log("User Id not Found in Local storage");
      }
    });
  
    // Verifique a existência do botão de logout antes de adicionar um ouvinte de evento
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
          .then(() => {
            window.location.href = 'index.html';
          })
          .catch((error) => {
            console.error('Error Signing out:', error);
          });
      });
    } else {
      console.error('Logout button not found');
    }
  });
  
  