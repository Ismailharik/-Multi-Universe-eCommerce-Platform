import { Component,OnInit, DestroyRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './add/add.component';
import { CustomersDialogContentComponent } from './customers-dialog-content/customers-dialog-content.component';
import { Role, User } from 'src/app/models/user.model';
import { CustomerService } from './services/customer.service';
import { UserPage } from 'src/app/models/userPage.model';
import { ChangePasswordDialogContentComponent } from './change-password-dialog-content/change-password-dialog-content.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  searchText: any;
  isAdmin = false;
  displayedColumns: string[] = [
    // '#',
    'fullName',
    'email',
    'phone',
    //'country',
    'address',
    'active',
    'action'
  ];
  customersPage: UserPage = {// initialise the customerPage if you want to modify the default page & size
    first: false,
    last: false,
    page: 0,
    size: 5,
    totalPages: 0,
    users: []
  }
  dataSource = new MatTableDataSource<User>([]);
  // snak bar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialog: MatDialog,
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private destroyRef: DestroyRef,
    private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.findAllCustomers()
    this.loggedUser()
  }
  loggedUser() {
    this.isAdmin = this.authService.getUserRole() == Role.ADMIN
  }
  findAllCustomers() {
    this.customerService.findAllCustomers(this.customersPage.page, this.customersPage.size)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.customersPage = resp;
          this.dataSource.data = this.customersPage.users;
        },
        error: (error) => {
          console.error('Error fetching customers:', error);
        }
      });
  }


  searchByName(keyword: string): void {
    this.customerService.findByName(keyword, this.customersPage.page, this.customersPage.size)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.customersPage = resp;
          this.dataSource.data = this.customersPage.users;
          console.log(this.customersPage)
        },
        error: (error) => {
          console.error('Error fetching customers:', error);
        }
      })
  }


  openDialog(action: string, obj: any): void {
    obj.action = action;
    
      const dialogRef = this.dialog.open(CustomersDialogContentComponent, {
        data: obj,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result.event === 'Add') {
          this.addCustomer(result.data);
        } else if (result.event === 'Update') {
          this.updateCustomer(result.data);
        } else if (result.event === 'Delete') {
          this.deleteCustomer(result.data);
        }
      });
  }

  addCustomer(user: User): void {
    user.active = true;
    user.role = Role.USER;
    user.password = "1234"
    console.log("user", user)
    this.customerService.addCustomer(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.findAllCustomers()
        }, error: (error) => {
          console.error(error.message);
        }
      })
    this.dialog.open(AddCustomerComponent);
  }

  // tslint:disable-next-line - Disables all
  updateCustomer(customer: User): boolean | any {
    customer.role = Role.USER
    this.customerService.updateCustomer(customer)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          {
            this.openSnackBar("Le client est modifier avec succes", "X")
            this.findAllCustomers()
          }
        }, error: (error) => {
          this.openSnackBar(error.message, "X")
        }
      })
  }

  // tslint:disable-next-line - Disables all
  deleteCustomer(user: User): boolean | any {
    this.customerService.deleteCustomer(user.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.openSnackBar("Le client est supprimé avec succes", "X")
          this.findAllCustomers()
        },
        error: err => this.openSnackBar(err.error.message, "X")
      })
  }


  onPageChange(event: any): void {
    console.log('event', event)
    this.customersPage.page = event?.pageIndex ?? 0;
    this.customersPage.size = event?.pageSize ?? 10;
    this.findAllCustomers();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }
  handleError(error: HttpErrorResponse): string {
    // Check if error.error is a string and try to parse it
    if (typeof error.error === 'string') {
      try {
        const errorObj = JSON.parse(error.error);
        return errorObj.message || 'Unknown error occurred';
      } catch (e) {
        // Error in parsing string
        return 'Error occurred while processing your request';
      }
    }
    // If error.error is not a string, handle it as an object or other type
    return error.message || 'Unknown error occurred';
  }

}


