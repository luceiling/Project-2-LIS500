// Add some header info
// For TM template code

// Video
let video;
let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/Q0Tl7D-bs/';

let input;
let img;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json'
  );
}

  // Image upload
function setup() {
  createCanvas(640, 520);
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function draw() {
  background(0);
  
  textSize(32)
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16)
  
  if (img) {
    image(img, 0, 0, width, 480)
  }
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
}
// STEP 2: Handle the file-upload and do the classification
function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
    classifier.classify(img, gotResults);
  } else {
    img = null;
  }
}
