import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AccessRule } from '../dto/accessRule';
import { Admin } from '../dto/admin';
import { User } from '../dto/user';
import { UserGroup } from '../dto/userGroup';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  // Admin Requset
  getAdmins() {
    return this.http.get<Admin[]>("http://localhost:4200/api/admins")
    .pipe(map((res: Admin[])=>{
      return res;
    }))
  }

  postAdmin(data: Admin) {
    return this.http.post<Admin>("http://localhost:4200/api/admins", data);
  }

  putAdmin(data: Admin) {
    return this.http.put<Admin>("http://localhost:4200/api/admins", data);
  }

  deleteAdmin(id: number) {
    return this.http.delete<Admin>("http://localhost:4200/api/admins/" + id);
  }


  // AccessRule Requset
  getAccessRules() {
    return this.http.get<AccessRule[]>("http://localhost:4200/api/accessRules")
    .pipe(map((res: AccessRule[])=>{
      return res;
    }))
  }

  postAccessRule(data: AccessRule) {
    return this.http.post<AccessRule>("http://localhost:4200/api/accessRules", data);
  }

  putAccessRule(data: AccessRule) {
    return this.http.put<AccessRule>("http://localhost:4200/api/accessRules", data);
  }

  deleteAccessRule(id: number) {
    return this.http.delete<AccessRule>("http://localhost:4200/api/accessRules/" + id);
  }



  // User Requset
  getUsers() {
    return this.http.get<User[]>("http://localhost:4200/api/users")
    .pipe(map((res: User[])=>{
      return res;
    }))
  }

  postUser(data: User) {
    return this.http.post<User>("http://localhost:4200/api/users", data);
  }

  putUser(data: User) {
    return this.http.put<User>("http://localhost:4200/api/users", data);
  }

  deleteUser(id: number) {
    return this.http.delete<User>("http://localhost:4200/api/users/" + id);
  }


  // UserGroup Requset
  getUserGroups() {
    return this.http.get<UserGroup[]>("http://localhost:4200/api/userGroups")
    .pipe(map((res: UserGroup[])=>{
      return res;
    }))
  }

  postUserGroup(data: UserGroup) {
    return this.http.post<UserGroup>("http://localhost:4200/api/userGroups", data);
  }

  putUserGroup(data: UserGroup) {
    return this.http.put<UserGroup>("http://localhost:4200/api/userGroups", data);
  }

  deleteUserGroup(id: number) {
    return this.http.delete<UserGroup>("http://localhost:4200/api/userGroups/" + id);
  }
}
