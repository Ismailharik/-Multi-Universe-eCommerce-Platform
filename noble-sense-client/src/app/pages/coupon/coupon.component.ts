import { Component } from '@angular/core';
import coupon_data from '@/data/coupon-data';
import { ICoupon } from '@/types/coupon-type';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent {
  public coupons = coupon_data;

  isCouponActive(coupon: ICoupon): boolean {
    const currentTime = new Date().getTime();
    const couponEndTime = new Date(coupon.endTime).getTime();

    return currentTime > couponEndTime;
  }

  index: number | null = null;

  async copyCouponCode(couponCode: string, i: number) {

    try {
      await navigator.clipboard.writeText(couponCode);
      // Set the "Copied" message to true
      this.index = i;

      // Reset the "Copied" message after 3000 ms (3 seconds)
      setTimeout(() => {
        this.index = null;
      }, 3000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  }
}
