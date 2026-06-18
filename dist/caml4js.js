"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeAsCDATA = exports.whereBuilder = exports.documentNameField = exports.guidField = exports.userOrGroupField = exports.userField = exports.lookupField = exports.dateTimeField = exports.booleanField = exports.dateField = exports.textField = exports.numberField = exports.urlField = exports.computedField = exports.choiceField = exports.noteField = exports.idField = exports.rowLimit = exports.aggregations = exports.groupBy = exports.orderBy = exports.viewRecursive = exports.view = exports.query = exports.viewFields = exports.sanitizeQuery = exports.joins = exports.join = exports.where = exports.or = exports.and = exports.ViewScope = exports.AggregationType = exports.Join = exports.JoinType = exports.WhereBuilder = exports.UserGroupFieldOperator = exports.UserFieldOperator = exports.LookupFieldOperator = exports.DateFieldOperator = exports.FieldOperator = exports.Operator = exports.ValueType = void 0;
//@ts-ignore
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
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
var ValueType;
(function (ValueType) {
    ValueType["Integer"] = "Integer";
    ValueType["Text"] = "Text";
    ValueType["Date"] = "Date";
    ValueType["Note"] = "Note";
    ValueType["SPWebAllUsers"] = "SPWeb.AllUsers";
    ValueType["SPGroup"] = "SPGroup";
    ValueType["SPWebGroups"] = "SPWeb.Groups";
    ValueType["CurrentUserGroups"] = "CurrentUserGroups";
    ValueType["SPWebUsers"] = "SPWeb.Users";
    ValueType["LookUp"] = "Lookup";
    ValueType["DateTime"] = "DateTime";
    ValueType["Choice"] = "Choice";
    ValueType["Computed"] = "Computed";
    ValueType["URL"] = "URL";
    ValueType["LookupMulti"] = "LookupMulti";
    ValueType["UserMulti"] = "UserMulti";
    ValueType["Number"] = "Number";
    ValueType["File"] = "File";
    ValueType["Counter"] = "Counter";
    ValueType["Guid"] = "Guid";
})(ValueType || (exports.ValueType = ValueType = {}));
/**
 * A base class for Operators
 */
var Operator = /** @class */ (function () {
    function Operator(type, internalName) {
        this.internalName = internalName;
        this.type = type;
    }
    /** Checks whether the value of the field was specified by user */
    Operator.prototype.isNull = function () {
        return "<IsNull><FieldRef Name='".concat(this.internalName, "'/></IsNull>");
    };
    /** Checks whether the value of the field was not specified by user */
    Operator.prototype.isNotNull = function () {
        return "<IsNotNull><FieldRef Name='".concat(this.internalName, "'/></IsNotNull>");
    };
    return Operator;
}());
exports.Operator = Operator;
/**
 * A general operator for comparison
 */
var FieldOperator = /** @class */ (function (_super) {
    __extends(FieldOperator, _super);
    function FieldOperator(type, internalName) {
        return _super.call(this, type, internalName) || this;
    }
    /** Checks whether the value of the field is True */
    FieldOperator.prototype.isTrue = function () {
        return "<Eq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>1</Value></Eq>");
    };
    /** Checks whether the value of the field is False */
    FieldOperator.prototype.isFalse = function () {
        return "<Eq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>0</Value></Eq>");
    };
    /** Checks whether the value of the field is equal to the specified value */
    FieldOperator.prototype.equalTo = function (value) {
        return "<Eq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Eq>");
    };
    /** Checks whether the value of the field is not equal to the specified value */
    FieldOperator.prototype.notEqualTo = function (value) {
        return "<Neq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Neq>");
    };
    /** Checks whether the value of the field is greater than the specified value */
    FieldOperator.prototype.greaterThan = function (value) {
        return "<Gt><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Gt>");
    };
    /** Checks whether the value of the field is less than the specified value */
    FieldOperator.prototype.lessThan = function (value) {
        return "<Lt><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Lt>");
    };
    /** Checks whether the value of the field is greater than or equal to the specified value */
    FieldOperator.prototype.greaterThanOrEqualTo = function (value) {
        return "<Geq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Geq>");
    };
    /** Checks whether the value of the field is less than or equal to the specified value */
    FieldOperator.prototype.lessThanOrEqualTo = function (value) {
        return "<Leq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Leq>");
    };
    /**
     * Searches for a string at the start of a column that holds Text or Note field type values.
     * @param value
     */
    FieldOperator.prototype.beginsWith = function (value) {
        return "<BeginsWith><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></BeginsWith>");
    };
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues
     */
    FieldOperator.prototype.in = function (arrayOfValues) {
        var builder = "<In><FieldRef Name='".concat(this.internalName, "' /><Values>");
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type='".concat(this.type, "'>").concat(arrayOfValues[i], "</Value>");
        }
        return builder += '</Values></In>';
    };
    /**
     * Searches for a string anywhere within a column that holds Text or Note field type values.
     * @param value
     */
    FieldOperator.prototype.contains = function (value) {
        return "<Contains><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Contains>");
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is not included in the list item for the field.
     * @param value
     */
    FieldOperator.prototype.notIncludes = function (value) {
        return "<NotIncludes><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></NotIncludes>");
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    FieldOperator.prototype.includes = function (value) {
        return "<Includes><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Includes>");
    };
    return FieldOperator;
}(Operator));
exports.FieldOperator = FieldOperator;
/**
 * A date operator for comparison
 */
