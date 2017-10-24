var research = 0;
var assistantNum = 0;
var microscopeNum = 0;
var gasChromatographerNum = 0;
var nanoResearch = 0;
var spentResearch = 0;
var statsIsOpen = false;
var nextAssistantCost = 10;
var nextMicroscopeCost = 100;
var nextGasChromatographerCost = 500;
var saveTimer = 0;

function save(){
    var save = {
        research: research,
        assistantNum: assistantNum,
        microscopeNum: microscopeNum,
        gasChromatographerNum: gasChromatographerNum,
        nextAssistantCost: nextAssistantCost,
        nextMicroscopeCost: nextMicroscopeCost,
        nextGasChromatographerCost: nextGasChromatographerCost,
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
    if(typeof savegame.microscopeNum !== undefined){
        microscopeNum = savegame.microscopeNum;
        document.getElementById("microscopeNum").innerHTML = microscopeNum;
    }
    if(typeof savegame.gasChromatographerNum !== undefined){
        gasChromatographerNum = savegame.gasChromatographerNum;
        document.getElementById("gasChromatographerNum").innerHTML = gasChromatographerNum;
    }
    if(typeof savegame.nextAssistantCost !== undefined){
        nextAssistantCost = savegame.nextAssistantCost;
        document.getElementById("assistantCost").innerHTML = nextAssistantCost;
    }else {
        nextAssistantCost = 10;
    }
    if(typeof savegame.nextMicroscopeCost !== undefined){
        nextMicroscopeCost = savegame.nextMicroscopeCost;
        document.getElementById("microscopeCost").innerHTML = nextMicroscopeCost;
    }else {
        nextmicroscopeCost = 100;
    }
    if(typeof savegame.nextGasChromatographerCost !== undefined){
        nextGasChromatographerCost = savegame.nextGasChromatographerCost;
        document.getElementById("gasChromatographerCost").innerHTML = nextGasChromatographerCost;
    }else {
        nextGasChromatographerCost = 500;
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
        research = research - assistantCost;                                   //removes the research spent
        spentResearch += assistantCost ;                                   //updates research spent                        
        document.getElementById("assistantNum").innerHTML = assistantNum;  //updates the number of assistants for the user
        document.getElementById("research").innerHTML = research;  //updates the number of research for the user
        //document.getElementById("spentResearch").innerHTML = spentResearch;  //updates research spent for the user
    };
    nextAssistantCost = Math.floor(10 * Math.pow(1.1,assistantNum));       //works out the cost of the next assistant
    document.getElementById("assistantCost").innerHTML = nextAssistantCost;  //updates the assistant cost for the user
};
function buyMicroscope(){
    var microscopeCost = Math.floor(100 * Math.pow(1.1,microscopeNum));     //works out the cost of this assistant
    if(research >= microscopeCost){                                   //checks that the player can afford the assistant
        microscopeNum = microscopeNum + 1; //increases number of assistants
        research = research - microscopeCost;                                   //removes the research spent
        spentResearch += microscopeCost ;                                   //updates research spent                        
        document.getElementById("microscopeNum").innerHTML = microscopeNum;  //updates the number of assistants for the user
        document.getElementById("research").innerHTML = research;  //updates the number of research for the user
        //document.getElementById("spentResearch").innerHTML = spentResearch;  //updates research spent for the user
    };
    nextMicroscopeCost = Math.floor(100 * Math.pow(1.1,microscopeNum));       //works out the cost of the next assistant
    document.getElementById("microscopeCost").innerHTML = nextMicroscopeCost;  //updates the assistant cost for the user
};
function buyGasChromatographer(){
    var gasChromatographerCost = Math.floor(500 * Math.pow(1.1,gasChromatographerNum));     //works out the cost of this assistant
    if(research >= gasChromatographerCost){                                   //checks that the player can afford the assistant
        gasChromatographerNum = gasChromatographerNum + 1; //increases number of assistants
        research = research - gasChromatographerCost;                                   //removes the research spent
        spentResearch += gasChromatographerCost ;                                   //updates research spent                        
        document.getElementById("gasChromatographerNum").innerHTML = gasChromatographerNum;  //updates the number of assistants for the user
        document.getElementById("research").innerHTML = research;  //updates the number of research for the user
        //document.getElementById("spentResearch").innerHTML = spentResearch;  //updates research spent for the user
    };
    nextGasChromatographerCost = Math.floor(500 * Math.pow(1.1,gasChromatographerNum));       //works out the cost of the next assistant
    document.getElementById("gasChromatographerCost").innerHTML = nextGasChromatographerCost;  //updates the assistant cost for the user
    console.log(nextGasChromatographerCost);
};
window.setInterval(function(){

    researchClick(assistantNum);
    researchClick(microscopeNum * 15);
    researchClick(gasChromatographerNum * 100);
    if (saveTimer >= 300){
        save();
    }else {
        saveTimer += 1;
    }

}, 1000)