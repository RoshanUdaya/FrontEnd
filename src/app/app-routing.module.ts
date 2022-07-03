import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRuleComponent } from './component/pages/access-rule/access-rule.component';
import { AdminComponent } from './component/pages/admin/admin.component';
import { UserGroupComponent } from './component/pages/user-group/user-group.component';
import { UserComponent } from './component/pages/user/user.component';

const routes: Routes = [
  {
    path:'',
    component: AdminComponent,
  },
  {
    path:'user',
    component: UserComponent,
  },
  {
    path:'usergroup',
    component: UserGroupComponent,
  },
  {
    path:'accessrule',
    component: AccessRuleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
