var research = 0;
var assistantNum = 0;
var nanoResearch = 0;
var spentResearch = 0;
var statsIsOpen = false;

function save(research, assistantNum, nanoResearch){
    var save = {
        research: research,
        assistantNum: assistantNum,
        nanoResearch: nanoResearch
    }
    localStorage.setItem("save", JSON.stringify(save));
}
function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if(typeof savegame.research !== undefined){
        research = savegame.research
    }
    if(typeof savegame.assistantNum !== undefined){
        assistantNum = savegame.assistantNum
    }
    if(typeof savegame.nanoResearch !== undefined){
        nanoResearch = savegame.nanoResearch
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
        document.getElementsByClassName("assistantNum").innerHTML = assistantNum;  //updates the number of assistants for the user
        document.getElementById("research").innerHTML = research;  //updates the number of research for the user
        //document.getElementById("spentResearch").innerHTML = spentResearch;  //updates research spent for the user
    };
    var nextAssistantCost = Math.floor(10 * Math.pow(1.1,assistantNum));       //works out the cost of the next assistant
    document.getElementById("assistantCost").innerHTML = nextAssistantCost;  //updates the assistant cost for the user
};
/*function statButton(){
    if(statsIsOpen === false){
        statsIsOpen = true;
        document.getElementById("stats").innerHTML = 
            <span><p><strong>STATS</strong></p>
            <p>Total Research: <span id="researchMade">0</span></p>
            <p>Total Research Spent: <span id="spentResearch">0</span></p>
            <p>Assistants Hired: <span class="assistantNum">0</span></p></span>;
    }else {
        statsIsOpen = false;
    }


}*/
window.setInterval(function(){

    researchClick(assistantNum);

}, 1000)