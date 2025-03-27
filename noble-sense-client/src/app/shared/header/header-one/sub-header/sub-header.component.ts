import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent {
    // drop down toggle
    public isOpen: boolean = false;
    @Input() parent: string = '';

}
