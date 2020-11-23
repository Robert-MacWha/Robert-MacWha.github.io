const sliders      = 80;
let   sliderValues = [
    1.538176536560058594e-01,
    3.721019020304083824e-03,
    9.260225342586636543e-04,
    1.211862917989492416e-02,
    1.618143320083618164e-01,
    8.563205599784851074e-02,
    1.104953931644558907e-03,
    3.558440878987312317e-02,
    3.086885623633861542e-02,
    5.103264003992080688e-02,
    1.695002056658267975e-02,
    1.618991047143936157e-01,
    4.332258831709623337e-03,
    1.527012418955564499e-02,
    9.745540469884872437e-02,
    2.924895882606506348e-01,
    1.400898676365613937e-02,
    2.355810254812240601e-01,
    3.252442777156829834e-01,
    1.203178334981203079e-02,
    5.696446895599365234e-01,
    2.261210000142455101e-03,
    4.304030444473028183e-03,
    3.168335184454917908e-02,
    1.419478207826614380e-01,
    1.793026749510318041e-04,
    2.671110630035400391e-01,
    2.008731067180633545e-01,
    3.594105541706085205e-01,
    1.472585927695035934e-02,
    8.021170273423194885e-03,
    4.392528906464576721e-02,
    4.355260357260704041e-02,
    1.006428990513086319e-02,
    3.725095465779304504e-02,
    1.898860782384872437e-01,
    2.510983049869537354e-01,
    6.921793818473815918e-01,
    7.302106171846389771e-02,
    3.069381695240736008e-03,
    8.188135176897048950e-02,
    1.029839813709259033e-01,
    3.921372350305318832e-03,
    6.087450310587882996e-03,
    2.774959616363048553e-02,
    1.475314982235431671e-02,
    5.297639220952987671e-02,
    1.780694574117660522e-01,
    5.505725145339965820e-01,
    6.847979873418807983e-02,
    2.702013850212097168e-01,
    5.964319407939910889e-02,
    1.292107403278350830e-01,
    6.151896715164184570e-01,
    2.613251563161611557e-03,
    7.402982562780380249e-03,
    1.696708053350448608e-01,
    2.687551639974117279e-02,
    1.718732863664627075e-01,
    1.772890985012054443e-01,
    8.338642120361328125e-01,
    3.162035644054412842e-01,
    7.728225551545619965e-03,
    2.011799439787864685e-02,
    1.196967661380767822e-01,
    4.745967313647270203e-02,
    7.363060954958200455e-03,
    1.101671233773231506e-01,
    7.043092977255582809e-03,
    3.144810348749160767e-02,
    7.757964730262756348e-02,
    5.772527307271957397e-02,
    1.885322928428649902e-01,
    1.087807398289442062e-02,
    9.368968196213245392e-03,
    5.260054767131805420e-02,
    1.107437442988157272e-02,
    7.506491150707006454e-03,
    9.471248835325241089e-02,
    2.734277248382568359e-01,    
];

(async () => {
    // Load the encoder model
    const encoderModel = await tf.loadLayersModel('./final/JS_decoder/model.json');

    // Wait for the document to load
    $(document).ready(() => {

        // Create all the sliders
        for(let i = 0; i < sliders; i ++) {
            $('.sliders').append('<input type="range" min="0" max="1" step="0.05" value="0.5" class="slider p-2" id="' + i + '" orient="vertical">')
            $('#' + i).val(sliderValues[i]);
        }

        // Initialize the canvas to the default image
        drawToCanvas();

        // Update value list when sliders are changed    
        $('.slider').mouseup((e) => {
            let id = e.target.id;
            sliderValues[id] = parseFloat(e.target.value);

            drawToCanvas();
        });

        // Update the canvas
        function drawToCanvas () {
            // Grab the 2d context and th imageData component
            let c = document.getElementById('resultCanvas');
            let ctx = c.getContext('2d');
            let imgData = ctx.createImageData(128, 128);

            // Get the prediction from the encoder model
            let tensorInput = tf.tensor([sliderValues]);

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
            console.log("done");
        }
    });
})();