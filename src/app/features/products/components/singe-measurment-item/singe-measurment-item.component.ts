import { Component, input, OnInit } from '@angular/core';
import {
  MeasurementDTO,
  SizeTableDTO,
} from '../../models/ProductSizeGuideResponse';
import { SizeChartComponent } from '../size-chart/size-chart.component';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'singe-measurment-item',
  standalone: true,
  imports: [SizeChartComponent, FormsModule, MatButtonToggleModule],
  templateUrl: './singe-measurment-item.component.html',
  styleUrl: './singe-measurment-item.component.scss',
})
export class SingeMeasurmentItemComponent implements OnInit {
  ngOnInit(): void {
    if (this.Items()?.length > 0) this.Item = this.Items()[0];
    this.getSizeTable();
  }

  Items = input.required<SizeTableDTO[]>();
  Item: SizeTableDTO | undefined;
  sizeUnit: 'inches' | 'cm' = 'cm';
  measurments: MeasurementDTO[] | undefined;

  getSizeTable() {
    let xxl = this.Items();
    let measurment = this.Items().find(
      (item) => item.unit == this.sizeUnit
    )?.measurements;
    if (measurment) {
      this.measurments = measurment;
    }
  }
}
