"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
})(ValueType = exports.ValueType || (exports.ValueType = {}));
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
        return "<IsNull><FieldRef Name='" + this.internalName + "'/></IsNull>";
    };
    /** Checks whether the value of the field was not specified by user */
    Operator.prototype.isNotNull = function () {
        return "<IsNotNull><FieldRef Name='" + this.internalName + "'/></IsNotNull>";
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
        return "<Eq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>1</Value></Eq>";
    };
    /** Checks whether the value of the field is False */
    FieldOperator.prototype.isFalse = function () {
        return "<Eq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>0</Value></Eq>";
    };
    /** Checks whether the value of the field is equal to the specified value */
    FieldOperator.prototype.equalTo = function (value) {
        return "<Eq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Eq>";
    };
    /** Checks whether the value of the field is not equal to the specified value */
    FieldOperator.prototype.notEqualTo = function (value) {
        return "<Neq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Neq>";
    };
    /** Checks whether the value of the field is greater than the specified value */
    FieldOperator.prototype.greaterThan = function (value) {
        return "<Gt><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Gt>";
    };
    /** Checks whether the value of the field is less than the specified value */
    FieldOperator.prototype.lessThan = function (value) {
        return "<Lt><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Lt>";
    };
    /** Checks whether the value of the field is greater than or equal to the specified value */
    FieldOperator.prototype.greaterThanOrEqualTo = function (value) {
        return "<Geq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Geq>";
    };
    /** Checks whether the value of the field is less than or equal to the specified value */
    FieldOperator.prototype.lessThanOrEqualTo = function (value) {
        return "<Leq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Leq>";
    };
    /**
     * Searches for a string at the start of a column that holds Text or Note field type values.
     * @param value
     */
    FieldOperator.prototype.beginsWith = function (value) {
        return "<BeginsWith><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></BeginsWith>";
    };
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues
     */
    FieldOperator.prototype.in = function (arrayOfValues) {
        var builder = "<In><FieldRef Name='" + this.internalName + "' /><Values>";
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type='" + this.type + "'>" + arrayOfValues[i] + "</Value>";
        }
        return builder += '</Values></In>';
    };
    /**
     * Searches for a string anywhere within a column that holds Text or Note field type values.
     * @param value
     */
    FieldOperator.prototype.contains = function (value) {
        return "<Contains><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Contains>";
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is not included in the list item for the field.
     * @param value
     */
    FieldOperator.prototype.notIncludes = function (value) {
        return "<NotIncludes><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></NotIncludes>";
    };
    /**
     * If the specified field is a Lookup field that allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    FieldOperator.prototype.includes = function (value) {
        return "<Includes><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Includes>";
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
        return "<Eq><FieldRef Name='" + this.internalName + "'/><Value Type='" + ValueType.DateTime + "'" + includeTime + ">" + value + "</Value></Eq>";
    };
    /** Checks whether the value of the field is not equal to the specified value in ISO format*/
    DateFieldOperator.prototype.notEqualTo = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Neq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'" + includeTime + ">" + value + "</Value></Neq>";
    };
    /** Checks whether the value of the field is greater than the specified value in ISO format*/
    DateFieldOperator.prototype.greaterThan = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Gt><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'" + includeTime + ">" + value + "</Value></Gt>";
    };
    /** Checks whether the value of the field is less than the specified value in ISO format*/
    DateFieldOperator.prototype.lessThan = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Lt><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'" + includeTime + ">" + value + "</Value></Lt>";
    };
    /** Checks whether the value of the field is greater than or equal to the specified value in ISO format*/
    DateFieldOperator.prototype.greaterThanOrEqualTo = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Geq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'" + includeTime + ">" + value + "</Value></Geq>";
    };
    /** Checks whether the value of the field is less than or equal to the specified value in ISO format*/
    DateFieldOperator.prototype.lessThanOrEqualTo = function (value) {
        var includeTime = '';
        if (this.type == ValueType.DateTime) {
            includeTime = " IncludeTimeValue='TRUE'";
        }
        return "<Leq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'" + includeTime + ">" + value + "</Value></Leq>";
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
        var builder = "<In><FieldRef Name='" + this.internalName + "' /><Values>";
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type='" + this.type + "'" + includeTime + ">" + arrayOfValues[i] + "</Value>";
        }
        return builder += '</Values></In>';
    };
    DateFieldOperator.prototype.isToday = function () {
        var includeTime = '';
        // if (this.type == ValueType.DateTime) {
        //     includeTime = ` IncludeTimeValue='TRUE'`;
        // }
        return "<Neq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'" + includeTime + "><Today /></Value></Neq>";
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
        return "<Eq><FieldRef Name='" + this.internalName + "' LookupId='TRUE'/><Value Type='Integer'>" + value + "</Value></Eq>";
    };
    /** Checks whether the value of the field is equal to the specified value */
    LookupFieldOperator.prototype.valueEqualTo = function (value) {
        return "<Eq><FieldRef Name='" + this.internalName + "'/><Value Type='" + this.type + "'>" + value + "</Value></Eq>";
    };
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues
     */
    LookupFieldOperator.prototype.idIn = function (arrayOfValues) {
        var builder = "<In><FieldRef LookupId='True' Name='" + this.internalName + "'/><Values>";
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type='" + this.type + "'>" + arrayOfValues[i] + "</Value>";
        }
        return builder += '</Values></In>';
    };
    /**
     * Checks whether the value of the field is equal to one of the specified values
     * @param arrayOfValues
     */
    LookupFieldOperator.prototype.valueIn = function (arrayOfValues) {
        var builder = "<In><FieldRef Name='" + this.internalName + "'/><Values>";
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type='" + this.type + "'>" + arrayOfValues[i] + "</Value>";
        }
        return builder += '</Values></In>';
    };
    /**
     * If the specified field allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    LookupFieldOperator.prototype.includes = function (value) {
        return "<Eq><FieldRef Name='" + this.internalName + "' LookupId='TRUE'/><Value Type='" + ValueType.LookupMulti + "'>" + value + "</Value></Eq>";
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
        return "<Eq><FieldRef Name='" + this.internalName + "' LookupId='TRUE'/><Value Type='" + ValueType.Integer + "'>" + id + "</Value></Eq>";
    };
    /** Checks whether the display name of the person field is equal to the specified value */
    UserFieldOperator.prototype.displayNameEqualTo = function (value) {
        return "<Eq><FieldRef Name='" + this.internalName + "'/><Value Type='" + ValueType.Text + "'>" + value + "</Value></Eq>";
    };
    /**
     * Checks whether the value of the person field is equal to current user
     */
    UserFieldOperator.prototype.equalToCurrentUser = function () {
        return "<Eq><FieldRef Name='" + this.internalName + "' LookupId='TRUE'/><Value Type='" + ValueType.Integer + "'><UserID/></Value></Eq>";
    };
    /**
     * If the specified field allows multiple values, specifies that
     * the value is included in the list item for the field.
     * @param value
     */
    UserFieldOperator.prototype.includes = function (value) {
        return "<Eq><FieldRef Name='" + this.internalName + "'/><Value Type='" + ValueType.UserMulti + "'>" + value + "</Value></Eq>";
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
        return "<Membership Type='" + type + "'><FieldRef Name='" + this.internalName + "'/></Membership>";
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
                    text += exports.and(queryArr[count], queryArr[++count]);
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
        return exports.where(this.genQuery(this.queries));
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
})(JoinType = exports.JoinType || (exports.JoinType = {}));
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
        var listAlias = this.pJoinName ? "List='" + this.pJoinName + "'" : '';
        return "<Join Type='" + this.type + "' ListAlias='" + this.joinName + "'><Eq><FieldRef Name='" + this.lookupField + "' RefType='Id' " + listAlias + "/><FieldRef Name='ID' List='" + this.joinName + "'/></Eq></Join>";
    };
    Join.prototype.getProjectionsElement = function () {
        var list = this.joinName;
        return this.projections.reduce(function (accum, current) {
            return accum + ("<Field Name='" + current.Name + "' Type='Lookup' List='" + list + "' ShowField='" + current.Field + "'/>");
        }, '');
    };
    return Join;
}());
exports.Join = Join;
var AggregationType;
(function (AggregationType) {
    AggregationType["Count"] = "Count";
    AggregationType["Sum"] = "Sum";
})(AggregationType = exports.AggregationType || (exports.AggregationType = {}));
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
})(ViewScope = exports.ViewScope || (exports.ViewScope = {}));
/**
 * Generates an And logical join CAML element
 */
