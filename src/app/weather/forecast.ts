export interface Forecast {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
    }[]
  }[],
}
