import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})

export class AdminFormComponent implements OnInit {

  adminForm !: FormGroup;
  actionBtn: string = "Save";
  constructor(private formBilder: FormBuilder, 
    private dialogRef: MatDialogRef<AdminFormComponent>,
    private alertService: AlertService, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }

  id = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  privilege = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.adminForm = this.formBilder.group({
      id: 0,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      privilege: this.privilege,
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.adminForm.controls['firstName'].setValue(this.editData.firstName);
      this.adminForm.controls['lastName'].setValue(this.editData.lastName);
      this.adminForm.controls['email'].setValue(this.editData.email);
      this.adminForm.controls['privilege'].setValue(this.editData.privilege);
      this.adminForm.controls['id'].setValue(this.editData.id);
    }
  }
  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email Required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  addAdmin(){
    if (!this.editData) {
      if (this.adminForm.valid){
        this.api.postAdmin(this.adminForm.value)
        .subscribe({
          next: (res)=>{
            this.alertService.success('Admin Created');
            this.adminForm.reset();
            this.dialogRef.close('Save');
          },
          error: (err)=>{
            this.alertService.danger('Unable to Create Admin' + err.message);
          }
        })
      }
    }
    else {
      this.updateAdmin();
    }
    
  }

  updateAdmin() {
    if (this.adminForm.valid) {
      this.api.putAdmin(this.adminForm.value)
      .subscribe({
        next: (res)=>{
          this.alertService.success('Admin Updated');
          this.adminForm.reset();
          this.dialogRef.close('Update');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Update Admin' + err.message);
        }
      })
    }
  }
  

}
