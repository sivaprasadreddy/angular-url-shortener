import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment"
import {CreateShortUrlRequest, PagedResult, ShortUrl} from './models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getPublicShortUrls(pageNo: number) {
      let url = `${this.apiBaseUrl}/short-urls?page=${pageNo}`;
      return this.http.get<PagedResult<ShortUrl>>(`${url}`);
  }

  getMyShortUrls(pageNo: number) {
    let url = `${this.apiBaseUrl}/my-urls?page=${pageNo}`;
    return this.http.get<PagedResult<ShortUrl>>(`${url}`);
  }

  getAllShortUrls(pageNo: number) {
    let url = `${this.apiBaseUrl}/admin/short-urls?page=${pageNo}`;
    return this.http.get<PagedResult<ShortUrl>>(`${url}`);
  }

  createShortUrl(request: CreateShortUrlRequest): Observable<ShortUrl> {
    return this.http.post<ShortUrl>(`${this.apiBaseUrl}/short-urls`, request);
  }
}
