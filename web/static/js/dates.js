$(document).ready(function(){

    let uniqueID = $("#date_ID").html();

    const words = uniqueID.split("|");
    const id = words[0];
    const info = words[1]

    let hA = "";
    let bB = "";
    let hC = "";
    let hD = "";

    /* 
        Set the hA, hB, hC, and hD variabled to the text as a summary of the corespoding number
        Info will be set to the year under input_year statements and the biome under input_quantitie statements
    */

    if (id == "0-0") {
        // Input Year, Earth

        hA = "Will be the earths population by the year " + info + ".";
        hB = "Will be the earths population by the year " + info + ".";
        hC = "Will be the earths population by the year " + info + ".";
        hD = "Will be the earths population by the year " + info + ".";
    } else if ((id == "1-0")) {
        // Input quantities, Earth

    } else if ((id == "0-1")) {
        // Input Year, sea

    } else if ((id == "1-1")) {
        // Input quantities, Sea

    } else if ((id == "0-2")) {
        // Input Year, sky

    } else if ((id == "1-2")) {
        // Input quantities, Sky

    }

    $("#st-1").html(hA);
    $("#st-2").html(hB);
    $("#st-3").html(hC);
    $("#st-4").html(hD);
    
});