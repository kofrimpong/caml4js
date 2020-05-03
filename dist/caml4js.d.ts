/**
 * A base class for Operators
 */
export declare class Operator {
    protected internalName: string;
    protected type: ValueType;
    constructor(type: ValueType, internalName: string);
}
/**
 * A general operator for comparison
 */
export declare class FieldOperator extends Operator {
    constructor(type: ValueType, internalName: string);
    /** Checks whether the value of the field is True */
    isTrue(): string;
    /** Checks whether the value of the field is False */
    isFalse(): string;
    /** Checks whether the value of the field is equal to the specified value */
    equalTo(value: number | string): string;
    /** Checks whether the value of the field is not equal to the specified value */
    notEqualTo(value: number | string): string;
    /** Checks whether the value of the field is greater than the specified value */
    greaterThan(value: number | string): string;
    /** Checks whether the value of the field is less than the specified value */
    lessThan(value: number | string): string;
    /** Checks whether the value of the field is greater than or equal to the specified value */
    greaterThanOrEqualTo(value: number | string): string;
    /** Checks whether the value of the field is less than or equal to the specified value */
    lessThanOrEqualTo(value: number | string): string;
    /** Checks whether the value of the field was specified by user */
    isNull(): string;
    /** Checks whether the value of the field was not specified by user */
    isNotNull(): string;
    /**
     * Searches for a string at the start of a column that holds Text or Note field type values.
     * @param value
     */
    beginsWith(value: string): string;
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues
     */
    in(arrayOfValues: number[] | string[]): string;
    /**
     * Searches for a string anywhere within a column that holds Text or Note field type values.
     * @param value
     */
    contains(value: string): string;
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is not included in the list item for the field.
     * @param value
     */
    notIncludes(value: number | string): string;
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    includes(value: number | string): string;
}
/**
 * A date operator for comparison
 */
export declare class DateFieldOperator extends Operator {
    constructor(type: ValueType, internalName: string);
    /** Checks whether the value of the field is equal to the specified value in ISO format */
    equalTo(value: string): string;
    /** Checks whether the value of the field is not equal to the specified value in ISO format*/
    notEqualTo(value: string): string;
    /** Checks whether the value of the field is greater than the specified value in ISO format*/
    greaterThan(value: string): string;
    /** Checks whether the value of the field is less than the specified value in ISO format*/
    lessThan(value: string): string;
    /** Checks whether the value of the field is greater than or equal to the specified value in ISO format*/
    greaterThanOrEqualTo(value: string): string;
    /** Checks whether the value of the field is less than or equal to the specified value in ISO format*/
    lessThanOrEqualTo(value: string): string;
    /** Checks whether the value of the field was specified by user */
    isNull(): string;
    /** Checks whether the value of the field was not specified by user */
    isNotNull(): string;
    /**
    * Checks whether the value of the field is equal to one of the specified values
    * @param arrayOfValues
    */
    in(arrayOfValues: string[]): string;
}
/**
 * A lookup operator for comparison
 */
