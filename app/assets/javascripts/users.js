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
        submitBtn.val("Processing").property('disabled', true);
        
        //Collect the credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
        //Use Stripe JS library to check for card errors
        var error = false;
        
        //Validate card number
        if(!Stripe.card.validateCardNumber(ccNum)){
            error = true;
            alert('The credit card number appears to be invalid');
        }
        //Validate cvc
        if(!Stripe.card.validateCVC(cvcNum)){
            error = true;
            alert('The CVC number appears to be invalid');
        }
        //Validate expiration date
        if(!Stripe.card.validateExpiry(expMonth,expYear)){
            error = true;
            alert('The expiration date appears to be invalid');
        }
        
        if(error){
            //If there are card errors, don't send to Stripe
            submitBtn.prop('disabled',false).val("Sign up");
        } else {
             //Send the card info to Stripe
            Stripe.createToken({
                number: ccNum,
                cnc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
       
        
        return false;
    });
    
    //Stripe will return a card token
    function stripeResponseHandler(status, response){
        //Get the token from the response
        var token = response.id;
        //Inject card token in a hidden field
        theForm.append( $('<input type="hidden" name="user[stripe_card_user]">').val(token) );
        //Submit form to our Rails app
        theForm.get(0).submit()
    }
});