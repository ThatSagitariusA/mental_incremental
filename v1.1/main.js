var research = 0;
var assistantNum = 0;
var nanoResearch = 0;
var spentResearch = 0;
var statsIsOpen = false;
var nextAssistantCost = 10;
var saveTimer = 0;

function save(){
    var save = {
        research: research,
        assistantNum: assistantNum,
        nextAssistantCost: nextAssistantCost,
        nanoResearch: nanoResearch
    }
    localStorage.setItem("save", JSON.stringify(save));
    ga('send', 'event', 'MentalIncremental', 'Save');
}
function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if(typeof savegame.research !== undefined){
        research = savegame.research;
        document.getElementById("research").innerHTML = research;
    }
    if(typeof savegame.assistantNum !== undefined){
        assistantNum = savegame.assistantNum;
        document.getElementById("assistantNum").innerHTML = assistantNum;
    }
    if(typeof savegame.nextAssistantCost !== undefined){
        nextAssistantCost = savegame.nextAssistantCost;
        document.getElementById("assistantCost").innerHTML = nextAssistantCost;
    }else {
        nextAssistantCost = 10;
    }
    if(typeof savegame.nanoResearch !== undefined){
        nanoResearch = savegame.nanoResearch;
    }
}
function deleteSave(){
    localStorage.removeItem("save");
}
function prettifyNum(number, savedDecimals){
    var multiplier = 1;
    if(savedDecimals !== 0 | 1 | 2 | 3 | 4 | 5 ){
        return 73311337;
    }else {
        
        for(var i = 0; i < savedDecimals; i++){
            multiplier = JSON.parse( multiplier + "0");
        }
    }
    var output = Math.round(number * multiplier);
    return output;
}
function researchClick(number){
    research += number;
    document.getElementById("research").innerHTML = research;
    //document.getElementById("researchMade").innerHTML = research;
};
function buyAssistant(){
    var assistantCost = Math.floor(10 * Math.pow(1.1,assistantNum));     //works out the cost of this assistant
    if(research >= assistantCost){                                   //checks that the player can afford the assistant
        assistantNum = assistantNum + 1; //increases number of assistants
        console.log(assistantNum);
        research = research - assistantCost;                                   //removes the research spent
        spentResearch += assistantCost ;                                   //updates research spent                        
        document.getElementById("assistantNum").innerHTML = assistantNum;  //updates the number of assistants for the user
        document.getElementById("research").innerHTML = research;  //updates the number of research for the user
        //document.getElementById("spentResearch").innerHTML = spentResearch;  //updates research spent for the user
    };
    nextAssistantCost = Math.floor(10 * Math.pow(1.1,assistantNum));       //works out the cost of the next assistant
    document.getElementById("assistantCost").innerHTML = nextAssistantCost;  //updates the assistant cost for the user
};
window.setInterval(function(){

    researchClick(assistantNum);
    if (saveTimer >= 300){
        save();
    }else {
        saveTimer += 1;
    }

}, 1000)