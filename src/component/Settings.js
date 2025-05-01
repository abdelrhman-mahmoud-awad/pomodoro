import ReactSlider from "react-slider";
import '../component/slider.css';
import { useContext } from "react";
import SettingContext from "./setting-context";
import BackButton from "./buttons/backButton"; // Import BackButton component
import ChangeThemeButton from "./buttons/ChangeThemeButton"; // Import ChangeThemeButton component

const Settings = () => {
    const settingInfo = useContext(SettingContext);

    return (
        <div className="settings-container">
            <label className="label">Work time: {settingInfo.workMinutes}</label>
            <ReactSlider
                className={'slider slider-work'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingInfo.workMinutes}
                onChange={newValue => settingInfo.setWorkMinutes(newValue)}
                min={1}
                max={60}
            />
            <label className="label">Break time: {settingInfo.breakMinutes}</label>
            <ReactSlider
                className={'slider slider-break'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingInfo.breakMinutes}
                onChange={newValue => settingInfo.setBreakMinutes(newValue)}
                min={1}
                max={30}
            />
            <div className="settings-buttons">
            <BackButton onClick={() => settingInfo.setShowSettings(false)} />
                <ChangeThemeButton />
            </div>
        </div>
    );
};

export default Settings;

