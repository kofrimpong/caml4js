export class Operator {

    protected internalName: string;
    protected type: ValueType

    constructor(type: ValueType, internalName: string) {
        this.internalName = internalName;
        this.type = type;
    }
}

export class FieldOperator extends Operator {

    constructor(type: ValueType, internalName: string) {
        super(type, internalName);

    }
    /** Checks whether the value of the field is True */
    isTrue() {
        return `<Eq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">1</Value>
          </Eq>`
    }
    /** Checks whether the value of the field is False */
    isFalse() {
        return `<Eq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">1</Value>
          </Eq>`
    }
    /** Checks whether the value of the field is equal to the specified value */
    equalTo(value: number | string) {
        return `<Eq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Eq>`
    }
    /** Checks whether the value of the field is not equal to the specified value */
    notEqualTo(value: number | string): string {
        return `<Neq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Neq>`
    }
    /** Checks whether the value of the field is greater than the specified value */
    greaterThan(value: number | string): string {
        return `<Gt>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Gt>`
    }
    /** Checks whether the value of the field is less than the specified value */
    lessThan(value: number | string): string {
        return `<Lt>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Lt>`
    }
    /** Checks whether the value of the field is greater than or equal to the specified value */
    greaterThanOrEqualTo(value: number | string): string {
        return `<Geq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Get>`
    }
    /** Checks whether the value of the field is less than or equal to the specified value */
    lessThanOrEqualTo(value: number | string): string {
        return `<Leq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Leq>`
    }
    /** Checks whether the value of the field was specified by user */
    isNull(): string {
        return `<IsNull>
            <FieldRef Name="${this.internalName}"/>
          </IsNull>`
    }
    /** Checks whether the value of the field was not specified by user */
    isNotNull(): string {
        return `<IsNotNull>
            <FieldRef Name="${this.internalName}"/>
          </IsNotNull>`
    }
    /**
     * Searches for a string at the start of a column that holds Text or Note field type values.
     * @param value 
     */
    beginsWith(value: string): string {
        return `<BeginsWith>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </BeginsWith>`
    }
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues 
     */
    in(...arrayOfValues: number[] | string[]) {
        let builder = `<In><FieldRef Name="${this.internalName}" /><Values>`;
        for (let i = 0; i < arrayOfValues.length; i++) {
            builder += `<Value Type="${this.type}">${arrayOfValues[i]}</Value>`
        }
        return builder += '</Values></In>'
    }
    /**
     * Searches for a string anywhere within a column that holds Text or Note field type values.
     * @param value 
     */
    contains(value: string): string {
        return `<Contains>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Contains>`
    }
    notIncludes(value: number | string): string {
        return `<NotIncludes>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </NotIncludes>`
    }
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that 
     * the value is included in the list item for the field.
     * @param value 
     */
    includes(value: number | string): string {
        return `<Includes>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Includes>`
    }
}

export class DateFieldOperator extends Operator {
    constructor(type: ValueType, internalName: string) {
        super(type, internalName);

    }
    /** Checks whether the value of the field is equal to the specified value */
    equalTo(value: Date) {
        let includeTime = ''
        if (this.type == ValueType.DateTime) {
            includeTime = ' IncludeTimeValue="TRUE"';
        }
        return `<Eq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${ValueType.DateTime}"${includeTime}>${value.toISOString()}</Value>
          </Eq>`
    }
    /** Checks whether the value of the field is not equal to the specified value */
    notEqualTo(value: Date): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ' IncludeTimeValue="TRUE"';
        }
        return `<Neq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}"${includeTime}>${value.toISOString()}</Value>
          </Neq>`
    }
    /** Checks whether the value of the field is greater than the specified value */
    greaterThan(value: Date): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ' IncludeTimeValue="TRUE"';
        }
        return `<Gt>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}"${includeTime}>${value.toISOString()}</Value>
          </Gt>`
    }
    /** Checks whether the value of the field is less than the specified value */
    lessThan(value: Date): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ' IncludeTimeValue="TRUE"';
        }
        return `<Lt>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}"${includeTime}>${value.toISOString()}</Value>
          </Lt>`
    }
    /** Checks whether the value of the field is greater than or equal to the specified value */
    greaterThanOrEqualTo(value: Date): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ' IncludeTimeValue="TRUE"';
        }
        return `<Geq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}"${includeTime}>${value.toISOString()}</Value>
          </Get>`
    }
    /** Checks whether the value of the field is less than or equal to the specified value */
    lessThanOrEqualTo(value: Date): string {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ' IncludeTimeValue="TRUE"';
        }
        return `<Leq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}"${includeTime}>${value.toISOString()}</Value>
          </Leq>`
    }
    /** Checks whether the value of the field was specified by user */
    isNull(): string {
        return `<IsNull>
            <FieldRef Name="${this.internalName}"/>
          </IsNull>`
    }
    /** Checks whether the value of the field was not specified by user */
    isNotNull(): string {
        return `<IsNotNull>
            <FieldRef Name="${this.internalName}"/>
          </IsNotNull>`
    }
    /**
    * Checks whether the value of the field is equal to one of the specified values
    * @param arrayOfValues 
    */
    in(...arrayOfValues: Date[]) {
        let includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = ' IncludeTimeValue="TRUE"';
        }
        let builder = `<In><FieldRef Name="${this.internalName}" /><Values>`;
        for (let i = 0; i < arrayOfValues.length; i++) {
            var value = arrayOfValues[i];
            builder += `<Value Type="${this.type}"${includeTime}>${value.toISOString()}</Value>`
        }
        return builder += '</Values></In>'
    }
}

