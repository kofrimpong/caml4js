//@ts-ignore
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
/**
 * SharePoint field types
 */
export enum ValueType {
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
    Number = "Number",
    File = "File",
    Counter = "Counter",
    Guid = "Guid",
}

/**
 * A base class for Operators
 */
export class Operator {

    protected internalName: string;
    protected type: ValueType

    constructor(type: ValueType, internalName: string) {
        this.internalName = internalName;
        this.type = type;
    }

    /** Checks whether the value of the field was specified by user */
    isNull(): string {
        return `<IsNull><FieldRef Name='${this.internalName}'/></IsNull>`
    }
    /** Checks whether the value of the field was not specified by user */
    isNotNull(): string {
        return `<IsNotNull><FieldRef Name='${this.internalName}'/></IsNotNull>`
    }
}

/**
 * A general operator for comparison
 */
export class FieldOperator extends Operator {

    constructor(type: ValueType, internalName: string) {
        super(type, internalName);

    }
    /** Checks whether the value of the field is True */
    isTrue() {
        return `<Eq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>1</Value></Eq>`
    }
    /** Checks whether the value of the field is False */
    isFalse() {
        return `<Eq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>0</Value></Eq>`
    }
    /** Checks whether the value of the field is equal to the specified value */
    equalTo(value: number | string) {
        return `<Eq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Eq>`
    }
    /** Checks whether the value of the field is not equal to the specified value */
    notEqualTo(value: number | string): string {
        return `<Neq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Neq>`
    }
    /** Checks whether the value of the field is greater than the specified value */
    greaterThan(value: number | string): string {
        return `<Gt><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Gt>`
    }
    /** Checks whether the value of the field is less than the specified value */
    lessThan(value: number | string): string {
        return `<Lt><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Lt>`
    }
    /** Checks whether the value of the field is greater than or equal to the specified value */
    greaterThanOrEqualTo(value: number | string): string {
        return `<Geq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Geq>`
    }
    /** Checks whether the value of the field is less than or equal to the specified value */
    lessThanOrEqualTo(value: number | string): string {
        return `<Leq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Leq>`
    }
    /**
     * Searches for a string at the start of a column that holds Text or Note field type values.
     * @param value 
     */
    beginsWith(value: string): string {
        return `<BeginsWith><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></BeginsWith>`
    }
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues 
     */
    in(arrayOfValues: number[] | string[]) {
        let builder = `<In><FieldRef Name='${this.internalName}' /><Values>`;
        for (let i = 0; i < arrayOfValues.length; i++) {
            builder += `<Value Type='${this.type}'>${arrayOfValues[i]}</Value>`
        }
        return builder += '</Values></In>'
    }
    /**
     * Searches for a string anywhere within a column that holds Text or Note field type values.
     * @param value 
     */
    contains(value: string): string {
        return `<Contains><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Contains>`
    }
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that 
     * the value is not included in the list item for the field.
     * @param value 
     */
    notIncludes(value: number | string): string {
        return `<NotIncludes><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></NotIncludes>`
    }
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that 
     * the value is included in the list item for the field.
     * @param value 
     */
    includes(value: number | string): string {
        return `<Includes><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Includes>`
    }
}

/**
 * A date operator for comparison
 */
