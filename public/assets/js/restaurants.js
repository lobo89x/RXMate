
var userName = $("#signin-username");
var password = $("#signin-pw");

var userNameSu = $("#signup-username");
// address: ,
var emailSu = $("#signup-email");
var ageSu = $("#signup-age");
var passwordSu = $("#signup-pw");


// Sign-In Function
$("#signin-submit").on("click", function(event) {

    console.log("Index");
    console.log("Start Sign-In");

    event.preventDefault();

    // Function to see if checkbox is selected
    // Function to write cookie to browser if selected
    // JWT technology once able to write to cookie and log in through that manner

    // handleAuthorFormSubmit(event);

    var signIn = {

        user_name: $("#signin-username").val().trim(),
        password: $("#signin-pw").val().trim()

    }

    $.ajax("/api/sign-in", {
        type: "POST",
        data: signIn
    })
        .then(function() {
            console.log("Signing in!");

            location.reload()
        });

});

// function handleAuthorFormSubmit(event) {
//     event.preventDefault();
//     // Don't do anything if the name fields hasn't been filled out
//     if (!userName.val().trim().trim()) {
//       return;
//     }
//     console.log(userName.val().trim());
//     console.log(password.val().trim());
//     // Calling the upsertAuthor function and passing in the value of the name input
//     upsertAuthor({
//         user_name: userName
//         .val()
//         .trim(),
//       password: password
//         .val()
//         .trim()
//     });
// }

// function upsertAuthor(authorData) {
//     $.post("/api/authors", authorData)
//         // .then(getAuthors);
// }




// Sign-Up Function
$("#signup-submit").on("click", function(event) {

    console.log("Index");
    console.log("Start Sign-Up");

    event.preventDefault();

    // Validate checkbox
    // if( $("#signup-stay").val() == "true" ) {

    //     Cookies.set("name", {

    //         user_name: $("#signup-username").val().trim(),
    //         // address: ,
    //         email: $("#signup-email").val().trim(),
    //         age: $("#signup-age").val().trim(),
    //         password: $("#signup-pw").val().trim()

    //     })
    // }

    // console.log(JSON.stringify(Cookies.get()));

    var newUser = {
        user_name: $("#signup-username").val().trim(),
        // address: ,
        email: $("#signup-email").val().trim(),
        age: $("#signup-age").val().trim(),
        password: $("#signup-pw").val().trim()
    };

    console.log(newUser);

    // Ajax Create User
    $.ajax("/api/newUser", {
        type: "POST",
        data: newUser
    })
        .then(function() {
            console.log("New user created!");

            // location.reload();
        });

});

// Show Radio Button Sections
var pillDiv = $("#pill-quantity-div");
var pillInput = $("#meds-type-pills");
var liquidDiv = $("#liquid-quantity-div");
var liquidInput = $("#meds-type-liquid");

$("#meds-type-pills").on("click", function() {

    pillDiv.removeClass("d-none");
    pillInput.val("true");
    liquidInput.val("false");

    console.log("Show pill div");

    if( liquidDiv.hasClass("d-none") === false ) {

        liquidDiv.addClass("d-none");
        console.log("Hide Liquid");

    }
});

$("#meds-type-liquid").on("click", function() {

    liquidDiv.removeClass("d-none");
    liquidInput.val("true");
    pillInput.val("false");

    console.log("Show liquid div");

    if( pillDiv.hasClass("d-none") === false ) {

        pillDiv.addClass("d-none");
        console.log("Hide Pill");

    }
});

// users, prescription, schedule

// Create Medicine Function
$("#form-submit").on("click", function(event) {

    console.log("Searches");
    console.log("Start Create Medicine");

    event.preventDefault();

    if( pillInput.val() === "true" ) {
        // Pill Prescription
        var newSchedule = {

            // Medicine type, quantity per dose, frequency of dose
            frequency: $("#medicine-pill-frequency").val().trim(),
            frequencyUnit: $("#medicine-pill-frequencyUnit").val().trim(),

            comments: $("#medicine-comments").val().trim()
            
        }

        var newPrescription = {

            name: $("#medicine-name").val().trim(),
            // details: ,
            // image: ,
            dosage: $("#medicine-pill-quantity").val().trim(),
            dosageUnit: "pill"

        }

    } else {

        // Liquid Prescription
        var newSchedule = {

            // Liquid time units
            frequency: $("#medicine-liquid-frequency").val().trim(),
            frequencyUnit: $("#medicine-liquid-frequencyUnit").val().trim(),

            comments: $("#medicine-comments").val().trim()
            
        }

        var newPrescription = {

            name: $("#medicine-name").val().trim(),
            // details: ,
            // Details accomplished by comments?
            // image: ,
            // Liquid amount and unit measure per dose
            dosage: $("#medicine-liquid-quantity").val().trim(),
            dosageUnit: $("#medicine-liquid-units").val().trim()

        }

    }

    console.log(JSON.stringify(newPrescription));
    console.log(JSON.stringify(newSchedule));

    $.ajax("/api/newPrescription", {

        type: "POST",
        data: {
            newPrescription,
            newSchedule
        }

    })
        .then(function() {

            console.log("Creating new prescription");

            location.reload();

        });

});


// Update Medicine Function



// Delete Medicine Function

function staySignedIn(event) {


}

// Sign-in Checkbox check
$("#signin-stay").on("click", function(event) {

    if( $(this).val() == "true") {

        $(this).val("false");

    } else {

        $(this).val("true");

    }
});


// Sign-up Checkbox check
$("#signup-stay").on("click", function(event) {

    if( $(this).val() == "true") {

        $(this).val("false");

    } else {

        $(this).val("true");

    }
});