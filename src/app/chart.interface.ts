export interface ChartConfig {
  id: number;
  type: 'line' | 'bar';
  title: string;
  sensors: string[];
  colors: SensorColor[];
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

export interface SensorColor {
  name: string;
  color: string;
}
