import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserFormComponent } from '../../dialog-form/user-form/user-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/dto/user';
import { ApiService } from 'src/app/service/api.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'userGroup', 'attachedCustomerId', 'action'];
  dataSource!: MatTableDataSource<User>;

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
    this.getAllUser();
  }

  openDialog() {
    this.dialog.open(UserFormComponent, {
      width: '30%',
    }).afterClosed().subscribe(val =>{
        if (val === "Save"){
          this.getAllUser();
        }
    })
  }

  getAllUser(){
    this.api.getUsers()
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

  editUser(row: any){
    this.dialog.open(UserFormComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val =>{
      if (val === "Update"){
        this.getAllUser();
      }
    })
  }

  deleteUser(id: number) {
    this.api.deleteUser(id)
      .subscribe({
        next: (res)=>{
          this.getAllUser();
          this.alertService.success('Successfully Delete');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Delete User' + err.message);
        }
      })
  }

}
