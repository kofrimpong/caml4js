export declare class Operator {
    protected internalName: string;
    protected type: ValueType;
    constructor(type: ValueType, internalName: string);
}
export declare class FieldOperator extends Operator {
    static NOW: string;
    constructor(type: ValueType, internalName: string);
    isTrue(): string;
    isFalse(): string;
    equalTo(value: Date | number | string): string;
    notEqualTo(value: Date | number | string): string;
    greaterThan(value: Date | number | string): string;
    lessThan(value: Date | number | string): string;
    greaterThanOrEqualTo(value: Date | number | string): string;
    lessThanOrEqualTo(value: Date | number | string): string;
    isNull(): string;
    isNotNull(): string;
    beginsWith(value: string): string;
    in(...arrayOfValues: Date[] | number[] | string[]): string;
    contains(value: string): string;
    notIncludes(value: number | string): string;
    includes(value: number | string): string;
}
export declare class LookupFieldOperator extends Operator {
    idEqualTo(value: number): string;
    valueEqualTo(value: string): string;
    idIn(...arrayOfValues: number[]): string;
    includes(value: number): string;
}
export declare class UserFieldOperator extends Operator {
    equalToCurrentUser(): string;
    isInSPGroup(): string;
    isInSPWebGroups(): string;
    isInSPWebAllUsers(): string;
    isInSPWebUsers(): string;
    isInCurrentUserGroups(): string;
    includes(value: number): string;
    private memberOf;
}
export declare enum JoinType {
    LEFT = "LEFT",
    INNER = "INNER"
}
export interface Projections {
    Name: string;
    Type: FieldType;
    ShowField: string;
}
export declare class Join {
    type: JoinType;
    joinName: string;
    pkey: string;
    pJoinName: string;
    projections: Projections[];
    constructor(init?: Partial<Join>);
    getJoinElement(): string;
    getProjectionsElement(): string;
}
export declare enum FieldType {
    LookUp = "Lookup",
    DateTime = "DateTime",
    Choice = "Choice",
    Computed = "Computed",
    URL = "URL",
    Integer = "Integer",
    Text = "Text",
    Date = "Date",
    Note = "Note"
}
declare enum ValueType {
    Integer = "Integer",
    Text = "Text",
    Date = "Date",
    Note = "Note",
    SPWebAllUsers = "SPWeb.AllUsers",
    SPGroup = "SPGroup",
    SPWebGroups = "SPWeb.Groups",
    CurrentUserGroups = "CurrentUserGroups",
    SPWebUsers = "SPWeb.Users",
    LookUp = "Lookup",
    DateTime = "DateTime",
    Choice = "Choice",
    Computed = "Computed",
    URL = "URL",
    LookupMulti = "LookupMulti",
    UserMulti = "UserMulti"
}
export declare const and: (query1: string, query2: string) => string;
export declare const or: (query1: string, query2: string) => string;
export declare const where: (query: string) => string;
export declare const join: (type: JoinType, joinName: string, pkey: string, pJoinName?: string, projections?: Projections[]) => Join;
export declare const joins: (...joins: Join[]) => string;
export declare const viewFields: (...viewFields: string[]) => string;
export declare const query: (...inputs: string[]) => string;
export declare const orderBy: (...orderBy: {
    Field: string;
    DSC?: boolean;
}[]) => string;
export declare const groupBy: (field: string) => string;
export declare const noteField: (internalName: string) => FieldOperator;
export declare const choiceField: (internalName: string) => FieldOperator;
export declare const computedField: (internalName: string) => FieldOperator;
export declare const urlField: (internalName: string) => FieldOperator;
export declare const numberField: (internalName: string) => FieldOperator;
export declare const textField: (internalName: string) => FieldOperator;
export declare const dateField: (internalName: string) => FieldOperator;
export declare const booleanField: (internalName: string) => FieldOperator;
export declare const dateTimeField: (internalName: string) => FieldOperator;
export declare const lookupField: (internalName: string) => LookupFieldOperator;
export declare const userField: (internalName: string) => UserFieldOperator;
export {};
