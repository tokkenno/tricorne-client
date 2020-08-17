import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly sidebarCollapseEvent: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly sidebarCollapse: Observable<boolean> = this.sidebarCollapseEvent.asObservable();

  constructor() {}

  public setSidebarState(collapse: boolean = null): void {
    if (collapse != null) {
      this.sidebarCollapseEvent.next(collapse);
    } else {
      this.sidebarCollapseEvent.next(!this.sidebarCollapseEvent.value);
    }
  }
}
