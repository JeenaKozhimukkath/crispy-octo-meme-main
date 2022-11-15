// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var currentTime = moment().format("LLLL");
$("#currentDay").text(currentTime);

//used code from https://stackoverflow.com/questions/36125038/generate-array-of-times-as-strings-for-every-x-minutes-in-javascript
const timeArray = (stTime, interval) => {
  const periodsInADay = moment.duration(1, 'day').as('hours');

  const timeLabels = [];
  const startTimeMoment = moment(stTime, 'hh:mm');
  for (let i = 0; i <= periodsInADay-16; i += interval) {
    startTimeMoment.add(i === 0 ? 0 : interval, 'hours');
    timeLabels.push(startTimeMoment.format('hh:mm A'));
  }

  return timeLabels;
};

var startHr = timeArray(9,1);
console.log(startHr);
var today=moment().format('hh:00 A');
var timeNow =moment(today,'hh:00 A');
console.log(timeNow);
for (let i = 0; i < startHr.length ; i++) {
  var scheduleSection = $("<div>");
  scheduleSection.addClass("row time-block");
  var HourSection = $("<div>");
  HourSection.addClass("hour col-2 col-md-1 text-center py-3");
  HourSection.text(startHr[i]);
  var txtSection = $("<textarea>");
  txtSection.addClass("col-8 col-md-10 txtarea description");
  
  //console.log("now:"+timeNow);
  var hr=moment(startHr[i],'hh:00 A');
  //console.log("array:"+hr);
  if (timeNow.isSame(hr)) {
    txtSection.addClass("present");
  } else if (timeNow.isBefore(hr)) {
    txtSection.removeClass("present");
    txtSection.addClass("future");
  }
  else {
    txtSection.removeClass("future");
    txtSection.addClass("past");
  }
  

  var SaveBtn = $("<button>");
  SaveBtn.addClass("btn saveBtn col-2 col-md-1");

  var saveIcon = $("<i>");
  saveIcon.addClass("fas fa-save");

  SaveBtn.append(saveIcon);

  scheduleSection.append(HourSection);
  scheduleSection.append(txtSection);
  scheduleSection.append(SaveBtn)
  $(".main").append(scheduleSection);
  
}

var saveButton = $(".saveBtn");
var scheduleDiv=$(".time-block")
var hourDiv = $(".hour");
var textDiv = $(".txtarea")
function saveClick(n) {
  $(saveButton[n]).on("click", function(event){
    event.preventDefault();
     console.log("inside: "+$(textDiv[n]).val());  
     console.log("hourval: "+$(hourDiv[n]).text());  
    //add user message input to the local storage
    var message =$(textDiv[n]).val();
    var hourval=$(hourDiv[n]).text();
    if( message!== "" ) {
    localStorage.setItem("Todo-" + hourval, message);
} 
})
}

for (var i= 0;i<hourDiv.length;i++){
  var inputval=$(hourDiv[i]).text();
  var userInput =localStorage.getItem("Todo-" + inputval);
  $(textDiv[i]).text(userInput); 
  saveClick(i);
  
}
  

