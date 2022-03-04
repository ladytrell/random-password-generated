/*

Functions:  Write prompts as confirms for yes or no for character types
            Only prompt for chase if alphabetical charactors confirmed
            Prompt for password length
            Return object of selected password options
Function:   Validate responses, prompt again if needed
Function: 
*/

var validateLength = function (passwordLength) {
  // convert input to integet

  if( 8 <= passwordLength  && passwordLength <= 128){
    return true;
  }

  alert("Please a valid password length.");
  return false;
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
  
  return prompts;
};

var collectPasswordOptions = function (prompts, passwordDetails) {
  // track selected type to confirm at lease one type selected  
  var typeCount = 0;  
  
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
        do {
          input = parseInt(window.prompt(prompts[i].promptTxt)); 
        } while (!validateLength(input));

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

    //Repeat loop if no character option was selected
    if (i == prompts.length - 1 && !typeCount){
      i = -1;
      alert("Select at least one character option");
    }
  } //End of For loop
  
  return passwordDetails;
};

// generate random number from 0 to 9
var selectDigit = function (min, max) {
  return (Math.floor(Math.random() * (max - min) + min));
};

// select random alphabet
var selectLetter = function (upperCase, lowerCase) {
  var lowerCaseLet = 'abcdefghijklmnopqrstuvwxyz';
  var position = selectDigit(0, lowerCaseLet.length);
  var newLetter = lowerCaseLet.charAt(position);
  if (upperCase) {
    if(selectDigit(0, 2)) {
      newLetter = newLetter.toUpperCase();
    }
  }
  if(!lowerCase) {
    newLetter = newLetter.toLowerCase();
  }

  return newLetter;
};

// Select special characters
var selectSpecial = function () {
  var specialLet = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\" ?";
  var position = selectDigit(0, specialLet.length);  
  
  return specialLet.charAt(position);
}

var generatePassword = function() {
  // Object for user selected criteria
  var passwordDetails = {
    "length": 0,
    "upperCase": false,
    "lowerCase": false,
    "number": false,
    "special": false
  }

  var password = '';

  var promptContent = promptPasswordDetails();
  collectPasswordOptions(promptContent, passwordDetails); 
  console.log(passwordDetails);
  
  //Use passwordCritia and random fuctions to select characters for passwod
  //Validate generated password meets critia
    //Adjust password if needed to meet critia

  var newCharacter = '';
  
  while (password.length < passwordDetails.length) {  
     
    switch (selectDigit(0, 3)) {
      case 0:
        if(passwordDetails.number) { newCharacter = selectDigit(0, passwordDetails.length); }
        break;
      case 1:
        if(passwordDetails.upperCase || passwordDetails.lowerCase) {
          newCharacter = selectLetter(passwordDetails.upperCase, passwordDetails.lowerCase);
        }
        break;
      case 2:
        if(passwordDetails.special) { newCharacter =  selectSpecial(); }
    }
    
    password = password + newCharacter;
  }

  return password;
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
generateBtn.addEventListener("click", writePassword);