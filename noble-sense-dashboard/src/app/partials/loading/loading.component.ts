import { Component, DestroyRef , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  destroyRef = inject(DestroyRef)




  isLoading=false;
  constructor(private loadingService:LoadingService ){
    this.loadingService.isLoading
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((value)=>{
      this.isLoading=value;
    })
  }

  


}
