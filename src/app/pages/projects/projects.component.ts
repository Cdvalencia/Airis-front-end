import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from '@lib/services/theme';


import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { MapComponent } from './map/map.component';

export interface itemElement {
    id: number;
    name: string;
    type: number;
}
@Component({
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        RouterModule,
        MapComponent,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
    currentTheme!: AppTheme | null;
    markerForm!: FormGroup;
    markers: any[] = [
        { nombre: 'Bogotá', position: { lat: 4.60971, lng: -74.08175 } },
        { nombre: 'Medellín', position: { lat: 6.25184, lng: -75.56359 } },
        { nombre: 'Cali', position: { lat: 3.45165, lng: -76.53205 } },
        { nombre: 'Barranquilla', position: { lat: 10.96389, lng: -74.79666 } },
        { nombre: 'Cartagena', position: { lat: 10.39105, lng: -75.47942 } },
    ];

    private readonly _themeService = inject(ThemeService);
    private readonly _destroy$ = new Subject();
    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.markerForm = this.fb.group({
            latitud: new FormControl('4.81333', [
                Validators.required,
                Validators.maxLength(32),
                Validators.min(-90),
                Validators.max(90),
                Validators.pattern(/\-?\d*\.?\d{1,2}/),
            ]),
            longitud: new FormControl('-75.69611', [
                Validators.required,
                Validators.maxLength(32),
                Validators.min(-90),
                Validators.max(90),
                Validators.pattern(/\-?\d*\.?\d{1,2}/),
            ]),
        });
    }

    addMarker() {
        for (var i in this.markerForm.controls) {            
            this.markerForm.controls[i].markAsTouched();
            this.markerForm.controls[i].markAsDirty();
        }
        if (this.markerForm.valid && !(isNaN(Number(this.markerForm.controls['latitud'].value)) || isNaN(Number(this.markerForm.controls['longitud'].value)))) {
            let position = {
                lat: Number(this.markerForm.controls['latitud'].value),
                lng: Number(this.markerForm.controls['longitud'].value),
            };
            this.markers.push({
                position,
            });
        } else {
            Swal.fire('Mapa', 'Posición en el mapa errada.', 'warning');
        }
    }
}
