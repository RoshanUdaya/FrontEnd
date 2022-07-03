import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AccessRuleFormComponent } from '../../dialog-form/access-rule-form/access-rule-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AccessRule } from 'src/app/dto/accessRule';
import { ApiService } from 'src/app/service/api.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-access-rule',
  templateUrl: './access-rule.component.html',
  styleUrls: ['./access-rule.component.scss']
})
export class AccessRuleComponent implements OnInit {

  displayedColumns: string[] = ['ruleName', 'permission', 'action'];
  dataSource!: MatTableDataSource<AccessRule>;

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
    this.getAllAccessRule();
  }

  openDialog() {
    this.dialog.open(AccessRuleFormComponent, {
      width: '30%',
    }).afterClosed().subscribe(val =>{
        if (val === "Save"){
          this.getAllAccessRule();
        }
    })
  }

  getAllAccessRule(){
    this.api.getAccessRules()
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

  editAccessRule(row: any){
    this.dialog.open(AccessRuleFormComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val =>{
      if (val === "Update"){
        this.getAllAccessRule();
      }
    })
  }

  deleteAccessRule(id: number) {
    this.api.deleteAccessRule(id)
      .subscribe({
        next: (res)=>{
          this.getAllAccessRule();
          this.alertService.success('Successfully Delete');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Delete AccessRule' + err.message);
        }
      })
  }

}
