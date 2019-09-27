// Sign-up variables
var userNameInput = $("#signup-username");
// address: ,
var emailInput = $("#signup-email");
var ageInput = $("#signup-age");
var passwordInput = $("#signup-pw");

// Radio button variables
var pillDiv = $("#pill-quantity-div");
var pillInput = $("#meds-type-pills");
var liquidDiv = $("#liquid-quantity-div");
var liquidInput = $("#meds-type-liquid");

// Pill variables
var pillFrequency = $("#medicine-pill-frequency");
var pillFrequencyUnit = $("#medicine-pill-frequencyUnit");
var pillDosage = $("#medicine-pill-quantity");
var pillDosageUnit = "pill";

// Liquid vaiables
var liquidFrequency = $("#medicine-liquid-frequency");
var liquidFrequencyUnit = $("#medicine-liquid-frequencyUnit");
var liquidDosage = $("#medicine-liquid-quantity");
var liquidDosageUnit = $("#medicine-liquid-units");

// Global form variables
var prescriptionName = $("#medicine-name");
var prescriptionComments = $("#medicine-comments");
var prescriptionFor = $("#prescriptionFor");

// Card variables
var usernameSelectedCard = $("#dropdown-items")

// Click/submit function execution
$(document).on("click", "#signup-submit", createUser);
$(document).on("click", "#form-submit", createPrescription);
// $(document).on("click", "#form-submit", createSchedule);
$(document).on("click", ".custom-control-input", changeRadios);

// Sign-in function
// function signinUser(event) {

//     console.log("start sign-in")

//     event.preventDefault();



//     // Prevent empty fields
//     if(  !userName.val().trim()
//         ) {
//         if(!password.val().trim()){
//             console.log("Missing Fields");
//             return;
            
//         }
//     }

//     console.log("capture info");

//     var userInput = {

//         username: userName
//             .val()
//             .trim(),
//         password: password
//             .val()
//             .trim()

//     }
    
//     console.log();
// };

function createUser(userInput) {

    console.log("start sign-up")

    event.preventDefault();

    // Prevent empty fields
    if( !userNameInput.val().trim().trim() ){
        
        userNameInput.addClass("alert alert-danger");
        console.log("Missing username");

        if( !emailInput.val().trim().trim() ) {

            emailInput.addClass("alert alert-danger");
            console.log("Missing email");

            if( !ageInput.val().trim().trim() ){

                ageInput.addClass("alert alert-danger");
                console.log("Missing age");

                if( !passwordInput.val().trim().trim() ){

                    passwordInput.addClass("alert alert-danger");
                    console.log("Missing password");

                    return;
                } else {

                    console.log("All Fields valid. Remove class and val");

                    userNameInput.removeClass("alert alert-danger").val("");
                    emailInput.removeClass("alert alert-danger").val("");
                    ageInput.removeClass("alert alert-danger").val("");
                    passwordInput.removeClass("alert alert-danger").val("");
                }
            }
        }
    }

    console.log("capture info");

    var userInput = {

        username: userNameInput
            .val()
            .trim(),
        email: emailInput
            .val()
            .trim(),
        age: ageInput
            .val()
            .trim(),
        password: passwordInput
            .val()
            .trim()

    }

    console.log(userInput)

    $.post("/api/newUser", userInput)

    location.reload();
        
}

function createPrescription(event) {

    console.log("start new prescription")

    event.preventDefault();

    // not funcitoning as designed
    checkIfEmpty();

    console.log("capture info");

    // Function below to capture form inputs
    var userInput = getFormInput();

    console.log(userInput);
    // console.log(userInput.schedule);

    $.post("/api/newPrescription", userInput);
    console.log("done 1")
    // $.post("/api/newSchedule", userInput.schedule);
    // console.log("done 2")
}

function createSchedule(event) {

    console.log("start new prescription")

    event.preventDefault();

    // not funcitoning as designed
    checkIfEmpty();

    console.log("capture info");

    // Function below to capture form inputs
    var userInput = getFormInput();

    console.log(userInput);
    console.log(userInput.prescription);

    // $.post("/api/newPrescription", userInput.prescription);
    // console.log("done 1")
    $.post("/api/newSchedule", userInput.schedule);
    console.log("done 2")
}