export class DateFieldOperator extends Operator {
    constructor(type: ValueType, internalName: string) {
        super(type, internalName);

    }
    /** Checks whether the value of the field is equal to the specified value in ISO format */
    equalTo(value: string) {
        let includeTime = ''
        if (this.type == ValueType.DateTime) {
            includeTime = ` IncludeTimeValue='TRUE'`;
        }
        return `<Eq><FieldRef Name='${this.internalName}'/><Value Type='${ValueType.DateTime}'${includeTime}>${value}</Value></Eq>`
    }
    /** Checks whether the value of the field is not equal to the specified value in ISO format*/
    notEqualTo(value: string): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ` IncludeTimeValue='TRUE'`;
        }
        return `<Neq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'${includeTime}>${value}</Value></Neq>`
    }
    /** Checks whether the value of the field is greater than the specified value in ISO format*/
    greaterThan(value: string): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ` IncludeTimeValue='TRUE'`;
        }
        return `<Gt><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'${includeTime}>${value}</Value></Gt>`
    }
    /** Checks whether the value of the field is less than the specified value in ISO format*/
    lessThan(value: string): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ` IncludeTimeValue='TRUE'`;
        }
        return `<Lt><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'${includeTime}>${value}</Value></Lt>`
    }
    /** Checks whether the value of the field is greater than or equal to the specified value in ISO format*/
    greaterThanOrEqualTo(value: string): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ` IncludeTimeValue='TRUE'`;
        }
        return `<Geq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'${includeTime}>${value}</Value></Geq>`
    }
    /** Checks whether the value of the field is less than or equal to the specified value in ISO format*/
    lessThanOrEqualTo(value: string): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ` IncludeTimeValue='TRUE'`;
        }
        return `<Leq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'${includeTime}>${value}</Value></Leq>`
    }
    /**
    * Checks whether the value of the field is equal to one of the specified values
    * @param arrayOfValues 
    */
    in(arrayOfValues: string[]) {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ` IncludeTimeValue='TRUE'`;
        }
        let builder = `<In><FieldRef Name='${this.internalName}' /><Values>`;
        for (let i = 0; i < arrayOfValues.length; i++) {
            builder += `<Value Type='${this.type}'${includeTime}>${arrayOfValues[i]}</Value>`
        }
        return builder += '</Values></In>'
    }
    isToday(): string {
        let includeTime = '';
        // if (this.type == ValueType.DateTime) {
        //     includeTime = ` IncludeTimeValue='TRUE'`;
        // }
        return `<Neq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'${includeTime}><Today /></Value></Neq>`
    }
}

/**
 * A lookup operator for comparison
 */
export class LookupFieldOperator extends Operator {
    /** Checks whether the value of the field is equal to the specified ID value */
    idEqualTo(value: number): string {
        return `<Eq><FieldRef Name='${this.internalName}' LookupId='TRUE'/><Value Type='Integer'>${value}</Value></Eq>`
    }
    /** Checks whether the value of the field is equal to the specified value */
    valueEqualTo(value: string): string {
        return `<Eq><FieldRef Name='${this.internalName}'/><Value Type='${this.type}'>${value}</Value></Eq>`
    }
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues 
     */
    idIn(arrayOfValues: number[]) {
        let builder = `<In><FieldRef LookupId='True' Name='${this.internalName}'/><Values>`;
        for (let i = 0; i < arrayOfValues.length; i++) {
            builder += `<Value Type='${this.type}'>${arrayOfValues[i]}</Value>`
        }
        return builder += '</Values></In>'
    }
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues 
     */
    valueIn(arrayOfValues: string[]) {
        let builder = `<In><FieldRef Name='${this.internalName}'/><Values>`;
        for (let i = 0; i < arrayOfValues.length; i++) {
            builder += `<Value Type='${this.type}'>${arrayOfValues[i]}</Value>`
        }
        return builder += '</Values></In>'
    }
    /**
     * If the specified field allows multiple values, specifies that 
     * the value is included in the list item for the field.
     * @param value 
     */
    includes(value: number) {
        return `<Eq><FieldRef Name='${this.internalName}' LookupId='TRUE'/><Value Type='${ValueType.LookupMulti}'>${value}</Value></Eq>`
    }
}

/**
 * A User/Group operator for comparison
 */
export class UserFieldOperator extends Operator {

    /** Checks whether the id of the person field is equal to the specified ID value */
    idEqualTo(id: number): string {
        return `<Eq><FieldRef Name='${this.internalName}' LookupId='TRUE'/><Value Type='${ValueType.Integer}'>${id}</Value></Eq>`
    }

    /** Checks whether the display name of the person field is equal to the specified value */
    displayNameEqualTo(value: string): string {
        return `<Eq><FieldRef Name='${this.internalName}'/><Value Type='${ValueType.Text}'>${value}</Value></Eq>`
    }
    /**
     * Checks whether the value of the person field is equal to current user
     */
    equalToCurrentUser(): string {
        return `<Eq><FieldRef Name='${this.internalName}' LookupId='TRUE'/><Value Type='${ValueType.Integer}'><UserID/></Value></Eq>`
    }
    
