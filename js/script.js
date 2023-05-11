
let buttons = document.getElementsByTagName("button");


window.onload = function(){

    console.log(buttons);
    for (let index = 0; index < buttons.length; index++) {
        
        buttons[index].addEventListener("click", (event)=>{


            btnClick(event);
            
            
        })
        
    }
}

let lastClickedWasAnOperation = false;
let calcArray = [];
let currNumber = "";
function btnClick(event){

    clickedBTN = event.target; 



    if (clickedBTN.id === "enter"){

        console.log(calcArray);

                // do complicated calculation
        if (lastClickedWasAnOperation){
            calcArray.pop();
            console.log("herererererer");
        }
        else{
            calcArray.push(currNumber);
            
        }

        console.log(calcArray);
        const answer = theCalculation(calcArray);

        document.getElementById("lcd").value = answer;
        
        currNumber = answer;
        calcArray = [];
        lastClickedWasAnOperation = false;


    }
    else if (clickedBTN.id === "clear"){

        currNumber = "";
        calcArray = [];
        document.getElementById("lcd").value = "";
    }

    else{
        if (charisOperation(clickedBTN.id)){

            console.log("operation")
            if (lastClickedWasAnOperation == false){
                lastClickedWasAnOperation = true;
                calcArray.push(currNumber);
                currNumber = "";
                calcArray.push(clickedBTN.innerHTML);
                document.getElementById("lcd").value += clickedBTN.innerHTML;
            }

        }
        else if (clickedBTN.id == "comma"){
            console.log("comma!");
            currNumber += ".";
            document.getElementById("lcd").value += clickedBTN.innerHTML;
        }
        else{
            console.log("number")

            lastClickedWasAnOperation = false;
            currNumber += clickedBTN.innerHTML;
            document.getElementById("lcd").value += clickedBTN.innerHTML;
        }

    }


} 

function theCalculation(theCalc){

    let onlyPlusAndMinusLeft = doDivAndMul(theCalc);
    console.log("Multiplication and Division is done! " ,onlyPlusAndMinusLeft);
    let answer = subAndAdd(onlyPlusAndMinusLeft);

    console.log("Addition and subtraction is done!", answer);
    return answer;

}

function doDivAndMul(array){
// 5+3*2+5/2
    for (let index = 0; index < array.length; index++) {
        
        
        if (array[index] == "x"){
            
            let before = array.slice(0, index-1);
            let after = array.slice(index+2);

            newValue = (Number(array[index-1])*Number(array[index+1])).toString(); // i could implement this myself but this is a very common operation.

            before.push(newValue);
            array = before.concat(after);
            
            index -= 2;

        }
        else if (array[index] == "/"){

            let before = array.slice(0, index-1);
            let after = array.slice(index+2);

            newValue = (Number(array[index-1])/Number(array[index+1])).toString();

            before.push(newValue);
            array = before.concat(after);
            
            index -= 2;

        }
        
        
    }
    return array;
}

function subAndAdd(array){

    toReturn = 0;

    toReturn += Number(array[0]);
    for (let index = 1; index < array.length; index++) {

        if (array[index] == "+"){
            toReturn += Number(array[index+1])
        }
        else if (array[index] == "-")
        {
            toReturn -= Number(array[index+1])
        }
    }

    return toReturn.toString();
}

function charisOperation(char){

    let returnValue = false;
     if (char == "add" || char == "sub" || char == "div"|| char == "mul"){

        returnValue = true;
     }

     return returnValue;

}


