import React, { useState } from 'react';
import Logo from './Logo';

export let btnSelected = false;
export function setBtn(value) {
  btnSelected = value;
}

const MenuHeader = ({ state }) => {
  if (state === "Calibration") {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Welcome to PostureGuard!</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold mb-2">Getting Started</h4>
          <ol className="space-y-2 text-sm">
            <li>1. Position your webcam at arm's length</li>
            <li>2. Sit upright with good posture</li>
            <li>3. Click "Calibrate" below</li>
            <li>4. Continue working - we'll notify you if you slouch!</li>
          </ol>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Tracking Active</h3>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm">
          Need to recalibrate? Just sit upright and click "Calibrate" again!
        </p>
      </div>
    </div>
  );
};

const PostureStatus = ({ state }) => {
  if (state === "Tracking") {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="posture-status text-xl font-semibold flex items-center">
          Current Posture: 
          <span className="posture-value ml-2" style={{ color: 'var(--posture-status-color)' }}>
            {/* The content will be injected by CSS */}
          </span>
        </h4>
      </div>
    );
  }
  return null;
};

const CalibrateButton = ({ onClickCallback }) => {
  return (
    <button 
      className="btn mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-colors"
      onClick={onClickCallback}
    >
      Calibrate
    </button>
  );
};

export function Menu({ postureRef }) {
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
    <div className="menu">
      <Logo />
      <div className="mt-8">
        <MenuHeader state={state} />
        <PostureStatus state={state} />
        <CalibrateButton onClickCallback={calibratePose} />
      </div>
    </div>
  );
}