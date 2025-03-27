import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IReclamation, IReclamationsPage } from 'src/app/models/reclamation.model';
import { ReclamationDialogComponent } from './reclamation-dialog/reclamation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReclamationsService } from './services/reclamations.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss']
})
export class ReclamationsComponent implements OnInit{

  dataSource = new MatTableDataSource<IReclamation>([]);
  displayedColumns: string[] = [
    'fullName',
    'email',
    'phone',
    'message',
    'answered',
    'action'
  ];
  reclamationsPage:IReclamationsPage={
    page: 0,
    size: 10,
    totalPages: 0,
    reclamations: [],
    first: false,
    last: false
  }
  ngOnInit(): void {
    this.getAllReclamations();
  }


  constructor(
    public dialog: MatDialog,
    private reclamationsService: ReclamationsService
  ){}


  getAllReclamations() {
    this.reclamationsService.getAllReclamations(this.reclamationsPage.page, this.reclamationsPage.size).subscribe(
      {
        next: (data) => {
          this.dataSource.data = data.reclamations
        },
        error: (error) => {console.log(error.message)}
      }
    )
  }
  toggleAnswered(reclamationId:number) {
    console.log('reclamationId', reclamationId)
    this.reclamationsService.toggleAnswered(reclamationId).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllReclamations();
      },
      error: (error) => {console.log(error.message)}
    })
  
  }
  deleteReclamation(reclamationId:number) {
  this.reclamationsService.deleteReclamation(reclamationId).subscribe({
    next: (data) => {
      this.getAllReclamations();
    },
    error: (error) => {console.log(error.message)}
  })
  
  }

  onPageChange(event: any): void {
    console.log('event', event)
    this.reclamationsPage.page = event?.pageIndex ?? 0;
    this.reclamationsPage.size = event?.pageSize ?? 10;
    this.getAllReclamations();
  }
}
