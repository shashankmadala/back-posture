export function changeStyleProperty(property, value) {
  document.documentElement.style.setProperty(property, value);
}

export function updatePostureStatus(isGood) {
  if (isGood) {
    changeStyleProperty('--posture-status', '"GOOD"');
    changeStyleProperty('--posture-status-color', '#22c55e'); // green-500
  } else {
    changeStyleProperty('--posture-status', '"BAD"');
    changeStyleProperty('--posture-status-color', '#ef4444'); // red-500
  }
}

export function badPosture(currLandmarks, idealLandmarks) {
  //person is looking down
  let lookingDown = (currLandmarks[0]['y'] - idealLandmarks[0]['y']) > (idealLandmarks[9]['y'] - idealLandmarks[0]['y']);
  //person face is closer to the screen
  let faceIsClose = ((idealLandmarks[0]['z'] - currLandmarks[0]['z']) > 0.5);

  return (lookingDown || faceIsClose);
}

export function showNotification(notificationText) {
  new Notification(notificationText);
}