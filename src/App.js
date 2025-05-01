import React, { useState } from 'react';
import './App.css';
import Timer from './component/Timer';
import Settings from './component/Settings';
import SettingContext from './component/setting-context';

function App() {
  const [showSettings, setShowSettings] = useState(false); // Toggle between Timer and Settings
  const [workMinutes, setWorkMinutes] = useState(25); // Default work time
  const [breakMinutes, setBreakMinutes] = useState(5); // Default break time

  return (
    <>
    <SettingContext.Provider
      value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}
      >
        <h1 className="main-title">Pomodoro Timer</h1>
      <main>

        {showSettings ? (
          <Settings />
        ) : (
          <Timer />
        )}
      </main>
    </SettingContext.Provider>
        </>
  );
}

export default App;
