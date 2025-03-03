import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeApiService {
  constructor(private apiService: ApiService) {}
}
