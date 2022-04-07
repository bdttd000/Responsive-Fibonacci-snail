/* Const and Variables */
const inputElement = document.querySelector('.size');
const directions = ["right", "up", "left", "down"]
const borderRadiusProp = ["0 0 100% 0", "0 100% 0 0", "100% 0 0 0" ,"0 0 0 100%"]
const contener = document.getElementById("contener");
var lastWorkingNumber;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

/* INPUT LISTENER */
inputElement.addEventListener('change', (event) => {
    if (event.target.value >= 1 && event.target.value <= 100) 
    {
        lastWorkingNumber = event.target.value
        generateFib(lastWorkingNumber)
    }
    else contener.innerHTML = "<h1>Value must be between 1 and 100!</h1>"
});

/* WINDOW LISTENER */
function resizeListener() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (lastWorkingNumber) generateFib(lastWorkingNumber)
}

window.addEventListener("resize", resizeListener);

/* RANDOM COLOR GENERATOR (field 55-255) */
function generateColor() {
    return "rgb("+((Math.random()*200)+55)+","+((Math.random()*200)+55)+","+((Math.random()*200)+55)+")"
}

/* FIBONACCI SEQUENCE GENERATOR */
function generateFib(x) 
{
    let tempArray = [0,1]
    let firstNum = 0, secondNum = 1;

    for (let i=0; i<x-1; ++i)
    {
        secondNum += firstNum
        firstNum = secondNum - firstNum
        tempArray.push(secondNum)
    }

    createDivs(tempArray)
}

/* WIDTH OF SNAIL GETTER */
function getContenerWidth(array)
{
    return (array.length % 2 == 1) ? array[array.length-1] + array[array.length-2] : array[array.length-2] + array[array.length-3]
}

/* HEIGHT OF SNAIL GETTER */
function getContenerHeight(array)
{
    return (array.length % 2 == 0) ? array[array.length-1] + array[array.length-2] : array[array.length-2] + array[array.length-3]
}

/* SNAIL'S SHELL PART GENERATOR */
function generateDiv(arrayValue, scale, counter)
{
    let temp = document.createElement("div")
    temp.style.display = "flex"
    temp.style.width = (arrayValue*scale)+"px"
    temp.style.height = (arrayValue*scale)+"px"
    temp.style.backgroundColor = generateColor();
    temp.style.borderRadius = borderRadiusProp[counter]
    return temp
}

/* SNAIL'S SHELL DRAWER */
function createDivs(array)
{
    var handler, counter = 0, scale = 0, widthScale, heightScale

    widthScale = (array.length >= 3) ? windowWidth * 0.74 / getContenerWidth(array) : windowWidth * 0.74
    heightScale = (array.length >= 3) ? windowHeight * 0.74 / getContenerHeight(array) : windowHeight * 0.74
    scale = (widthScale > heightScale) ? heightScale : widthScale

    array.forEach(element => {
        if (element == 0) return

        if (element == 1 && !handler) 
        {
            handler = generateDiv(element, scale, 3)
            if (array.length == 2) contener.appendChild(handler)
            return
        }

        temp = document.createElement("div")
        temp.style.display = "flex"
        temp.style.flexDirection = (directions[counter] == "right" || directions[counter] == "left") ? "row" : "column"

        tempInside = generateDiv(element, scale, counter)

        if (handler) 
        {
            temp.appendChild(handler)
            if (directions[counter] == "left" || directions[counter] == "up") temp.insertBefore( tempInside,handler)
            else temp.appendChild(tempInside)
        }

        handler = temp;
        counter++
        if (counter == 4) counter = 0
    });

    contener.innerHTML = ""
    contener.appendChild(handler)
}