import React, { useState, useEffect } from 'react';

const PedestrianTrafficLight = ({ carLight, onPedestrianLightChange }) => {
  const [pedestrianLight, setPedestrianLight] = useState(carLight === 'red' ? 'green' : 'red');
  const [manualOverride, setManualOverride] = useState(false);

  // Синхронізація пішохідного світла з автомобільним, якщо немає ручного управління
  useEffect(() => {
    if (!manualOverride) {
      setPedestrianLight(carLight === 'red' ? 'green' : 'red');
    }
  }, [carLight, manualOverride]);

  // Функція для ручного перемикання пішохідного світла
  const toggleLightManually = () => {
    const newLight = pedestrianLight === 'red' ? 'green' : 'red';
    setPedestrianLight(newLight);
    setManualOverride(true);

    // Відправлення зміни пішохідного світла до основного компонента для коригування автомобільного світла
    onPedestrianLightChange(newLight);
  };

  // Відновлення автоматичного синхронізування після вручну зміненої ситуації
  useEffect(() => {
    if (manualOverride) {
      const timeoutId = setTimeout(() => {
        // Після 10 секунд автоматично відновлюється синхронізація
        setManualOverride(false);
      }, 10000); // 10 секунд для ручного режиму
      return () => clearTimeout(timeoutId);
    }
  }, [manualOverride]);

  // Оновлення пішохідного світла через 10 секунд після ручної зміни
  useEffect(() => {
    if (!manualOverride) {
      // Після 10 секунд змінюємо пішохідне світло автоматично в залежності від автомобільного
      const timeoutId = setTimeout(() => {
        setPedestrianLight(carLight === 'red' ? 'green' : 'red');
      }, 10000); // Затримка на 10 секунд
      return () => clearTimeout(timeoutId);
    }
  }, [carLight, manualOverride]);

  // Стилі для кольорів світлофорів
  const lightStyle = (color) => ({
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    margin: '10px',
    backgroundColor: color,
    opacity: pedestrianLight === color ? 1 : 0.3,
    transition: 'opacity 0.5s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <div style={lightStyle('green')} onClick={toggleLightManually} />
        <div style={lightStyle('red')} onClick={toggleLightManually} />
      </div>
    </div>
  );
};

export default PedestrianTrafficLight;
