import React from 'react';
import Takate from './Takate';
import Adue from './Adue';
import Tasbeeh from "./Tasbeeh";
import AzkarMorning from './AzkarMorning';
import AzkarEvening from "./AzkarEvening"
import DailyWird from './DailyWird';
import HadithOfTheDay from './HadithOfTheDay';
const Home = () => {
    return (
        <div>
            <Takate/>
            <Adue/>
            <Tasbeeh/>
            <AzkarMorning/>
            <AzkarEvening/>
            <DailyWird/>
            <HadithOfTheDay/>
        </div>
    );
}

export default Home;
