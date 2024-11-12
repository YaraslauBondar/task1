import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, Sensor } from '../chart.interface';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css']
})
export class ChartWidgetComponent implements OnChanges {
  @Input() chart!: Chart;
  @Input() availableSensors!: string[];
  @Input() sensors!: Sensor[];
  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if(changes['chart'] && this.chart) {
      console.log(this.chart)
      this.chart.config.sensors = this.availableSensors.slice(0, 2);
      this.updateChartData();
    }

    if(changes['startDate'] || changes['endDate']) {
      this.filterDataByDateRange();
    }
  }

  onSensorsChange(): void {
    this.updateChartData();
    this.filterDataByDateRange();
  }

  updateChartData(): void {
    this.chart.data = this.sensors.filter(el => this.chart.config.sensors.includes(el.name));
  }

  filterDataByDateRange(): void {
    const startDate: number = this.startDate?.getDate() || new Date().getDate();
    const endDate: number = this.endDate?.getDate() || (startDate + 6);

    this.chart.data = this.chart.data.map(sensorData => ({
      ...sensorData,
      data: this.sensors.find(el => el.name === sensorData.name)?.data.filter(point => {
        const pointDate = new Date(point.date).getTime();
        return (pointDate >= startDate && pointDate <= endDate && startDate < endDate)
          || ((pointDate >= startDate || pointDate <= endDate) && startDate > endDate );
      }) || []
    }));
  }

  onRemove(): void {
    this.remove.emit();
  }
}
