$(document).ready(function () {

    try {
        AOS.init({
            duration: 1000,
            // once: true
        });
    } catch (error) {
        console.warn("AOS initialization failed:", error);
    }
   
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    const observerOptions = {
        root: null, // Uses the viewport
        threshold: 0.5, // 50% of the section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Remove the active class from all nav items
                navLinks.forEach((link) => link.parentElement.classList.remove("active"));
                
                // Add the active class to the corresponding nav item
                const activeLink = document.querySelector(`.navbar ul li a[href="#${entry.target.id}"]`);
                activeLink.parentElement.classList.add("active");
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach((section) => observer.observe(section));

    // Handle click events on navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor click behavior (optional)
            
            // Remove the active class from all nav items
            navLinks.forEach((link) => link.parentElement.classList.remove("active"));

            // Add the active class to the clicked link
            link.parentElement.classList.add("active");

            // Scroll to the corresponding section smoothly
            const targetSection = document.querySelector(link.getAttribute("href"));
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });
});


