# caml4js
A declarative JavaScript library for creating SharePoint client-side CAML queries.

All Query elements [mentioned in the CAML docs](https://docs.microsoft.com/en-us/sharepoint/dev/schema/query-schema) are supported by Caml4Js

## Table of Contents

- [Intallation](#installation)
- [Usage](#usage)
- [Basics](#basics)
- [Dynamic Where](#dynamic-where-(wherebuilder))
- [Utility Functions](#utility-functions)

## Installation
Npm:
```
npm install caml4js --save
```

Npm TypeScript definitions:
```
npm install @types/caml4js --save-dev
```
## Usage

In browser:

```html
<script type="text/javascript" src="//caml4js.js"></script>
```

In node:

```js
var caml4js = require('caml4js');
```

ES6 modules:
```js
import { query, textField, where, or, userField, orderBy, groupBy, booleanField, and} from 'caml4js';
```

## Basics

It's important to keep in mind the structure of CAML query and how Caml4Js tries to map it to code. The structure  looks like this:

```
view/
  viewFields/
  aggregations/
  joins/
    join/
  projections/
  query/
    where/
    orderBy/
    groupBy/
  rowLimit/
```
Assume we want to fetch the Name and Population size from a SharePoint list where the country name is Ghana.
To generate the CAML query using Caml4Js, you could use the following code:
```js
let v = view(
            viewFields("Name","Population"),
            query(
                where(
                    textField("Name").equalTo("Ghana")
                )
            )
        )
```
Very simple, it follows the structure for CAML query we stated earlier. This will generate the following xml:
```xml
<View>
    <ViewFields>
        <FieldRef Name="Name" />
        <FieldRef Name="Population" />
    </ViewFields>
    <Query>
        <Where>
            <Eq>
                <FieldRef Name="Name"/>
                <Value Type="Text">Ghana</Value>
            </Eq>
        </Where>
    </Query>
</View>
```
To search using the Poulation field, we could write something like this:
```js
let v = view(
            viewFields("Name","Population"),
            query(
                where(
                    numberField("Population").greaterThan(2000)
                )
            )
        )
```
If you want items where Country field is Ghana or USA:
```js
let v = view(
            viewFields("Name","Population"),
            query(
                where(
                    or(
                        textField("Name").equalTo("Ghana"),
                        textField("Name").equalTo("USA")
                    )
                )
            )
        )
```
```xml
<View>
    <ViewFields>
        <FieldRef Name="Name" />
        <FieldRef Name="Population" />
    </ViewFields>
    <Query>
        <Where>
            <Or>
                <Eq>
                    <FieldRef Name="Name"/>
                    <Value Type="Text">Ghana</Value>
                </Eq>
                <Eq>
                    <FieldRef Name="Name"/>
                    <Value Type="Text">USA</Value>
                </Eq>
            </Or>
        </Where>
    </Query>
</View>
```
or
```js
let v = view(
            viewFields("Name","Population"),
            query(
                where(
                    textField("Name").in(["USA","Ghana"])
                )
            )
        )
```
```xml
<View>
    <ViewFields>
        <FieldRef Name="Name" />
        <FieldRef Name="Population" />
    </ViewFields>
    <Query>
        <Where>
            <In>
                <FieldRef Name="Name" />
                <Values>
                    <Value Type="Text">USA</Value>
                    <Value Type="Text">Ghana</Value>
                </Values>
            </In>
        </Where>
    </Query>
</View>
```
### Complex nested operators
Caml4Js makes it easy to generate complex queries.
```js
let q = query(
            where(
                and(
                    and(
                        booleanField("Enabled").isTrue(),
                        or(
                            userField("Audience").includes(100),
                            userField("Audience").includes(101)
                        )
                    ),
                    or(
                        textField("Title").equalTo("Test Suites"),
                        and(
                            choiceField("Status").equalTo("Open"),
                            dateTimeField("Created").greaterThan("2019-01-01T00:00:00.000Z")
                        )
                    )
                )
            )
    )
```
```xml
<Query>
    <Where>
        <And>
            <And>
                <Eq>
                    <FieldRef Name="Enabled"/>
                    <Value Type="Integer">1</Value>
                </Eq>
                <Or>
                    <Eq>
                        <FieldRef Name="Audience"/>
                        <Value Type="UserMulti">100</Value>
                    </Eq>
                    <Eq>
                        <FieldRef Name="Audience"/>
                        <Value Type="UserMulti">101</Value>
                    </Eq>
                </Or>
            </And>
            <Or>
                <Eq>
                    <FieldRef Name="Title"/>
                    <Value Type="Text">Test Suites</Value>
                </Eq>
                <And>
                    <Eq>
                        <FieldRef Name="Status"/>
                        <Value Type="Choice">Open</Value>
                    </Eq>
                    <Gt>
                        <FieldRef Name="Created"/>
                        <Value Type="DateTime" IncludeTimeValue="TRUE">2019-01-01T00:00:00.000Z</Value>
                    </Gt>
                </And>
            </Or>
        </And>
    </Where>
</Query>
```
### Membership
Let's find all items where the Author is the current user
```js
let v = view(
            viewFields("Name","Population"),
            query(
                where(
                    userField("Author").equalToCurrentUser()
                )
            )
        )
```
```xml
<View>
    <ViewFields>
        <FieldRef Name="Name"/>
        <FieldRef Name="Population"/>
    </ViewFields>
    <Query>
        <Where>
            <Eq>
                <FieldRef Name="Author" LookupId="TRUE"/>
                <Value Type="Integer">
                    <UserID/>
                </Value>
            </Eq>
        </Where>
    </Query>
</View>
```
### Joins
You can use Caml4Js for list joins and field projections to generate your CAML queries. Suppose we have lists Student and Result with a lookup column called Candidate. [Joins](https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ee539975(v=office.14))
```js
let v = view(
        viewFields("Grade","Name"),
        joins(
            join(JoinType.LEFT, "student", "Candidate","", [{ Name: "Name", Field: "Name"}])
        ),
        query(
            where(
                textField("Name").equalTo("John")
            )
        )
    )
```
```xml
<View>
    <ViewFields>
        <FieldRef Name='Name'/>
        <FieldRef Name='Grade'/>
    </ViewFields>
    <Joins>
        <Join Type='LEFT' ListAlias='student'>
            <Eq>
                <FieldRef Name='Candidate' RefType='Id'/>
                <FieldRef Name='ID' List='student'/>
            </Eq>
        </Join>
    </Joins>
    <ProjectedFields>
        <Field Name='Grade' Type='Lookup' List='student' ShowField='Grade'/>
    </ProjectedFields>
    <Query>
        <Where>
            <Eq>
                <FieldRef Name='Name'/>
                <Value Type='Text'>John</Value>
            </Eq>
        </Where>
    </Query>
</View>
```
Suppose we have an `Orders`, `Customers` and `Cities` lists. The `Orders` list has a `CustomerName` field that looks up to a `Customers` list, and that the `Customers` list has a `CityName` field that looks up to a `Cities` list.

Let's see how we can return all orders from an `Orders` list where the customer’s city is London. 
```js
let v = view(
        viewFields("CustomerCity"),
        joins(
            join(JoinType.LEFT, "customers", "CustomerName"),
            join(JoinType.LEFT, "customerCities", "CityName", [{ Name: "CustomerCity", Field: "Title" }],"customers"),
        ),
        query(
            where(
                textField("CustomerCity").equalTo("London")
            )
        )
    )
```
this will give us the following
```xml
<View>
    <ViewFields>
        <FieldRef Name="CustomerCity"/>
    </ViewFields>
    <Joins>
        <Join Type="LEFT" ListAlias="Customers">
            <Eq>
                <FieldRef Name="CustomerName" RefType="Id" />
                <FieldRef Name="ID" List="Customers"/>
            </Eq>
        </Join>
        <Join Type="LEFT" ListAlias="Cities">
            <Eq>
                <FieldRef Name="CityName" RefType="Id"/>
                <FieldRef Name="ID" List="Cities"/>
            </Eq>
        </Join>
    </Joins>
    <ProjectedFields>
        <Field Name="CustomerCity" Type="Lookup" List="Cities" ShowField="Title"/>
    </ProjectedFields>
    <Query>
        <Where>
            <Eq>
                <FieldRef Name="CustomerCity"/>
                <Value Type="Text">London</Value>
            </Eq>
        </Where>
    </Query>
</View>
```

## Dynamic Where (WhereBuilder)
You can use WhereBuilder to generate a dynamic WHERE element.
```js
    const builder = whereBuilder();
    builder.addQuery(booleanField("Enabled").isTrue());

    //somewhere in the code
    builder.addQuery(
        or(
            userField("Audience").includes(100),
            userField("Audience").includes(101)
        )
    );

    let v = view(
                viewFields("Name","Population"),
                query(
                    builder.toWhere()
                )
        );
```
this will give us
```xml
<View>
    <Query>
        <Where>
            <And>
                <Eq>
                    <FieldRef Name="Enabled"/>
                    <Value Type="Integer">1</Value>
                </Eq>
                <Or>
                    <Eq>
                        <FieldRef Name="Audience"/>
                        <Value Type="UserMulti">100</Value>
                    </Eq>
                    <Eq>
                        <FieldRef Name="Audience"/>
                        <Value Type="UserMulti">101</Value>
                    </Eq>
                </Or>
            </And>
        </Where>
    </Query>
</View>
```
WhereBuilder can be chained
```js
builder.addQuery(booleanField("Enabled").isTrue())
        .addQuery(userField("Audience").includes(101))
```

## Utility functions
```typsecript
encodeAsCDATA(s:string)
```
This function is used to encode textual data as CDATA that should not be parsed by an XML parser. The characters "<" and "&" are not allowed within XML elements. The "<" character will throw an error because the parser will interpret it as the start of a new element. The "&" character will throw an error because the parser will interpret it as the start of a character entity. 

```typescript
sanitizeQuery(s:string)
```
Removes line breaks from supplied query string