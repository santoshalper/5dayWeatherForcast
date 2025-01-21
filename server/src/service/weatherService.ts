import dotenv from 'dotenv';
//import { parse } from 'path';
dotenv.config();
const API_KEY = process.env.API_KEY || '';
const API_BASE_URL = process.env.API_BASE_URL || '';
// TODO: Define an interface for the Coordinates object
interface Coordinates{
  lat:number;
  lon:number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string
  date: string;
  icon: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date:string, icon: string, tempF: number, windSpeed: number, humidity: number){
    this.city = city
    this.date = date;
    this.icon = icon;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string = API_BASE_URL;
  API_KEY: string = API_KEY;
  cityName: string = '';
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const url = `${this.baseURL}/${query}`;

      const response = await fetch(url);

      if(!response.ok) {
        throw new Error(`HTTP error. status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('Error fetching location data:', error);
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    if (locationData!==undefined){
      const { lat, lon } = locationData;
      return {
        lat,
        lon
      }
    }
    else{
      return {
        lat: 0,
        lon: 0
      }
    }
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.API_KEY}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.API_KEY}&units=imperial`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const data = await this.fetchLocationData(query);
    const coor = this.destructureLocationData(data[0])
    return coor;
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const data = await this.fetchLocationData(query);
    return data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const dat1 = response.dt_txt.split(' ');
    const dat2 = dat1[0].split('-');
    const date = dat2[1]+'/'+dat2[2]+'/'+dat2[0];
    const icon = response.weather[0].icon;
    const tempF = response.main.temp;
    const windSpeed  = response.wind.speed;
    const humidity = response.main.humidity;

    const weather = new Weather(this.cityName,date,icon,tempF,windSpeed,humidity);
    return weather;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city.toLowerCase().replace(/\b\w/g, s=> s.toUpperCase());
    const weatherData:Weather[] = [];
    const geoData = await this.fetchAndDestructureLocationData();
    if(geoData.lat !== 0 && geoData.lon !== 0) {
      const data = await this.fetchWeatherData(geoData);
      for(let i = 0; i<5; i ++){
        weatherData[i] = this.parseCurrentWeather(data.list[8*i]);
      }
      weatherData[5] = this.parseCurrentWeather(data.list[39]);
    }
    return weatherData;
  }
}

export default new WeatherService();
