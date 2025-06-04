document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a[href^=\"#\"], nav ul li a[href^=\".#\"]");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            let href = this.getAttribute("href");
            if(href.startsWith(".#")) { 
                href = href.substring(1);
            }
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight && 
            rect.bottom >= 0 &&
            rect.left < window.innerWidth && 
            rect.right >= 0
        );
    }

    // Handle both hidden-initially and js-animate-on-scroll elements
    const elementsToAnimate = document.querySelectorAll(".hidden-initially, .js-animate-on-scroll");

    if (elementsToAnimate.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -10% 0px", // Trigger when element is 10% from bottom of viewport
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate--visible");
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, observerOptions);

        elementsToAnimate.forEach(element => {
            // Check if the element is already in the viewport on load
            if (isInViewport(element)) {
                // If already visible, add the classes immediately
                element.classList.add("animate--visible");
                element.classList.add("visible");
            } else {
                // Otherwise, observe for scroll-triggered animation
                scrollObserver.observe(element);
            }
        });
    }
});

