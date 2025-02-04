var doorFace = document.getElementById("doorFace");
var display = document.getElementById("display");
var displayOn = document.getElementById("displayOn");
var displayOff = document.getElementById("displayOff");
var clock = document.getElementById("clock");
var clock2 = document.getElementById("clock2");
var startScreen = document.getElementById("startScreen");
var shoppingList = document.getElementById("shoppingList");
var tv = document.getElementById("tv");
var browser = document.getElementById("browser");
var listCheckboxes = document.getElementById("listCheckboxes");
var addItemToList = document.getElementById("addItemToList");
            
var isOpen = false;
var isOn = false;

displayOn.style.visibility = "hidden";
shoppingList.style.visibility = "hidden";
tv.style.visibility = "hidden";
browser.style.visibility = "hidden";
shoppingList.style.position = "static";
//Calling the showTime function every second
setInterval(showTime, 1000);

function openFridge() {
    if (isOpen == false) {
        display.style.visibility = "hidden";
        doorFace.style.backgroundImage = "url('https://www.islandmovers.com/wp-content/uploads/2020/04/how-to-move-with-a-fridge-full-of-food.jpg')";
        displayOn.style.visibility = "hidden";
        displayOff.style.visibility = "hidden";
        clock.style.visibility = "hidden";
        startScreen.style.visibility = "hidden";
        shoppingList.style.visibility = "hidden";
        tv.style.visibility = "hidden";
        browser.style.visibility = "hidden";

        //The shoppingList must have an absolute position in order to not look strange due to the startScreen.
        //However, this prevents the tv and browser images from appearing, so it must be set back to static once the shoppingList screen is closed.
        shoppingList.style.position = "static";
        isOpen = true;
    } else if (isOpen == true) {
        doorFace.style.backgroundImage = "url('')";
        if (isOn == false){
            displayOff.style.visibility = "visible";
            clock.style.visibility = "visible";
        } else {
            display.style.visibility = "visible";
            displayOn.style.visibility = "visible";
            startScreen.style.visibility = "visible";
            shoppingList.style.visibility = "hidden";
            tv.style.visibility = "hidden";
            browser.style.visibility = "hidden";
            shoppingList.style.position = "static";
            doorFace.style.background = "linear-gradient(to bottom, lightblue, white)";
        }
        isOpen = false;
    } else {
        alert("Error: The fridge is neither open nor closed. Welcome to Schrödinger's Fridge. I have no clue how you got here.")
    }
}
            
function displayOnOff() {
    if (isOpen == false) {
        if (isOn == true) {
            displayOn.style.visibility = "hidden";
            displayOff.style.visibility = "visible";
            clock.style.visibility = "visible";
            startScreen.style.visibility = "hidden";
            shoppingList.style.visibility = "hidden";
            tv.style.visibility = "hidden";
            browser.style.visibility = "hidden";
            doorFace.style.background = "grey";
            shoppingList.style.position = "static";
            isOn = false;
        } else {
            displayOn.style.visibility = "visible";
            startScreen.style.visibility = "visible";
            displayOff.style.visibility = "hidden";
            clock.style.visibility = "hidden";
            doorFace.style.background = "linear-gradient(to bottom, lightblue, white)";
            isOn = true;
        }
    }
}

function goToHome() {
    startScreen.style.visibility = "visible";
    shoppingList.style.visibility = "hidden";
    tv.style.visibility = "hidden";
    browser.style.visibility = "hidden";

    shoppingList.style.position = "static";
}

function goToShoppingList() {
    startScreen.style.visibility = "hidden";
    shoppingList.style.visibility = "visible";
    tv.style.visibility = "hidden";
    browser.style.visibility = "hidden";

    //The shoppingList must have an absolute position in order to not look strange due to the startScreen.
    shoppingList.style.position = "absolute";
}

function goToTV() {
    startScreen.style.visibility = "hidden";
    shoppingList.style.visibility = "hidden";
    tv.style.visibility = "visible";
    browser.style.visibility = "hidden";

    shoppingList.style.position = "static";
}

function goToBrowser() {
    startScreen.style.visibility = "hidden";
    shoppingList.style.visibility = "hidden";
    tv.style.visibility = "hidden";
    browser.style.visibility = "visible";

    shoppingList.style.position = "static";
}
            
function addItem() {
    //There's a problem where, if the Shopping List entries overflow the page, the layout will become stretched and discombobulated.
    //For the time being, there is a cap on the number of items allowed. 
    //It allows nine entries (with allowances for line breaks)
    if (listCheckboxes.children.length <= 16) {
        if (addItemToList.value != "") {
            var newItem = document.createElement("DIV");
            newItem.innerHTML = '<input type="checkbox"> '+ addItemToList.value;
            newItem.style.backgroundColor = "lightgrey";
            newItem.style.fontSize = "25px";
            newItem.style.paddingBottom = "5px";
            newItem.style.border = "2px solid black";
            newItem.style.borderRadius = "5px";
            listCheckboxes.appendChild(newItem);

            //Adding line breaks
            lineBreak = document.createElement("br");
            listCheckboxes.appendChild(lineBreak);
            listCheckboxes.appendChild(lineBreak);
        } else {
            alert("You did not type anything in the designated field. Try again!");
        }
    } else {
        alert("Unfortunately, at this time, the Shopping List can only support up to nine entries. We are aware of this problem and are working to fix it. Thank you for your patience.")
    }
}

//Clock
function showTime() {
    // Getting current date and time
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    mornOrAfter = "AM";
  
    // Setting time for 12 Hour intervals
    if (hour > 12) {
        hour -= 12;
        mornOrAfter = "PM";
    } else if (hour == 0) {
        hour = 12;
        mornOrAfter = "AM";
    } else if (hour == 12) {
        mornOrAfter = "PM";
    }
  
    //Formatting
    if (hour < 10) {
        hour = "0" + hour;
    } else {
        hour = hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    } else {
        minute = minute;
    }
    if (second < 10) {
        second = "0" + second;
    } else {
        second = second;
    }
  
    //Putting it all together in a display
    var currentTime = hour + ":" + minute + ":" + second + mornOrAfter;
  
    // Display the time on the clock
    clock.innerHTML = currentTime;
    clock2.innerHTML = currentTime;
}
  
showTime();