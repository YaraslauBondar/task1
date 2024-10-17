import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart, Sensor } from '../chart.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth((new Date()).getMonth() + 1));

  range: FormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit() {
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
      const newChart: Chart = {
        config: {
          type: 'line',
          title: 'Sensor Data',
          sensors: [],
          color: '#ff0000'
        },
        data: []
      };
      this.charts.push(newChart);
    }
  }

  removeChart(index: number): void {
    this.charts.splice(index, 1);
  }
}
