import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableColumnsModel } from "@lib/shared/table/table.model";
@Component({
  selector: "app-button-filter",
  templateUrl: "./button-filter.component.html",
  standalone: true,
  imports:[CommonModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  styleUrls: ["./button-filter.component.scss"],
})
export class ButtonFilterComponent implements OnInit {
  @Input()
  columns: TableColumnsModel[] | any;
  constructor() {}

  ngOnInit() {}
  toggleColumnVisibility(column:any, event: any) {
    console.log(column, event);

    // event.stopPropagation();
    // event.stopImmediatePropagation();
    // column.visible = !column.visible;
  }
}
