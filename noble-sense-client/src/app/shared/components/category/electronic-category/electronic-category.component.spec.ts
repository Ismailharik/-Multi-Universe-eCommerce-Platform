import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicCategoryComponent } from './electronic-category.component';

describe('ElectronicCategoryComponent', () => {
  let component: ElectronicCategoryComponent;
  let fixture: ComponentFixture<ElectronicCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicCategoryComponent]
    });
    fixture = TestBed.createComponent(ElectronicCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
