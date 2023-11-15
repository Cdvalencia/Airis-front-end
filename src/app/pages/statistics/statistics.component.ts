import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Venta } from '@lib/models/venta/venta.model';
import { AppTheme, ThemeService } from '@lib/services/theme';
import { ButtonFilterComponent } from '@lib/shared/button/button-filter/button-filter.component';
import { SearchComponent } from '@lib/shared/inputs/search/search.component';
import { ActionsModel, TableColumnsModel } from '@lib/shared/table/table.model';

import { TableComponent } from '@lib/shared/table/table.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

export interface itemElement {
    id: number;
    mes: string;
    total: string;
    type: number;
}
@Component({
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        RouterModule,
        TableComponent,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        SearchComponent,
        ButtonFilterComponent,
        MatSelectModule,
        MatTooltipModule,
    ],
    templateUrl: './statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit, OnDestroy {
    currentTheme!: AppTheme | null;
    data: itemElement[] = [];
    dataAll: itemElement[] = [];
    data2: any[] = [
        { id: 1, mes: 'Enero', total: 12000, type: 1 },
        { id: 2, mes: 'Febrero', total: 15000, type: 2 },
        { id: 3, mes: 'Marzo', total: 18000, type: 3 },
        { id: 4, mes: 'Abril', total: 20000, type: 4 },
        { id: 5, mes: 'Mayo', total: 22000, type: 1 },
        { id: 6, mes: 'Junio', total: 25000, type: 2 },
        { id: 7, mes: 'Julio', total: 28000, type: 3 },
        { id: 8, mes: 'Agosto', total: 30000, type: 4 },
        { id: 9, mes: 'Septiembre', total: 32000, type: 1 },
        { id: 10, mes: 'Octubre', total: 35000, type: 2 },
        { id: 11, mes: 'Noviembre', total: 38000, type: 3 },
        { id: 12, mes: 'Diciembre', total: 40000, type: 4 },
    ];
    selectType: any = -1;
    types: any[] = [
        {
            id: 1,
            name: 'Tipo 1',
        },
        {
            id: 2,
            name: 'Tipo 2',
        },
        {
            id: 3,
            name: 'Tipo 3',
        },
        {
            id: 4,
            name: 'Tipo 4',
        },
    ];
    columns: TableColumnsModel[] = [
        {
            label: 'Id',
            property: 'id',
            type: 'text',
            visible: true,
        },
        {
            label: 'Mes',
            property: 'mes',
            type: 'text',
            visible: true,
        },
        {
            label: 'Total',
            property: 'total',
            type: 'text',
            visible: true,
        },
        {
            label: 'Tipo',
            property: 'type',
            type: 'text',
            visible: true,
        },
        { label: 'Opciones', property: 'actions', type: 'actions', visible: true },
    ];
    menuActions: ActionsModel[] = [
        {
            text: 'Editar',
            icon: 'icon-[iconamoon--edit-thin]',
            property: 'ver',
            color: 'orange',
        },
        {
            text: 'Eliminar',
            icon: 'icon-[mdi-light--delete]',
            property: 'delete',
            color: 'danger',
        },
    ];
    pageSize = 5;
    page = 1;
    totalItems = 0;
    searchText: string = '';

    private readonly _themeService = inject(ThemeService);

    private readonly _destroy$ = new Subject();

    ngOnInit(): void {
        this._themeService.currentTheme$
            .pipe(takeUntil(this._destroy$))
            .subscribe((theme) => (this.currentTheme = theme));
        this.getData();        
    }

    getData(page?: any) {
        this.data = this.data2.map((item: any) => new Venta(item));
        this.dataAll = this.data2.map((item: any) => new Venta(item));
        if (this.selectType != -1) {
            this.data = this.data.filter((item: any): any => {
                if (item.type == this.selectType) {
                    return new Venta(item);
                }
            });
        }
        this.totalItems = this.data.length;
    }

    ngOnDestroy(): void {
        this._destroy$.complete();
        this._destroy$.unsubscribe();
    }

    handleThemeChange(theme: AppTheme): void {
        this._themeService.setTheme(theme);
    }
    nextPage(page: any) {
        this.pageSize = page.pageSize;
        // this.getData(page.pageIndex);
    }
    search(text: any) {
        this.searchText = text;
        if (this.searchText == '') {
            this.data = this.dataAll;
            return;
        }
        this.data = this.data.filter((it, i) => {
            return it.mes.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
        });
    }

    compareItems(i1: any, i2: any) {
        return i1 && i2 && i1 === i2;
    }

    createItem() {}

    opciones(datos: any) {
        if (datos.event === 'editar') {
            //Acción a realizar
            console.log(datos.data, datos.event);
            return;
        }
        if (datos.event === 'ver') {
            //Acción a realizar
            console.log(datos.data, datos.event);
        }
    }
}
