let biome = -1;
let mode = -1;

function selectBiome (a) {
    biome = a;

    document.getElementById("biome-selection").classList.add("hidden");
    document.getElementById("mode-selection").classList.remove("hidden");

    if (a == 0) { document.getElementById("environment-icon").src="./imgs/Land.svg"; }
    else if (a == 1) { document.getElementById("environment-icon").src="./imgs/Wave.svg"; }
    else { document.getElementById("environment-icon").src="./imgs/Cloud.svg"; }
}

function setMode (a) {
    mode = a;

    document.getElementById("mode-selection").classList.add("hidden");

    let envIcon = "";

    if (biome == 0) { envIcon="./imgs/Land.svg"; }
    else if (biome == 1) { envIcon="./imgs/Wave.svg"; }
    else { envIcon="./imgs/Cloud.svg"; }

    let modeIcon = "";
    if (mode == 0) {
        modeIcon = "./imgs/Calendar.svg";
    } else {
        modeIcon = "./imgs/Bar-chart.svg";
    }

    varMode = mode + ", " + biome;
    
    if (mode == 0) {
        document.getElementById("year").classList.remove("hidden");

        document.getElementById("environment-icon-4").src= envIcon;
        document.getElementById("mode-icon-4").src= modeIcon;
        document.getElementById("y-env").value = varMode;
    } else if (biome == 0) {
        document.getElementById("land").classList.remove("hidden");

        document.getElementById("environment-icon-1").src= envIcon;
        document.getElementById("mode-icon-1").src= modeIcon;
        document.getElementById("l-env").value = varMode;
    } else if (biome == 1) {
        document.getElementById("ocean").classList.remove("hidden");

        document.getElementById("environment-icon-2").src= envIcon;
        document.getElementById("mode-icon-2").src= modeIcon;
        document.getElementById("o-env").value = varMode;
    } else if (biome == 2) {
        document.getElementById("sky").classList.remove("hidden");

        document.getElementById("environment-icon-3").src= envIcon;
        document.getElementById("mode-icon-3").src= modeIcon;
        document.getElementById("s-env").value = varMode;
    } else {
        document.getElementById("biome-selection").classList.remove("hidden");
    }
}