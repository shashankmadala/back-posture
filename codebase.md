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
  },
  "devDependencies": {
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17"
  }
}

```

# postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
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
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap" rel="stylesheet">
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
    font-size: 1.2rem;
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
    align-items: flex-start;
    padding: 2rem;
    min-height: 100vh;
    background-color: #f3f4f6;
}

.menu {
    width: 35%;
    padding: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.display {
    position: relative;
    width: 640px;
    height: 480px;
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.webcam {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.posture-status {
    margin-top: 1rem;
    font-size: 1.25rem;
}

.posture-status::after {
    content: var(--posture-status);
    color: var(--posture-status-color);
    margin-left: 0.5rem;
}

.btn {
    font-size: 1.25rem;
    width: 100%;
    padding: 1rem;
    background: var(--btn-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn:hover {
    opacity: 0.9;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Responsive fixes */
@media (max-width: 1200px) {
    .App {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .menu {
        width: 640px;
        max-width: 90%;
    }
}
```

# src/App.js

```js
import './App.css';
import React, {useRef, useEffect, useState} from 'react';
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
  updatePostureStatus
} from './utilities';

function App() {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const postureRef = useRef(null);
  
  let goodPosture = null;
  let loaded = false;
  let badPostureCount = 0;

  const [dailyStats, setDailyStats] = useState(() => {
    const saved = localStorage.getItem('dailyPostureStats');
    return saved ? JSON.parse(saved) : {
      date: new Date().toLocaleDateString(),
      goodPostureTime: 0,
      badPostureTime: 0,
      lastUpdate: Date.now()
    };
  });

  useEffect(() => {
    localStorage.setItem('dailyPostureStats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  function onResults(results) {
    if(!loaded) {
      loaded = true;
      console.log("HPE model finished loading.");
      changeStyleProperty("--loader-display","none");
    }

    if (!results.poseLandmarks) {
      console.log("No pose detected.");
      postureRef.current = -1;
      changeStyleProperty("--btn-color","rgba(0, 105, 237, 0.25)");
      changeStyleProperty('--posture-status', '"తెలియదు"');
      changeStyleProperty('--posture-status-color', '#6b7280');
      return;
    }

    let landmarks = results.poseLandmarks;
    postureRef.current = null;
    changeStyleProperty("--btn-color","rgba(0, 105, 237, 1)");

    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS,
                   {color: '#fff', lineWidth: 4});
    drawLandmarks(canvasCtx, results.poseLandmarks,
                  {color: '#fff', lineWidth: 2});
    canvasCtx.restore();

    if(btnSelected) {
      goodPosture = landmarks;
      console.log("Calibrate button was clicked. New landmarks have been saved.");
      setBtn(false);
    }

    if(!goodPosture) {
      return;
    }
    
    const isPostureBad = badPosture(landmarks, goodPosture);
    
    if(isPostureBad) {
      badPostureCount++;
      updatePostureStatus(false);
      if(badPostureCount >= 60) {
        showNotification("వెన్నెముక సరిగ్గా ఉంచండి!");
        badPostureCount = 0;
      }
      // Update bad posture time
      const now = Date.now();
      const timeDiff = (now - dailyStats.lastUpdate) / 1000;
      setDailyStats(prev => ({
        ...prev,
        badPostureTime: prev.badPostureTime + timeDiff,
        lastUpdate: now
      }));
    } else {
      badPostureCount = 0;
      updatePostureStatus(true);
      // Update good posture time
      const now = Date.now();
      const timeDiff = (now - dailyStats.lastUpdate) / 1000;
      setDailyStats(prev => ({
        ...prev,
        goodPostureTime: prev.goodPostureTime + timeDiff,
        lastUpdate: now
      }));
    }
  }

  useEffect(() => {
    const pose = new Pose({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }});
    
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    
    pose.onResults(onResults);
    
    if(typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
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

    // Check for midnight reset
    const midnightCheck = setInterval(() => {
      const currentDate = new Date().toLocaleDateString();
      if (currentDate !== dailyStats.date) {
        setDailyStats({
          date: currentDate,
          goodPostureTime: 0,
          badPostureTime: 0,
          lastUpdate: Date.now()
        });
      }
    }, 60000); // Check every minute

    return () => clearInterval(midnightCheck);
  }, []);

  return (
    <div className="App">
      <LoadingScreen/>
      <Menu postureRef={postureRef} dailyStats={dailyStats} />
      <div className="display">
        <Webcam
          ref={webcamRef}
          className="webcam"
          width="640px"
          height="480px"
        />
        <canvas
          ref={canvasRef}
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
export function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="lds-dual-ring"/>
            <p style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
                లోడ్ అవుతోంది... దయచేసి మీ కెమెరాను ఆన్ చేయండి
            </p>
        </div>
    )
}
```

