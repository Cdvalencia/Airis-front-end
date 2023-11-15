import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";

import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PipesGlobalsModule } from '@lib/pipeGlobals/pipesGlobals.module';

import { fadeInUp400ms } from '@lib/animations/fade-in-up.animation';
import { stagger40ms } from '@lib/animations/stagger.animation';

import {
    ActionsModel,
    TableColumnsModel
} from "./table.model";
@Component({
    selector: 'app-table',
    standalone: true,
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    animations: [fadeInUp400ms, stagger40ms],    
    imports: [        
        CommonModule,
        RouterModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        PipesGlobalsModule,
        MatSlideToggleModule,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            } as MatFormFieldDefaultOptions,
        },
    ],
})
export class TableComponent<T> implements OnInit, AfterViewInit {
    @Input() columns: TableColumnsModel[] = [];
    @Input() pageSize = 5;
    @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
    @Input() pgAutomatic = false;
    @Input() menuActions: ActionsModel[] = [];
    @Input() set totalItems(item: number) {
        this.length = item;
    }
    @Input() set visibleColumns(columns: Array<keyof T | string>) {
        this.showColumns = columns;
        this.isShearVisibleColumns = false;
    }
    @Input() set data(dataTable: any[]) {
        this.dataSource = new MatTableDataSource();             
        this.dataSource.data = dataTable;
        if (dataTable) {
            if (this.pgAutomatic) {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
            this.paginator._intl.itemsPerPageLabel = ' ';
        }
    }
    @Output() page: EventEmitter<any> = new EventEmitter();
    @Output() actions: EventEmitter<any> = new EventEmitter();
    dataSource: MatTableDataSource<T> | any= new MatTableDataSource<T>();
    selection = new SelectionModel<T>(true, []);
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
    @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

    private isShearVisibleColumns: boolean = true;
    private showColumns: Array<keyof T | string> | undefined;
    length: number | undefined;
    get visibleColumns(): any {
        if (this.isShearVisibleColumns) {
            this.showColumns = this.columns.filter((column) => column.visible).map((column) => column.property);
            return this.showColumns;
        }
        return this.showColumns;
    }
    constructor() {}

    ngOnInit() {        
        // this.dataSource = new MatTableDataSource();
        // console.log(this.data);        
        // this.dataSource.data = this.data;
        // console.log(this.columns);
    }
    ngAfterViewInit() {
      // console.log(this.dataSource);
      // if (this.pgAutomatic) {          
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // }
      // this.paginator._intl.itemsPerPageLabel = " ";
      // console.log("e");
    }

    event(data: unknown, event: string) {
        this.actions.emit({ data, event });
    }
    deleteCustomer(data: any) {}
    trackByProperty(index: number, column: TableColumnsModel) {
        return column.property;
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach((row:any) => this.selection.select(row));
    }
    onPageChange(page: any) {
        page.pageIndex += 1;
        this.page.emit(page);
    }
    showData(data: any, key: string) {
        let resultado: any;
        const keys = key.split('.');
        keys.forEach((key, i) => {
            try {
                resultado = i == 0 ? data[key] : resultado[key] || null;
            } catch (error) {
                resultado = null;
            }
        });
        return resultado;
    }
    toggleSelect(row: any, property: any, event: MatSlideToggleChange) {
        this.updateJsonValue(row, property, event.checked);
        this.event(row, property);
    }
    updateJsonValue(obj: any, path: string, value: any): void {
        const pathParts = path.split('.');
        let currentObj = obj;
        for (let i = 0; i < pathParts.length - 1; i++) {
            const pathPart = pathParts[i];
            if (!currentObj[pathPart]) {
                currentObj[pathPart] = {};
            }
            currentObj = currentObj[pathPart];
        }

        const lastPathPart = pathParts[pathParts.length - 1];
        currentObj[lastPathPart] = value;
    }
}
