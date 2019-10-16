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
var Operator = (function () {
    function Operator(type, internalName) {
        this.internalName = internalName;
        this.type = type;
    }
    return Operator;
}());
exports.Operator = Operator;
var FieldOperator = (function (_super) {
    __extends(FieldOperator, _super);
    function FieldOperator(type, internalName) {
        return _super.call(this, type, internalName) || this;
    }
    FieldOperator.prototype.isTrue = function () {
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">1</Value>\n          </Eq>";
    };
    FieldOperator.prototype.isFalse = function () {
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">1</Value>\n          </Eq>";
    };
    FieldOperator.prototype.equalTo = function (value) {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Eq>";
    };
    FieldOperator.prototype.notEqualTo = function (value) {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        return "<Neq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Neq>";
    };
    FieldOperator.prototype.greaterThan = function (value) {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        return "<Gt>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Gt>";
    };
    FieldOperator.prototype.lessThan = function (value) {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        return "<Lt>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Lt>";
    };
    FieldOperator.prototype.greaterThanOrEqualTo = function (value) {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        return "<Geq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Get>";
    };
    FieldOperator.prototype.lessThanOrEqualTo = function (value) {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        return "<Leq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Leq>";
    };
    FieldOperator.prototype.isNull = function () {
        return "<IsNull>\n            <FieldRef Name=\"" + this.internalName + "\" />\n          </IsNull>";
    };
    FieldOperator.prototype.isNotNull = function () {
        return "<IsNotNull>\n            <FieldRef Name=\"" + this.internalName + "\" />\n          </IsNotNull>";
    };
    FieldOperator.prototype.beginsWith = function (value) {
        return "<BeginsWith>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </BeginsWith>";
    };
    FieldOperator.prototype.in = function () {
        var arrayOfValues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrayOfValues[_i] = arguments[_i];
        }
        var builder = "<In><FieldRef Name=\"" + this.internalName + "\" /><Values>";
        for (var i = 0; i < arrayOfValues.length; i++) {
            var value = arrayOfValues[i];
            if (value instanceof Date) {
                value = value.toISOString();
            }
            builder += "<Value Type=\"" + this.type + "\">" + value + "</Value>";
        }
        return builder += '</Values>';
    };
    FieldOperator.prototype.contains = function (value) {
        return "<Contains>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Contains>";
    };
    FieldOperator.prototype.notIncludes = function (value) {
        return "<NotIncludes>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </NotIncludes>";
    };
    FieldOperator.prototype.includes = function (value) {
        return "<Includes>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Includes>";
    };
    FieldOperator.NOW = "<Now />";
    return FieldOperator;
}(Operator));
exports.FieldOperator = FieldOperator;
var LookupFieldOperator = (function (_super) {
    __extends(LookupFieldOperator, _super);
    function LookupFieldOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LookupFieldOperator.prototype.idEqualTo = function (value) {
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" LookupId=\"TRUE\"/>\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Eq>";
    };
    LookupFieldOperator.prototype.valueEqualTo = function (value) {
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + this.type + "\">" + value + "</Value>\n          </Eq>";
    };
    LookupFieldOperator.prototype.idIn = function () {
        var arrayOfValues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrayOfValues[_i] = arguments[_i];
        }
        var builder = "<In><FieldRef LookupId=\"True\" Name=\"" + this.internalName + "\" /><Values>";
        for (var i = 0; i < arrayOfValues.length; i++) {
            builder += "<Value Type=\"" + this.type + "\">" + arrayOfValues[i] + "</Value>";
        }
        return builder += '</Values>';
    };
    LookupFieldOperator.prototype.includes = function (value) {
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" LookupId=\"TRUE\"/>\n            <Value Type=\"" + ValueType.LookupMulti + "\">" + value + "</Value>\n          </Eq>";
    };
    return LookupFieldOperator;
}(Operator));
exports.LookupFieldOperator = LookupFieldOperator;
var UserFieldOperator = (function (_super) {
    __extends(UserFieldOperator, _super);
    function UserFieldOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserFieldOperator.prototype.equalToCurrentUser = function () {
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" LookupId=\"TRUE\"/>\n            <Value Type=\"" + ValueType.Integer + "\"><UserID /></Value>\n          </Eq>";
    };
    UserFieldOperator.prototype.isInSPGroup = function () {
        return this.memberOf(ValueType.SPGroup);
    };
    UserFieldOperator.prototype.isInSPWebGroups = function () {
        return this.memberOf(ValueType.SPWebGroups);
    };
    UserFieldOperator.prototype.isInSPWebAllUsers = function () {
        return this.memberOf(ValueType.SPWebAllUsers);
    };
    UserFieldOperator.prototype.isInSPWebUsers = function () {
        return this.memberOf(ValueType.SPWebUsers);
    };
    UserFieldOperator.prototype.isInCurrentUserGroups = function () {
        return this.memberOf(ValueType.CurrentUserGroups);
    };
    UserFieldOperator.prototype.includes = function (value) {
        return "<Eq>\n            <FieldRef Name=\"" + this.internalName + "\" />\n            <Value Type=\"" + ValueType.UserMulti + "\">" + value + "</Value>\n          </Eq>";
    };
    UserFieldOperator.prototype.memberOf = function (type) {
        return "<Membership Type=\"" + type + "\">\n            <FieldRef Name=\"" + this.internalName + "\" />\n          </Membership>";
    };
    return UserFieldOperator;
}(Operator));
exports.UserFieldOperator = UserFieldOperator;
var JoinType;
(function (JoinType) {
    JoinType["LEFT"] = "LEFT";
    JoinType["INNER"] = "INNER";
})(JoinType = exports.JoinType || (exports.JoinType = {}));
var Join = (function () {
    function Join(init) {
        this.pJoinName = '';
        this.projections = [];
        Object.assign(this, init);
    }
    Join.prototype.getJoinElement = function () {
        var listAlias = this.pJoinName ? "List=\"" + this.pJoinName + "\"" : '';
        return "<Join Type='" + this.type + "' ListAlias='" + this.joinName + "'>\n            <Eq>\n                <FieldRef Name='" + this.pkey + "' RefType='Id' " + listAlias + "/>\n                <FieldRef List='" + this.joinName + "' Name='ID'/>\n            </Eq>\n        </Join>";
    };
    Join.prototype.getProjectionsElement = function () {
        var list = this.joinName;
        return this.projections.reduce(function (accum, current) {
            return accum + ("<Field \n                Name='" + current.Name + "'\n                Type='" + current.Type + "'\n                List='" + list + "'\n                ShowField='" + current.ShowField + "'/>");
        }, '');
    };
    return Join;
}());
exports.Join = Join;
var FieldType;
(function (FieldType) {
    FieldType["LookUp"] = "Lookup";
    FieldType["DateTime"] = "DateTime";
    FieldType["Choice"] = "Choice";
    FieldType["Computed"] = "Computed";
    FieldType["URL"] = "URL";
    FieldType["Integer"] = "Integer";
    FieldType["Text"] = "Text";
    FieldType["Date"] = "Date";
    FieldType["Note"] = "Note";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
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
})(ValueType || (ValueType = {}));
exports.and = function (query1, query2) {
    return "<And>" + query1 + query2 + "</And>";
};
exports.or = function (query1, query2) {
    return "<Or>" + query1 + query2 + "</Or>";
};
exports.where = function (query) {
    return "<Where>" + query + "</Where>";
};
exports.join = function (type, joinName, pkey, pJoinName, projections) {
    if (pJoinName === void 0) { pJoinName = ''; }
    if (projections === void 0) { projections = []; }
    return new Join({ type: type, joinName: joinName, pkey: pkey, projections: projections, pJoinName: pJoinName });
};
exports.joins = function () {
    var joins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        joins[_i] = arguments[_i];
    }
    var joinsStr = joins.reduce(function (accu, current) {
        return accu + current.getJoinElement();
    }, '');
    var projStr = joins.reduce(function (accu, current) {
        return accu + current.getProjectionsElement();
    }, '');
    return "<Joins>" + joinsStr + "</Joins><ProjectedFields>" + projStr + "</ProjectedFields>";
};
exports.viewFields = function () {
    var viewFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        viewFields[_i] = arguments[_i];
    }
    var viewStr = viewFields.reduce(function (accu, current) {
        return accu + ("<FieldRef Name=\"" + current + "\" />");
    }, '');
    return "<ViewFields>" + viewStr + "</ViewFields>";
};
exports.query = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var viewStr = inputs.reduce(function (accu, current) {
        return accu + current;
    }, '');
    return "<View>" + viewStr + "</View>";
};
exports.orderBy = function () {
    var orderBy = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        orderBy[_i] = arguments[_i];
    }
    var viewStr = orderBy.reduce(function (accu, current) {
        var asc = current.DSC ? "Ascending=\"FALSE\"" : "";
        return accu + ("<FieldRef Name=\"" + current.Field + "\" " + asc + "/>");
    }, '');
    return "<OrderBy>" + viewStr + "</OrderBy>";
};
exports.groupBy = function (field) {
    return "<GroupBy><FieldRef Name=\"" + field + "\" /></GroupBy>";
};
exports.noteField = function (internalName) {
    return new FieldOperator(ValueType.Note, internalName);
};
exports.choiceField = function (internalName) {
    return new FieldOperator(ValueType.Choice, internalName);
};
exports.computedField = function (internalName) {
    return new FieldOperator(ValueType.Computed, internalName);
};
exports.urlField = function (internalName) {
    return new FieldOperator(ValueType.URL, internalName);
};
exports.numberField = function (internalName) {
    return new FieldOperator(ValueType.Integer, internalName);
};
exports.textField = function (internalName) {
    return new FieldOperator(ValueType.Text, internalName);
};
exports.dateField = function (internalName) {
    return new FieldOperator(ValueType.Date, internalName);
};
exports.booleanField = function (internalName) {
    return new FieldOperator(ValueType.Integer, internalName);
};
exports.dateTimeField = function (internalName) {
    return new FieldOperator(ValueType.DateTime, internalName);
};
exports.lookupField = function (internalName) {
    return new LookupFieldOperator(ValueType.Integer, internalName);
};
exports.userField = function (internalName) {
    return new UserFieldOperator(ValueType.CurrentUserGroups, internalName);
};
//# sourceMappingURL=caml4js.js.map