    /**
     * If the specified field allows multiple values, specifies that 
     * the value is included in the list item for the field.
     * @param value 
     */
    includes(value: number) {
        return `<Eq><FieldRef Name='${this.internalName}'/><Value Type='${ValueType.UserMulti}'>${value}</Value></Eq>`
    }
}

export class UserGroupFieldOperator extends UserFieldOperator {
    /**
     * Checks whether the membership of the group assigned to the field includes the current user.
     */
    isCurrentUserMember(): string {
        return this.memberOf(ValueType.CurrentUserGroups)
    }
    private memberOf(type: ValueType) {
        return `<Membership Type='${type}'><FieldRef Name='${this.internalName}'/></Membership>`
    }
}
/**
 * A dynamic WHERE element builder
 */
export class WhereBuilder {

    private queries: string[] = [];

    /**
     *
     */
    constructor() {
    }

    /**
     * Add query
     * @param query the query string
     */
    addQuery(query: string) {
        this.queries.push(query);
        return this;
    }

    private genQuery = (queryArr: string[]) => {
        let count = 0;
        let len = queryArr.length;
        let text = ''
        while (count < len) {
            if (count + 1 < len) {
                text += and(queryArr[count], queryArr[++count])
            }
            else {
                text += queryArr[count]
            }
            ++count
        }
        if (len > 2) {
            text = '<And>' + text + '</And>'
        }
        return text;
    }

    /**
     * Returns a WHERE string
     */
    toWhere() {
        return where(
            this.genQuery(this.queries)
        )
    }
    /**
     * Clone this query builder
     */
    clone() {
        const dynQuery = new WhereBuilder();
        dynQuery.queries = this.queries.slice(0, this.queries.length);
        return dynQuery;
    }
}
export enum JoinType {
    LEFT = "LEFT",
    INNER = "INNER"
}

/**
 * Tt is also necessary that the fields created in the ProjectedFields element be specified in the ViewFields element.
 * Only the following types of fields can be included in a ProjectedFields element:
    Calculated (treated as plain text)
    ContentTypeId
    Counter
    Currency
    DateTime
    Guid
    Integer
    Note (one-line only)
    Number
    Text
 */
export interface IProjections {
    /**
     * Projected Name
     */
    Name: string,
    Field: string
}
/**
 * A join element
 */
export class Join {
    type: JoinType
    /**
     * Specifies an alternate name for the foreign list. 
     * There is no need to explicitly map the alias onto the real name of the foreign list because joins are only allowed through a lookup field relation and the foreign list is specified in the Lookup field definition.
     */
    joinName: string
    lookupField: string
    /**
     * If the primary list of the join is not the parent list of the view, then it, too, is identified with a List attribute set to its alias.
     */
    pJoinName: string = ""
    projections: IProjections[] = []
    /**
     *
     */
    constructor(init?: Partial<Join>) {
        //@ts-ignore
        Object.assign(this, init);
    }

    getJoinElement() {
        let listAlias = this.pJoinName ? `List='${this.pJoinName}'` : '';
        return `<Join Type='${this.type}' ListAlias='${this.joinName}'><Eq><FieldRef Name='${this.lookupField}' RefType='Id' ${listAlias}/><FieldRef Name='ID' List='${this.joinName}'/></Eq></Join>`
    }
    getProjectionsElement() {
        let list = this.joinName;
        return this.projections.reduce((accum, current) => {
            return accum + `<Field Name='${current.Name}' Type='Lookup' List='${list}' ShowField='${current.Field}'/>`
        }, '')
    }
}

export enum AggregationType {
    Count = "Count",
    Sum = "Sum"
}