function checkIfEmpty(){

    // Prevent empty fields - Name
    if( 
        !prescriptionName.val().trim().trim() 
     ) {

        console.log("Missing Name");

        // Prevent empty fields - Frequency
        if(
            !pillFrequency.val().trim().trim() 
            && !liquidFrequency.val().trim().trim()
        ) {
    
            console.log("Missing Frequency");
    
            // Prevent empty fields - Frequency Unit
            if(
                !pillFrequencyUnit.val().trim().trim() 
                && !liquidFrequencyUnit.val().trim().trim()
            ) {
        
                console.log("Missing Frequency Unit");
        
                // Prevent empty fields - Comments
                if(
                    !prescriptionComments.val().trim().trim() 
                ) {
            
                    console.log("Missing Comments");
            
                    // Prevent empty fields - Dosage
                    if(
                        !pillDosage.val().trim().trim() 
                        && !liquidDosage.val().trim().trim()
                    ) {
                
                        console.log("Missing Dosage");
                
                        // Prevent empty fields - Dosage Unit
                        if(
                            !liquidDosageUnit.val().trim().trim()
                        ) {
                    
                            console.log("Missing Dosage Unit");
                            return;
                    
                        }
                    }
                }
            }
        }
    }






}

function changeRadios() {

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

}

changeRadios();

function getFormInput(userInput) {

    console.log("Start info capture");

    if( pillInput.val() === "true" ) {

        console.log("Start pill capture");

        // // Pill Prescription
        // var schedule = {

        //     // Medicine type, quantity per dose, frequency of dose
        //     name: prescriptionName
        //         .val()
        //         .trim(),
        //     frequency: pillFrequency
        //         .val()
        //         .trim(),
        //     frequencyUnit: pillFrequencyUnit
        //         .val()
        //         .trim(),

        //     comments: prescriptionComments
        //         .val()
        //         .trim(),
        //     UserId: prescriptionFor
        //         .val()
        //         .trim()
            
        // }

        var prescription = {

            name: prescriptionName
                .val()
                .trim(),
            frequency: pillFrequency
                .val()
                .trim(),
            frequencyUnit: pillFrequencyUnit
                .val()
                .trim(),

            comments: prescriptionComments
                .val()
                .trim(),
            
            // image: ,
            dosage: pillDosage
                .val()
                .trim(),
            dosageUnit: pillDosageUnit,
            //Recomit
            UserId: prescriptionFor
                .val()
                .trim()

        }

        userInput = prescription;
        

        console.log("User input");
        console.log(JSON.stringify(userInput));

        console.log("newSchedule");
        console.log(JSON.stringify(userInput.newSchedule));

        console.log("newPrescription");
        console.log(JSON.stringify(userInput.newPrescription));

        console.log("Beginning return");

    } else {

        console.log("Start liquid capture");

        // // Liquid Prescription
        // var schedule = {

        //     // Liquid time units
        //     name: prescriptionName
        //         .val()
        //         .trim(),
        //     frequency: liquidFrequency
        //         .val()
        //         .trim(),
        //     frequencyUnit: liquidFrequencyUnit
        //         .val()
        //         .trim(),

        //     comments: prescriptionComments
        //         .val()
        //         .trim(),

        //     UserId: prescriptionFor
        //         .val()
        //         .trim()
            
        // }

        var prescription = {

            name: prescriptionName
                .val()
                .trim(),
            frequency: liquidFrequency
                .val()
                .trim(),
            frequencyUnit: liquidFrequencyUnit
                .val()
                .trim(),
            comments: prescriptionComments
                .val()
                .trim(),
            // image: ,
            dosage: liquidDosage
                .val()
                .trim(),
            dosageUnit: liquidDosageUnit
                .val()
                .trim(),
            UserId: prescriptionFor
                .val()
                .trim()

        }

        userInput = prescription;

        //userInput.push(schedule);
        //userInput.push(prescription);

        console.log("User input");
        console.log(JSON.stringify(userInput));

        console.log("newSchedule");
        // console.log(JSON.stringify(userInput.newSchedule));

        console.log("newPrescription");
        console.log(JSON.stringify(userInput.newPrescription));

        console.log("Beginning return");

    }

    console.log("User input");
    console.log(JSON.stringify(userInput));



    return userInput;
}

function generateCards() {

    console.log("Start card generation");

    console.log("Capture value");

    var generateUserCards = {

        username: usernameSelectedCard
            .val()
            .trim() 
    }

    console.log("Captured value: ", generateUserCards);

    $.post("/api/all-prescriptions", generateUserCards);
}

var intervalId;
// function to get  current date and time 
function displayClock(){
  //this will display the current date and time
  
  intervalId = setInterval(()=>{
    console.log("b4 timer");
    timer();
  }, 1000); 
};

function timer(){
  var currentDate = "";
  var dateVar = new Date();
  currentDate += dateVar.toDateString() + " " + dateVar.toLocaleTimeString();
  // set the clock on the page
  document.getElementById('clock').innerHTML = currentDate;
}
// function to be called in the cleanup routine
function endTimer(){
  clearInterval(intervalId);
}

displayClock();
