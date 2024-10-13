/* function for toggling the tabs */
/* also the toggling with menu icon */
document.getElementById("menu").addEventListener("click", function() {
    const tabs = document.getElementById("tabs");
    tabs.classList.toggle("active");

    const hamburger = document.getElementById("menu");
    const cross = document.getElementById("close-menu");
    if (tabs.classList.contains('active')) {
        hamburger.style.display = "none";
        cross.style.display = "block";
    } else {
        hamburger.style.display = "block";
        cross.style.display = "none";
    }
});

/* function to toggle with the close button */
document.getElementById("close-menu").addEventListener("click", function() {
    const tabs = document.getElementById("tabs");
    const hamburger = document.getElementById("menu");
    const cross = document.getElementById("close-menu");

    tabs.classList.toggle("active");

    hamburger.style.display = "block";
    cross.style.display = "none";
});

/* no hamburger, no cross when screen size over than mobile ones */
/* hamburger icon when back to mobile */
window.addEventListener("resize", function() {
    const tabs = document.getElementById("tabs");
    const hamburger = document.getElementById("menu");
    const cross = document.getElementById("close-menu");

    if (window.innerWidth > 480) {
        tabs.classList.remove("active");
        hamburger.style.display = "none";
        cross.style.display = "none";
    } else {
        hamburger.style.display = "block";
        cross.style.display = "none";
    }
});