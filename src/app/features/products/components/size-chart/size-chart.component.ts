import { Component, input, OnInit } from '@angular/core';
import { MeasurementDTO } from '../../models/ProductSizeGuideResponse';

@Component({
  selector: 'size-chart',
  standalone: true,
  imports: [],
  templateUrl: './size-chart.component.html',
  styleUrl: './size-chart.component.scss',
})
export class SizeChartComponent implements OnInit {
  ngOnInit(): void {
    if (this.measurments()) {
      this.measurments()?.map((item) => {
        this.headerLabels.push(item.typeLabel || '');
        this.rowsLabels.push(item.typeLabel || '');
        item.values?.map((value) => this.sizeLabels.push(value.size));
      });
      this.sizeLabels = [
        ...new Map(this.sizeLabels.map((item) => [item, item])).values(),
      ];
    }
  }
  headerLabels: string[] = ['Size'];
  rowsLabels: string[] = [];
  sizeLabels: string[] = [];
  rows: any[] = [];
  measurments = input.required<MeasurementDTO[] | undefined>();
  measureValues: MeasurementDTO[] | undefined;

  getCellValue(size: string, head: string): string {
    let valueFound = this.measurments()
      ?.find((item) => item.typeLabel == head)
      ?.values.find((value) => value.size == size);
    if (!valueFound) {
      return '';
    }
    return valueFound.value
      ? valueFound.value
      : valueFound.minValue && valueFound.maxValue
      ? valueFound.minValue + ' - ' + valueFound.maxValue
      : '';
  }
}