exports.and = function (query1, query2) {
    return "<And>" + query1 + query2 + "</And>";
};
/**
 * Generates an Or logical join CAML element
 * @param query1
 * @param query2
 */
exports.or = function (query1, query2) {
    return "<Or>" + query1 + query2 + "</Or>";
};
/**
 * Generates a Where CAML element
 * @param query
 */
exports.where = function (query) {
    return "<Where>" + query + "</Where>";
};
/**
 * Generates a Join CAML element
 * @param type
 * @param joinName Specifies an alternate name for the foreign list. There is no need to explicitly map the alias onto the real name of the foreign list because joins are only allowed through a lookup field relation and the foreign list is specified in the Lookup field definition.
 * @param lookupField
 * @param pJoinName If the primary list of the join is not the parent list of the view, then it, too, is identified with a List attribute set to its alias.
 * @param projections
 */
exports.join = function (type, joinName, lookupField, pJoinName, projections) {
    if (pJoinName === void 0) { pJoinName = ''; }
    if (projections === void 0) { projections = []; }
    return new Join({ type: type, joinName: joinName, lookupField: lookupField, projections: projections, pJoinName: pJoinName });
};
/**
 * Generates a JOINS CAML element
 * @param joins
 */
exports.joins = function () {
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
    return "<Joins>" + joinsStr + "</Joins><ProjectedFields>" + projStr + "</ProjectedFields>";
};
/**
 * Removes line breaks from supplied query string
 * @param query
 */
