import dotenv from 'dotenv';
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
  temp: number;
  pressure: number;
  humidity: number;

  constructor(temp: number, pressure: number, humidity: number){
    this.temp = temp;
    this.pressure = pressure;
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
      const url = `${this.baseURL}?/data/2.5/forecast/${query}`;
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
  private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `q=`
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
