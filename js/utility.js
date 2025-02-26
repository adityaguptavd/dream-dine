// Validate functions and regexp
const dateRegExp = /^\d{2}[-/]\d{2}[-/]\d{4}$/;
const timeRegExp = /^([01]\d|2[0-3]):[0-5]\d$/;

// Date format check (DD-MM-YYYY or DD/MM/YYYY)
function isValidDate(dateString) {
    if(!dateString.match(dateRegExp)) return false;
    const [day, month, year] = dateString.split(/[-/]/);
    const date = new Date(`${year}-${month}-${day}`);
    return !(date.getMonth() == month) && !isNaN(date.getTime());
}

// Time format check (HH:MM)
function isValidTime(timeString) {
    return timeRegExp.test(timeString);
}

// Callbacks
// Handle window resizing
export function handleWindowResize(_event) {
    const nav = $('nav');
    const navUl = $('.navigation ul');
    const windowWidth = window.innerWidth;
    if(windowWidth > 980) {
        navUl.css({ 'display': 'flex', 'width': '' });
    }
    else {
        const width = nav.width();
        navUl.css({ 'display': 'none', 'width': width });
    }
}

export function scrollWindow(event) {
    const id = $(this).attr('href');
    if(id.startsWith('#')) {
        event.preventDefault();
        document.querySelector(id).scrollIntoView();
    }
}

// Toggle nav bar on small devices
export function toggleNav(_event) {
    $('.navigation ul').slideToggle();
    let isExpanded = $(this).attr("aria-expanded") === "true";
    $(this).attr('aria-expanded', !isExpanded);
    $(this).children().toggleClass('hidden');
}

// Close nav
export function closeNav(_event) {
    if($('.menu').attr('aria-expanded') === "true") {
        $('.navigation ul').slideUp();
        $('.menu').attr('aria-expanded', "false");
        $('.menu').children().toggleClass('hidden');
    }
}

// Check Availability
export function checkAvailability(event) {
    event.preventDefault();
    const {date, time} = event.target;
    let isValid = true;
    if(!isValidDate(date.value)) {
        $('#date-err').text('Invalid Date');
        $(date).css({ 'border': '2px solid red' });
        setTimeout(() => {
            $('#date-err').text('');
            $(date).removeAttr('style');
        }, 2000);
        isValid = false;
    }
    if(!isValidTime(time.value)) {
        $('#time-err').text('Invalid Time');
        $(time).css({ 'border': '2px solid red' });
        setTimeout(() => {
            $('#time-err').text('');
            $(time).removeAttr('style');
        }, 2000);
        isValid = false;
    }
    if(!isValid) return;
    $('.booking .popup, .booking .overlay').fadeIn();
}

// Function to close popups
export function closePopup(_event) {
    if(this.tagName === 'BUTTON') {
        $(this).closest('.popup').prev().hide();
        $(this).closest('.popup').hide();
    }
    else if($(this).hasClass('overlay')) {
        $(this).next().hide();
        $(this).hide();
    }
    $(this).closest('.form-section').find('form').trigger('reset');
}

// Handle subscription form submission
export function subscribe(event) {
    event.preventDefault();
    $('.subscribe .popup span').text(event.target.subscribeEmail.value)
    $('.subscribe .popup, .subscribe .overlay').fadeIn();
}

export function handleSignup(event) {
    event.preventDefault();
    $('footer .popup, footer .overlay').fadeIn();
}