exports.sanitizeQuery = function (query) {
    return query.replace(/>\s+</g, '><');
};
/**
 * Generates a ViewFields CAML element
 * @param viewFields
 */
exports.viewFields = function () {
    var viewFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        viewFields[_i] = arguments[_i];
    }
    var viewStr = viewFields.reduce(function (accu, current) {
        return accu + ("<FieldRef Name='" + current + "'/>");
    }, "");
    return "<ViewFields>" + viewStr + "</ViewFields>";
};
/**
 * Generates a Query CAML element
 * @param inputs
 */
exports.query = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return "<Query>" + inputs.join(" ") + "</Query>";
};
/**
 * Generates a View CAML element
 * @param viewInputs
 */
exports.view = function () {
    var viewInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        viewInputs[_i] = arguments[_i];
    }
    return "<View>" + viewInputs.join(" ") + "</View>";
};
/**
 * Generates a View CAML element
 * @param scope Specifies the recursive scope for a view of a document library.
 * @param viewInputs
 */
exports.viewRecursive = function (scope) {
    var viewInputs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        viewInputs[_i - 1] = arguments[_i];
    }
    return "<View Scope='" + scope + "'>" + viewInputs.join(" ") + "</View>";
};
/**
 * Generates an OrderBy CAML element
 * @param orderBy
 */
exports.orderBy = function () {
    var orderBy = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        orderBy[_i] = arguments[_i];
    }
    var viewStr = orderBy.reduce(function (accu, current) {
        if (current.Field) {
            var asc = current.Desc ? " Ascending='FALSE'" : '';
            return accu + ("<FieldRef Name='" + current.Field + "'" + asc + "/>");
        }
        return accu;
    }, '');
    return "<OrderBy>" + viewStr + "</OrderBy>";
};
/**
 * Generate a GroupBy CAML element
 * @param field
 */
exports.groupBy = function (field) {
    if (!field) {
        return '';
    }
    return "<GroupBy><FieldRef Name='" + field + "'/></GroupBy>";
};
/**
 * Generates an Aggregations CAML element
 * @param aggregations
 */
