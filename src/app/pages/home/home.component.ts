import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShortUrlService} from "../../services/shortUrl.service";
import {CommonModule} from "@angular/common";
import {PagedResult, ShortUrl} from '../../services/models';
import {AuthService} from '../../services/auth.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationComponent
  ],
})
export class HomeComponent implements OnInit {
  page = 1
  shortUrlsPage: PagedResult<ShortUrl> = {
      data: [],
      totalElements: 0,
      pageNumber: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    }
  private fb = inject(FormBuilder);
  constructor(private route: ActivatedRoute,
              private router: Router,
              private shortUrlService: ShortUrlService,
              private authService: AuthService) {
  }
  createShortUrlForm = this.fb.group({
    originalUrl: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:\/?#[\]@!$&'()*+,;=]+$/)]],
    isPrivate: '',
    expirationInDays: ''
  });

  ngOnInit(): void {
    this.fetchShortUrls()

    this.route.queryParamMap.subscribe(params => {
      this.page = parseInt(params.get('page') || "1");
      this.fetchShortUrls()
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getShortUrlString(shortKey: string) {
    return this.shortUrlService.getShortUrlString(shortKey);
  }

  fetchShortUrls() {
    this.shortUrlService.getPublicShortUrls(this.page).subscribe(response => {
      console.log(response)
      this.shortUrlsPage = response;
    })
  }

  createShortUrl() {
    this.shortUrlService.createShortUrl({
      originalUrl: this.createShortUrlForm.value.originalUrl || "",
      isPrivate: (this.createShortUrlForm.value.isPrivate || 'false') === 'true',
      expirationInDays: parseInt(this.createShortUrlForm.value.expirationInDays || '0'),
    }).subscribe(response => {
      console.log(response)
      this.createShortUrlForm.reset()
      this.fetchShortUrls()
    })
  }
}
