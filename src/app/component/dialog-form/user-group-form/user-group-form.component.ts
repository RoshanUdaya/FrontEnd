import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { AccessRule } from 'src/app/dto/accessRule';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-user-group-form',
  templateUrl: './user-group-form.component.html',
  styleUrls: ['./user-group-form.component.scss']
})

export class UserGroupFormComponent implements OnInit {

  userGroupForm !: FormGroup;
  accessRules: AccessRule[] = [];
  actionBtn: string = "Save";
  constructor(private formBilder: FormBuilder, 
    private dialogRef: MatDialogRef<UserGroupFormComponent>,
    private alertService: AlertService, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }

  id = new FormControl('', [Validators.required]);
  groupName = new FormControl('', [Validators.required]);
  accessRuleId = new FormControl('', [Validators.required]);

  ngOnInit(): void {

    this.api.getAccessRules().subscribe({
      next: (res)=>{
        this.accessRules = res;
      },
      error: ()=>{
      }
    })

    this.userGroupForm = this.formBilder.group({
      id: 0,
      groupName: this.groupName,
      accessRuleId: this.accessRuleId,
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.userGroupForm.controls['groupName'].setValue(this.editData.groupName);
      this.userGroupForm.controls['accessRuleId'].setValue(this.editData.accessRuleId);
      this.userGroupForm.controls['id'].setValue(this.editData.id);
    }
  }
  

  getErrorMessage() {
    if (this.groupName.hasError('required')) {
      return 'Group Name Required';
    }

    return '';
  }

  addUserGroup(){
    if (!this.editData) {
      if (this.userGroupForm.valid){
        this.api.postUserGroup(this.userGroupForm.value)
        .subscribe({
          next: (res)=>{
            this.alertService.success('UserGroup Created');
            this.userGroupForm.reset();
            this.dialogRef.close('Save');
          },
          error: (err)=>{
            this.alertService.danger('Unable to Create UserGroup' + err.message);
          }
        })
      }
    }
    else {
      this.updateUserGroup();
    }
    
  }

  updateUserGroup() {
    if (this.userGroupForm.valid) {
      this.api.putUserGroup(this.userGroupForm.value)
      .subscribe({
        next: (res)=>{
          this.alertService.success('UserGroup Updated');
          this.userGroupForm.reset();
          this.dialogRef.close('Update');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Update UserGroup' + err.message);
        }
      })
    }
  }
  

}