var DateFieldOperator = /** @class */ (function (_super) {
    __extends(DateFieldOperator, _super);
    function DateFieldOperator(type, internalName) {
        return _super.call(this, type, internalName) || this;
    }
    /** Checks whether the value of the field is equal to the specified value in ISO format */
    DateFieldOperator.prototype.equalTo = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Eq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(ValueType.DateTime, "'").concat(includeTime, ">").concat(value, "</Value></Eq>");
    };
    /** Checks whether the value of the field is not equal to the specified value in ISO format*/
    DateFieldOperator.prototype.notEqualTo = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Neq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'").concat(includeTime, ">").concat(value, "</Value></Neq>");
    };
    /** Checks whether the value of the field is greater than the specified value in ISO format*/
    DateFieldOperator.prototype.greaterThan = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Gt><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'").concat(includeTime, ">").concat(value, "</Value></Gt>");
    };
    /** Checks whether the value of the field is less than the specified value in ISO format*/
    DateFieldOperator.prototype.lessThan = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Lt><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'").concat(includeTime, ">").concat(value, "</Value></Lt>");
    };
    /** Checks whether the value of the field is greater than or equal to the specified value in ISO format*/
    DateFieldOperator.prototype.greaterThanOrEqualTo = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Geq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'").concat(includeTime, ">").concat(value, "</Value></Geq>");
    };
    /** Checks whether the value of the field is less than or equal to the specified value in ISO format*/
    DateFieldOperator.prototype.lessThanOrEqualTo = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Leq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'").concat(includeTime, ">").concat(value, "</Value></Leq>");
    };
    /**
    * Checks whether the value of the field is equal to one of the specified values
    * @param arrayOfValues
    */
    DateFieldOperator.prototype.in = function (arrayOfValues) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        var builder = "<In><FieldRef Name='".concat(this.internalName, "' /><Values>");
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type='".concat(this.type, "'").concat(includeTime, ">").concat(arrayOfValues[i], "</Value>");
        }
        return builder += '</Values></In>';
    };
    DateFieldOperator.prototype.isToday = function () {
        var includeTime = '';
        // if (this.type == ValueType.DateTime) {
        //     includeTime = ` IncludeTimeValue='TRUE'`;
        // }
        return "<Neq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'").concat(includeTime, "><Today /></Value></Neq>");
    };
    return DateFieldOperator;
}(Operator));
exports.DateFieldOperator = DateFieldOperator;
/**
 * A lookup operator for comparison
 */
