alert("Hello friends welcome to my website✌️")
// Smooth scrolling ka already built-in CSS feature use ho raha hai
// Section fade-in animation jab scroll kare
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    function revealSections() {
        sections.forEach((section) => {
            let sectionTop = section.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.classList.add("show");
            }
        });
    }
    // Page load hone par animation trigger kare
    revealSections();
    // Scroll par check kare ki kaunse sections dikhne lage
    window.addEventListener("scroll", revealSections);
});
// Form submit hone par animation
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let button = document.querySelector("button");
    if (name && email && message) {
        button.innerHTML = "Sent!";
        button.style.backgroundColor = "green";
        button.style.transform = "scale(1.2)";
        setTimeout(() => {
            button.innerHTML = "Send";
            button.style.backgroundColor = "#333";
            button.style.transform = "scale(1)";
            alert("Thank you, " + name + "! Your message has been sent.");
        }, 2000);
    } else {
        alert("Please fill in all fields.");
    }
    

});
