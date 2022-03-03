/*

Functions:  Write prompts as confirms for yes or no for character types
            Only prompt for chase if alphabetical charactors confirmed
            Prompt for password length
            Return object of selected password options
Function:   Validate responses, prompt again if needed
Function: 
*/

var validateLength = function () {
  // convert input to integet
  return ;
};

// Assignment code here
var valdateDetails = function (pwdDetails, count) {

  // validated and at least one character type should be selected
};

var promptPasswordDetails = function() {
  //Prompted for the length of the password at least 8 characters and no more than 128 characters
  //Prompt for character types use confirm whether or not to include lowercase, uppercase, numeric, 
    // and/or special characters

  //Array of prompts per password criteria
  var prompts = [
    {'value': "length",
    'promptTxt': "Enter a value from 8 to 128 for the password lengh",
    'queryType': "PROMPT"},
    {'value': "upperCase",
    'promptTxt': "Include uppercase letters (A-Z)?",
    'queryType': "CONFIRM"},
    {'value': "lowerCase",
    'promptTxt': "Include lowercase letters (a-z)?",
    'queryType': "CONFIRM"},
    {'value': "number",
    'promptTxt': "Include numbers (0-9)",
    'queryType': "CONFIRM"},
    {'value': "special",
    'promptTxt': "Include special characters \" !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\" ?",
    'queryType': "CONFIRM"}  
  ];
  console.log(prompts);
  return prompts;
};

var collectPasswordOptions = function (prompts, passwordDetails) {
  // track selected type to confirm at lease one type selected  
  var typeCount = 0;
  
  //debugger;
  // Display prompts
  for (var i = 0; i < prompts.length; i++) {
     var input;
     if (prompts[i].queryType === "CONFIRM"){
      input = window.confirm(prompts[i].promptTxt);
      if(input) {
        typeCount++;
      }
     } else{
       // Loop until valid content is entered
      //do {
        input = window.prompt(prompts[i].promptTxt); 
      //} while (!validateLength(input));

     }

     //Switch to set passwordDetails
     switch(prompts[i].value) {
      case "length":                       
        passwordDetails.length = input;
        break;
      case "upperCase":
        passwordDetails.upperCase = input;
        break;
      case "lowerCase":
        passwordDetails.lowerCase = input;
        break;
      case "number":
        passwordDetails.number = input;
        break;
      case "special":
        passwordDetails.special = input;
        break;
      default:
        break;
    }
  }
  
  return passwordDetails;
};

var generatePassword = function() {
  // Object for user selected criteria
  var passwordDetails = {
    "length": 0,
    "upperCase": false,
    "lowerCase": false,
    "number": false,
    "special": false
  }
  console.log(passwordDetails);
  //Use passwordCritia and random fuctions to select characters for passwod
  //Validate generated password meets critia
    //Adjust password if needed to meet critia

  var promptContent = promptPasswordDetails();
  collectPasswordOptions(promptContent, passwordDetails); 
  console.log(passwordDetails);
  
  return 0;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);

generatePassword();