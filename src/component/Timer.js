import React from "react";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import PlayButton from "./buttons/playButton";
import PauseButton from "./buttons/pauseButton";
import SettingButton from "./buttons/settingButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingContext from "./setting-context"; // Assuming you have a context for settings

import 'react-circular-progressbar/dist/styles.css';

const green = '#4caf50';
const red = '#f54e4e';

const Timer = () => {
    const settingInfo = useContext(SettingContext); 
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // State to track the current mode (work or break)
    const [timeLeft, setTimeLeft] = useState(settingInfo.workMinutes * 60); // Time left in seconds

    const timeLeftRef = useRef(timeLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function initalTimer() {
        const initialTime = settingInfo.workMinutes * 60;
        setTimeLeft(initialTime);
        timeLeftRef.current = initialTime;
    }

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextTime = nextMode === 'work' ? settingInfo.workMinutes * 60 : settingInfo.breakMinutes * 60;
        setMode(nextMode);
        modeRef.current = nextMode;

        setTimeLeft(nextTime);
        timeLeftRef.current = nextTime;
    }

    function tick() {
        timeLeftRef.current--; // Decrement the reference value
        setTimeLeft(timeLeftRef.current); // Update the state with the new value
    }
        
    useEffect(() => {
        initalTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (timeLeftRef.current === 0) {
                switchMode();
            } else {
                tick();
            }
        }, 1000); // Use 1000ms for a 1-second interval
        return () => clearInterval(interval);
    }, [settingInfo]); // Added initalTimer and switchMode to the dependency array

    const totalTime = mode === 'work' 
        ? settingInfo.workMinutes * 60 
        : settingInfo.breakMinutes * 60;

    const percentge = Math.round((timeLeft / totalTime) * 100);
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (
        <div className="timer-container">
            <CircularProgressbar
                value={percentge}
                text={minutes + ":" + seconds}
                className="timer"
                styles={buildStyles({
                    pathColor: mode === 'work' ? red : green,
                    textColor: '#fff',
                    trailColor: '#d6d6d6'
                })}
            />
            <div className="timer-buttons">
            {isPaused ? (
                <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
            ) : (
                <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />
            )}
            <SettingButton onClick={() => settingInfo.setShowSettings(true)} />
            </div>
        </div>
    );
};

export default Timer;

