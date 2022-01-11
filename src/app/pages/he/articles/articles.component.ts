import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../upload.service';
import { NgModel } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-articles',
  template: ` <mat-checkbox class="mat-option"
  [disableRipple]="true"
  [indeterminate]="isIndeterminate()"
  [checked]="isChecked()"
  (click)="$event.stopPropagation()"
  (change)="toggleSelection($event)">
{{text}}
</mat-checkbox>`,
  styles: [''],
})
export class ArticlesComponent implements OnInit {
  @Input() model: NgModel;
  @Input() values = [];
  @Input() text = 'Select All';

  constructor(private service:UploadService) { }

  ngOnInit() {

  }

  isChecked(): boolean {
    return this.model.value && this.values.length
      && this.model.value.length === this.values.length;
  }
  isIndeterminate(): boolean {
    return this.model.value && this.values.length && this.model.value.length
      && this.model.value.length < this.values.length;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.update.emit(this.values);
    } else {
      this.model.update.emit([]);
    }
  }

}
