// Image Uploader for Machine Learning Model
// ID
let video;
let label = "Upload an Image";
let confidence = 0.0;
let classifier;
let modelURL = "https://teachablemachine.withgoogle.com/models/Q0Tl7D-bs/";
let input;
let img;

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + "model.json");
}

// Image uploader
function setup() {
    createCanvas(640, 520);
    input = createFileInput(handleFile);
    input.position();
}

// box for the image and text on the bottom
function draw() {
    background(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label + " " + confidence, width / 2, height - 16);
    if (img) {
        image(img, 0, 0, width, 480);
    }
}

// The classification
function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    label = results[0].label;
    confidence = nf(results[0].confidence, 0, 2);
}

// Handle the file-upload/do the classification
function handleFile(file) {
    print(file);
    if (file.type === "image") {
        img = createImg(file.data, "");
        img.hide();
        classifier.classify(img, gotResults);
    } else {
        img = null;
    }
}