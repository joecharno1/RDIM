document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            // Check if it's an internal link to an ID on the same page or a link to another page
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            } else {
                // For links to other pages, let the default behavior occur
                // but if it's a link to the current page (e.g. index.html from index.html), do nothing extra
                if (window.location.pathname.endsWith(href)) {
                    e.preventDefault(); // Prevent reload if already on the page
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }
        });
    });

    // Scroll-triggered fade-in animations for sections
    const animatedSections = document.querySelectorAll(".content-section, .service-card, .testimonial-card, .team-member-card, .reason-item");

    const observerOptions = {
        root: null, // relative to document viewport 
        rootMargin: "0px",
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        section.classList.add("hidden-initially"); // Add class to hide before animation
        observer.observe(section);
    });

});
