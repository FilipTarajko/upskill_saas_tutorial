/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
    var theForm = $('#pro_form');
    var submitBtn = $('#form-signup-button');
    //Set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').atrr('content') );
    //When user clicks form submit btn
    submitBtn.click(function(){
        //prevent default submission behavior
        event.preventDefault();
        
        //Collect the credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        //Send the card info to Stripe
        Stripe.createToken({}, stripeResponseHandler)
    });
    
    //Stripe will return a card token
    //Inject card token as a hidden field into form
    //Submit form to our Rails app
});