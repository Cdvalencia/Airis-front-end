import { Component, OnInit,Input,Optional,Self } from '@angular/core';
import { FormControl ,NgControl} from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() control:FormControl
  constructor(@Self() @Optional() public ngControl:NgControl) { 
    if (this.ngControl) {
      this.ngControl.valueAccessor=this  
    }
  }
  ngOnInit() {
  }
  writeValue(value: number): void {
    /** */
  }

  registerOnChange(fn: any): void {
    /** */
  }

  registerOnTouched(fn: any): void {
    /** */
  }
  setDisabledState(isDisabled: boolean) {
    /** */
  }

}
