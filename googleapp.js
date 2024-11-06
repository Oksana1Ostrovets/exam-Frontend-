import express from 'express';

const app = express();
const port = 3000;

let trafficLights = [
  { id: 1, color: 'red' },
  { id: 2, color: 'yellow' },
  { id: 3, color: 'green' }
];

app.use(express.json());

app.get('/api/traffic-lights', (req, res) => {
  res.json(trafficLights);
});

app.get('/api/traffic-lights/:id', (req, res) => {
  const { id } = req.params;
  const trafficLight = trafficLights.find(tl => tl.id == id);

  if (!trafficLight) {
    return res.status(404).json({ message: 'Світлофор не знайдено' });
  }

  res.json(trafficLight);
});

app.put('/api/traffic-lights/:id', (req, res) => {
  const { id } = req.params;
  const { color } = req.body;

  if (!['red', 'yellow', 'green'].includes(color)) {
    return res.status(400).json({ message: 'Невірний колір!' });
  }

  const trafficLight = trafficLights.find(tl => tl.id == id);

  if (!trafficLight) {
    return res.status(404).json({ message: 'Світлофор не знайдено' });
  }

  trafficLight.color = color;

  res.json(trafficLight);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
