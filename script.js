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

    revealSections();
    window.addEventListener("scroll", revealSections);


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

            // Here you would typically use AJAX to send the form data
            // For this example, we'll just use an alert after a delay
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
});
