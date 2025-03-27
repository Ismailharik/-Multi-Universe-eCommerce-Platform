import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-pagination-two',
  templateUrl: './pagination-two.component.html',
  styleUrls: ['./pagination-two.component.scss']
})
export class PaginationTwoComponent {

  @Input() itemsPerPage: number = 4;
  @Input() data: any[] = [];
  @Output() handlePaginate: EventEmitter<any> = new EventEmitter<any>();

  currentPage: number = 1;

  get totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    // Generate an array of page numbers from 1 to totalPages
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit () {
    console.log(this.pageNumbers,this.data,this.itemsPerPage,this.totalPages)
  }

  setPage(idx: number): void {
    if (idx <= 0 || idx > this.totalPages) {
      return;
    }
    window.scrollTo(0, 0);
    this.currentPage = idx;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, this.data.length);
    this.handlePaginate.emit({ data: this.data, start, end });
  }
}
