$(document).ready(function(){

var firebaseConfig = {
    apiKey: "AIzaSyBj-mAkeK3bmeBTDAUWHaBnzzz-rXCL50c",
    authDomain: "av-train-schedule.firebaseapp.com",
    databaseURL: "https://av-train-schedule.firebaseio.com",
    projectId: "av-train-schedule",
    storageBucket: "av-train-schedule.appspot.com",
    messagingSenderId: "887430134006",
    appId: "1:887430134006:web:4521021585e74fcf90d4d7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
/*====================================================================================== */
  

// Create a reference to firebase database
var database = firebase.database();

//Add event listener on Submit button
$("#submit-btn").on("click" , function() {
    event.preventDefault();

    // RETRIEVE INPUT VALUE FROM THE USER
    var trainName = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var time = moment($("#time").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency").val().trim();

    //CREATE A OBJECT that contain user data 

    var addTrain = {
        addTrainName : trainName ,
        addDestination : destination ,
        addTime : time ,
        addFrequency : frequency
    }

     //SAVE those data TO FIREBASE DATABASE
     database.ref().push(addTrain);

    //EMPTY the text-boxes for next input
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");

});

// LISTEN for changes in value and use CALLBACK to retrieve the data 
database.ref().on("child_added" , function(childSnapshot) {
    console.log(childSnapshot.val());

    var showNameTrain = childSnapshot.val().addTrainName;
    var showDestination = childSnapshot.val().addDestination;
    var firstTrainTime = childSnapshot.val().addTime;
    console.log(firstTrainTime);
    var showFrequency = moment(childSnapshot.val().addFrequency , "mm").format("mm");
    console.log (showFrequency);

    /* TEST MODEL for calculation
    * First train of the day is 3:00Am
    Assume train comes every 3 minutes (frequency) 
    Assume the current time is 3:16Am
    What time would the next train be?
    It would be 3:18 -- 2 minutes away
    
    
    SOLVED: 3:16 - 3:00 = 16 minutes
    16 % 3 = 1
    3 - 1 =2 minutes away
    2 + 3:16 = 3:18 
    */
   
    // Use moment Js to capture the current time 
    var now = moment().format('HH:mm');
    console.log(now);
   
    //Then find the difference between current time and first train time
    var diffM = moment().diff(moment(firstTrainTime, "HH:mm"), "m");
    console.log(diffM);

    // Find the remainder when you divide difference in time by frequency
    var remainder = diffM % showFrequency;
    console.log (remainder);

    //Calculate minute away by minus remainder from the frequency
    var minuteAway = moment(showFrequency ,"m").diff(moment(remainder, "m") , "m");
    console.log (minuteAway);

    // Calculate next arrival by adding minutes away to the current time
    var nextArrival = moment().add(minuteAway, "m").format("HH:mm")

    console.log (nextArrival);



    var newRow = $("<tr>").append(
        $("<td>").text(showNameTrain) ,
        $("<td>").text(showDestination) ,
        $("<td>").text(showFrequency) ,
        $("<td>").text(nextArrival) ,
        $("<td>").text(minuteAway)
    );
    // Attach table row to the table div
    $('#trainTable > tbody').append(newRow);
})












});