var LookupFieldOperator = /** @class */ (function (_super) {
    __extends(LookupFieldOperator, _super);
    function LookupFieldOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Checks whether the value of the field is equal to the specified ID value */
    LookupFieldOperator.prototype.idEqualTo = function (value) {
        return "<Eq><FieldRef Name='".concat(this.internalName, "' LookupId='TRUE'/><Value Type='").concat(ValueType.Integer, "'>").concat(value, "</Value></Eq>");
    };
    /** Checks whether the value of the field is equal to the specified value */
    LookupFieldOperator.prototype.valueEqualTo = function (value) {
        return "<Eq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Eq>");
    };
    /**
     * Checks whether the value of the field is equal to one of the specified valuidses
     * @param arrayOfIds
     */
    LookupFieldOperator.prototype.idIn = function (arrayOfIds) {
        var builder = "<In><FieldRef LookupId='True' Name='".concat(this.internalName, "'/><Values>");
        for (var i = 0; i < arrayOfIds.length; i++) {
            builder += "<Value Type='".concat(ValueType.Integer, "'>").concat(arrayOfIds[i], "</Value>");
        }
        return builder += '</Values></In>';
    };
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues
     */
    LookupFieldOperator.prototype.valueIn = function (arrayOfValues) {
        var builder = "<In><FieldRef Name='".concat(this.internalName, "'/><Values>");
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type='".concat(this.type, "'>").concat(arrayOfValues[i], "</Value>");
        }
        return builder += '</Values></In>';
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is not included in the list item for the field.
     * @param value
     */
    LookupFieldOperator.prototype.notIncludes = function (value) {
        return "<NotIncludes><FieldRef Name='".concat(this.internalName, "' LookupId='TRUE'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></NotIncludes>");
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    LookupFieldOperator.prototype.includes = function (value) {
        return "<Includes><FieldRef Name='".concat(this.internalName, "' LookupId='TRUE'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Includes>");
    };
    return LookupFieldOperator;
}(Operator));
exports.LookupFieldOperator = LookupFieldOperator;
/**
 * A User/Group operator for comparison
 */