# src/components/Logo.js

```js
import React from 'react';
import { teluguTranslations } from '../translations/te';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
        {teluguTranslations.appName}
      </div>
    </div>
  );
};

export default Logo;
```

# src/components/Menu.js

```js
import React, { useState, useEffect } from 'react';

export let btnSelected = false;
export function setBtn(value) {
  btnSelected = value;
}

// Daily exercises specifically for back pain
const backExercises = [
  {
    id: 1,
    name: "సున్నిత వెన్నెముక వ్యాయామం", // Gentle spine stretch
    duration: "2 నిమిషాలు", // 2 minutes
    description: "కుర్చీలో కూర్చుని, మెల్లగా ముందుకు వంగండి"
  },
  {
    id: 2,
    name: "నడక", // Walking
    duration: "10 నిమిషాలు", // 10 minutes
    description: "మెల్లగా ఇంట్లో నడవండి"
  },
  {
    id: 3,
    name: "భుజాల వ్యాయామం", // Shoulder rolls
    duration: "1 నిమిషం", // 1 minute
    description: "భుజాలను వృత్తాకారంగా కదపండి"
  }
];

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}గం ${minutes}ని`;
};

const getPostureScore = (stats) => {
  const totalTime = stats.goodPostureTime + stats.badPostureTime;
  if (totalTime === 0) return 0;
  return Math.round((stats.goodPostureTime / totalTime) * 100);
};

