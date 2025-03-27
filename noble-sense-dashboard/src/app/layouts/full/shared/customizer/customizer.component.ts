import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { AppSettings } from 'src/app/app.config';
import { CoreService } from 'src/app/services/core.service';
import { BrandingComponent } from '../../vertical/sidebar/branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [BrandingComponent, TablerIconsModule, MaterialModule, FormsModule, NgScrollbarModule, NgIf],
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomizerComponent {
   
  @Output() optionsChange = new EventEmitter<AppSettings>();
  constructor(private settings: CoreService) {}
  options = this.settings.getOptions();

  setDark() {
    this.optionsChange.emit(this.options);
  }

  setColor() {
    this.optionsChange.emit(this.options);
  }

  setDir() {
    this.optionsChange.emit(this.options);
  }

  setSidebar() {
    this.optionsChange.emit(this.options);
  }
}
