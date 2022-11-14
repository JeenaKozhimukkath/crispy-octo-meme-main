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
var timeNow =moment().format('hh:00 A');
console.log(timeNow);
for (let i = 0; i < startHr.length ; i++) {
  var scheduleSection = $("<div>");
  scheduleSection.addClass("row time-block");
  var HourSection = $("<div>");
  HourSection.addClass("col-2 col-md-1 hour text-center py-3");
  HourSection.text(startHr[i]);
  console.log(startHr[i]);
  console.log(timeNow);
  if (moment(timeNow).isSame(startHr[i])) {
    HourSection.addClass("present");
  } else if (moment(timeNow).isBefore(startHr[i])) {
    HourSection.removeClass("present");
    HourSection.addClass("past");
  }
  else  {
    HourSection.removeClass("past");
    HourSection.addClass("future");
  }
  var txtSection = $("<textarea>");
  txtSection.addClass("col-8 col-md-10 description");

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

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