var UserFieldOperator = /** @class */ (function (_super) {
    __extends(UserFieldOperator, _super);
    function UserFieldOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Checks whether the id of the person field is equal to the specified ID value */
    UserFieldOperator.prototype.idEqualTo = function (id) {
        return "<Eq><FieldRef Name='".concat(this.internalName, "' LookupId='TRUE'/><Value Type='").concat(ValueType.Integer, "'>").concat(id, "</Value></Eq>");
    };
    /** Checks whether the display name of the person field is equal to the specified value */
    UserFieldOperator.prototype.displayNameEqualTo = function (value) {
        return "<Eq><FieldRef Name='".concat(this.internalName, "'/><Value Type='").concat(ValueType.Text, "'>").concat(value, "</Value></Eq>");
    };
    /**
     * Checks whether the value of the person field is equal to current user
     */
    UserFieldOperator.prototype.equalToCurrentUser = function () {
        return "<Eq><FieldRef Name='".concat(this.internalName, "' LookupId='TRUE'/><Value Type='").concat(ValueType.Integer, "'><UserID/></Value></Eq>");
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is not included in the list item for the field.
     * @param value
     */
    UserFieldOperator.prototype.notIncludes = function (value) {
        return "<NotIncludes><FieldRef Name='".concat(this.internalName, "' LookupId='TRUE'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></NotIncludes>");
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    UserFieldOperator.prototype.includes = function (value) {
        return "<Includes><FieldRef Name='".concat(this.internalName, "' LookupId='TRUE'/><Value Type='").concat(this.type, "'>").concat(value, "</Value></Includes>");
    };
    return UserFieldOperator;
}(Operator));
exports.UserFieldOperator = UserFieldOperator;
var UserGroupFieldOperator = /** @class */ (function (_super) {
    __extends(UserGroupFieldOperator, _super);
    function UserGroupFieldOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks whether the membership of the group assigned to the field includes the current user.
     */
    UserGroupFieldOperator.prototype.isCurrentUserMember = function () {
        return this.memberOf(ValueType.CurrentUserGroups);
    };
    UserGroupFieldOperator.prototype.memberOf = function (type) {
        return "<Membership Type='".concat(type, "'><FieldRef Name='").concat(this.internalName, "'/></Membership>");
    };
    return UserGroupFieldOperator;
}(UserFieldOperator));
exports.UserGroupFieldOperator = UserGroupFieldOperator;
/**
 * A dynamic WHERE element builder
 */
var WhereBuilder = /** @class */ (function () {
    /**
     *
     */
    function WhereBuilder() {
        this.queries = [];
        this.genQuery = function (queryArr) {
            var count = 0;
            var len = queryArr.length;
            var text = '';
            while (count < len) {
                if (count + 1 < len) {
                    text += (0, exports.and)(queryArr[count], queryArr[++count]);
                }
                else {
                    text += queryArr[count];
                }
                ++count;
            }
            if (len > 2) {
                text = '<And>' + text + '</And>';
            }
            return text;
        };
    }
    /**
     * Add query
     * @param query the query string
     */
    WhereBuilder.prototype.addQuery = function (query) {
        this.queries.push(query);
        return this;
    };
    /**
     * Returns a WHERE string
     */
    WhereBuilder.prototype.toWhere = function () {
        return (0, exports.where)(this.genQuery(this.queries));
    };
    /**
     * Clone this query builder
     */
    WhereBuilder.prototype.clone = function () {
        var dynQuery = new WhereBuilder();
        dynQuery.queries = this.queries.slice(0, this.queries.length);
        return dynQuery;
    };
    return WhereBuilder;
}());
exports.WhereBuilder = WhereBuilder;
var JoinType;
(function (JoinType) {
    JoinType["LEFT"] = "LEFT";
    JoinType["INNER"] = "INNER";
})(JoinType || (exports.JoinType = JoinType = {}));
/**
 * A join element
 */
var Join = /** @class */ (function () {
    /**
     *
     */
    function Join(init) {
        /**
         * If the primary list of the join is not the parent list of the view, then it, too, is identified with a List attribute set to its alias.
         */
        this.pJoinName = "";
        this.projections = [];
        //@ts-ignore
        Object.assign(this, init);
    }
    Join.prototype.getJoinElement = function () {
        var listAlias = this.pJoinName ? "List='".concat(this.pJoinName, "'") : '';
        return "<Join Type='".concat(this.type, "' ListAlias='").concat(this.joinName, "'><Eq><FieldRef Name='").concat(this.lookupField, "' RefType='Id' ").concat(listAlias, "/><FieldRef Name='ID' List='").concat(this.joinName, "'/></Eq></Join>");
    };
    Join.prototype.getProjectionsElement = function () {
        var list = this.joinName;
        return this.projections.reduce(function (accum, current) {
            return accum + "<Field Name='".concat(current.Name, "' Type='Lookup' List='").concat(list, "' ShowField='").concat(current.Field, "'/>");
        }, '');
    };
    return Join;
}());
exports.Join = Join;
var AggregationType;
(function (AggregationType) {
    AggregationType["Count"] = "Count";
    AggregationType["Sum"] = "Sum";
})(AggregationType || (exports.AggregationType = AggregationType = {}));
var ViewScope;
(function (ViewScope) {
    /**
     * Show only the files of a specific folder.
     */
    ViewScope["FilesOnly"] = "FilesOnly";
    /**
     * Show all files of all folders.
     */
    ViewScope["Recursive"] = "Recursive";
    /**
     * Show all files and all subfolders of all folders.
     */
    ViewScope["RecursiveAll"] = "RecursiveAll";
})(ViewScope || (exports.ViewScope = ViewScope = {}));
/**
 * Generates an And logical join CAML element
 */
var and = function (query1, query2) {
    return "<And>" + query1 + query2 + "</And>";
};
exports.and = and;
/**
 * Generates an Or logical join CAML element
 * @param query1
 * @param query2
 */
var or = function (query1, query2) {
    return "<Or>" + query1 + query2 + "</Or>";
};
exports.or = or;
/**
 * Generates a Where CAML element
 * @param query
 */
var where = function (query) {
    return "<Where>" + query + "</Where>";
};
exports.where = where;
/**
 * Generates a Join CAML element
 * @param type
 * @param joinName Specifies an alternate name for the foreign list. There is no need to explicitly map the alias onto the real name of the foreign list because joins are only allowed through a lookup field relation and the foreign list is specified in the Lookup field definition.
 * @param lookupField
 * @param pJoinName If the primary list of the join is not the parent list of the view, then it, too, is identified with a List attribute set to its alias.
 * @param projections
 */
var join = function (type, joinName, lookupField, pJoinName, projections) {
    if (pJoinName === void 0) { pJoinName = ''; }
    if (projections === void 0) { projections = []; }
    return new Join({ type: type, joinName: joinName, lookupField: lookupField, projections: projections, pJoinName: pJoinName });
};
exports.join = join;
/**
 * Generates a JOINS CAML element
 * @param joins
 */
var joins = function () {
    var joins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        joins[_i] = arguments[_i];
    }
    var joinsStr = joins.reduce(function (accu, current) {
        return accu + current.getJoinElement();
    }, "");
    var projStr = joins.reduce(function (accu, current) {
        return accu + current.getProjectionsElement();
    }, "");
    return "<Joins>".concat(joinsStr, "</Joins><ProjectedFields>").concat(projStr, "</ProjectedFields>");
};
exports.joins = joins;
/**
 * Removes line breaks from supplied query string
 * @param query
 */
var sanitizeQuery = function (query) {
    return query.replace(/>\s+</g, '><');
};
exports.sanitizeQuery = sanitizeQuery;
/**
 * Generates a ViewFields CAML element
 * @param viewFields
 */
var viewFields = function () {
    var viewFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        viewFields[_i] = arguments[_i];
    }
    var viewStr = viewFields.reduce(function (accu, current) {
        return accu + "<FieldRef Name='".concat(current, "'/>");
    }, "");
    return "<ViewFields>".concat(viewStr, "</ViewFields>");
};
exports.viewFields = viewFields;
/**
 * Generates a Query CAML element
 * @param inputs
 */
