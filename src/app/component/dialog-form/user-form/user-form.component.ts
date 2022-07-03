import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { UserGroup } from 'src/app/dto/userGroup';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  userForm !: FormGroup;
  actionBtn: string = "Save";
  userGroups: UserGroup[] = [];
  constructor(private formBilder: FormBuilder, 
    private dialogRef: MatDialogRef<UserFormComponent>,
    private alertService: AlertService, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }

  id = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  attachedCustomerId = new FormControl('', [Validators.required]);
  userGroupId = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.api.getUserGroups().subscribe({
      next: (res)=>{
        this.userGroups = res;
      },
      error: ()=>{
      }
    })

    this.userForm = this.formBilder.group({
      id: 0,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      attachedCustomerId: this.attachedCustomerId,
      userGroupId: this.userGroupId,
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.userForm.controls['firstName'].setValue(this.editData.firstName);
      this.userForm.controls['lastName'].setValue(this.editData.lastName);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['attachedCustomerId'].setValue(this.editData.attachedCustomerId);
      this.userForm.controls['userGroupId'].setValue(this.editData.userGroupId);
      this.userForm.controls['id'].setValue(this.editData.id);
    }
  }
  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email Required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  addUser(){
    if (!this.editData) {
      if (this.userForm.valid){
        this.api.postUser(this.userForm.value)
        .subscribe({
          next: (res)=>{
            this.alertService.success('User Created');
            this.userForm.reset();
            this.dialogRef.close('Save');
          },
          error: (err)=>{
            this.alertService.danger('Unable to Create User' + err.message);
          }
        })
      }
    }
    else {
      this.updateUser();
    }
    
  }

  updateUser() {
    if (this.userForm.valid) {
      this.api.putUser(this.userForm.value)
      .subscribe({
        next: (res)=>{
          this.alertService.success('User Updated');
          this.userForm.reset();
          this.dialogRef.close('Update');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Update User' + err.message);
        }
      })
    }
  }
  

}
