import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toastConfig = {
    // configurations for Toast Message
    closeButton: true,
    timeOut: 2000,
  };
  constructor(private toastService: ToastrService) {}

  showSuccess(message, title) {
    this.toastService.success(message, 'Success', this.toastConfig);
  }

  showError(message, title) {
    this.toastService.error(message, title, this.toastConfig);
  }
}