var query = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return "<Query>".concat(inputs.join(" "), "</Query>");
};
exports.query = query;
/**
 * Generates a View CAML element
 * @param viewInputs
 */
var view = function () {
    var viewInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        viewInputs[_i] = arguments[_i];
    }
    return "<View>".concat(viewInputs.join(" "), "</View>");
};
exports.view = view;
/**
 * Generates a View CAML element
 * @param scope Specifies the recursive scope for a view of a document library.
 * @param viewInputs
 */
var viewRecursive = function (scope) {
    var viewInputs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        viewInputs[_i - 1] = arguments[_i];
    }
    return "<View Scope='".concat(scope, "'>").concat(viewInputs.join(" "), "</View>");
};
exports.viewRecursive = viewRecursive;
/**
 * Generates an OrderBy CAML element
 * @param orderBy the fields to order by
 */
var orderBy = function () {
    var orderBy = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        orderBy[_i] = arguments[_i];
    }
    var viewStr = orderBy.reduce(function (accu, current) {
        if (current.Field) {
            var asc = current.Desc ? " Ascending='FALSE'" : '';
            return accu + "<FieldRef Name='".concat(current.Field, "'").concat(asc, "/>");
        }
        return accu;
    }, '');
    return "<OrderBy>".concat(viewStr, "</OrderBy>");
};
exports.orderBy = orderBy;
/**
 * Generate a GroupBy CAML element
 * @param field the field to group by
 */
var groupBy = function (field) {
    if (!field) {
        return '';
    }
    return "<GroupBy><FieldRef Name='".concat(field, "'/></GroupBy>");
};
exports.groupBy = groupBy;
/**
 * Generates an Aggregations CAML element
 * @param aggregations
 */
var aggregations = function () {
    var aggregations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        aggregations[_i] = arguments[_i];
    }
    var viewStr = aggregations.reduce(function (accu, current) {
        if (current.Name && current.Type) {
            return accu + "<FieldRef Name='".concat(current.Name, "' Type='").concat(current.Type, "'/>");
        }
        return accu;
    }, '');
    return "<Aggregations Value='On'>".concat(viewStr, "</Aggregations>");
};
exports.aggregations = aggregations;
/**
 * Generates a RowLimit CAML element
 * @param limit  The maximum number of items to return.
 * @param paged  If TRUE, the query is paged. If FALSE, the query is not paged. The default is TRUE.
 */
var rowLimit = function (limit, paged) {
    if (paged === void 0) { paged = true; }
    var pageStr = paged ? " Paged='TRUE'" : '';
    return "<RowLimit".concat(pageStr, ">").concat(limit, "</RowLimit>");
};
exports.rowLimit = rowLimit;
/**
 * Gets an operator for an ID field for comparison
 */
