var token = null; // Define token globally

function getCookie(name) {
    // Escape the cookie name for use in a regular expression
    var nameEQ = encodeURIComponent(name) + "=";
    // Split document.cookie at semicolons
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        // Remove any leading whitespace from the cookie string
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        // Check if the cookie string has the name we're looking for
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    // Return null if the cookie was not found
    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    // Assume server renders a hidden input or meta tag if user is logged in
    token = getCookie('token'); // Set token globally
    var isLoggedIn = token !== null && token !== '';

    var login = document.getElementById('login');
    var register = document.getElementById('register');
    var solve = document.getElementById('solve');
    var funds = document.getElementById('funds');
    var account = document.getElementById('account');
    console.log(token);

    if (isLoggedIn) {
        solve.style.display = 'inline-block';
        funds.style.display = 'inline-block';
        account.style.display = 'inline-block';
        login.style.display = 'none';
        register.style.display = 'none';
    } else {
        solve.style.display = 'none';
        funds.style.display = 'none';
        account.style.display = 'none';
        login.style.display = 'inline-block';
        register.style.display = 'inline-block';
    }
}); 
