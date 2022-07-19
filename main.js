function preload(){
    classifier=ml5.imageClassifier("DoodleNet")
}
function setup(){
    canvas=createCanvas(280,280)
    canvas.center()
    background("gray")
    canvas.mouseReleased(classifyCanvas)
    synth=window.speechSynthesis;
}
function clearCanvas(){
    background("gray")
}
function draw(){
    strokeWeight(12)
    stroke("black")
    if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY)
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}
function gotResult(error,results){
  if(error){
      console.log(error)
  } 
  else{
      console.log(results)
      document.getElementById("label").innerHTML="label:"+results[0].label
      document.getElementById("confidence").innerHTML="confidence:"+Math.round(results[0].confidence*100)+"%"
      utter=new SpeechSynthesisUtterance(results[0].label)
      synth.speak(utter)
  }
}