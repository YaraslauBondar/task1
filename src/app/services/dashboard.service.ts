import { Injectable } from '@angular/core';
import { Chart, Sensor } from '../chart.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  availableSensors: string[] = [
    'Temperature 1',
    'Humidity 1',
    'Light 1',
    'Temperature 2',
    'Humidity 2',
    'Light 2'
  ];

  charts: Chart[] = [];
  sensors: Sensor[] = [];

  startDate: number = new Date().getDate();
  endDate: number = this.startDate + 6;

  constructor() {}

  generateSensors(): void {
    this.availableSensors.map(el => {
      this.sensors.push(this.generateData(el))
    })
  }

  generateData(name: string): Sensor {
    const today: Date = new Date();

    return {
      name: name,
      data: Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
          date: date.getDate(),
          value: Math.random() * 100
        };
      })
    }
  }

  addChart(): void {
    if(this.charts.length < 4) {
      let newChart: Chart = {
        config: {
          id: this.charts.length,
          type: 'line',
          title: 'Sensor Data',
          sensors: this.availableSensors.slice(0, 2),
          color: '#ff0000'
        },
        data: []
      };
      this.charts.push(newChart);
      this.updateChart(newChart.config.id);
    }
  }

  updateChart(id: number): void {
    let chart = this.charts.find(el => el.config.id === id);
    if(chart) {
      chart.data = this.sensors.filter(el => chart.config.sensors.includes(el.name));
      this.filterDataForChart(chart);
    }
  }

  filterDataForAll(start: Date, end: Date): void {
    this.startDate = start?.getDate();
    this.endDate = end?.getDate();

    this.charts.map(chart => {
      this.filterDataForChart(chart);
    })
  }

  filterDataForChart(chart: Chart): void {
    chart.data = chart.data.map(sensorData => ({
      ...sensorData,
      data: this.sensors.find(el => el.name === sensorData.name)?.data.filter(point => {
        const pointDate = new Date(point.date).getTime();
        return (pointDate >= this.startDate && pointDate <= this.endDate && this.startDate < this.endDate)
          || ((pointDate >= this.startDate || pointDate <= this.endDate) && this.startDate > this.endDate );
      }) || []
    }))
  }

  removeChart(id: number): void {
    const chart = this.charts.find(el => el.config.id === id);
    chart ? this.charts.splice(this.charts.indexOf(chart), 1) : null;
  }
}
