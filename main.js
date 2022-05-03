//https://teachablemachine.withgoogle.com/models/TsXkjgF-B/model.json/
//set is a pre-defined function of Webcam which sets properties of webcam
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera");
//attach is a pre-defined function of the Webcam
Webcam.attach('camera');

//taking photo function takes photo and diplays the image in html   

function takephoto() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img src=' + data_uri + ' id="captured_image">';
    })
}
//trying ti print m15.js version if the console log
console.log("ml5 version: ", ml5.version);

//imageClassifier is a predefined function of ml5.js that is used to
//trigger the ml5.js image classification function.

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TsXkjgF-B/model.json", modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function identify() {
    img = document.getElementById("captured_image");
    //classifier is the variable that holds the model which we had imported in the starting of ml5.js coding in the previous class.
    //classify is a predefined function of ml5.js that is used to compare the captured image with the model, and get the results.
    //where the gotResult function will hold the result of the comparison
    classifier.classify(img, getResults);
}

function getResults(error,results) {
    if (error) {
        console.log(error);
       // alert("error");
    }
    else {
        console.log(results);
        document.getElementById("result_of_object").innerHTML = results[0].label;
        document.getElementById("result_of_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}