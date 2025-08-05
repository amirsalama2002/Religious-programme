import React from 'react';
import Takate from './Takate';
import Adue from './Adue';
import Tasbeeh from "./Tasbeeh";
import AzkarMorning from './AzkarMorning';
import AzkarEvening from "./AzkarEvening"
const Home = () => {
    return (
        <div>
            <Takate/>
            <Adue/>
            <Tasbeeh/>
            <AzkarMorning/>
            <AzkarEvening/>
        </div>
    );
}

export default Home;
