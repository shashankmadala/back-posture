# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

```

# package.json

```json
{
  "name": "hpe-browser",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@mediapipe/camera_utils": "^0.3.1640029074",
    "@mediapipe/control_utils": "^0.6.1629159505",
    "@mediapipe/drawing_utils": "^0.3.1620248257",
    "@mediapipe/pose": "^0.5.1635988162",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-webcam": "^7.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

# public/bad-posture-demo.png

This is a binary file of the type: Image

# public/favicon-32x32.png

This is a binary file of the type: Image

# public/favicon.ico

This is a binary file of the type: Binary

# public/good-posture-demo.png

This is a binary file of the type: Image

# public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon-32x32.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web app for posture tracking."
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>BackTrack</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

# public/logo192.png

This is a binary file of the type: Image

# public/logo512.png

This is a binary file of the type: Image

# public/manifest.json

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

# public/robots.txt

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```

# README.md

```md
# BackTrack

A web app that tracks the user's posture in real-time and notifes them when they are slouching.

## Demo

See video demo [here](https://youtu.be/8nwTfgI1b7s).

When the user has good posture, nothing happens.
![app demo when user has good posture](public/good-posture-demo.png)

When the user has bad posture, they will recieve a notification in the browser.
![app demo when user has bad posture](public/bad-posture-demo.png)

## About the app

This app was developed using React and [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose) (a human pose estimation model).

A react-webcam component takes in a live video feed from the user's webcam and passes each frame into the pose estimation model, which will identify 3D landmarks on the user's body. To use the app, the user sits with a "good" posture and clicks the *Calibrate* button, which will save the landmarks for their good posture. A "bad" posture notification is sent when the app detects a deviation between the current (live) posture and the "good" posture.

## To use the app

The app is not deployed anywhere, so currently the only way to play with it is to serve it locally in development mode.

Clone the repositiory. Then, inside the project directory, run:

### `npm install`

Installs the project dependencies.

### `npm run start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
```

# src/App.css

```css
/*css loader styles*/
.loading-screen {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: white;
    color: black;
    display: var(--loader-display);
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.lds-dual-ring {
    display: inline-block;
    padding-bottom: 1em;
    width: 80px;
    height: 80px;
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #0069ed;
    border-color: #0069ed transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
}

/*app styles*/
.App {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.menu {
    width:35%;
}

.logo {
    width: 50%;
    padding-bottom: 1em;
}

.canvas {
    border-radius: 0.5em;
    z-index: 99;
    position: relative;
}

.webcam {
    border-radius: 0.5em;
    position: absolute;
}

.posture-status::after {
    content: var(--posture-status);
    color: var(--posture-status-color);
}

.btn {
    font-size: 1em;
    display: inline-block;
    border: none;
    padding: 0.75em 1.5em;
    margin: 0;
    text-decoration: none;
    background: var(--btn-color);
    color: #ffffff;
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
}

/*responsiveness*/
@media (max-width: 1000px) {
    .App {
        flex-direction: column-reverse;
        height: auto;
        padding: 1.5em 0;
    }

    .menu {
        width:640px;
        padding-top: 1em;
    }

    .logo {
        width: 25%;
        padding-bottom: 0.25em;
    }
}
```

# src/App.js

```js
import './App.css';
import React, {useRef, useEffect} from 'react';
import {Pose} from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import * as mediapipePose from '@mediapipe/pose';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'
import Webcam from 'react-webcam';
import {Menu, btnSelected, setBtn} from './components/Menu';
import {LoadingScreen} from './components/LoadingScreen';
import {
  changeStyleProperty,
  badPosture,
  showNotification,
} from './utilities'

function App() {
  //reference to canvas & webcam
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);

  //reference to the current posture
  const postureRef = useRef(null); //value of 1 is bad, 0 is good, -1 is undetected
  
  let goodPosture = null; //variable stores the pose landmarks for the user's "good" posture
  let loaded = false; //if the pose estimation model has loaded or not
  let badPostureCount = 0; //variable keeps track of the # of frames the user has bad posture

  //run this function when pose results are determined
  function onResults(results){
    if(!loaded){ //remove loader when it is finished
      loaded = true;
      console.log("HPE model finished loading.");
      changeStyleProperty("--loader-display","none");
    }

    if (!results.poseLandmarks) { //if the model is unable to detect a pose 
      console.log("No pose detected.");
      postureRef.current = -1;//change pose state to "undetected", can't track pose
      changeStyleProperty("--btn-color","rgba(0, 105, 237, 0.25)"); //fade out the calubrate button by reducing opacity
      return;
    }

    let landmarks = results.poseLandmarks;
    postureRef.current = null;
    changeStyleProperty("--btn-color","rgba(0, 105, 237, 1)"); //make the calibrate button solid

    canvasRef.current.width = webcamRef.current.video.videoWidth
    canvasRef.current.height = webcamRef.current.video.videoHeight

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");  //canvas context
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS,
                   {color: '#fff'/*'#00FF00'*/, lineWidth: 4});
    drawLandmarks(canvasCtx, results.poseLandmarks,
                  {color: '#fff'/*'#FF0000'*/, lineWidth: 2});
    canvasCtx.restore();

    if(btnSelected){ //if the calibrate button was selected
      goodPosture = landmarks; //obtain a copy of the "good pose"
      console.log("Calibrate button was clicked. New landmarks have been saved.");
      setBtn(false);
    }

    if(!goodPosture){ //the calibrate button has not been selected yet
      return;
    }
    
    //determine if the user's posture is bad or not
    if(badPosture(landmarks, goodPosture)){
      badPostureCount++;
      changeStyleProperty('--posture-status',"'BAD'"); //maybe move this inside conditional
      if(badPostureCount >= 60){ //60 frames = 2 seconds of bad posture
        showNotification("Correct your posture!");
        badPostureCount = 0;
      }
    }else{
      badPostureCount = 0;
      changeStyleProperty('--posture-status',"'GOOD'");
    }
  }

  useEffect(()=>{
    const pose = new Pose({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }});
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,//true,
      smoothSegmentation: false,//true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    pose.onResults(onResults);
    
    if(
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null
    ) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => { //this block runs once every frame
          await pose.send({image: webcamRef.current.video});
        },
        width: 640,
        height: 480
      });
      camera.start();
    }

    if(!("Notification" in window)) {
      alert("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

  }, []);

  return (
    <div className="App">
      <LoadingScreen/>
      <Menu
        postureRef={postureRef}
      />
      <div className="display">
        <Webcam
          ref={webcamRef}
          className="webcam"
          width="640px"
          height="480px"
        />
        <canvas
          ref = {canvasRef}
          className="canvas"
          width="640px"
          height="480px"
        />
      </div>
    </div>
  );
}

