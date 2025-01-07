import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  availableSensors: string[] = [];

  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() - 1);

  range: FormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    public dashboardService: DashboardService
  ) {
    this.availableSensors = this.dashboardService.availableSensors;
  }

  ngOnInit() {
    this.dashboardService.generateSensors();

    this.range.valueChanges.subscribe(value => {
      (value.start && value.end) ? this.dashboardService.filterDataForAll(value?.start, value?.end) : null;
    })
  }

  addChart(): void {
    this.dashboardService.addChart();
  }

  removeChart(id: number): void {
    this.dashboardService.removeChart(id);
  }

  updateSensors(id: number):void {
    this.dashboardService.updateChart(id);
  }
}
