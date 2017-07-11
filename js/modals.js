// variables
var $options_modal = $("#options");

// Get the reg-modal
var $rules_modal = $("#rules");

// Get the login-button that opens the modal
var $options_btn = $("#options_button");

// Get the reg-button that opens the modal
var $rules_btn = $("#rules_button");

// Get the login_close element that closes the modal
var $options_close = $("#options_close");

// Get the reg_close element that closes the modal
var $rules_close = $("#rules_close");



// When the user clicks on (x), close the options_modal
$options_close.click(function() {
    $options_modal.css("display", "none");
})

// When the user clicks on (x), close the rules_modal
$rules_close.click(function() {
    $rules_modal.css("display", "none");
})



/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx vmi miatt nem működik xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
// When the user clicks anywhere outside of the modal, close it
$(window).click(function(event) {
    if (event.target === $options_modal || event.target === $rules_modal) { 
        $options_modal.css("display", "none");
        $rules_modal.css("display", "none");
    }
})
/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx vmi miatt nem működik xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */



//when the user push the esc button, the modal closes
$(window).keydown(function(event) {
    if (event.keyCode === 27) {
        $options_modal.css("display", "none");
        $rules_modal.css("display", "none");
    }
})



// When the user clicks on the button, open the options_modal
$options_btn.click(function() {
    $options_modal.css("display", "block");
})

// When the user clicks on the button, open the rules_modal
$rules_btn.click(function() {
    $rules_modal.css("display", "block");
})



//close the options_modal if the user clicks on save
$("#save_and_play").click(function() {
    $options_modal.css("display", "none");
})