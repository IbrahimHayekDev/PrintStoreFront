import { Component, OnInit, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  constructor(private _loaderService: LoaderService) {}

  loading: Signal<boolean> | undefined;

  ngOnInit(): void {
    this.loading = this._loaderService.loading$;
  }
}