var idField = function () {
    return new FieldOperator(ValueType.Counter, 'ID');
};
exports.idField = idField;
/**
 * Gets an operator for a note field for comparison
 * @param internalName the internal name of the field
 */
var noteField = function (internalName) {
    return new FieldOperator(ValueType.Note, internalName);
};
exports.noteField = noteField;
/**
 * Gets an operator for a choice field for comparison
 * @param internalName the internal name of the field
 */
var choiceField = function (internalName) {
    return new FieldOperator(ValueType.Choice, internalName);
};
exports.choiceField = choiceField;
/**
 * Gets an operator for a compute field for comparison
 * @param internalName the internal name of the field
 */
var computedField = function (internalName) {
    return new FieldOperator(ValueType.Computed, internalName);
};
exports.computedField = computedField;
/**
 * Gets an operator for a url field for comparison
 * @param internalName the internal name of the field
 */
var urlField = function (internalName) {
    return new FieldOperator(ValueType.URL, internalName);
};
exports.urlField = urlField;
/**
 * Gets an operator for a number field for comparison
 * @param internalName the internal name of the field
 */
var numberField = function (internalName) {
    return new FieldOperator(ValueType.Number, internalName);
};
exports.numberField = numberField;
/**
 * Gets an operator for a text field for comparison
 * @param internalName the internal name of the field
 */
var textField = function (internalName) {
    return new FieldOperator(ValueType.Text, internalName);
};
exports.textField = textField;
/**
 * Gets an operator for a date field for comparison
 * @param internalName the internal name of the field
 */
var dateField = function (internalName) {
    return new DateFieldOperator(ValueType.Date, internalName);
};
exports.dateField = dateField;
/**
 * Gets an operator for a boolean field for comparison
 * @param internalName the internal name of the field
 */
var booleanField = function (internalName) {
    return new FieldOperator(ValueType.Integer, internalName);
};
exports.booleanField = booleanField;
/**
 * Gets an operator for a datetime field for comparison
 * @param internalName the internal name of the field
 */
var dateTimeField = function (internalName) {
    return new DateFieldOperator(ValueType.DateTime, internalName);
};
exports.dateTimeField = dateTimeField;
/**
 * Gets an operator for a lookup field for comparison
 * @param internalName the internal name of the field
 */
var lookupField = function (internalName) {
    return new LookupFieldOperator(ValueType.LookUp, internalName);
};
exports.lookupField = lookupField;
/**
 * Gets an operator for a User field for comparison
 * @param internalName the internal name of the field
 */
var userField = function (internalName) {
    return new UserFieldOperator(ValueType.CurrentUserGroups, internalName);
};
exports.userField = userField;
/**
 * Gets an operator for a UserOrGroup field for comparison
 *
 * @param internalName - The internal name of the field.
 * @returns A new instance of UserGroupFieldOperator.
 */
var userOrGroupField = function (internalName) {
    return new UserGroupFieldOperator(ValueType.CurrentUserGroups, internalName);
};
exports.userOrGroupField = userOrGroupField;
/**
 * Gets an operator for a User field for comparison
 * @param internalName the internal name of the field
 */
var guidField = function (internalName) {
    return new FieldOperator(ValueType.Guid, internalName);
};
exports.guidField = guidField;
/**
 * Gets an operator for a document library file name field for comparison
 */
var documentNameField = function () {
    return new FieldOperator(ValueType.File, 'FileLeafRef');
};
exports.documentNameField = documentNameField;
/**
 * Gets a dynamic WHERE element builder
 */
var whereBuilder = function () {
    return new WhereBuilder();
};
exports.whereBuilder = whereBuilder;
/**
 * Encode textual data that should not be parsed by an XML parser as CDATA.
 * @param s
 * @returns
 */
var encodeAsCDATA = function (s) {
    if (/[<>&]+/.test(s)) {
        var sb = '';
        for (var i = 0; i < s.length; i++) {
            var ch = s.charAt(i);
            if (/^[<>&]+$/.test(ch)) {
                sb += "&#".concat(ch.charCodeAt(0), ";");
            }
            else {
                sb += ch;
            }
        }
        return sb;
    }
    return s;
};
exports.encodeAsCDATA = encodeAsCDATA;
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
//# sourceMappingURL=caml4js.js.map