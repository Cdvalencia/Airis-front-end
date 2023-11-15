import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div>
            <figure>
                <span class="icon-[iconamoon--search-thin]"></span>
            </figure>
            <input
                [(ngModel)]="searchText"
                [placeholder]="placeholder"
                type="search"
                (input)="onInputChange()"
            />
        </div>
    `,
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    @Input() placeholder: string = 'Buscar...';
    @Input() icon: string = 'search';
    @Input() timeInput: number = 500;
    @Output() data: EventEmitter<string> = new EventEmitter<string>();
    searchText: string = '';
    private searchTimeout: any;
    constructor() {}

    ngOnInit() {}
    onInputChange() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.search();
        }, this.timeInput);
    }
    search() {
        this.data.emit(this.searchText);
    }
}
