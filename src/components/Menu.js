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