import { checkAvailability, closeNav, closePopup, handleSignup, handleWindowResize, scrollWindow, subscribe, toggleNav } from "./utility.js";

$(function() {
    // On refresh or page load call
    handleWindowResize();

    // On resizing window
    $(window).on('resize', handleWindowResize);
    
    // On click of toggle button
    $('.menu').on('click', toggleNav);

    // Handle link clicks
    $('a').on('click', scrollWindow);

    // Close nav on click in small devices
    $('nav a').on('click', closeNav);

    // On booking seat
    $('.booking form').on('submit', checkAvailability);

    // Hide popup on button or overlay click
    $('.popup button, .overlay').on('click', closePopup);
    
    // In subscribe message, Count the input characters and update in DOM
    $('.subscribe textarea').on('input', function() {
        $('.subscribe output span').html($(this).val().length);
    });

    // Handle subscription form submission
    $('.subscribe form').on('submit', subscribe);

    // Handle signup up
    $('footer form').on('submit', handleSignup);
});