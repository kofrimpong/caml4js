# caml4js
A declarative JavaScript library for creating SharePoint client-side CAML queries.

All Query elements [mentioned in the CAML docs](https://docs.microsoft.com/en-us/sharepoint/dev/schema/query-schema) are supported by Caml4Js

## Table of Contents

- [Intallation](#installation)
- [Usage](#usage)
- [Basics](#basics)


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
<script type="text/javascript" src="//caml4js.min.js"></script>
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
You can use Caml4Js for list joins and field projections to generate your CAML queries.
```js
let v = view(
        viewFields("Name", "Population","City"),
        joins(
            join(JoinType.LEFT, "Cities", "ID", "", [{ Name: "City", Field: "City", Type: FieldType.LookUp }])
        ),
        query(
            where(
                numberField("Population").lessThan(5000)
            )
        )
    )
```
```xml
<View>
    <ViewFields>
        <FieldRef Name="Name"/>
        <FieldRef Name="Population"/>
        <FieldRef Name="City"/>
    </ViewFields>
    <Joins>
        <Join Type="LEFT" ListAlias="Cities">
            <Eq>
                <FieldRef Name="ID" RefType="Id" />
                <FieldRef Name="ID" List="Cities"/>
            </Eq>
        </Join>
    </Joins>
    <ProjectedFields>
        <Field Name="City" Type="Lookup" List="Cities" ShowField="City"/>
    </ProjectedFields>
    <Query>
        <Where>
            <Lt>
                <FieldRef Name="Population"/>
                <Value Type="Number">5000</Value>
            </Lt>
        </Where>
    </Query>
</View>
```
Suppose we have an `Orders`, `Customers` and `Cities` lists. The `Orders` list has a `CustomerName` field that looks up to a `Customers` list and that the latter list has a `CityName` field that looks up to a `Cities` list.

Let's see how we can return all orders from an `Orders` list where the customer’s city is London. 
```js
let v = view(
        viewFields("CustomerCity"),
        joins(
            join(JoinType.LEFT, "customers", "CustomerName"),
            join(JoinType.LEFT, "customerCities", "CityName", "customers", [{ Name: "CustomerCity", Field: "Title", Type: FieldType.LookUp }]),
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
        <Join Type="LEFT" ListAlias="customers">
            <Eq>
                <FieldRef Name="CustomerName" RefType="Id" />
                <FieldRef Name="ID" List="customers"/>
            </Eq>
        </Join>
        <Join Type="LEFT" ListAlias="customerCities">
            <Eq>
                <FieldRef Name="CityName" RefType="Id" List="customers"/>
                <FieldRef Name="ID" List="customerCities"/>
            </Eq>
        </Join>
    </Joins>
    <ProjectedFields>
        <Field Name="CustomerCity" Type="Lookup" List="customerCities" ShowField="Title"/>
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