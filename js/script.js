
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

                // do complicated calculation
        if (charisOperation(calcArray[calcArray.length-1])){
            calcArray.pop();
        }
        else{
            calcArray.push(currNumber);
        }

        console.log(calcArray);
        const answer = theCalculation(calcArray);

        document.getElementById("lcd").value = answer;


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
        else{
            lastClickedWasAnOperation = false;
            currNumber += clickedBTN.innerHTML;
            document.getElementById("lcd").value += clickedBTN.innerHTML;
        }

    }


} 

function theCalculation(theCalc){

    let onlyPlusAndMinusLeft = doDivAndMul(theCalc);
    console.log("Div and muliplikation is done! " ,onlyPlusAndMinusLeft);
    let answer = subAndAdd(onlyPlusAndMinusLeft);

    console.log("sub and and?", answer);
    return answer;

}

function doDivAndMul(array){
// 5+3*2+5/2
    for (let index = 0; index < array.length; index++) {
        
        
        if (array[index] == "x"){
            
            let before = array.slice(0, index-1);
            let after = array.slice(index+2);

            newValue = (Number(array[index-1])*Number(array[index+1])).toString();

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


