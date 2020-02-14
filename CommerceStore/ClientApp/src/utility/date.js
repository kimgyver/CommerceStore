// Date Object -> DD/MM/YYYY HH:mm:ss
export const date2string = (date, showDate = true, showTime = true) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  let text = '';
  if (showDate) {
    text += `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year} `;
  }

  if (showTime) {
    text += `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  return text;
};

// YYYY-MM-DDTHH:mm:ss (ISO Format)
export const date2ISO = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  let text = '';
  text += `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
  text += `T${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  return text;
};

// ISO Format -> Date Object
export const ISO2date = isoString => {
  var tp = isoString.split(/[^0-9]/);
  return new Date(tp[0], tp[1] - 1, tp[2], tp[3], tp[4], tp[5]);
};

// ISO Format -> DD/MM/YYYY HH:mm:ss
export const ISO2Display = isoString => {
  var tp = isoString.split(/[^0-9]/);
  var date = new Date(tp[0], tp[1] - 1, tp[2], tp[3], tp[4], tp[5]);
  return date2string(date);
};

// DD/MM/YYYY HH:mm:ss -> Date object
export const string2date = dateString => {
  const tp = dateString.split(/[^0-9]/);
  return new Date(tp[2], Number(tp[1]) - 1, tp[0], tp[3], tp[4], tp[5]);
};
