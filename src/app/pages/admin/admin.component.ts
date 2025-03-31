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
  templateUrl: './admin.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationComponent
  ],
})
export class AdminComponent implements OnInit {
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

  ngOnInit(): void {
    this.fetchAllShortUrls()

    this.route.queryParamMap.subscribe(params => {
      this.page = parseInt(params.get('page') || "1");
      this.fetchAllShortUrls()
    })
  }

  fetchAllShortUrls() {
    this.shortUrlService.getAllShortUrls(this.page).subscribe(response => {
      console.log(response)
      this.shortUrlsPage = response;
    })
  }

  getShortUrlString(shortKey: string) {
    return this.shortUrlService.getShortUrlString(shortKey);
  }
}
