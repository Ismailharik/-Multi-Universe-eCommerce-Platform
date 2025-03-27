import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { OrderPage } from 'src/app/models/OrderPage.model';
import { Order, OrderStatus } from 'src/app/models/order.model';
import { OrderService } from './services/order.service';
import { OrderDialogContentComponent } from './order-dialog-content/order-dialog-content.component';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Role } from 'src/app/models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderStatusCount } from 'src/app/models/order-status-count.model';
import { OrderItem } from 'src/app/models/orderItem.model';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { OrderItemsService } from './services/orderItems.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  destoryRef = inject(DestroyRef);

  // snak bar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Expanded array
  expandedElement: Order | null = null;
  nestedDisplayedColumns: string[] = ['title','quantity', 'productPrice','discount'];

  orderStatusArray: string[] = Object.values(OrderStatus);
  orderStatus = OrderStatus;
  selectedOrderStatus = OrderStatus.CREATED;
  isManager: boolean = false;

  // search filters
  startDate: Date = new Date();

  endDate: Date = new Date();
  analysis!: OrderStatusCount[];
  productsAnalysis: Map<string, number> = new Map();
  orderSummary!: any;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    //'id',
    'date',
    'fullName',
    'phone',
    'totalPrice',
    'shipCost',
    'orderNote',
    'country',
    'address',
    //'orderItems',
    'orderStatus',    
    
    'action',
  ];
  orderPage: OrderPage = {
    first: false,
    last: false,
    page: 0,
    size: 5,
    totalPages: 0,
    orders: [],
    id: 0,
  };
  dataSource = new MatTableDataSource<Order>([]);

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private destroyRed: DestroyRef,
    private orderItemsService: OrderItemsService
  ) {}
  ngOnInit(): void {
    this.startDate.setDate(this.startDate.getDate() - 7);
    this.filterOrdersByDateAndStatus();
    this.getAnalyssis();
  }
  filterOrdersByDateAndStatus() {
    this.orderService
      .filterOrdersByDateAndStatus(
        this.orderPage.page,
        this.orderPage.size,
        this.startDate,
        this.endDate,
        this.selectedOrderStatus
      )
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (resp) => {
          console.log('orders :', resp);
          this.orderPage = resp;
          this.dataSource.data = this.orderPage.orders;
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        },
      });
  }

  searchById(id: string): void {
    this.orderService
      .findOrderById(id)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (resp) => {
          this.orderPage.orders = [resp];
          this.dataSource.data = this.orderPage.orders;
        },
        error: (error) => {
          console.error('Error fetching customers:', error);
        },
      });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(OrderDialogContentComponent, {
      data: obj,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((result) => {
        if (result.event === 'Add') {
        } else if (result.event === 'Update') {
          this.updateOrder(result.data);
        } else if (result.event === 'Delete') {
          this.deleteOrder(result.data);
        }
      });
  }

  // tslint:disable-next-line - Disables all
  updateOrder(order: Order): boolean | any {
    this.orderService
      .updateOrder(order.id!, order)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (resp) => {
          {
            this.openSnackBar('La commande est modifier avec succes', 'X');
            this.filterOrdersByDateAndStatus();
            this.getAnalyssis();
          }
        },
        error: (error) => {
          this.openSnackBar(error.message, 'X');
        },
      });
  }

  // tslint:disable-next-line - Disables all
  deleteOrder(order: Order): boolean | any {
    this.orderService
      .deleteOrder(order.id!)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (resp) => {
          this.openSnackBar('La commande a été bien supprime', 'X');
          this.filterOrdersByDateAndStatus();
        },
        error: (err) => {
          this.openSnackBar(err.message, 'X');
        },
      });
  }

  onPageChange(event: any): void {
    this.orderPage.page = event?.pageIndex ?? 0;
    this.orderPage.size = event?.pageSize ?? 10;
    this.filterOrdersByDateAndStatus();
  }

  search() {
    this.filterOrdersByDateAndStatus();
    this.getAnalyssis();
  }

  getAnalyssis() {
    this.orderService
      .ordersAnalysis(this.startDate, this.endDate)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (resp) => {
          console.log("orders analysis:", resp);
          this.analysis = resp;
        },
        error: (error) => {
          this.openSnackBar('Error fetching orders Analysis', 'X');
        },
      });
  }
  updateMainDishPriority(orderItem: OrderItem, order: Order) {
    // the prev orderItem with priority 1 will have orderItem.priorty which is past by param
    order.orderItems = [orderItem];
    this.orderService
      .updateOrder(order.id!, order)
      .pipe(takeUntilDestroyed(this.destroyRed))
      .subscribe({
        next: (resp) => {
          this.openSnackBar('La commande a bien été mise à jour', 'X');
          this.filterOrdersByDateAndStatus();
        },
        error: (err) => {
          this.openSnackBar(err.message, 'X');
        },
      });
  }
  downloadOrdersAsPDF(order: Order) {
   
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
  stockAnalysis() {
    this.orderItemsService
      .getProductCounts(this.startDate, this.endDate)
      .subscribe({
        next: resp => {
          console.log('Product Counts:', resp);
          this.productsAnalysis = resp;
        },
        error: (err) => {
          console.error('Error fetching product counts:', err);
        },
      });
  }
   loadOrderSummary() {
    this.dishPriceSummary();
    this.stockAnalysis();
  }
  dishPriceSummary() {
    this.orderService
      .getOrderSummaryByDishPrice(this.startDate, this.endDate)
      .subscribe((data) => {
        this.orderSummary = data;
      });
  }
}
