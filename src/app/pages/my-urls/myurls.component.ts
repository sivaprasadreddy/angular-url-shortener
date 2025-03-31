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
  templateUrl: './myurls.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationComponent
  ],
})
export class MyUrlsComponent implements OnInit {
  page = 1
  shortUrlsPage: PagedResult<ShortUrl> = {
      data: [],
      totalElements: 0,
      pageNumber: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    }
  selectedUrls: Set<number> = new Set<number>();
  private fb = inject(FormBuilder);
  constructor(private route: ActivatedRoute,
              private router: Router,
              private shortUrlService: ShortUrlService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchMyShortUrls()

    this.route.queryParamMap.subscribe(params => {
      this.page = parseInt(params.get('page') || "1");
      this.fetchMyShortUrls()
    })
  }

  fetchMyShortUrls() {
    this.shortUrlService.getMyShortUrls(this.page).subscribe(response => {
      console.log(response)
      this.shortUrlsPage = response;
      // Clear selection when fetching new data
      this.selectedUrls.clear();
    })
  }

  toggleSelection(id: number) {
    if (this.selectedUrls.has(id)) {
      this.selectedUrls.delete(id);
    } else {
      this.selectedUrls.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedUrls.has(id);
  }

  deleteSelectedUrls() {
    if (this.selectedUrls.size === 0) {
      return;
    }

    const count = this.selectedUrls.size;
    const confirmMessage = `Are you sure you want to delete ${count} selected URL${count > 1 ? 's' : ''}?`;

    if (confirm(confirmMessage)) {
      const idsToDelete = Array.from(this.selectedUrls);
      this.shortUrlService.deleteShortUrls(idsToDelete).subscribe({
        next: () => {
          this.fetchMyShortUrls();
        },
        error: (error) => {
          console.error('Error deleting URLs:', error);
        }
      });
    }
  }

  get hasSelectedUrls(): boolean {
    return this.selectedUrls.size > 0;
  }

  get allSelected(): boolean {
    return this.shortUrlsPage.data.length > 0 && this.selectedUrls.size === this.shortUrlsPage.data.length;
  }

  toggleSelectAll() {
    if (this.allSelected) {
      // Deselect all
      this.selectedUrls.clear();
    } else {
      // Select all
      this.shortUrlsPage.data.forEach(url => {
        this.selectedUrls.add(url.id);
      });
    }
  }
}
