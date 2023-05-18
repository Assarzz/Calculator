
const buttons = document.getElementsByTagName("button");

class ArrayItem {

    constructor(type, value, hasComma = false,) {
        this.type = type
        this.value = value
        this.hasComma = hasComma
    }
}

window.onload = function () {

    for (let index = 0; index < buttons.length; index++) {

        buttons[index].addEventListener("click", (event) => {

            btnClick(event);

        })

    }
}

let lastClickedWasAnOperation = false;
let calcArray = [];
let currNumberItem = new ArrayItem("Number", 0)

function btnClick(event) {

    clickedBTN = event.target;

    if (clickedBTN.id === "enter") {

        if (lastClickedWasAnOperation) {
            calcArray.pop();
            // dont need to push currNumber since that will have already been done when the now deleted operation was first added.
        }
        else {
            calcArray.push(currNumberItem);
            // i Have to add the current number the the calcArray since it hasn't been added yet.
        }

        const answer = theCalculation(calcArray); // this produces the answer to display. It takes an array of alternating numbers and operations.
        let temp = answer.toString();
        let comma = false;
        for (let index = 0; index < temp.length; index++) {
            if (temp[index] == ".") {
                comma = true; // The previous information for each number Arrayitem (if they had comma or not) was lost, so i have to manually check. 
            }

        }
        document.getElementById("lcd").value = answer;
        currNumberItem = new ArrayItem("Number", answer, comma, howManyDecimalsDoesNumberHave(answer)); // by putting the calculated answer as the currant item and emptying the calcArray, I can use the calculated answer in new calcualtion.
        calcArray = [];
        lastClickedWasAnOperation = false;


    }
    else if (clickedBTN.id === "clear") { // Very easy to implement, All memory variables are reset as well as the displayed calcualtion.

        currNumberItem = new ArrayItem("Number", 0); 
        calcArray = [];
        document.getElementById("lcd").value = "";
    }

    else if (charisOperation(clickedBTN.id)) {

        if (lastClickedWasAnOperation == false) { // lastClickedWasAnOperation variable prevents user from clicking on an operation twice in a row, as that would break the program.
            lastClickedWasAnOperation = true;
            calcArray.push(currNumberItem);
            currNumberItem = new ArrayItem("Number", 0);
            calcArray.push(new ArrayItem("Operation", clickedBTN.innerHTML));
            document.getElementById("lcd").value += clickedBTN.innerHTML;
        }

    }

    else if (clickedBTN.id == "comma") {
        if (!currNumberItem.hasComma) { // I implemented the ArratItem class solely because i wanted to be able to keep track if each item had comma or not. This is important because the comma shouldn't be used more than once for each number.
            currNumberItem.hasComma = true;
            document.getElementById("lcd").value += ".";
        }

    }

    else {
        console.log("number")
        lastClickedWasAnOperation = false;

        // here is code for a feture that could easily be done by converting number to string; however i felt that was cheating.
        // When clicking on a number the currant number should get larger. The system for this changes depending on if the currant number has a comma or not.
        if (currNumberItem.hasComma) {
            console.log("currnumber: ", currNumberItem.value)

            if (currNumberItem.value >= 0){
                currNumberItem.value += Number(clickedBTN.innerHTML) * Math.pow(10, (-howManyDecimalsDoesNumberHave(currNumberItem.value)) - 1) 

            }
            else{ // This needs to be done when i add to a negative number instead.
                currNumberItem.value -= Number(clickedBTN.innerHTML) * Math.pow(10, (-howManyDecimalsDoesNumberHave(currNumberItem.value)) - 1) 

            }


        }
        else {
            currNumberItem.value = (currNumberItem.value * 10) + Number(clickedBTN.innerHTML);
        }
        document.getElementById("lcd").value += clickedBTN.innerHTML;

    }

}


function theCalculation(theCalc) { // This function takes array of numbers and operations and returns one number.

    
    // According to precedence rules, multiplication and division come before addtion and subtraction; therefore, i do these in two separate steps.
    let onlyPlusAndMinusLeft = doDivAndMul(theCalc);
    let answer = subAndAdd(onlyPlusAndMinusLeft);

    return answer;

}

function doDivAndMul(array) {
    for (let index = 0; index < array.length; index++) {


        if (array[index].value == "x") { // I look for Arraitems with value of "x". if i find one i know the the item before and after should be multiplied. "x" will never be found first or last, so an exception will not be thrown.

            let before = array.slice(0, index - 1); // the arry before and after the two numbers should be joined with the new product in the middle.
            let after = array.slice(index + 2);

            newValue = new ArrayItem("Number", (array[index - 1].value * array[index + 1].value));

            before.push(newValue);
            array = before.concat(after);

            index -= 2; // since 2 numbers and 1 operation has produced 1 number(3 turned into 1), index needs to be decreased by 2.

        }
        else if (array[index].value == "/") { // the exact same except for changing "x" to "/"

            console.log("test!")
            let before = array.slice(0, index - 1);
            let after = array.slice(index + 2);

            newValue = new ArrayItem("Number", (array[index - 1].value / array[index + 1].value));

            before.push(newValue);
            array = before.concat(after);

            index -= 2;

        }


    }
    return array;
}

function subAndAdd(array) { // This last step is very easy. I no longer need to worry about priority so i can just add or subtract terms to the toReturn variable.
    
    let toReturn = 0;
    let Comma = false;

    toReturn += array[0].value;
    for (let index = 1; index < array.length; index++) {


        if (array[index].value == "+") {
            toReturn += array[index + 1].value
        }
        else if (array[index].value == "-") {
            toReturn -= array[index + 1].value
        }
    }

    return toReturn
}

function charisOperation(char) { // Checks the clicked button's id for if it is operation (returns true if an operation has been pressed)

    
    let returnValue = false;
    if (char == "add" || char == "sub" || char == "div" || char == "mul") {

        returnValue = true;
    }

    return returnValue;

}

function howManyDecimalsDoesNumberHave(number) { // returns the number of deciamls a number has. It is useful when i have to add to a number which has a comma.

    let decimals = 0
    if (number != Math.floor(number)){

        decimals = (number.toString()).split('.')[1].length 
    }
    else{
        decimals = 0
    }

    console.log("decimals of currnumber; ", decimals)
    return decimals;

}


