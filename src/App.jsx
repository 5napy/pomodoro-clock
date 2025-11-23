import { useState, useEffect, useRef } from 'react';
import './App.css'
import beepSound from "./assets/alarm.mp3";


function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const audioRef = useRef(null);



  useEffect(() => {
  if (isRunning) {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }
}, [isRunning]);


useEffect(() => {
  if (timeLeft === 0) {

    const audio = audioRef.current;
    // Play sound
    audio.play();

    // Stop after 2 seconds
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 4000);

    const nextIsBreak = !isBreak;   // compute next mode BEFORE updating state
    setIsBreak(nextIsBreak);

    const nextTime = nextIsBreak
      ? breakLength * 60
      : sessionLength * 60;

    setTimeLeft(nextTime);
  }
}, [timeLeft, isBreak, breakLength, sessionLength]);




function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const increaseSession = () => {
  if (!isRunning && sessionLength < 60) {
    const newSession = sessionLength + 1;

    setSessionLength(newSession);
    setTimeLeft(newSession * 60);
  }
};

const decreaseSession = () => {
  if(!isRunning && sessionLength > 1){
    const newSession = sessionLength - 1;

    setSessionLength(newSession);
    setTimeLeft(newSession * 60);
  }
};

const increaseBreak = () => {
  if (!isRunning && breakLength < 60) {
    const newBreak = breakLength + 1;
    setBreakLength(newBreak);

    // Only update visible timer if currently in break mode
    if (isBreak) {
      setTimeLeft(newBreak * 60);
    }
  }
};

const decreaseBreak = () => {
  if (!isRunning && breakLength > 1) {
    const newBreak = breakLength - 1;
    setBreakLength(newBreak);

    if (isBreak) {
      setTimeLeft(newBreak * 60);
    }
  }
};

const toggleStartStop = () => {
  setIsRunning(prev => !prev);
};

const reset = () => {
  setIsRunning(false);
  setIsBreak(false);
  setSessionLength(25);
  setBreakLength(5);
  setTimeLeft(25 * 60);

  const audio = audioRef.current;
  audio.pause();
  audio.currentTime = 0;
};


const materialIcons = "material-symbols-outlined";

  return (
    <div className="mt-24 text-center w-full mx-auto">
    <h1 className="mb-12 text-2xl">POMODORO</h1>

    <div id="clock" className="border rounded-full w-[400px] h-[400px] flex flex-col mx-auto justify-center items-center column" >
      <h2 id="timer-label" className='text-4xl'>{isBreak ? "Break" : "Work"}</h2>
      <div id="time-left" className="text-9xl">{formatTime(timeLeft)}</div>

      <div className="flex gap-4 justify-center mt-4">
        <button id="start_stop" onClick={toggleStartStop}><span className={`${materialIcons} text-6xl`}>{isRunning ? "pause" : "play_arrow"}</span>
</button>
        <button id="reset" onClick={reset}><span className={`${materialIcons} text-6xl`}>restart_alt</span></button>
      </div>

    </div>

    <div id="setup" className="flex gap-x-56 mt-8">
      <div id="session-setup">
        <h3 id="session-label" className="text-2xl">Session time</h3>
          <h2 id="session-length" className="text-4xl mt-6">{sessionLength}</h2>

        <div className="flex gap-x-6">  
        <button id="session-decrement" className={`${materialIcons} text-6xl`} onClick={decreaseSession}><span>arrow_drop_down</span></button>
        <button id="session-increment" className={`${materialIcons} text-6xl`} onClick={increaseSession}>arrow_drop_up</button>
        </div>
      </div>

      <div id="break-setup">
        <h3 id="break-label" className="text-2xl">Break time</h3>
        <h2 id="break-length" className="text-4xl mt-6" >{breakLength}</h2>
        <div className="flex gap-x-6">
        <button id="break-decrement" onClick={decreaseBreak} className={`${materialIcons} text-6xl`}>arrow_drop_up</button>
        <button id="break-increment" onClick={increaseBreak} className={`${materialIcons} text-6xl`}>arrow_drop_down</button>
        </div>
      </div>

    </div>
    <audio
  id="beep"
  ref={audioRef}

  preload="auto"
  src={beepSound}
></audio>

    </div>
  )
}

export default App