export class LookupFieldOperator extends Operator {
    idEqualTo(value: number): string {
        return `<Eq>
            <FieldRef Name="${this.internalName}" LookupId="TRUE"/>
            <Value Type="${this.type}">${value}</Value>
          </Eq>`
    }
    valueEqualTo(value: string): string {
        return `<Eq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${this.type}">${value}</Value>
          </Eq>`
    }
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues 
     */
    idIn(...arrayOfValues: number[]) {
        let builder = `<In><FieldRef LookupId="True" Name="${this.internalName}"/><Values>`;
        for (let i = 0; i < arrayOfValues.length; i++) {
            builder += `<Value Type="${this.type}">${arrayOfValues[i]}</Value>`
        }
        return builder += '</Values></In>'
    }
    /**
     * If the specified field allows multiple values, specifies that 
     * the value is included in the list item for the field.
     * @param value 
     */
    includes(value: number) {
        return `<Eq>
            <FieldRef Name="${this.internalName}" LookupId="TRUE"/>
            <Value Type="${ValueType.LookupMulti}">${value}</Value>
          </Eq>`
    }
}

export class UserFieldOperator extends Operator {
    equalToCurrentUser(): string {
        return `<Eq>
            <FieldRef Name="${this.internalName}" LookupId="TRUE"/>
            <Value Type="${ValueType.Integer}"><UserID/></Value>
          </Eq>`
    }
    isInSPGroup(): string {
        return this.memberOf(ValueType.SPGroup)
    }
    isInSPWebGroups(): string {
        return this.memberOf(ValueType.SPWebGroups)
    }
    isInSPWebAllUsers(): string {
        return this.memberOf(ValueType.SPWebAllUsers)
    }
    isInSPWebUsers(): string {
        return this.memberOf(ValueType.SPWebUsers)
    }

    isInCurrentUserGroups(): string {
        return this.memberOf(ValueType.CurrentUserGroups)
    }
    /**
     * If the specified field allows multiple values, specifies that 
     * the value is included in the list item for the field.
     * @param value 
     */
    includes(value: number) {
        return `<Eq>
            <FieldRef Name="${this.internalName}"/>
            <Value Type="${ValueType.UserMulti}">${value}</Value>
          </Eq>`
    }
    private memberOf(type: ValueType) {
        return `<Membership Type="${type}">
            <FieldRef Name="${this.internalName}"/>
          </Membership>`
    }
}

export enum JoinType {
    LEFT = "LEFT",
    INNER = "INNER"
}
export interface Projections {
    /**
     * Projected Name
     */
    Name: string,
    Type: FieldType,
    Field: string
}
export class Join {
    type: JoinType
    joinName: string
    pkey: string
    pJoinName: string = ''
    projections: Projections[] = []
    /**
     *
     */
    constructor(init?: Partial<Join>) {
        Object.assign(this, init);
    }

