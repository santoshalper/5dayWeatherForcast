import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try{  
      const readFile = await fs.readFile('./db/searchHistory.json', 'utf-8');
      return readFile;
    }
    catch(error){
      console.error('Error reading DB file:', error);
      return '';
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try{
      await fs.writeFile('./db/searchHistory.json',JSON.stringify(cities));
    }
    catch(error){
      console.error('Error writing DB file:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const data = await this.read();
    const cities = JSON.parse(data);
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const newCity = new City(city.toLowerCase().replace(/\b\w/g, s=> s.toUpperCase()), uuidv4());
    const cities = await this.getCities();
    if (!(cities.some((existCity: City) => existCity.name === newCity.name))){
      cities.push(newCity);
      this.write(cities);
    } 
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const cityIndex = cities.findIndex((city: City) => city.id === id );
    if (cityIndex !== -1){
      cities.splice(cityIndex,1);
      this.write(cities);
    }
  }
}

export default new HistoryService();