export declare class LookupFieldOperator extends Operator {
    /** Checks whether the value of the field is equal to the specified ID value */
    idEqualTo(value: number): string;
    /** Checks whether the value of the field is equal to the specified value */
    valueEqualTo(value: string): string;
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues
     */
    idIn(arrayOfValues: number[]): string;
    /**
     * If the specified field allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    includes(value: number): string;
}
/**
 * A User/Group operator for comparison
 */
export declare class UserFieldOperator extends Operator {
    /** Checks whether the id of the person field is equal to the specified ID value */
    idEqualTo(id: number): string;
    /** Checks whether the display name of the person field is equal to the specified value */
    displayNameEqualTo(value: string): string;
    /**
     * Checks whether the value of the person field is equal to current user
     */
    equalToCurrentUser(): string;
    /**
     * Checks whether the user is a member of the specified SharePoint Group.
     */
    isInSPGroup(groupId: number): string;
    /**
     * Checks whether the value of the field is member of current site collection
     */
    isInSPWebGroups(): string;
    /**
     * Checks whether the value of the field is in current SPWeb users
     */
    isInSPWebAllUsers(): string;
    /**
     * Checks whether the value of the field is has rights to the site directly (not through a group)
     */
    isInSPWebUsers(): string;
    /**
     * Checks whether the value of the group field includes the current user.
     */
    isInCurrentUserGroups(): string;
    /**
     * If the specified field allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    includes(value: number): string;
    private memberOf;
}
export declare enum JoinType {
    LEFT = "LEFT",
    INNER = "INNER"
}
export interface IProjections {
    /**
     * Projected Name
     */
    Name: string;
    Type: FieldType;
    Field: string;
}
export declare class Join {
    type: JoinType;
    joinName: string;
    pkey: string;
    pJoinName: string;
    projections: IProjections[];
    /**
     *
     */
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
    Number = "Number",
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
    UserMulti = "UserMulti",
    Number = "Number"
}
export declare enum AggregationType {
    Count = "Count",
    Sum = "Sum"
}
export declare enum ViewScope {
    /**
     * Show only the files of a specific folder.
     */
    FilesOnly = "FilesOnly",
    /**
     * Show all files of all folders.
     */
    Recursive = "Recursive",
    /**
     * Show all files and all subfolders of all folders.
     */
    RecursiveAll = "RecursiveAll"
}
/**
 * Generates an And logical join CAML element
 */
export declare const and: (query1: string, query2: string) => string;
/**
 * Generates an Or logical join CAML element
 * @param query1
 * @param query2
 */
export declare const or: (query1: string, query2: string) => string;
/**
 * Generates a Where CAML element
 * @param query
 */
export declare const where: (query: string) => string;
/**
 * Generates a Join CAML element
 * @param type
 * @param joinName
 * @param pkey
 * @param pJoinName
 * @param projections
 */
export declare const join: (type: JoinType, joinName: string, pkey: string, pJoinName?: string, projections?: IProjections[]) => Join;
/**
 * Generates a JOINS CAML element
 * @param joins
 */
export declare const joins: (...joins: Join[]) => string;
/**
 * Removes line breaks from supplied query string
 * @param query
 */
export declare const sanitizeQuery: (query: string) => string;
/**
 * Generates a ViewFields CAML element
 * @param viewFields
 */
export declare const viewFields: (...viewFields: string[]) => string;
/**
 * Generates a Query CAML element
 * @param inputs
 */
export declare const query: (...inputs: string[]) => string;
/**
 * Generates a View CAML element
 * @param viewInputs
 */
export declare const view: (...viewInputs: string[]) => string;
/**
 * Generates a View CAML element
 * @param scope Specifies the recursive scope for a view of a document library.
 * @param viewInputs
 */
export declare const viewRecursive: (scope: ViewScope, ...viewInputs: string[]) => string;
export interface IOrderBy {
    Field: string;
    Desc?: boolean;
}
/**
 * Generates an OrderBy CAML element
 * @param orderBy
 */
export declare const orderBy: (...orderBy: IOrderBy[]) => string;
/**
 * Generate a GroupBy CAML element
 * @param field
 */
export declare const groupBy: (field: string) => string;
/**
 * Generates an Aggregations CAML element
 * @param aggregations
 */
export declare const aggregations: (...aggregations: {
    Name: string;
    Type: AggregationType;
}[]) => string;
/**
 * Generates a RowLimit CAML element
 * @param limit
 * @param paged
 */
export declare const rowLimit: (limit: number, paged?: boolean) => string;
/**
 * Gets an operator for a note field for comparison
 * @param internalName
 */
export declare const noteField: (internalName: string) => FieldOperator;
/**
 * Gets an operator for a choice field for comparison
 * @param internalName
 */
export declare const choiceField: (internalName: string) => FieldOperator;
/**
 * Gets an operator for a compute field for comparison
 */
export declare const computedField: (internalName: string) => FieldOperator;
/**
 * Gets an operator for a url field for comparison
 * @param internalName
 */
export declare const urlField: (internalName: string) => FieldOperator;
/**
 * Gets an operator for a number field for comparison
 * @param internalName
 */
export declare const numberField: (internalName: string) => FieldOperator;
/**
 * Gets an operator for a text field for comparison
 * @param internalName
 */
export declare const textField: (internalName: string) => FieldOperator;
/**
 * Gets an operator for a date field for comparison
 * @param internalName
 */
export declare const dateField: (internalName: string) => DateFieldOperator;
/**
 * Gets an operator for a boolean field for comparison
 * @param internalName
 */
export declare const booleanField: (internalName: string) => FieldOperator;
/**
 * Gets an operator for a datetime field for comparison
 * @param internalName
 */
export declare const dateTimeField: (internalName: string) => DateFieldOperator;
/**
 * Gets an operator for a lookup field for comparison
 */
export declare const lookupField: (internalName: string) => LookupFieldOperator;
/**
 * Gets an operator for a User field for comparison
 * @param internalName
 */
export declare const userField: (internalName: string) => UserFieldOperator;
export {};
