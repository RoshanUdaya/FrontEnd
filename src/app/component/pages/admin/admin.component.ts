import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AdminFormComponent } from '../../dialog-form/admin-form/admin-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Admin } from 'src/app/dto/admin';
import { ApiService } from 'src/app/service/api.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'privilege', 'action'];
  dataSource!: MatTableDataSource<Admin>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public dialog: MatDialog, private alertService: AlertService, private api: ApiService) {
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllAdmin();
  }

  openDialog() {
    this.dialog.open(AdminFormComponent, {
      width: '30%',
    }).afterClosed().subscribe(val =>{
        if (val === "Save"){
          this.getAllAdmin();
        }
    })
  }

  getAllAdmin(){
    this.api.getAdmins()
      .subscribe({
        next: (res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: ()=>{

        }
      })
  }

  editAdmin(row: any){
    this.dialog.open(AdminFormComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val =>{
      if (val === "Update"){
        this.getAllAdmin();
      }
    })
  }

  deleteAdmin(id: number) {
    this.api.deleteAdmin(id)
      .subscribe({
        next: (res)=>{
          this.getAllAdmin();
          this.alertService.success('Successfully Delete');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Delete Admin' + err.message);
        }
      })
  }

}
