import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelCasePipe } from './camelCase/camelCase.pipe';
import { CapitalizeInitialsPipe } from './capitalizeInitials/capitalizeInitials.pipe';




@NgModule({
  declarations: [CamelCasePipe,CapitalizeInitialsPipe],
  imports: [
    CommonModule,
  ],
  exports:[CamelCasePipe,CapitalizeInitialsPipe]
})
export class PipesGlobalsModule { }
