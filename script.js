document.addEventListener("DOMContentLoaded", function() {
    const scrollElements = document.querySelectorAll('.scroll-animate'); // Select elements to animate

    window.addEventListener('scroll', function() {
        scrollElements.forEach(element => {
            if (isScrolledIntoView(element) && !element.classList.contains('animate-scroll')) {
                element.classList.add('animate-scroll'); // Apply the 'animate-scroll' class to trigger animation
            }
        });
    });

    function isScrolledIntoView(element) {
        const rect = element.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;

        // Only completely visible elements return true:
        const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }
});

document.getElementById("showChartsButton").addEventListener("click", function() {
    var chartContainer = document.getElementById("chartContainer");
    if (chartContainer.style.display === "none") {
        chartContainer.style.display = "block";
    } else {
        chartContainer.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const housingContainer = document.querySelector('.houses-container'); // Select housing container to animate

    window.addEventListener('scroll', function() {
        if (isScrolledIntoView(housingContainer) && !housingContainer.classList.contains('animate-scroll')) {
            housingContainer.classList.add('animate-scroll'); // Apply the 'animate-scroll' class to trigger animation
        }
    });

    function isScrolledIntoView(element) {
        const rect = element.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;

        // Only completely visible elements return true:
        const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }
});