exports.aggregations = function () {
    var aggregations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        aggregations[_i] = arguments[_i];
    }
    var viewStr = aggregations.reduce(function (accu, current) {
        if (current.Name && current.Type) {
            return accu + ("<FieldRef Name='" + current.Name + "' Type='" + current.Type + "'/>");
        }
        return accu;
    }, '');
    return "<Aggregations Value='On'>" + viewStr + "</Aggregations>";
};
/**
 * Generates a RowLimit CAML element
 * @param limit
 * @param paged
 */
exports.rowLimit = function (limit, paged) {
    if (paged === void 0) { paged = false; }
    var pageStr = paged ? " Paged='TRUE'" : '';
    return "<RowLimit" + pageStr + ">" + limit + "</RowLimit>";
};
/**
 * Gets an operator for an ID field for comparison
 */
exports.idField = function () {
    return new FieldOperator(ValueType.Counter, 'ID');
};
/**
 * Gets an operator for a note field for comparison
 * @param internalName
 */
exports.noteField = function (internalName) {
    return new FieldOperator(ValueType.Note, internalName);
};
/**
 * Gets an operator for a choice field for comparison
 * @param internalName
 */
exports.choiceField = function (internalName) {
    return new FieldOperator(ValueType.Choice, internalName);
};
/**
 * Gets an operator for a compute field for comparison
 */
exports.computedField = function (internalName) {
    return new FieldOperator(ValueType.Computed, internalName);
};
/**
 * Gets an operator for a url field for comparison
 * @param internalName
 */
exports.urlField = function (internalName) {
    return new FieldOperator(ValueType.URL, internalName);
};
/**
 * Gets an operator for a number field for comparison
 * @param internalName
 */
exports.numberField = function (internalName) {
    return new FieldOperator(ValueType.Number, internalName);
};
/**
 * Gets an operator for a text field for comparison
 * @param internalName
 */
exports.textField = function (internalName) {
    return new FieldOperator(ValueType.Text, internalName);
};
/**
 * Gets an operator for a date field for comparison
 * @param internalName
 */
exports.dateField = function (internalName) {
    return new DateFieldOperator(ValueType.Date, internalName);
};
/**
 * Gets an operator for a boolean field for comparison
 * @param internalName
 */
exports.booleanField = function (internalName) {
    return new FieldOperator(ValueType.Integer, internalName);
};
/**
 * Gets an operator for a datetime field for comparison
 * @param internalName
 */
exports.dateTimeField = function (internalName) {
    return new DateFieldOperator(ValueType.DateTime, internalName);
};
/**
 * Gets an operator for a lookup field for comparison
 */
exports.lookupField = function (internalName) {
    return new LookupFieldOperator(ValueType.LookUp, internalName);
};
/**
 * Gets an operator for a User field for comparison
 * @param internalName
 */
exports.userField = function (internalName) {
    return new UserFieldOperator(ValueType.CurrentUserGroups, internalName);
};
/**
 * Gets an operator for a UserOrGroup field for comparison
 *
 * @param internalName - The internal name of the field.
 * @returns A new instance of UserGroupFieldOperator.
 */
exports.userOrGroupField = function (internalName) {
    return new UserGroupFieldOperator(ValueType.CurrentUserGroups, internalName);
};
exports.guidField = function (internalName) {
    return new FieldOperator(ValueType.Guid, internalName);
};
/**
 * Gets an operator for a document library file name field for comparison
 */
exports.documentNameField = function () {
    return new FieldOperator(ValueType.File, 'FileLeafRef');
};
/**
 * Gets a dynamic WHERE element builder
 */
exports.whereBuilder = function () {
    return new WhereBuilder();
};
/**
 * Encode textual data that should not be parsed by an XML parser as CDATA.
 * @param s
 * @returns
 */
exports.encodeAsCDATA = function (s) {
    if (/[<>&]+/.test(s)) {
        var sb = '';
        for (var i = 0; i < s.length; i++) {
            var ch = s.charAt(i);
            if (/^[<>&]+$/.test(ch)) {
                sb += "&#" + ch.charCodeAt(0) + ";";
            }
            else {
                sb += ch;
            }
        }
        return sb;
    }
    return s;
};
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