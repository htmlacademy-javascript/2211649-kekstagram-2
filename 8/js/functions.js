/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const lineLength = function (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

const Palin = function (string) {
  let empty = '';

  for (let i = string.length - 1; i >= 0; i--) {
    empty += string[i];
  }

  return empty === string;
};


const Kolo = function (string) {
  let a = '';
  const digits = '0123456789';

  for (let i = 0; i < string.length; i++) {
    if (digits.includes(string[i])) {
      a += string[i];
    }
  }

  if (a === '') {
    return NaN;
  } else {
    return +a;
  }
};

const timer = function (startDay, endDay, start, duration) {

};

const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingInWorkingHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartInMinutes = convertTimeToMinutes(workStart);
  const workEndInMinutes = convertTimeToMinutes(workEnd);
  const meetingStartInMinutes = convertTimeToMinutes(meetingStart);

  const meetingEndInMinutes = meetingStartInMinutes + meetingDuration;

  const isStartedOnTime = meetingStartInMinutes >= workStartInMinutes;
  const isFinishedOnTime = meetingEndInMinutes <= workEndInMinutes;

  return isStartedOnTime && isFinishedOnTime;
};
