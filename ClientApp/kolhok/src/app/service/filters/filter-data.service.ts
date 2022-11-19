import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { FilterData } from './filter-data';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  constructor(
    private http: HttpClient
  ) { }

  getFilterDataForPage(name: String) {
    return this.http.get<FilterData>(`${API_URL}/api/filter-get/${name}`);
  }

  createFilterDataForPage(filterData: FilterData) {
    return this.http.post(`${API_URL}/api/filter-create/`, filterData);
  }

  updateFilterDataForPage(filterData: FilterData) {
    return this.http.post(`${API_URL}/api/filter-update/`, filterData);
  }
}
