export interface ChartConfig {
  type: 'line' | 'bar';
  title: string;
  sensors: string[];
  color: string;
}

export interface ChartData {
  name: string;
  data: { date: number, value: number }[];
}

export interface Chart {
  config: ChartConfig;
  data: ChartData[];
}

export interface Sensor {
  name: string;
  data: {
    date: number;
    value: number;
  }[];
}
