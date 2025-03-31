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

  getShortUrlString(shortKey: string) {
    return `${this.apiBaseUrl}/s/${shortKey}`;
  }

  getPublicShortUrls(pageNo: number) {
      let url = `${this.apiBaseUrl}/api/short-urls?page=${pageNo}`;
      return this.http.get<PagedResult<ShortUrl>>(`${url}`);
  }

  getMyShortUrls(pageNo: number) {
    let url = `${this.apiBaseUrl}/api/my-urls?page=${pageNo}`;
    return this.http.get<PagedResult<ShortUrl>>(`${url}`);
  }

  getAllShortUrls(pageNo: number) {
    let url = `${this.apiBaseUrl}/api/admin/short-urls?page=${pageNo}`;
    return this.http.get<PagedResult<ShortUrl>>(`${url}`);
  }

  createShortUrl(request: CreateShortUrlRequest): Observable<ShortUrl> {
    return this.http.post<ShortUrl>(`${this.apiBaseUrl}/api/short-urls`, request);
  }

  deleteShortUrls(ids: number[]): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/api/short-urls`, { body: { ids } });
  }
}
