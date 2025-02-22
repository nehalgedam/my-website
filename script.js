// Import Firebase functions
import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoxvjq55Al_e_8Y8riFtJWVHl138cGXLg",
    authDomain: "my-website-8e6f0.firebaseapp.com",
    projectId: "my-website-8e6f0",
    storageBucket: "my-website-8e6f0",
    messagingSenderId: "805197097621",
    appId: "1:805197097621:web:a2f74589362b99269c899c"
};

// Initialize Firebase
let db;
try {
    if (!getApps().length) {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("Firebase initialized successfully");
    } else {
        db = getFirestore();
        console.log("Firebase app already initialized");
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let darkModeToggle = document.getElementById("dark-mode-toggle");
    let isDarkMode = localStorage.getItem("dark-mode") === "enabled";

    // Function to Reveal Sections on Scroll
    function revealSections() {
        sections.forEach((section) => {
            let sectionTop = section.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    // Function to handle dark mode state
    function applyDarkMode(state) {
        document.body.classList.toggle("dark-mode", state);
        localStorage.setItem("dark-mode", state ? "enabled" : "disabled");
    }

    // Function to handle form submission
    function handleFormSubmission(event) {
        event.preventDefault();
        
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let button = document.querySelector("#contact-form button");

        if (name && email && message) {
            button.innerHTML = "Sending...";
            button.disabled = true;

            if (!db) {
                alert("Database not initialized. Please try again later.");
                resetButton(button);
                return;
            }

            // Store data in Firestore
            addDoc(collection(db, "messages"), {
                name: name,
                email: email,
                message: message,
                timestamp: serverTimestamp()
            }).then(() => {
                showSuccessMessage(button, name);
            }).catch((error) => {
                console.error("Error sending message: ", error);
                alert("Something went wrong. Please try again.");
                resetButton(button);
            });
        } else {
            alert("Please fill in all fields.");
        }
    }

    // Function to show success message
    function showSuccessMessage(button, name) {
        button.innerHTML = "Sent!";
        button.style.backgroundColor = "green";
        button.style.transform = "scale(1.2)";
        
        setTimeout(() => {
            resetButton(button);
            alert(`Thank you, ${name}! Your message has been sent.`);
            document.getElementById("contact-form").reset();
        }, 2000);
    }

    // Function to reset button state
    function resetButton(button) {
        button.innerHTML = "Send";
        button.style.backgroundColor = "#333";
        button.style.transform = "scale(1)";
        button.disabled = false;
    }

    // Run animation on page load
    revealSections();
    window.addEventListener("scroll", revealSections);

    // Dark mode button click event
    darkModeToggle.addEventListener("click", function () {
        isDarkMode = !isDarkMode;
        applyDarkMode(isDarkMode);
    });

    // Apply dark mode if previously enabled
    if (isDarkMode) {
        applyDarkMode(true);
    }

    // Contact Form Submission with Firebase
    document.getElementById("contact-form").addEventListener("submit", handleFormSubmission);
});