export enum ViewScope {
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
export const and = (query1: string, query2: string) => {
    return "<And>" + query1 + query2 + "</And>"
}
/**
 * Generates an Or logical join CAML element
 * @param query1 
 * @param query2 
 */
export const or = (query1: string, query2: string) => {
    return "<Or>" + query1 + query2 + "</Or>"
}

/**
 * Generates a Where CAML element
 * @param query 
 */
export const where = (query: string) => {
    return "<Where>" + query + "</Where>"
}

/**
 * Generates a Join CAML element
 * @param type 
 * @param joinName Specifies an alternate name for the foreign list. There is no need to explicitly map the alias onto the real name of the foreign list because joins are only allowed through a lookup field relation and the foreign list is specified in the Lookup field definition.
 * @param lookupField 
 * @param pJoinName If the primary list of the join is not the parent list of the view, then it, too, is identified with a List attribute set to its alias.
 * @param projections 
 */
export const join = (type: JoinType, joinName: string, lookupField: string, pJoinName = '', projections: IProjections[] = []) => {
    return new Join({ type, joinName, lookupField, projections, pJoinName })
}

/**
 * Generates a JOINS CAML element
 * @param joins 
 */
export const joins = (...joins: Join[]) => {
    let joinsStr = joins.reduce((accu, current) => {
        return accu + current.getJoinElement()
    }, "");

    let projStr = joins.reduce((accu, current) => {
        return accu + current.getProjectionsElement()
    }, "");
    return `<Joins>${joinsStr}</Joins><ProjectedFields>${projStr}</ProjectedFields>`
}

/**
 * Removes line breaks from supplied query string
 * @param query 
 */
export const sanitizeQuery = (query: string) => {
    return query.replace(/>\s+</g, '><');
}

/**
 * Generates a ViewFields CAML element
 * @param viewFields 
 */
export const viewFields = (...viewFields: string[]) => {
    let viewStr = viewFields.reduce((accu, current) => {
        return accu + `<FieldRef Name='${current}'/>`
    }, "");
    return `<ViewFields>${viewStr}</ViewFields>`
}

/**
 * Generates a Query CAML element
 * @param inputs 
 */
export const query = (...inputs: string[]) => {
    return `<Query>${inputs.join(" ")}</Query>`
}

/**
 * Generates a View CAML element
 * @param viewInputs 
 */
export const view = (...viewInputs: string[]) => {
    return `<View>${viewInputs.join(" ")}</View>`
}

/**
 * Generates a View CAML element
 * @param scope Specifies the recursive scope for a view of a document library.
 * @param viewInputs 
 */
export const viewRecursive = (scope: ViewScope, ...viewInputs: string[]) => {
    return `<View Scope='${scope}'>${viewInputs.join(" ")}</View>`
}

export interface IOrderBy {
    Field: string
    Desc?: boolean
}

/**
 * Generates an OrderBy CAML element
 * @param orderBy 
 */
export const orderBy = (...orderBy: IOrderBy[]) => {
    let viewStr = orderBy.reduce((accu, current) => {
        if (current.Field) {
            let asc = current.Desc ? ` Ascending='FALSE'` : '';
            return accu + `<FieldRef Name='${current.Field}'${asc}/>`
        }
        return accu;
    }, '');
    return `<OrderBy>${viewStr}</OrderBy>`
}
/**
 * Generate a GroupBy CAML element
 * @param field 
 */
export const groupBy = (field: string) => {
    if (!field) {
        return ''
    }
    return `<GroupBy><FieldRef Name='${field}'/></GroupBy>`
}
/**
 * Generates an Aggregations CAML element
 * @param aggregations 
 */
export const aggregations = (...aggregations: { Name: string, Type: AggregationType }[]) => {
    let viewStr = aggregations.reduce((accu, current) => {
        if (current.Name && current.Type) {
            return accu + `<FieldRef Name='${current.Name}' Type='${current.Type}'/>`
        }
        return accu;
    }, '');
    return `<Aggregations Value='On'>${viewStr}</Aggregations>`
}
/**
 * Generates a RowLimit CAML element
 * @param limit 
 * @param paged 
 */
export const rowLimit = (limit: number, paged: boolean = false) => {
    let pageStr = paged ? ` Paged='TRUE'` : '';
    return `<RowLimit${pageStr}>${limit}</RowLimit>`
}
/**
 * Gets an operator for an ID field for comparison 
 */
export const idField = () => {
    return new FieldOperator(ValueType.Counter, 'ID')
}
/**
 * Gets an operator for a note field for comparison
 * @param internalName 
 */
export const noteField = (internalName: string) => {
    return new FieldOperator(ValueType.Note, internalName)
}
/**
 * Gets an operator for a choice field for comparison
 * @param internalName 
 */
export const choiceField = (internalName: string) => {
    return new FieldOperator(ValueType.Choice, internalName)
}
/**
 * Gets an operator for a compute field for comparison
 */
export const computedField = (internalName: string) => {
    return new FieldOperator(ValueType.Computed, internalName)
}
/**
 * Gets an operator for a url field for comparison
 * @param internalName 
 */
export const urlField = (internalName: string) => {
    return new FieldOperator(ValueType.URL, internalName)
}
/**
 * Gets an operator for a number field for comparison
 * @param internalName 
 */
export const numberField = (internalName: string) => {
    return new FieldOperator(ValueType.Number, internalName)
}
/**
 * Gets an operator for a text field for comparison
 * @param internalName 
 */
export const textField = (internalName: string) => {
    return new FieldOperator(ValueType.Text, internalName)
}
/**
 * Gets an operator for a date field for comparison
 * @param internalName 
 */
export const dateField = (internalName: string) => {
    return new DateFieldOperator(ValueType.Date, internalName)
}
/**
 * Gets an operator for a boolean field for comparison
 * @param internalName 
 */
export const booleanField = (internalName: string) => {
    return new FieldOperator(ValueType.Integer, internalName)
}
/**
 * Gets an operator for a datetime field for comparison
 * @param internalName 
 */
export const dateTimeField = (internalName: string) => {
    return new DateFieldOperator(ValueType.DateTime, internalName)
}
/**
 * Gets an operator for a lookup field for comparison
 */
export const lookupField = (internalName: string) => {
    return new LookupFieldOperator(ValueType.LookUp, internalName)
}
/**
 * Gets an operator for a User field for comparison
 * @param internalName 
 */
export const userField = (internalName: string) => {
    return new UserFieldOperator(ValueType.CurrentUserGroups, internalName)
}

/**
 * Gets an operator for a UserOrGroup field for comparison
 * 
 * @param internalName - The internal name of the field.
 * @returns A new instance of UserGroupFieldOperator.
 */
export const userOrGroupField = (internalName: string) => {
    return new UserGroupFieldOperator(ValueType.CurrentUserGroups, internalName)
}

export const guidField = (internalName: string) => {
    return new FieldOperator(ValueType.Guid, internalName)
}

/**
 * Gets an operator for a document library file name field for comparison
 */
export const documentNameField = () => {
    return new FieldOperator(ValueType.File, 'FileLeafRef')
}

/**
 * Gets a dynamic WHERE element builder
 */
export const whereBuilder = () => {
    return new WhereBuilder()
}

/**
 * Encode textual data that should not be parsed by an XML parser as CDATA.
 * @param s 
 * @returns 
 */
export const encodeAsCDATA = (s: string) => {
    if (/[<>&]+/.test(s)) {
        let sb = '';
        for (let i = 0; i < s.length; i++) {
            const ch = s.charAt(i);
            if (/^[<>&]+$/.test(ch)) {
                sb += `&#${ch.charCodeAt(0)};`;
            }
            else {
                sb += ch;
            }
        }
        return sb;
    }
    return s;
}
// export const encodeAsCDATA = (s: string) => {
//     //Simpple CDATA construction will not work for string end with ']' .
//     //https://en.wikipedia.org/wiki/CDATA#Nesting
//     //return "<![CDATA[" + s + "]]>";
//     let sb = '';
//     for (let i = 0; i < s.length; i++) {
//         const ch = s.charAt(i);
//         if (/^[a-zA-Z0-9\s]+$/.test(ch)) {
//             sb += ch;
//         }
//         else {
//             sb += `&#${ch.charCodeAt(0)};`;
//         }
//     }
//     return sb;
// }