export default App;

```

# src/App.test.js

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

# src/components/CalibrateBtn.js

```js
export function CalibrateBtn(props) {
    return (
        <button className="btn" onClick={props.onClickCallback}>Calibrate</button>
    )
}
```

# src/components/LoadingScreen.js

```js
export function LoadingScreen(){
    return(
        <div className="loading-screen">
            <div className="lds-dual-ring"/>
            <p>Loading the pose estimation model... In the meantime, please enable your camera!</p>
        </div>
    )
}
```

# src/components/Menu.js

```js
import {useState} from 'react';
import {MenuHeader} from './MenuHeader';
import {CalibrateBtn} from './CalibrateBtn';
import {PostureStatus} from './PostureStatus';
import logo from '../logo.svg';

export let btnSelected = false;
export function setBtn(value){
  btnSelected = value;
}

export function Menu(props) {
    //two possibe states: Calibration, Tracking
    const [state, setState] = useState("Calibration");
  
    const calibratePose = ()=>{
      if(props.postureRef.current == -1){ //calibrate button selected but posture is undetected
        console.log("Cannot calibrate. No pose is detected.");
      } else { //there is a posture detected
        btnSelected = true;
        setState("Tracking");
      }
    }
  
    return (
      <div className="menu">
        <img src={logo} className="logo" alt="logo" />
        <MenuHeader state={state}/>
        <PostureStatus state={state}/>
        <CalibrateBtn state={state} onClickCallback={()=>calibratePose()}/>
      </div>
    )
}
```

# src/components/MenuHeader.js

```js
export function MenuHeader(props) {
    if(props.state=="Calibration"){
      return(
        <div>
          <h3>Welcome! To begin tracking your posture, follow the steps below.</h3>
          <ol>
          <li>Ensure your webcam is on and positioned directly in from of you at an arms length away</li>
            <li>Sit upright with "good" posture, ensuring your head and shoulders are in the frame</li>
            <li>Click the "Calibrate" button below</li>
            <li>Continue using your computer as usual. We will notify you when you slouch! (if browser notifications are enabled)</li>
          </ol>
        </div>
      );
    } else if(props.state=="Tracking"){
      return(
        <div>
          <h3>Currently tracking your posture.</h3>
          <p>If you would like to recalibrate, sit upright with a "good" posture and cick the "Calibrate" button below!</p>
        </div>
      );
    }
}
```

# src/components/PostureStatus.js

```js
export function PostureStatus(props) {
    if(props.state=="Calibration"){
      return;
    } else if(props.state=="Tracking"){
      return(
        <h4 className="posture-status">Posture: </h4>
      )
    }
}
```

# src/index.css

```css
:root {
  --loader-display: flex;
  --btn-color: rgba(0, 105, 237, 1);
  --posture-status: "UNKNOWN";
  --posture-status-color: black;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

# src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

# src/logo.svg

This is a file of the type: SVG Image

# src/reportWebVitals.js

```js
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

# src/setupTests.js

```js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```

# src/utilities.js

```js
export function changeStyleProperty(property, value){
  document.documentElement.style.setProperty(property, value);
}

export function badPosture(currLandmarks, idealLandmarks){ //returns true if the posture is bad
  //person is looking down
  let lookingDown = (currLandmarks[0]['y'] - idealLandmarks[0]['y']) >  (idealLandmarks[9]['y'] - idealLandmarks[0]['y']);
  //person face is closer to the screen
  let faceIsClose = ((idealLandmarks[0]['z'] - currLandmarks[0]['z'])>0.5);

  return(lookingDown || faceIsClose);
}

export function showNotification(notificationText){
  new Notification(notificationText);
}
```

