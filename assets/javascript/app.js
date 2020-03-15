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
    var time = $("#time").val().trim();
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
    var showTime = childSnapshot.val().addTime;
    var showFrequency = childSnapshot.val().addFrequency;

    var newRow = $("<tr>").append(
        $("<td>").text(showNameTrain) ,
        $("<td>").text(showDestination) ,
        $("<td>").text(showTime) ,
        $("<td>").text(showFrequency)
    );
    // Attach table row to the table div
    $('#trainTable > tbody').append(newRow);
})












});