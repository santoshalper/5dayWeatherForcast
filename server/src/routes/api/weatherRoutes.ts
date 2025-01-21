import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(req.body.cityName);
  //console.log(weatherData);
  // TODO: save city to search history
  if(weatherData.length !== 0) {
    HistoryService.addCity(req.body.cityName);
    res.send(weatherData);
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  const historyData = await HistoryService.getCities();
  res.send(historyData);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  HistoryService.removeCity(req.params.id);
  const historyData = await HistoryService.getCities();
  res.send(historyData);
});

export default router;
