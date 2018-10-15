import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCc6URU0wcpw79piFWOzCO8lUUfZe0wRcM",
  authDomain: "catch-of-the-day-areveron.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-areveron.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
