import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';

// import { MouseEvent } from '@agm/core';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, GoogleMapsModule],
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    @Input() markers: any[] | undefined;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {}

    display: any;
    center: google.maps.LatLngLiteral = {
        lat: 6.25184,
        lng: -75.56359,
    };
    zoom = 5;
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = event.latLng.toJSON();
    }
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
}
