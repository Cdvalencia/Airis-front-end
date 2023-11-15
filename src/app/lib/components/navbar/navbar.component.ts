import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    inject
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { LogoComponent } from '../logo/logo.component';

import $ from 'jquery';


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, LogoComponent],
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);
    @Output() changeMenu = new EventEmitter<boolean>();
    @Output() changeProfile = new EventEmitter<boolean>();
    @Input() profileOpen: any;    
    listenerFn = () => {};
    constructor(private renderer: Renderer2) {}

    ngOnDestroy() {
        this.listenerFn();
    }

    ngOnInit(): void {
        let that = this;
        this.listenerFn = this.renderer.listen('window', 'click', (e: any) => {            
            if (
                !(
                    $(e.target).hasClass('nav-profile') ||
                    $(e.target).parent().hasClass('nav-profile') ||
                    $(e.target).parent().parent().hasClass('nav-profile') ||
                    $(e.target).parent().parent().parent().hasClass('nav-profile') ||
                    $(e.target).parent().parent().parent().parent().hasClass('nav-profile') ||
                    $(e.target).parent().parent().parent().parent().parent().hasClass('nav-profile') ||
                    $(e.target).parent().parent().parent().parent().parent().parent().hasClass('nav-profile')
                )
            ) {                
                this.profileOpen=false;
                this.changeProfile.emit();
            }            
        });
    }

    onClickSignOut(): void {
        this._authService.logout();
        this._router.navigate(['/login']);
    }
    profileOpenHandler() {
        this.profileOpen = false;
    }
    changeMenuHandler() {
        this.changeMenu.emit();
    }
}