const WeeklyProgress = ({ dailyStats }) => {
  const weeklyData = dailyStats.weeklyScores || [];
  
  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
      <h3 className="text-lg font-semibold mb-2">వారపు పురోగతి:</h3>
      <div className="flex space-x-2">
        {weeklyData.map((score, index) => (
          <div 
            key={index}
            className="flex-1 bg-white p-2 rounded text-center"
            title={`Day ${index + 1}: ${score}%`}
          >
            <div className="h-20 relative bg-gray-100 rounded">
              <div 
                className="absolute bottom-0 w-full bg-blue-500 rounded-b"
                style={{ height: `${score}%` }}
              />
            </div>
            <div className="mt-1 text-sm">{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExerciseTracker = ({ state }) => {
  const [completedExercises, setCompletedExercises] = useState(() => {
    const saved = localStorage.getItem('completedExercises');
    return saved ? JSON.parse(saved) : {
      date: new Date().toLocaleDateString(),
      exercises: []
    };
  });

  useEffect(() => {
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
  }, [completedExercises]);

  const toggleExercise = (id) => {
    setCompletedExercises(prev => ({
      ...prev,
      exercises: prev.exercises.includes(id) 
        ? prev.exercises.filter(exId => exId !== id)
        : [...prev.exercises, id]
    }));
  };

  if (state !== "Tracking") return null;

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
      <h3 className="text-xl font-semibold mb-4">నేటి వ్యాయామాలు:</h3>
      <div className="space-y-4">
        {backExercises.map(exercise => (
          <div 
            key={exercise.id}
            className="flex items-center space-x-3 bg-white p-3 rounded-lg"
          >
            <input
              type="checkbox"
              checked={completedExercises.exercises.includes(exercise.id)}
              onChange={() => toggleExercise(exercise.id)}
              className="w-5 h-5"
            />
            <div>
              <div className="font-semibold">{exercise.name}</div>
              <div className="text-sm text-gray-600">{exercise.duration}</div>
              <div className="text-sm text-gray-500">{exercise.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PainTracker = ({ state }) => {
  const [painLevel, setPainLevel] = useState(() => {
    const saved = localStorage.getItem('painTracker');
    return saved ? JSON.parse(saved) : {
      date: new Date().toLocaleDateString(),
      level: 0,
      history: []
    };
  });

  useEffect(() => {
    localStorage.setItem('painTracker', JSON.stringify(painLevel));
  }, [painLevel]);

  if (state !== "Tracking") return null;

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
      <h3 className="text-xl font-semibold mb-4">నొప్పి స్థాయి:</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="10"
            value={painLevel.level}
            onChange={(e) => setPainLevel(prev => ({
              ...prev,
              level: parseInt(e.target.value),
              history: [...prev.history, {
                date: new Date().toLocaleDateString(),
                level: parseInt(e.target.value)
              }]
            }))}
            className="w-full"
          />
          <span className="font-bold text-lg">{painLevel.level}</span>
        </div>
        <div className="text-sm text-gray-600">
          0 = నొప్పి లేదు, 10 = చాలా నొప్పి
        </div>
      </div>
    </div>
  );
};

const MenuHeader = ({ state, dailyStats }) => {
  if (state === "Calibration") {
    return (
      <div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
          వెన్నెముక రక్షకుడు
        </h1>
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
          ప్రారంభించడానికి
        </h2>
        <ol className="space-y-4 text-lg" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
          <li>1. కెమెరాను చేతి దూరంలో ఉంచండి</li>
          <li>2. సరైన భంగిమలో కూర్చోండి</li>
          <li>3. 'సెట్ చేయండి' బటన్ నొక్కండి</li>
          <li>4. పనిచేసుకోండి - మేము మీకు గుర్తు చేస్తాము!</li>
        </ol>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
        వెన్నెముక రక్షకుడు
      </h1>
      <div className="bg-blue-50 p-4 rounded-lg space-y-3" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
        <div className="text-lg">
          <div>మంచి భంగిమ సమయం: {formatTime(dailyStats.goodPostureTime)}</div>
          <div>తప్పు భంగిమ సమయం: {formatTime(dailyStats.badPostureTime)}</div>
          <div className="text-xl font-semibold">రోజు స్కోరు: {getPostureScore(dailyStats)}%</div>
        </div>
      </div>
    </div>
  );
};

const PostureStatus = ({ state }) => {
  if (state === "Tracking") {
    return (
      <div className="mt-4" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
        <h4 className="text-lg">
          ప్రస్తుత భంగిమ: <span className="posture-status"></span>
        </h4>
      </div>
    );
  }
  return null;
};

export function Menu({ postureRef, dailyStats }) {
  const [state, setState] = useState("Calibration");
  
  const calibratePose = () => {
    if (postureRef.current === -1) {
      console.log("Cannot calibrate. No pose is detected.");
    } else {
      btnSelected = true;
      setState("Tracking");
    }
  };
  
  return (
    <div className="menu overflow-auto max-h-screen">
      <MenuHeader state={state} dailyStats={dailyStats} />
      <PostureStatus state={state} />
      <WeeklyProgress dailyStats={dailyStats} />
      <ExerciseTracker state={state} />
      <PainTracker state={state} />
      <button 
        className="btn mt-6 mb-6"
        onClick={calibratePose}
        style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}
      >
        {state === "Calibration" ? 'సెట్ చేయండి' : 'మళ్ళీ సెట్ చేయండి'}
      </button>
    </div>
  );
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

# src/components/PostureGuard.js

```js
import React, { useRef, useEffect, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import * as mediapipePose from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import Webcam from 'react-webcam';
import { Alert, AlertDescription } from './ui/alert';
import { badPosture, showNotification } from '../utilities';

const PostureGuard = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const postureRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [calibrationMode, setCalibrationMode] = useState(true);
  const [postureStatus, setPostureStatus] = useState('UNKNOWN');
  const [currentPoseLandmarks, setCurrentPoseLandmarks] = useState(null);
  const [dailyStats, setDailyStats] = useState(() => {
    const saved = localStorage.getItem('dailyPostureStats');
    return saved ? JSON.parse(saved) : {
      date: new Date().toLocaleDateString(),
      goodPostureTime: 0,
      badPostureTime: 0,
      lastUpdate: Date.now()
    };
  });
  
  let goodPosture = null;
  let badPostureCount = 0;

  useEffect(() => {
    localStorage.setItem('dailyPostureStats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  useEffect(() => {
    const checkDate = () => {
      const currentDate = new Date().toLocaleDateString();
      if (currentDate !== dailyStats.date) {
        setDailyStats({
          date: currentDate,
          goodPostureTime: 0,
          badPostureTime: 0,
          lastUpdate: Date.now()
        });
      }
    };

    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, [dailyStats.date]);

  const updatePostureTime = (isGoodPosture) => {
    const now = Date.now();
    const timeDiff = (now - dailyStats.lastUpdate) / 1000;

    setDailyStats(prev => ({
      ...prev,
      goodPostureTime: isGoodPosture ? prev.goodPostureTime + timeDiff : prev.goodPostureTime,
      badPostureTime: isGoodPosture ? prev.badPostureTime : prev.badPostureTime + timeDiff,
      lastUpdate: now
    }));
  };

  const onResults = (results) => {
    if (isLoading) {
      setIsLoading(false);
      console.log("HPE model finished loading.");
      changeStyleProperty("--loader-display", "none");
    }

    if (!results.poseLandmarks) {
      postureRef.current = -1;
      setPostureStatus('UNKNOWN');
      changeStyleProperty("--btn-color", "rgba(0, 105, 237, 0.25)");
      return;
    }

    const landmarks = results.poseLandmarks;
    setCurrentPoseLandmarks(landmarks);
    postureRef.current = null;
    changeStyleProperty("--btn-color", "rgba(0, 105, 237, 1)");

    // Drawing logic (keeping your existing canvas code)
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    
    canvasElement.width = webcamRef.current.video.videoWidth;
    canvasElement.height = webcamRef.current.video.videoHeight;
    
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS,
                   {color: '#1E40AF', lineWidth: 4});
    drawLandmarks(canvasCtx, results.poseLandmarks,
                  {color: '#2563EB', lineWidth: 2});
    canvasCtx.restore();

    if (goodPosture) {
      const isBadPosture = badPosture(landmarks, goodPosture);
      setPostureStatus(isBadPosture ? 'BAD' : 'GOOD');
      updatePostureTime(!isBadPosture);
      
      if (isBadPosture) {
        badPostureCount++;
        if (badPostureCount >= 60) {
          showNotification("వెన్నెముక సరిగ్గా ఉంచండి!");
          badPostureCount = 0;
        }
      } else {
        badPostureCount = 0;
      }
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}గం ${minutes}ని`;
  };

  const getPostureScore = () => {
    const totalTime = dailyStats.goodPostureTime + dailyStats.badPostureTime;
    if (totalTime === 0) return 0;
    return Math.round((dailyStats.goodPostureTime / totalTime) * 100);
  };

  const calibratePose = () => {
    if (postureRef.current === -1) return;
    goodPosture = currentPoseLandmarks;
    setCalibrationMode(false);
  };

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResults);

    if (webcamRef.current) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480
      });
      camera.start();
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera View */}
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-white p-6">
            <div className="aspect-w-4 aspect-h-3">
              <Webcam
                ref={webcamRef}
                className="webcam"
                width={640}
                height={480}
              />
              <canvas
                ref={canvasRef}
                className="canvas"
                width={640}
                height={480}
              />
            </div>
          </div>

          {/* Controls and Stats */}
          <div className="space-y-6">
            {isLoading ? (
              <Alert>
                <AlertDescription className="text-xl" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
                  లోడ్ అవుతోంది... దయచేసి మీ కెమెరాను ఆన్ చేయండి
                </AlertDescription>
              </Alert>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                {calibrationMode ? (
                  <div className="space-y-6" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
                    <h2 className="text-2xl font-semibold text-gray-900">ప్రారంభ సూచనలు:</h2>
                    <ol className="space-y-4 text-lg">
                      <li>1. కెమెరాను చేతి దూరంలో ఉంచండి</li>
                      <li>2. సరైన భంగిమలో కూర్చోండి</li>
                      <li>3. 'సెట్ చేయండి' బటన్ నొక్కండి</li>
                      <li>4. పనిచేసుకోండి - మేము మీకు గుర్తు చేస్తాము!</li>
                    </ol>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">నేటి వివరాలు:</h2>
                      <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                        <p className="text-lg">మంచి భంగిమ సమయం: {formatTime(dailyStats.goodPostureTime)}</p>
                        <p className="text-lg">తప్పు భంగిమ సమయం: {formatTime(dailyStats.badPostureTime)}</p>
                        <p className="text-xl font-semibold">రోజు స్కోరు: {getPostureScore()}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
                      <span className="text-xl">ప్రస్తుత భంగిమ:</span>
                      <span className={`text-xl font-semibold ${
                        postureStatus === 'GOOD' ? 'text-green-600' : 
                        postureStatus === 'BAD' ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {postureStatus === 'GOOD' ? 'బాగుంది' : 
                         postureStatus === 'BAD' ? 'సరిగ్గా లేదు' : 
                         'తెలియదు'}
                      </span>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={calibratePose}
                  disabled={postureRef.current === -1}
                  className={`w-full py-4 px-6 rounded-xl text-white font-medium text-xl transition-colors
                    ${postureRef.current === -1 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'}`}
                  style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}
                >
                  {calibrationMode ? 'సెట్ చేయండి' : 'మళ్ళీ సెట్ చేయండి'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostureGuard;
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

# src/components/ui/alert.js

```js
import React from "react"

export const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={`relative w-full rounded-lg border p-4 ${
      variant === "destructive" 
        ? "border-red-500/50 text-red-500" 
        : "border-gray-200 text-gray-700"
    }`}
    {...props}
  />
))
Alert.displayName = "Alert"

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"
```

# src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --loader-display: flex;
  --btn-color: rgba(0, 105, 237, 1);
  --posture-status: "UNKNOWN";
  --posture-status-color: #6b7280;  /* gray-500 */
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

# src/translations/te.js

```js
export const teluguTranslations = {
    appName: "వెన్నెముక రక్షకుడు", // VenneMuka Rakshakudu (Back Protector)
    welcome: "స్వాగతం!",
    loading: "లోడ్ అవుతోంది... దయచేసి మీ కెమెరాను ఆన్ చేయండి",
    calibrationTitle: "ప్రారంభ సెట్టింగులు",
    trackingTitle: "మీ భంగిమను గమనిస్తోంది",
    instructions: {
      step1: "1. కెమెరాను చేతి దూరంలో ఉంచండి",
      step2: "2. సరైన భంగిమలో కూర్చోండి",
      step3: "3. 'సెట్ చేయండి' బటన్ నొక్కండి",
      step4: "4. పనిచేసుకోండి - మీరు ముందుకు వంగితే మేము తెలియజేస్తాము!"
    },
    calibrateButton: "సెట్ చేయండి",
    recalibrateButton: "మళ్ళీ సెట్ చేయండి",
    currentPosture: "ప్రస్తుత భంగిమ:",
    postureStatuses: {
      unknown: "తెలియదు",
      good: "బాగుంది",
      bad: "సరిగ్గా లేదు"
    },
    notifications: {
      badPosture: "దయచేసి మీ భంగిమను సరిచేసుకోండి!"
    },
    recalibrationTip: "మళ్ళీ సెట్ చేయాలంటే, సరిగ్గా కూర్చుని 'మళ్ళీ సెట్ చేయండి' నొక్కండి"
  };
```

# src/utilities.js

```js
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
```

# tailwind.config.js

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

