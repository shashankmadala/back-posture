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
  
  let goodPosture = null;
  let badPostureCount = 0;

  const onResults = (results) => {
    if (isLoading) {
      setIsLoading(false);
    }

    if (!results.poseLandmarks) {
      postureRef.current = -1;
      return;
    }

    const landmarks = results.poseLandmarks;
    setCurrentPoseLandmarks(landmarks);
    postureRef.current = null;

    // Canvas drawing logic
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    
    canvasElement.width = webcamRef.current.video.videoWidth;
    canvasElement.height = webcamRef.current.video.videoHeight;
    
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // Draw pose landmarks with a modern aesthetic
    drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS,
      { color: '#4F46E5', lineWidth: 2 });
    drawLandmarks(canvasCtx, results.poseLandmarks,
      { color: '#818CF8', lineWidth: 1 });
    canvasCtx.restore();

    // Posture analysis logic
    if (goodPosture) {
      const isBadPosture = badPosture(landmarks, goodPosture);
      setPostureStatus(isBadPosture ? 'BAD' : 'GOOD');
      
      if (isBadPosture) {
        badPostureCount++;
        if (badPostureCount >= 60) {
          showNotification("Time to correct your posture!");
          badPostureCount = 0;
        }
      } else {
        badPostureCount = 0;
      }
    }
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

    Notification.requestPermission();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PostureGuard</h1>
          <p className="text-lg text-gray-600">Your personal posture assistant</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative rounded-lg overflow-hidden shadow-lg bg-white p-6">
            <div className="aspect-w-4 aspect-h-3">
              <Webcam
                ref={webcamRef}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                width={640}
                height={480}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                width={640}
                height={480}
              />
            </div>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <Alert>
                <AlertDescription>
                  Loading pose detection model... Please enable your camera.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {calibrationMode ? 'Calibration Mode' : 'Tracking Mode'}
                  </h2>
                  
                  {calibrationMode ? (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Please sit with good posture and click calibrate to begin tracking.
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        <li>Position your webcam at arm's length</li>
                        <li>Sit upright with good posture</li>
                        <li>Ensure your head and shoulders are visible</li>
                      </ol>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Current Posture:</span>
                        <span className={`font-semibold ${
                          postureStatus === 'GOOD' ? 'text-green-600' : 
                          postureStatus === 'BAD' ? 'text-red-600' : 
                          'text-gray-600'
                        }`}>
                          {postureStatus}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={calibratePose}
                    disabled={postureRef.current === -1}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
                      ${postureRef.current === -1 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  >
                    {calibrationMode ? 'Calibrate' : 'Recalibrate'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostureGuard;