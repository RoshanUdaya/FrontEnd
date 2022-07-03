import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-access-rule-form',
  templateUrl: './access-rule-form.component.html',
  styleUrls: ['./access-rule-form.component.scss']
})

export class AccessRuleFormComponent implements OnInit {

  accessRuleForm !: FormGroup;
  actionBtn: string = "Save";
  constructor(private formBilder: FormBuilder, 
    private dialogRef: MatDialogRef<AccessRuleFormComponent>,
    private alertService: AlertService, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }

  id = new FormControl('', [Validators.required]);
  ruleName = new FormControl('', [Validators.required]);
  permission = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.accessRuleForm = this.formBilder.group({
      id: 0,
      ruleName: this.ruleName,
      permission: this.permission,
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.accessRuleForm.controls['ruleName'].setValue(this.editData.ruleName);
      this.accessRuleForm.controls['permission'].setValue(this.editData.permission);
      this.accessRuleForm.controls['id'].setValue(this.editData.id);
    }
  }
  

  getErrorMessage() {
    if (this.ruleName.hasError('required')) {
      return 'Rule Name Required';
    }
    if (this.permission.hasError('required')) {
      return 'permission Required';
    }

    return this.ruleName.hasError('ruleName') ? 'Not a valid ruleName' : '';
  }

  addAccessRule(){
    if (!this.editData) {
      if (this.accessRuleForm.valid){
        this.api.postAccessRule(this.accessRuleForm.value)
        .subscribe({
          next: (res)=>{
            this.alertService.success('AccessRule Created');
            this.accessRuleForm.reset();
            this.dialogRef.close('Save');
          },
          error: (err)=>{
            this.alertService.danger('Unable to Create AccessRule' + err.message);
          }
        })
      }
    }
    else {
      this.updateAccessRule();
    }
    
  }

  updateAccessRule() {
    if (this.accessRuleForm.valid) {
      this.api.putAccessRule(this.accessRuleForm.value)
      .subscribe({
        next: (res)=>{
          this.alertService.success('AccessRule Updated');
          this.accessRuleForm.reset();
          this.dialogRef.close('Update');
        },
        error: (err)=>{
          this.alertService.danger('Unable to Update AccessRule' + err.message);
        }
      })
    }
  }
  

}
