import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        public readonly auth: AuthService,
        public readonly navigation: NavigationService
    ) {
    }

    ngOnInit(): void {
    }

}
