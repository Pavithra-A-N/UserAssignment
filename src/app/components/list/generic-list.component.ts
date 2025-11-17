import {Component,Input, Output,EventEmitter,ViewChild,TemplateRef,OnChanges,SimpleChanges
} from'@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { TableModule }  from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule }    from 'primeng/button';

/*Defined interface within component since it's generic
we can also add / enhance this component as needed
and avoid the boilerplate
*/
export interface ColumnDef<T> {
  header: string;
  field?: Extract<keyof T, string>;
  sortable?: boolean;
  width?: string;
  templateRef?: TemplateRef<any>;
}

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent<T> implements OnChanges {
  @Input() data:   T[] = [];
  @Input() columns: ColumnDef<T>[] = [];
  @Output() rowAction = new EventEmitter<{ action: string; rowData: T }>();
  @ViewChild('dt') dt: any;
 
  filterGlobalValue:  string   = '';
  globalFilterFields: string[] = [];
  originalData: T[] =[];

  // Manual tristatesort fields
  sortField: string | undefined;
  sortOrder: number | undefined;
  private lastSortField: string | undefined;
  private lastSortOrder: number | undefined;
  
  ngOnChanges(changes: SimpleChanges): void {
   if (changes['columns']) {
      this.globalFilterFields = this.columns
        .map(col => col.field)          
        .filter(f => f !== undefined)   
        .map(f => f as string);       
    }
    if (changes['data'] && this.data) {
      this.originalData = [...this.data];
    }
  }

  applyGlobalFilter(): void {
    if (this.dt) {
      this.dt.filterGlobal(this.filterGlobalValue, 'contains');
    }
  }

  onAction(action: string, row: T | null): void {
    this.rowAction.emit({ action, rowData: row as T });
  }

  //checks for order  as 1 / -1 , with the thrid click resets the data
  onSortChange(event: any) {
        const currentSortField = event.field;
        const currentSortOrder = event.order;
      if (currentSortField === this.lastSortField && 
            this.lastSortOrder === -1 && 
            currentSortOrder === 1) 
        {
            this.data = [...this.originalData];
            this.sortField = undefined; 
            this.sortOrder = undefined;
            this.lastSortField = undefined;
            this.lastSortOrder = undefined;
            if (this.dt) {
            this.dt.reset(); 
            }
            this.filterGlobalValue ="";
            
        } else {
            this.sortField = currentSortField;
            this.sortOrder = currentSortOrder;
            this.lastSortField = currentSortField;
            this.lastSortOrder = currentSortOrder;
        }
    
    }
}
