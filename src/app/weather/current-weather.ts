export interface CurrentWeather {
  cityName: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
  dt: Date;
  timezone: number;
}
