import { AccessRule } from "./accessRule";

export class UserGroup {
    id: number = 0;
    groupName: string = "";
    accessRuleId: number = 0;
    permission: boolean = false;
    accessRule: AccessRule = new AccessRule;
}