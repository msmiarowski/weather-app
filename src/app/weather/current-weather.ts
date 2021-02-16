export interface CurrentWeather {
  cityName: string;
  weatherId: number;
  weatherMain: string;
  weatherDesc: string;
  weatherIcon: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  windSpeed: number;
  windGust: number;
  windDeg: number;
  dt: Date;
  timezone: number;

  // weather: {
  //   id: number;
  //   main: string;
  //   description: string;
  //   icon: string;
  // };
  // main: {
  //   temp: number;
  //   feels_like: number;
  //   temp_min: number;
  //   temp_max: number;
  //   humidity: number;
  // };
  // wind: {
  //   speed: number;
  //   gust: number;
  //   deg: number;
  // };
  // dt: Date;
  // timezone: number;
}
