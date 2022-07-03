import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './app-layouts/nav-bar/nav-bar.component';
import { AdminComponent } from './component/pages/admin/admin.component';
import { UserComponent } from './component/pages/user/user.component';
import { AccessRuleComponent } from './component/pages/access-rule/access-rule.component';
import { UserGroupComponent } from './component/pages/user-group/user-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { AlertModule } from 'ngx-alerts';
import { MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminFormComponent } from './component/dialog-form/admin-form/admin-form.component';
import { UserFormComponent } from './component/dialog-form/user-form/user-form.component';
import { UserGroupFormComponent } from './component/dialog-form/user-group-form/user-group-form.component';
import { AccessRuleFormComponent } from './component/dialog-form/access-rule-form/access-rule-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AdminComponent,
    UserComponent,
    AccessRuleComponent,
    UserGroupComponent,
    AdminFormComponent,
    UserFormComponent,
    UserGroupFormComponent,
    AccessRuleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    AlertModule.forRoot(),
    MatSelectModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