    getJoinElement() {
        let listAlias = this.pJoinName ? `List="${this.pJoinName}"` : '';
        return `<Join Type="${this.type}" ListAlias="${this.joinName}">
            <Eq>
                <FieldRef Name="${this.pkey}" RefType="Id" ${listAlias}/>
                <FieldRef Name="ID" List="${this.joinName}"/>
            </Eq>
        </Join>`
    }
    getProjectionsElement() {
        let list = this.joinName;
        return this.projections.reduce((accum, current) => {
            return accum + `<Field Name="${current.Name}" Type="${current.Type}" List="${list}" ShowField="${current.Field}"/>`
        }, '')
    }
}

export enum FieldType {
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

enum ValueType {
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
}

export enum AggregationType {
    Count = "Count",
    Sum = "Sum"
}


export const and = (query1: string, query2: string) => {
    return "<And>" + query1 + query2 + "</And>"
}
export const or = (query1: string, query2: string) => {
    return "<Or>" + query1 + query2 + "</Or>"
}

export const where = (query: string) => {
    return "<Where>" + query + "</Where>"
}

export const join = (type: JoinType, joinName: string, pkey: string, pJoinName: string = '', projections: Projections[] = []) => {
    return new Join({ type: type, joinName: joinName, pkey: pkey, projections: projections, pJoinName: pJoinName })
}

export const joins = (...joins: Join[]) => {
    let joinsStr = joins.reduce((accu, current) => {
        return accu + current.getJoinElement()
    }, '');

    let projStr = joins.reduce((accu, current) => {
        return accu + current.getProjectionsElement()
    }, '');
    return `<Joins>${joinsStr}</Joins><ProjectedFields>${projStr}</ProjectedFields>`
}

export const viewFields = (...viewFields: string[]) => {
    let viewStr = viewFields.reduce((accu, current) => {
        return accu + `<FieldRef Name="${current}"/>`
    }, '');
    return `<ViewFields>${viewStr}</ViewFields>`
}

export const query = (...inputs: string[]) => {
    let viewStr = inputs.reduce((accu, current) => {
        return accu + current
    }, '');
    return `<Query>${viewStr}</Query>`
}

export const view = (...viewInputs: string[]) => {
    let viewStr = viewInputs.reduce((accu, current) => {
        return accu + current
    }, '');
    return `<View>${viewStr}</View>`
}

export const orderBy = (...orderBy: { Field: string, DSC?: boolean }[]) => {
    let viewStr = orderBy.reduce((accu, current) => {
        let asc = current.DSC ? ` Ascending="FALSE"` : "";
        return accu + `<FieldRef Name="${current.Field}"${asc}/>`
    }, '');
    return `<OrderBy>${viewStr}</OrderBy>`
}
export const groupBy = (field: string) => {
    return `<GroupBy><FieldRef Name="${field}"/></GroupBy>`
}
export const aggregation = (...aggregations: { Name: string, Type: AggregationType }[]) => {
    let viewStr = aggregations.reduce((accu, current) => {
        return accu + `<FieldRef Name="${current.Name}" Type="${current.Type}"/>`
    }, '');
    return `<Aggregations Value="On">${viewStr}</Aggregations>`
}
export const noteField = (internalName: string) => {
    return new FieldOperator(ValueType.Note, internalName)
}

export const choiceField = (internalName: string) => {
    return new FieldOperator(ValueType.Choice, internalName)
}

export const computedField = (internalName: string) => {
    return new FieldOperator(ValueType.Computed, internalName)
}

export const urlField = (internalName: string) => {
    return new FieldOperator(ValueType.URL, internalName)
}

export const numberField = (internalName: string) => {
    return new FieldOperator(ValueType.Number, internalName)
}

export const textField = (internalName: string) => {
    return new FieldOperator(ValueType.Text, internalName)
}

export const dateField = (internalName: string) => {
    return new DateFieldOperator(ValueType.Date, internalName)
}

export const booleanField = (internalName: string) => {
    return new FieldOperator(ValueType.Integer, internalName)
}

export const dateTimeField = (internalName: string) => {
    return new DateFieldOperator(ValueType.DateTime, internalName)
}

export const lookupField = (internalName: string) => {
    return new LookupFieldOperator(ValueType.Integer, internalName)
}

export const userField = (internalName: string) => {
    return new UserFieldOperator(ValueType.CurrentUserGroups, internalName)
}