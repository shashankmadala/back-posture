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