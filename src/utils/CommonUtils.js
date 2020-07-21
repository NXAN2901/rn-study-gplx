function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  });
}

function secondToMinutesAndSeconds(numSecond) {
  var minutes = Math.floor(numSecond / 60);
  var seconds = (numSecond % 60).toFixed(0);
  const minuteSec = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function convertRealmArrayToJsonObject(arr) {
  return Array.from(arr, item => ({ ...item }));
}

function convertRealmObjectToJsonObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function convertJsonObjectToArray(obj) {
  return Object.values(obj);
}

const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

export {
  arrayRemove,
  secondToMinutesAndSeconds,
  convertRealmArrayToJsonObject,
  convertJsonObjectToArray,
  convertRealmObjectToJsonObject,
  isNullOrUndefined
};
