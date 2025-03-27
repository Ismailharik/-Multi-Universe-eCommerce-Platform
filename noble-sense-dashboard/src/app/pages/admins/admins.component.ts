import { Component, DestroyRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Role, User } from 'src/app/models/user.model';
import { UserPage } from 'src/app/models/userPage.model';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from './services/admin.service';
import { AdminsDialogContentComponent } from './admins-dialog-content/admins-dialog-content.component';
import { AddAdminComponent } from './add/add.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html'
})
export class AdminsComponent {

  searchText: any;
  displayedColumns: string[] = [
    // '#',
    'fullName',
    'email',
    'phone',
    'active',
    'action'
  ];
  adminsPage: UserPage = {// initialise the AdminPage if you want to modify the default page & size
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


  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    private destoryRef: DestroyRef
  ) { }
  ngOnInit(): void {
    this.findAllAdmins()
  }
  findAllAdmins() {
    this.adminService.findAllAdmins(this.adminsPage.page, this.adminsPage.size)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: resp => {
          this.adminsPage = resp;
          this.dataSource.data = this.adminsPage.users;
        },
        error: (error) => {
          this.openSnackBar(error.message, 'X');
        }
      });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AdminsDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((result) => {
        if (result.event === 'Add') {
          this.addAdmin(result.data);
        } else if (result.event === 'Update') {
          console.log("update", result.data)
          this.updateAdmin(result.data);
        } else if (result.event === 'Delete') {
          this.deleteAdmin(result.data);
        }
      });
  }

  // tslint:disable-next-line - Disables all
  addAdmin(user: User): void {
    user.active = true;
    user.role = Role.ADMIN
    console.log(user)
    this.adminService.addAdmin(user)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: resp => {
          
          this.findAllAdmins()
        }, error: (error) => {
         console.log(error.message)
        }
      })
  }

  // tslint:disable-next-line - Disables all
  updateAdmin(admin: User): boolean | any {
    this.adminService.updateAdmin(admin)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: resp => {
          {
            console.log("Admin updated successfully", resp)
            this.findAllAdmins()
          }
        }, error: (error) => {
          console.error(error.message);
        }
      })
  }

  // tslint:disable-next-line - Disables all
  deleteAdmin(user: User): boolean | any {
    this.adminService.deleteAdmin(user.id)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: resp => {
          this.openSnackBar("L'administrateur est supprimé avec succes", "X")
          this.findAllAdmins()
        },
        error: err => this.openSnackBar(err.message, "X")
      })
  }


  onPageChange(event: any): void {
    console.log('event', event)
    this.adminsPage.page = event?.pageIndex ?? 0;
    this.adminsPage.size = event?.pageSize ?? 10;
    this.findAllAdmins();
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000
    });
  }

}


