import { DatePipe } from '@angular/common';
import { Component, DestroyRef, Inject, Optional, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment.development';
import { CategoryService } from '../../categories/services/category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryPage } from 'src/app/models/categoryPage.model';
import { OrderStatus } from 'src/app/models/order.model';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Tag {
  name: string;
}
@Component({
  selector: 'app-product-dialog-content',
  templateUrl: './product-dialog-content.component.html',
  styleUrls: ['./product-dialog-content.component.scss'],
})
export class ProductDialogContentComponent {
  orderStatus = OrderStatus;

  destroyRef = inject(DestroyRef);

  // categories for the select box
  categoryPage!: CategoryPage;

  // tslint:disable-next-line - Disables all
  action: string;
  joiningDate: any = '';
  local_data: any;
  productForm!: FormGroup;
  imageBasePath = environment.host + '/api/v1/images';


  separatorKeysCodes: readonly number[] | ReadonlySet<number> = [
    ENTER,
    COMMA,
  ] as const;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<ProductDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.initializeForm(this.local_data);
  }
  ngOnInit(): void {
    this.findAllCategories();
  }

  doAction(): void {
    const data = this.productForm.value;
    this.dialogRef.close({ event: this.action, data: data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

 
  // for the select box
  findAllCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => (this.categoryPage = resp),
        error: (err) => console.log(err),
      });
  }

  // Initialize or update the form with data
  initializeForm(product: IProduct): void {
    this.productForm = this.fb.group({
      // this data should be just saved
      id: [product.id],
      imageURLs: [product.imageURLs],

      sku: [product.sku, Validators.required],
      title: [product.title, Validators.required],
      // slug: [product.slug],
      // unit: [product.unit],
      parent: [product.parent],
      price: [product.price ? product.price : 0, Validators.required],
      discount: [product.discount],
      quantity: [product.quantity, Validators.required],
      // brand: [product.brand],
      status: [product.status],
      productType: [product.productType],
      description: [product.description, Validators.required],
      additionalInformation: this.fb.array([]),
      featured: [product.featured],
      sellCount: [product.sellCount],
      offerDate: this.fb.group({
        // Nested form group for offerDate
        startDate: [product.offerDate?.startDate],
        endDate: [product.offerDate?.endDate],
      }),
      tags: [product.tags],
      videoId: [product.videoId],
      sizes: this.fb.array([]),
      categoryId: [product.categoryId, Validators.required],
    });
    if (product) {
      this.setAdditionalInformation(product.additionalInformation);
      this.setSizes(product.sizes);
    }
  }

  get productName(): string {
    return this.local_data.name;
  }
  setAdditionalInformation(additionalInfo: any | undefined) {
    if (additionalInfo) {
      const additionalInfoFGs = additionalInfo?.map((info: any) =>
        this.fb.group(info)
      );
      const additionalInfoFormArray = this.fb.array(additionalInfoFGs);
      this.productForm.setControl(
        'additionalInformation',
        additionalInfoFormArray
      );
    }
  }
  get additionalInformation(): FormArray {
    return this.productForm.get('additionalInformation') as FormArray;
  }
  addAdditionalInformation() {
    this.additionalInformation.push(this.fb.group({ key: '', value: '' }));
  }
  removeAdditionalInformation(idx: number) {
    this.additionalInformation.removeAt(idx);
  }
  setSizes(sizes: any | undefined) {
    if (sizes) {
      const sizesFormControls = sizes?.map((size: any) =>
        this.fb.control(size)
      );
      const sizesFormArray = this.fb.array(sizesFormControls);
      this.productForm.setControl('sizes', sizesFormArray);
    }
  }
  addSize() {
    this.sizes.push(this.fb.control(''));
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }
  removeSize(idx: number) {
    this.sizes.removeAt(idx);
  }
}
