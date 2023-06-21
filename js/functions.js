const convertTime = (...time) => time.map((element) => {
  const [hours, minutes] = element.split(':');
  return +hours * 60 + +minutes;
});

// проверки convertTime
// console.log(convertTime('08:00'));
// console.log(convertTime('08:00', '17:30'));
// console.log(convertTime('08:00', '17:30', '14:00'));

const isTimeAcceptable = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const [dayStartInMinutes, dayEndInMinutes, meetingStartInMinutes] = convertTime(dayStart, dayEnd, meetingStart);
  const meetingEndInMinutes = meetingStartInMinutes + meetingDuration;
  return meetingStartInMinutes >= dayStartInMinutes && meetingEndInMinutes <= dayEndInMinutes;
};

isTimeAcceptable('08:00', '17:30', '14:00', 90);

// проверки isTimeAcceptable
// console.log(true === isTimeAcceptable('08:00', '17:30', '14:00', 90));
// console.log(true === isTimeAcceptable('8:0', '10:0', '8:0', 120));
// console.log(false === isTimeAcceptable('08:00', '14:30', '14:00', 90));
// console.log(false === isTimeAcceptable('14:00', '17:30', '08:0', 90));
// console.log(false === isTimeAcceptable('8:00', '17:30', '08:00', 900));
