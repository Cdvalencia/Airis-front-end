import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { LogoComponent } from '../logo/logo.component';

@Component({
    selector: 'app-navbar-content',
    standalone: true,
    imports: [CommonModule, RouterModule, LogoComponent],
    templateUrl: './navbar-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarContentComponent {
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);
    @Output() changeMenu = new EventEmitter<boolean>();

    menu: any = [
        {
            id: 1,
            text: 'Compra',
            ico: 'icon-[icons8--buy]',
            children: [
                {
                    id: 2,
                    text: 'Proyectos',
                    route: '/projects',
                    ico: 'icon-[ep--list]',
                },
            ],
        },
        {
            id: 2,
            text: 'Venta',
            ico: 'icon-[material-symbols--sell]',
            children: [
                {
                    id: 2,
                    text: 'Estadísticas',
                    route: '/statistics',
                    ico: 'icon-[wpf--statistics]',
                },
            ],
        },
    ];

    openMenu(ind: any) {
        let opened = this.menu[ind].open;
        this.menu.map((it: any) => {
            it.open = false;
        });
        this.menu[ind].open = !opened;
    }

    openMenu2() {
        if (window.innerWidth <= 760) {
            this.changeMenu.emit();
        }
    }
}
