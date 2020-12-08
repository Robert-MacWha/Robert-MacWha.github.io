const sliderCount = 40;

let sliderValues = [];
let autoRefresh = true;
let encoderModel = false;

let canvasSize = 0;

// Load in the tensorflow model
(async () => {
    tf.loadLayersModel('../final/JS_decoder/model.json').then( m => {
        encoderModel = m;
        updateCanvas();
    });
})();

// Initialize webpage
createSliders();
resize();
window.addEventListener('resize', resize, false);

function createSliders() {
    // Initialize each slider with a value of 0.48
    for(let i = 0; i < sliderCount; i ++) {

        let slider = '<input type="range" min="0" max="1" value="0.48" step="0.04" onchange="sliderChange(' + i + ')" class="slider" id="slider_' + i + '">';

        $("#sliders").append(
            slider
        );
        sliderValues[i] = 12;
        
    }

    // Update the image_code text form
    sliderChange(0);
}

function resize() {

    // Get the width of the canvas' container
    canvasSize = $('#outputCanvas').parent().width();

    // Set the canvas' width and height to the canvasSize variable
    $('#outputCanvas').attr('width', canvasSize);
    $('#outputCanvas').attr('height', canvasSize);

    // Also reset the color of the canvas
    let canvas = $('#outputCanvas')[0];
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f4f4f4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update the --options-max-height variable so that the sliders end at the same y-axis as the image
    document.documentElement.style.setProperty('--options-max-height', canvasSize + 'px');
    
};

function sliderChange (sliderIndex) {
    // Update the slider value
    sliderValues[sliderIndex] = parseInt(document.getElementById('slider_' + sliderIndex).value * 25);
    
    // Update the image code
    let imageCode = '';
    for(let i = 0; i < sliderValues.length; i ++) {
        imageCode += sliderValues[i].toString(25);
    }

    document.getElementById("image_code").value = imageCode;

    // If the tensorflow model has been loaded and auto-refresh is toggled update the canvas
    if (encoderModel != false && autoRefresh != false) {
        updateCanvas();
    }
}

function loadCode () {
    // Grab the code from the input and confirm its validity
    let code = document.getElementById("image_code").value;
    if (code.length != sliderCount)
        return;

    let newSliderValues = [];

    // Convert the code into an array of numbers
    for(let i = 0; i < sliderCount; i ++) {
        let c = code.charAt(i);
        let v = parseInt(c, 25);

        // Constrain the value to go from 0-25
        v = Math.min(Math.max(v, 0), 25);

        // Update the slider and the slideValues array
        newSliderValues[i] = v;
        $('#slider_' + i).attr('value', v / 25);
    }

    sliderValues = newSliderValues;

    // Update the sliders
    sliderChange(0);
}

function updateCanvas () {
    // Calculate the scale factor
    let scaleFactor = canvasSize / 128;

    // Grab the 2d context and th imageData component
    let c = document.getElementById('outputCanvas');
    let ctx = c.getContext('2d');
    let imgData = ctx.createImageData(128, 128);

    // Get the prediction from the encoder model
    const rawInputs = tf.tensor([sliderValues]);
    const multiple = tf.scalar(0.04);
    const tensorInput = rawInputs.mul(multiple);

    encoderPrediction = encoderModel.predict(tensorInput);
    let imageValues = encoderPrediction.arraySync()[0];

    // Pass the image values to the imgdata component
    let min = 1;
    for (let i = 0; i < imgData.data.length / 4; i ++) {

        let x = Math.floor(i / 128);
        let y = i % 128;

        imgData.data[(i*4)+0] = imageValues[x][y][0] * 255;
        imgData.data[(i*4)+1] = imageValues[x][y][1] * 255;
        imgData.data[(i*4)+2] = imageValues[x][y][2] * 255;
        imgData.data[(i*4)+3] = 255;

        if (imageValues[i] < min) {
            min = imgData[i];
        }
    }

    ctx.putImageData(imgData, 0, 0);
    ctx = c.getContext('2d');
    ctx.drawImage( c, 0, 0, scaleFactor*c.width, scaleFactor*c.height );
}

function toggleAutoRefresh() {
    autoRefresh = !autoRefresh;

    // Update the image
    sliderChange(0);
}

function copyToClipboard () {
    /* Get the text field */
    let copyText = document.getElementById('image_code');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand('copy');
}

function randomizeSliders () {
    // Loop over each slider and randomly change the value
    for(let i = 0; i < sliderCount; i ++) {

        // The encoded versions of real pokemon are, in general, made up mostly of low values with a few high values
        // Try to emulate that in the random function
        let sliderType = Math.random();
        let sliderValue = 0;

        if (sliderType < 0.1) {
            sliderValue = Math.floor(Math.random() * 6) + 20;
        } else {
            sliderValue = Math.floor(Math.random() * 4);
        }

        sliderValues[i] = sliderValue;

        $('#slider_' + i).attr('value', sliderValue / 25);

    }

    // Update the slider output value and canvas
    sliderChange(0);
}