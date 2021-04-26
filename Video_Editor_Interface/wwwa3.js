let canvas = new Object();
let context = new Object();
let myVideo, myCanvas, myContext;
let frame_number = 1;

//Greyscale
let grayscale = 0;
let graypanel = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let index;
let imageDataOld = new Object();
let newImageData = new Object();
let imageData = new Object();

//Window load
window.addEventListener('DOMContentLoaded',function() {
  myVideo = document.getElementById("myVideo");
  //myCanvas = document.getElementById("myCanvas");
  //myContext = myCanvas.getContext('2d');
  var i;
  for (i = 1; i <= 16; i++){
    canvas["myCanvas"+String(i)]= document.getElementById("myCanvas"+String(i));
    context["myContext"+String(i)] = canvas["myCanvas"+String(i)].getContext('2d');
  }
  myVideo.play();

  myVideo.addEventListener('play', function() {
    console.log("playing");
    requestAnimationFrame(drawVideo);
    }, false);
  myVideo.addEventListener('pause', function() {
    console.log("paused");
    }, false);
  myVideo.addEventListener('ended', function() {
    console.log("stopped");
    }, false);
  
  let myDrag = document.getElementById('grayscale');
  myDrag.addEventListener('dragstart', function(event) {
    //console.log("Drag started.");
    }, false);
  
  let myDrop1, myDrop2, myDrop3, myDrop4, myDrop5,
  myDrop6, myDrop7, myDrop8, myDrop9, myDrop10,
  myDrop11, myDrop12, myDrop13, myDrop14, myDrop15, myDrop16;

  myDrop1 = document.getElementById('myCanvas1');
  myDrop2 = document.getElementById('myCanvas2');
  myDrop3 = document.getElementById('myCanvas3');
  myDrop4 = document.getElementById('myCanvas4');
  myDrop5 = document.getElementById('myCanvas5');
  myDrop6 = document.getElementById('myCanvas6');
  myDrop7 = document.getElementById('myCanvas7');
  myDrop8 = document.getElementById('myCanvas8');
  myDrop9 = document.getElementById('myCanvas9');
  myDrop10 = document.getElementById('myCanvas10');
  myDrop11 = document.getElementById('myCanvas11');
  myDrop12 = document.getElementById('myCanvas12');
  myDrop13 = document.getElementById('myCanvas13');
  myDrop14 = document.getElementById('myCanvas14');
  myDrop15 = document.getElementById('myCanvas15');
  myDrop16 = document.getElementById('myCanvas16');

  function dropFunction(index){
    {
      if (graypanel[index] == 0){
        console.log("Before", graypanel)
        graypanel[index] = 1;
        console.log("After", graypanel)
        imageData[index] = extractFrame(index);
        newImageData[index] = manipulateData(imageData, index);
        drawFrame(newImageData, index);
      }
      else if (graypanel[index] == 1){
        graypanel[index] = 0;
        revertFrame(imageData, index);
        }
      }
  }
  
        myDrop1.addEventListener('drop', function(){dropFunction(1);}, false);
        myDrop2.addEventListener('drop', function(){dropFunction(2);}, false);
        myDrop3.addEventListener('drop', function(){dropFunction(3);}, false);
        myDrop4.addEventListener('drop', function(){dropFunction(4);}, false);
        myDrop5.addEventListener('drop', function(){dropFunction(5);}, false);
        myDrop6.addEventListener('drop', function(){dropFunction(6);}, false);
        myDrop7.addEventListener('drop', function(){dropFunction(7);}, false);
        myDrop8.addEventListener('drop', function(){dropFunction(8);}, false);
        myDrop9.addEventListener('drop', function(){dropFunction(9);}, false);
        myDrop10.addEventListener('drop', function(){dropFunction(10);}, false);
        myDrop11.addEventListener('drop', function(){dropFunction(11);}, false);
        myDrop12.addEventListener('drop', function(){dropFunction(12);}, false);
        myDrop13.addEventListener('drop', function(){dropFunction(13);}, false);
        myDrop14.addEventListener('drop', function(){dropFunction(14);}, false);
        myDrop15.addEventListener('drop', function(){dropFunction(15);}, false);
        myDrop16.addEventListener('drop', function(){dropFunction(16);}, false);
   
        



  function dragoverFunction(){
    event.preventDefault();
    
    //console.log("Drag over at " +
    //event.offsetY + ", " + event.offsetY + ".");
  }

        myDrop1.addEventListener('dragover', dragoverFunction, false);
        myDrop2.addEventListener('dragover', dragoverFunction, false);
        myDrop3.addEventListener('dragover', dragoverFunction, false);
        myDrop4.addEventListener('dragover', dragoverFunction, false);
        myDrop5.addEventListener('dragover', dragoverFunction, false);
        myDrop6.addEventListener('dragover', dragoverFunction, false);
        myDrop7.addEventListener('dragover', dragoverFunction, false);
        myDrop8.addEventListener('dragover', dragoverFunction, false);
        myDrop9.addEventListener('dragover', dragoverFunction, false);
        myDrop10.addEventListener('dragover', dragoverFunction, false);
        myDrop11.addEventListener('dragover', dragoverFunction, false);
        myDrop12.addEventListener('dragover', dragoverFunction, false);
        myDrop13.addEventListener('dragover', dragoverFunction, false);
        myDrop14.addEventListener('dragover', dragoverFunction, false);
        myDrop15.addEventListener('dragover', dragoverFunction, false);
        myDrop16.addEventListener('dragover', dragoverFunction, false);




  function dragleaveFunction(){
    console.log("Drag leave.");
  }

  myDrop1.addEventListener('dragleave', dragleaveFunction, false);
  
   });


   function extractFrame(index) {
    const frame = context["myContext"+String(index)].getImageData(0, 0,
    myVideo.videoWidth, myVideo.videoHeight);
    return new Uint8ClampedArray(frame.data);
   }

   function manipulateData(imageData, index) {
    newImageData[index] = new Uint8ClampedArray(imageData[index].length);
    for (let i = 0; i < imageData[index].length; i++) {
    r = imageData[index][i * 4 + 0];
    g = imageData[index][i * 4 + 1];
    b = imageData[index][i * 4 + 2];
    a = imageData[index][i * 4 + 3];
    newImageData[index][i * 4 + 0] = r;
    newImageData[index][i * 4 + 1] = g;
    newImageData[index][i * 4 + 2] = b;
    newImageData[index][i * 4 + 3] = a;
    }
    //console.log("Manipulate");
    return newImageData[index];
   }

   function drawFrame(imageData, index) {
    const frame = context["myContext"+String(index)].getImageData(0, 0,
    myVideo.videoWidth, myVideo.videoHeight);
    imageDataOld = imageData
    for (let i = 0; i < imageData[index].length; i++) {
      const r = imageData[index][i * 4 + 0];
      const g = imageData[index][i * 4 + 1];
      const b = imageData[index][i * 4 + 2];
      const a = imageData[index][i * 4 + 3];
      frame.data[i * 4 + 0] = r*0.299+g*0.587+0.114*b;
      frame.data[i * 4 + 1] = r*0.299+g*0.587+0.114*b;;
      frame.data[i * 4 + 2] = r*0.299+g*0.587+0.114*b;;
      frame.data[i * 4 + 3] = a;
    }
    graypanel[index] = 1;
    context["myContext"+String(index)].putImageData(frame, 0, 0);

    console.log("Draw Frame");
    console.log("Panel", graypanel)
    console.log("ImageDataOld", imageDataOld);
    console.log("ImageData", imageData);
   }

   function revertFrame(imageDataOld, index) {
    const frame = context["myContext"+String(index)].getImageData(0, 0,
      myVideo.videoWidth, myVideo.videoHeight);

    for (let i = 0; i < imageDataOld[index].length; i++) {
      const r = imageDataOld[index][i * 4 + 0];
      const g = imageDataOld[index][i * 4 + 1];
      const b = imageDataOld[index][i * 4 + 2];
      const a = imageDataOld[index][i * 4 + 3];
      frame.data[i * 4 + 0] = r;
      frame.data[i * 4 + 1] = g;
      frame.data[i * 4 + 2] = b;
      frame.data[i * 4 + 3] = a;
    }
    graypanel[index] = 0;
    context["myContext"+String(index)].putImageData(frame, 0, 0);

    console.log("Revert Frame");
    console.log("Panel", graypanel)
    console.log("ImageDataOld", imageDataOld);
    console.log("ImageData", imageData);
   }


  
// wait for DOM before animation

let start = 0;
let dimension = 0;

function drawVideo(timestamp) {
  if(timestamp - start >= 1000) {
    start = timestamp;
    //console.log(timestamp);
      context["myContext"+String(frame_number)].drawImage(myVideo, 0, 0, 
        myVideo.videoWidth/4, 
        myVideo.videoHeight/4);
        //console.log("myContext"+String(frame_number));
      frame_number++;
      if (frame_number > 16){
        frame_number = 1;
      }
  }

  requestAnimationFrame(drawVideo);
  requestAnimationFrame(drawLastVideo);

  
};

function drawLastVideo() {
  context["myContext"+String(frame_number)].drawImage(myVideo, 0, 0, 
    myVideo.videoWidth/4, 
    myVideo.videoHeight/4);
}