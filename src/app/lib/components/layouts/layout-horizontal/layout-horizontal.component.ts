import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FooterComponent, NavbarComponent, NavbarContentComponent } from '@lib/components';

@Component({
    selector: 'app-layout-horizontal',
    standalone: true,
    imports: [CommonModule, NavbarComponent, NavbarContentComponent, FooterComponent],
    templateUrl: './layout-horizontal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHorizontalComponent implements OnInit {
    menuActive = localStorage.getItem('menuActive') == 'true' ? true : false;
    profileOpen=false;
    ngOnInit(): void {}

    changeMenu() {
        this.menuActive = !this.menuActive;
        localStorage.setItem('menuActive', JSON.stringify(this.menuActive));
    }
    changeProfile() {
        this.profileOpen = false;        
    }
}
