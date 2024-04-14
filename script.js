document.addEventListener("DOMContentLoaded", function() {
    const housesContainer = document.querySelector('.houses-container'); // Select the container of house icons
    const houses = housesContainer.querySelectorAll('.house-animate'); // Select all house icons

    window.addEventListener('scroll', function() {
        houses.forEach(house => {
            if (isScrolledIntoView(house) && !house.classList.contains('fadeIn')) {
                house.classList.add('fadeIn'); // Apply the 'fadeIn' class to the house icon
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
