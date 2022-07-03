import { Person } from "./person";
import { UserGroup } from "./userGroup";

export class User extends Person {
    attachedCustomerId: number = 0;
    userGroupId: number = 0;
    userGroup: UserGroup = new UserGroup;
}