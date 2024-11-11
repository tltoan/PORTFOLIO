var navbar = document.querySelector('.nav');

// Define the point at which the navbar should start scrolling
var scrollStartPoint = 600; // Change this to the desired scroll position

var blkLine = document.querySelector('.black-line');

window.addEventListener('scroll', function() {
    // Check if the scroll position has reached the scroll start point
    if (window.pageYOffset >= scrollStartPoint) {
        // Change the opacity to make the navbar fade in
        navbar.style.opacity = '1';
        blkLine.style.opacity = '1';
    } else {
        // Change the opacity to make the navbar fade out
        navbar.style.opacity = '0';
        blkLine.style.opacity = '0';
    }
});

window.addEventListener('scroll', function() {
    var studioName = document.querySelector('.studio-name');
    var scrollPixels = window.pageYOffset;
    var fontSize = 120 - scrollPixels * 0.3; // Adjust 0.3 to control the rate of font size decrease
    fontSize = Math.max(fontSize, 40); // Change 30 to the minimum font size you want

    studioName.style.fontSize = fontSize + 'px';

    if (scrollPixels >= 500) { // Change 300 to the number of pixels after which you want to change the styles
        studioName.style.color = 'navy';
    } else {
        studioName.style.color = '';
        studioName.style.paddingTop = '';
        studioName.style.fontWeight = '';
    }

    // Check if the scroll position has reached the scroll start point
    if (scrollPixels >= scrollStartPoint) {
        // Change the top position to make the navbar start scrolling at the same speed as the studio name
        navbar.style.top = (scrollPixels - scrollStartPoint) * 0.3 + 'px'; // Adjust 0.3 to match the rate of font size decrease
    } else {
        navbar.style.top = '-100px'; // This should match the initial top position in your CSS
    }
});

window.addEventListener('load', function() {
    var polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(function(polaroid) {
        polaroid.classList.add('animate');
    });
});
