export function changeStyleProperty(property, value) {
  document.documentElement.style.setProperty(property, value);
}

export function updatePostureStatus(isGood) {
  if (isGood) {
    changeStyleProperty('--posture-status', '"బాగుంది"');
    changeStyleProperty('--posture-status-color', '#22c55e');
  } else {
    changeStyleProperty('--posture-status', '"సరిగ్గా లేదు"');
    changeStyleProperty('--posture-status-color', '#ef4444');
  }
}

export function badPosture(currLandmarks, idealLandmarks) {
  let lookingDown = (currLandmarks[0]['y'] - idealLandmarks[0]['y']) > (idealLandmarks[9]['y'] - idealLandmarks[0]['y']);
  let faceIsClose = ((idealLandmarks[0]['z'] - currLandmarks[0]['z']) > 0.5);
  return (lookingDown || faceIsClose);
}

export function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification(message);
  }
}