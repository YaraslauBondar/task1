import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartData, SensorColor } from './chart.interface';

@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnInit, OnChanges {
  @Input() chartType!: 'line' | 'bar';
  @Input() chartTitle!: string;
  @Input() chartData!: ChartData[];
  @Input() chartColors!: SensorColor[];
  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartType'] || changes['chartTitle'] || changes['chartData'] || changes['chartColors']) {
      this.renderChart();
    }
  }

  renderChart(): void {
    const chartOptions: Highcharts.Options = {
      chart: { type: this.chartType },
      title: { text: this.chartTitle },
      series: this.chartData.map(sensorData => ({
        name: sensorData.name,
        data: sensorData.data.map(el => el.value),
        type: this.chartType,
        color: this.chartColors.find(el => el.name === sensorData.name)?.color
      })),
      xAxis: {
        categories: this.chartData[0].data.map(point => point.date.toString()),
      },
      yAxis: {
        title: { text: 'Values' }
      }
    };
    Highcharts.chart(this.el.nativeElement, chartOptions);
  }
}
