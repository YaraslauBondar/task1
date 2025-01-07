import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from '../chart.interface';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css']
})
export class ChartWidgetComponent {
  @Input() chart!: Chart;
  @Input() availableSensors!: string[];
  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateSensors: EventEmitter<void> = new EventEmitter<void>();

  changeColor(): void {
    this.chart.config.colors = this.chart.config.colors.map(el => el);
  }

  onSensorsChange(): void {
    this.updateSensors.emit();
  }

  onRemove(): void {
    this.remove.emit();
  }
}
