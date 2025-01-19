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
  updatePostureStatus
} from './utilities'

function App() {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const postureRef = useRef(null);
  
  let goodPosture = null;
  let loaded = false;
  let badPostureCount = 0;

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
      changeStyleProperty('--posture-status', '"UNKNOWN"');
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
        showNotification("Fix your posture!");
        badPostureCount = 0;
      }
    } else {
      badPostureCount = 0;
      updatePostureStatus(true);
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
  }, []);

  return (
    <div className="App">
      <LoadingScreen/>
      <Menu postureRef={postureRef} />
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