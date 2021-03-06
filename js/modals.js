// Get the options-modal
var $options_modal = $("#options");

// Get the rules-modal
var $rules_modal = $("#rules");

// Get the options-button that opens the modal
var $options_btn = $("#options_button");

// Get the rules-button that opens the modal
var $rules_btn = $("#rules_button");

// Get the options_close element that closes the modal
var $options_close = $("#options_close");

// Get the rules_close element that closes the modal
var $rules_close = $("#rules_close");



// When the user clicks on (x), close the options_modal
$options_close.click(function() {
    $options_modal.css("display", "none");
})

// When the user clicks on (x), close the rules_modal
$rules_close.click(function() {
    $rules_modal.css("display", "none");
})



// When the user clicks anywhere outside of the modal, close it
$(window).click(function(event) {
    if (!$(event.target).closest(".modal_content").length && !$(event.target).is($(".modal_button"))) {
        $options_modal.css("display", "none");
        $rules_modal.css("display", "none");
    } 
})



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