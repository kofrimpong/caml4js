import { query, textField, where, or, userField, orderBy, groupBy, booleanField, and, viewFields, view, joins, join, JoinType, FieldType, numberField, dateTimeField, choiceField, lookupField } from './caml4js'
import * as vkbeautify from 'vkbeautify'

it("Simple query", () => {
    let q = query(
        where(
            or(
                textField("Email").equalTo("info@github.com"),
                or(
                    textField("Subject").equalTo("Hello Caml3Js Users"),
                    or(
                        textField("Subject").beginsWith("Caml4Js"),
                        textField("Content").contains("SharePoint")
                    )
                )
            )
        )
    )
    expect(vkbeautify.xml(q)).toEqual(vkbeautify.xml(
        `<Query>
            <Where>
                <Or>
                    <Eq><FieldRef Name="Email"/><Value Type="Text">info@github.com</Value></Eq>
                    <Or>
                        <Eq><FieldRef Name="Subject"/><Value Type="Text">Hello Caml3Js Users</Value></Eq>
                        <Or>
                            <BeginsWith><FieldRef Name="Subject"/><Value Type="Text">Caml4Js</Value></BeginsWith>
                            <Contains><FieldRef Name="Content"/><Value Type="Text">SharePoint</Value></Contains>
                        </Or>
                    </Or>
                </Or>
            </Where>
        </Query>`))
})

it("Test membership", () => {
    let q = query(
        where(
            or(
                userField("AssignedTo").equalToCurrentUser(),
                userField("AssignedTo").isInCurrentUserGroups()
            )
        ),
        groupBy("Category"),
        orderBy({ Field: "Priority" }, { Field: "Title" })
    )
    expect(vkbeautify.xml(q)).toEqual(vkbeautify.xml(
        `<Query>
            <Where>
                <Or>
                    <Eq><FieldRef Name="AssignedTo" LookupId="TRUE"/><Value Type="Integer"><UserID/></Value></Eq>
                    <Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo"/></Membership>
                </Or>
            </Where>
            <GroupBy>
                <FieldRef Name="Category"/>
            </GroupBy>
            <OrderBy>
                <FieldRef Name="Priority"/><FieldRef Name="Title"/>
            </OrderBy>
        </Query>`))
})

it("Tests nested expressions", () => {
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
                        dateTimeField("Created").greaterThan(new Date(Date.UTC(2019, 0, 1)))
                    )
                )
            )
        )
    )
    expect(vkbeautify.xml(q)).toEqual(vkbeautify.xml(
        `<Query>
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
    </Query>`))
})

it("Test Join queries", () => {
    let v = view(
        viewFields("Title", "Country", "Population"),
        joins(
            join(JoinType.LEFT, "Country", "Country", "", [{ Name: "Population", Field: "y4r6", Type: FieldType.LookUp }])
        ),
        query(
            where(
                numberField("Population").lessThan(10)
            )
        )
    )
    expect(vkbeautify.xml(v)).toEqual(vkbeautify.xml(
        `<View>
            <ViewFields>
                <FieldRef Name="Title"/>
                <FieldRef Name="Country"/>
                <FieldRef Name="Population"/>
            </ViewFields>
            <Joins>
                <Join Type="LEFT" ListAlias="Country">
                    <Eq>
                        <FieldRef Name="Country" RefType="Id" />
                        <FieldRef Name="ID" List="Country"/>
                    </Eq>
                </Join>
            </Joins>
            <ProjectedFields>
                <Field Name="Population" Type="Lookup" List="Country" ShowField="y4r6"/>
            </ProjectedFields>
            <Query>
                <Where>
                    <Lt>
                        <FieldRef Name="Population"/>
                        <Value Type="Number">10</Value>
                    </Lt>
                </Where>
            </Query>
        </View>`))
})

it("Test Date", () => {
    let q = query(
        where(
            dateTimeField("Created").greaterThan(new Date(Date.UTC(2019, 0, 1)))
        )
    )
    expect(vkbeautify.xml(q)).toEqual(vkbeautify.xml(
        `<Query>
            <Where>
                <Gt>
                    <FieldRef Name="Created"/>
                    <Value Type="DateTime" IncludeTimeValue="TRUE">2019-01-01T00:00:00.000Z</Value>
                </Gt>
            </Where>
        </Query>`))
})

it("Test Lookup", () => {
    let q = query(
        where(
            lookupField("City").idEqualTo(2)
        )
    )
    expect(vkbeautify.xml(q)).toEqual(vkbeautify.xml(
        `<Query>
            <Where>
                <Eq>
                    <FieldRef Name="City" LookupId="TRUE"/>
                    <Value Type="Integer">2</Value>
                </Eq>
            </Where>
        </Query>`))
})

it("Test In", () => {
    let q = query(
        where(
            numberField("Population").in(2, 3)
        )
    )
    expect(vkbeautify.xml(q)).toEqual(vkbeautify.xml(
        `<Query>
            <Where>
                <In>
                    <FieldRef Name="Population" />
                    <Values>
                        <Value Type="Number">2</Value>
                        <Value Type="Number">3</Value>
                    </Values>
                </In>
            </Where>
        </Query>`))
})