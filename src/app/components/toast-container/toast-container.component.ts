import {Component, TemplateRef} from '@angular/core';
import {ToastService} from '../../services/toast.service';


@Component({
  selector: 'app-toasts',
  templateUrl: './toast-container.component.html',
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastContainerComponent {
  constructor(
      public readonly toastService: ToastService
  ) {}

  isTemplate(toast): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
