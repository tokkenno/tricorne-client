import {AfterViewInit, Component} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {

  constructor(
      public readonly navigation: NavigationService
  ) { }

  ngAfterViewInit(): void {
    Feather.replace();
  }
}
