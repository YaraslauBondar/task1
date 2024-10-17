import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartData } from './chart.interface';

@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnInit, OnChanges {
  @Input() chartType!: 'line' | 'bar';
  @Input() chartTitle!: string;
  @Input() chartData!: ChartData[];
  @Input() chartColor!: string;
  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartType'] || changes['chartTitle'] || changes['chartData'] || changes['chartColor']) {
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
        color: this.chartColor
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
