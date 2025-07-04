import {Component, Input} from '@angular/core';
import {PagedResult, ShortUrl} from "../../services/models";
import {RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [
    RouterLink,
    NgClass,
    NgIf,
  ],
})
export class PaginationComponent {
  @Input()
  paginationUrl : string = "/home";

  @Input()
  shortUrlPagedResult : PagedResult<ShortUrl> = {
    data: [],
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  }
}
