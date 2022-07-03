import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserGroupFormComponent } from '../../dialog-form/user-group-form/user-group-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserGroup } from 'src/app/dto/userGroup';
import { ApiService } from 'src/app/service/api.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})

export class UserGroupComponent implements OnInit {

  displayedColumns: string[] = ['groupName', 'ruleName', 'permission','action'];
  dataSource!: MatTableDataSource<UserGroup>;

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
    this.getAllUserGroup();
  }

  openDialog() {
    this.dialog.open(UserGroupFormComponent, {
      width: '30%',
    }).afterClosed().subscribe(val =>{
        if (val === "Save"){
          this.getAllUserGroup();
        }
    })
  }

  getAllUserGroup(){
    this.api.getUserGroups()
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

  editUserGroup(row: any){
    this.dialog.open(UserGroupFormComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val =>{
      if (val === "Update"){
        this.getAllUserGroup();
      }
    })
  }

  deleteUserGroup(id: number) {
    this.api.deleteUserGroup(id)
      .subscribe({
        next: (res)=>{
          this.getAllUserGroup();
          this.alertService.success('Successfully Delete');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Delete UserGroup' + err.message);
        }
      })
  }

}
