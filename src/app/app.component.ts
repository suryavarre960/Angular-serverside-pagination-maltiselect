import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from './view-user/view-user.component';
import { EmployeeService } from './services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from './Components/iusers';
import { SelectionModel } from '@angular/cdk/collections';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Udata: any[] = [];
  totalPolicies: number = 0;
  page = 1;
  limit = 3;
  
  displayedColumns: string[] = ['select','_id', 'name', 'tech', 'sub','action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel <any> (true, []);  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }



  getEmployeeList() {
    this._empService.getEmployeeList(this.page, this.limit ).subscribe({
      next: (res) => {
         this.Udata= res.data
        this.dataSource = new MatTableDataSource(this.Udata);
        this.totalPolicies = res.totalPolicies;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    });
  }


  // onDelete(id:string){
  //   if (confirm('Are you sure you want to delete this record?')) {
  //     this._empService.deleteAlien(id).subscribe(() => {
  //       this.getEmployeeList();
  //     });}};

  //Delete Records 
  isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.dataSource && this.dataSource.data.length;  
    return numSelected === numRows;  
}  

masterToggle() {  
  this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));  
} 

checkboxLabel(row: any): string {  
  if (!row) {  
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
  }  
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.UserId + 1}`;  
} 

onDelete() {
  const numSelected = this.selection.selected;
  if (numSelected.length > 0) {
    if (confirm('Are you sure to delete items')) {
      this._empService.deleteMulti(numSelected).subscribe(res => {
        console.log(res);
        this.selection.clear();
        this.getEmployeeList();
        const currentDataLength = this.Udata.length;
        if (currentDataLength === numSelected.length) {
          this.page = Math.max(1, this.page - 1);
          this.paginator.pageIndex = this.page - 1;
          this.getEmployeeList();
        }
      });
    }
  } else {
    alert('At least select one record..');
  }
}

  onPageChange(event: any) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getEmployeeList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  openViewForm(data: any) {
    const dialogRef = this._dialog.open(ViewUserComponent, {
      height: '60%',
      width: '50%',
      data
    });
  }





}
