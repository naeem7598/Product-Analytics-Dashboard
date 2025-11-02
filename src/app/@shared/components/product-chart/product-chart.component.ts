import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductChartComponent implements OnChanges{
  @Input() title = 'Monthly Sales';
  @Input() months: string[] = [];
  @Input() salesData: number[] = [];

  chartOptions: EChartsOption = {};

  ngOnChanges(): void {
    this.initChart();
  }
  private initChart(): void {
    this.chartOptions = {
      title: {
        text: this.title,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.months,
        axisLabel: { rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: 'Sales Count'
      },
      series: [
        {
          data: this.salesData,
          type: 'bar',
          // smooth: true,
          itemStyle: {
            color: '#42a5f5',
            borderRadius: [6, 6, 0, 0]
          }
        }
      ]
    };
  }
}
