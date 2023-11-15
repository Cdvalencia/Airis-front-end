import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarContentComponent } from './navbar-content.component';

describe('NavbarContentComponent', () => {
    let component: NavbarContentComponent;
    let fixture: ComponentFixture<NavbarContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavbarContentComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
