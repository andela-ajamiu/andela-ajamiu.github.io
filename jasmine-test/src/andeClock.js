// Materialiize components initialization
$(document).ready(function(){
  $('.parallax').parallax();
  $('select').material_select();
  $(".button-collapse").sideNav();
});


// create a 2D canvas object from the canvas API
var canvasRef = document.getElementById('clockCanvas');
var clockRef = canvasRef.getContext('2d');


// reference to the clock tick sound
var sound = document.getElementById('clockTick');


// create an instance of clock background image
var clockBgImage = new Image();
var clockBgImageLoaded = false;


// check if background image is loaded
clockBgImage.onload = function(){
  clockBgImageLoaded = true;
}
clockBgImage.src = 'images/Clock_Face.png';


// add backgroundImage to clock
function addClockFace(){
  clockRef.drawImage(clockBgImage, canvasRef.width/2 * -1 ,canvasRef.height/2 * -1, canvasRef.width, canvasRef.height);
};


// convert from degree to radians
function degreesToRadians(degrees) {
  return (Math.PI / 180) * degrees;
};


// draw hour hand of the clock depending on the selected timezone value
function drawHourHand(theDate, value){
  var hours = parseInt(value) + theDate.getHours() + (theDate.getMinutes() / 60);
  
  // write AM/PM and date, depend
  if (hours > 0 ){
    writeDateAndPeriod(theDate, hours);
  } else {
    writeDateAndPeriod(theDate, Math.abs(hours) + 12);
  };

  // finally rotate the hour hand depending on the selected timezone and call drawHand() function
  var degrees = (hours * 360 / 12) % 360;
  clockRef.save();
  clockRef.fillStyle = 'black';
  clockRef.strokeStyle = '#555';
  clockRef.rotate(degreesToRadians(degrees));
  drawHand(100, 7, 3);
  clockRef.restore();
};


// write date and period of the day to the application.
function writeDateAndPeriod(theDate, hours){

  // write period of the day
  clockRef.textAlign = 'center';
  clockRef.font = 'italic bold 36px Arial';
  if (hours % 24 >= 12 ){
    clockRef.fillText('PM', 70, 13 );
  } else {
    clockRef.fillText('AM', 70, 13 );
  };

  // write full date in the format DD/MM/YYYY
  clockRef.font = '20px Arial';
  if (hours < 0){
    clockRef.fillText((theDate.getDate()-1) + '/' + (theDate.getMonth()+1) + '/' + theDate.getFullYear(), 0, 80 );
  }
  else if (hours < 24){
    clockRef.fillText(theDate.getDate() + '/' + (theDate.getMonth()+1) + '/' + theDate.getFullYear(), 0, 80 );
  } else {
    clockRef.fillText((theDate.getDate()+1) + '/' + (theDate.getMonth()+1) + '/' + theDate.getFullYear(), 0, 80 );
  };
};


// rotate the minute hand of the clock and call drawHand() function
function drawMinuteHand(theDate){
  var minutes = theDate.getMinutes() + theDate.getSeconds() / 60;
  clockRef.save();
  clockRef.fillStyle = 'black';
  clockRef.globalAlpha = 0.7;
  clockRef.strokeStyle = '#555';
  clockRef.rotate(degreesToRadians(minutes * 6));
  drawHand(135, 7, 5);
  clockRef.restore();
};


// rotate seconds hand of the clock and call drawHand() function
function drawSecondHand(theDate){
  var seconds = theDate.getSeconds();
  clockRef.save();
  clockRef.fillStyle = 'red';
  clockRef.globalAlpha = 0.8;
  clockRef.rotate(degreesToRadians(seconds * 6));
  drawHand(150, 4, 8);
  clockRef.restore();
};


// draw hand of the clock which is called by other drawHand(s) method
function drawHand(size, thickness, shadowOffset){
  thickness = thickness || 4;
  clockRef.shadowColor = '#555';
  clockRef.shadowBlur = 10;
  clockRef.shadowOffsetX = shadowOffset;
  clockRef.shadowOffsetY = shadowOffset;
  clockRef.beginPath();
  clockRef.moveTo(0,0); 
  clockRef.lineTo(thickness *-1, -10);
  clockRef.lineTo(0, size * -1);
  clockRef.lineTo(thickness,-10);
  clockRef.lineTo(0,0);
  clockRef.fill();
  clockRef.stroke();
};


// write name on the clock
function writeClockName(){
  clockRef.font = '50pt Calibri';
  clockRef.textAlign = 'center';
  clockRef.strokeText('Andela', 0,-40);
};


// initialize the clock
function initClock(){
  sound.play();
  addClockFace();
  writeClockName();
  var theDate = new Date();
  var offset_value = document.getElementById('tzSelect').value-1;
  drawHourHand(theDate, offset_value);
  drawMinuteHand(theDate);
  drawSecondHand(theDate);
};


// function to call initialize clock every minute
function mainClockApp(){
  if(!clockBgImageLoaded){
    setTimeout('mainClockApp()', 100);
    return;
  };
  clockRef.translate(canvasRef.width/2, canvasRef.height/2);
  setInterval('initClock()', 1000);
};

// start the application
mainClockApp();