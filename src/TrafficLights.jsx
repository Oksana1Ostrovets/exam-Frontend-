import React, { useState, useEffect } from 'react';
import PedestrianTrafficLight from './PedestrianTrafficLight';
import Light from './Light';

const TrafficLights = () => {
  const [activeCarLight, setActiveCarLight] = useState('green'); 
  const [activePedestrianLight, setActivePedestrianLight] = useState('red'); 
  const [clickCounts, setClickCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState('vertical');

  const lights = ['green', 'yellow', 'red'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveCarLight((prev) => {
        if (prev === 'green') return 'yellow';
        if (prev === 'yellow') return 'red';
        return 'green';
      });
    }, 7000); 

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    if (activeCarLight === 'red') {
      setActivePedestrianLight('green');
    } else {
      setActivePedestrianLight('red');
    }
  }, [activeCarLight]);

  const handleCarLightClick = (color) => {
    setActiveCarLight(color);
    setClickCounts((prevCounts) => ({ ...prevCounts, [color]: prevCounts[color] + 1 }));

    if (color === 'red') {
      setActivePedestrianLight('green'); 
    } else {
      setActivePedestrianLight('red'); 
    }

    // Update the traffic light state on the Google Script
    updateTrafficLightsState(color, activePedestrianLight, 'car');
    logStateTransition(new Date().toLocaleString(), clickCounts[color]);
  };

  async function updateTrafficLightsState(carLight, pedestrianLight, switchMode) {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxsB1ZnQdCrlCXlK5lVcxWWoPJ3VZZ1incPY4dd-_exX54Xf3znsh-NvA6QA93KRhJlkg/exec', {
      method: 'POST',
      body: new URLSearchParams({
        endpoint: 'setState',
        carLight: carLight,
        pedestrianLight: pedestrianLight,
        switchMode: switchMode,
      }),
    });
    const result = await response.text();
    console.log(result); 
  }

  async function logStateTransition(transitionTime, count) {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxsB1ZnQdCrlCXlK5lVcxWWoPJ3VZZ1incPY4dd-_exX54Xf3znsh-NvA6QA93KRhJlkg/exec', {
      method: 'POST',
      body: new URLSearchParams({
        endpoint: 'logTransition',
        transitionTime: transitionTime,
        count: count,
      }),
    });
    const result = await response.text();
    console.log(result); 
  }

  const handlePedestrianLightChange = (newPedestrianLight) => {
    setActivePedestrianLight(newPedestrianLight);
    setClickCounts((prevCounts) => ({ ...prevCounts, [newPedestrianLight]: prevCounts[newPedestrianLight] + 1 }));

    if (newPedestrianLight === 'green') {
      setActiveCarLight('red');
    } else {
      setActiveCarLight('green');
    }

    // Log pedestrian light changes
    updateTrafficLightsState(activeCarLight, newPedestrianLight, 'pedestrian');
    logStateTransition(new Date().toLocaleString(), clickCounts[newPedestrianLight]);
  };

  const lightStyle = (color, isActive) => ({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: '10px',
    backgroundColor: color,
    opacity: isActive ? 1 : 0.3,
    transition: 'opacity 0.5s',
    boxShadow: `0 0 10px ${color}`,
  });

  const containerStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#333',
    borderRadius: '10px',
    width: orientation === 'vertical' ? '100px' : '300px',
    height: orientation === 'vertical' ? '300px' : '100px',
  };

  const toggleOrientation = () => {
    setOrientation((prevOrientation) =>
      prevOrientation === 'vertical' ? 'horizontal' : 'vertical'
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={toggleOrientation} style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', backgroundColor: '#2196F3', color: 'white', cursor: 'pointer' }}>
        Перемкнути орієнтацію ({orientation === 'vertical' ? 'Горизонтально' : 'Вертикально'})
      </button>

      <div style={{ marginBottom: '20px' }}>
        <p>Кількість натискань:</p>
        <ul>
          <li>Червоний: {clickCounts.red}</li>
          <li>Жовтий: {clickCounts.yellow}</li>
          <li>Зелений: {clickCounts.green}</li>
        </ul>
      </div>

      <div style={containerStyle}>
        <Light
          color="red"
          isActive={activeCarLight === 'red'}
          onClick={() => handleCarLightClick('red')}
          clickCount={clickCounts.red}
        />
        <Light
          color="yellow"
          isActive={activeCarLight === 'yellow'}
          onClick={() => handleCarLightClick('yellow')}
          clickCount={clickCounts.yellow}
        />
        <Light
          color="green"
          isActive={activeCarLight === 'green'}
          onClick={() => handleCarLightClick('green')}
          clickCount={clickCounts.green}
        />
      </div>

      <h3>Пішохідний світлофор</h3>
      <PedestrianTrafficLight
        carLight={activeCarLight}
        onPedestrianLightChange={handlePedestrianLightChange}
      />
    </div>
  );
};

export default TrafficLights;
