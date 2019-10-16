import { query, textField, where, or, userField, orderBy, groupBy, booleanField, and, viewFields, view, joins, join, JoinType, FieldType, numberField, dateTimeField } from './caml4js'
import * as vkbeautify from 'vkbeautify'

it("Simple query", () => {
    let q = query(
        where(
            or(
                textField("Email").equalTo("support@google.com"),
                or(
                    textField("Email").equalTo("plus@google.com"),
                    or(
                        textField("Title").beginsWith("[Google]"),
                        textField("Content").contains("Google")
                    )
                )
            )
        )
    )
    expect(vkbeautify.xml(q)).toEqual(vkbeautify.xml(
        `<Query>
            <Where>
                <Or>
                    <Eq><FieldRef Name="Email"/><Value Type="Text">support@google.com</Value></Eq>
                    <Or>
                        <Eq><FieldRef Name="Email"/><Value Type="Text">plus@google.com</Value></Eq>
                        <Or>
                            <BeginsWith><FieldRef Name="Title"/><Value Type="Text">[Google]</Value></BeginsWith>
                            <Contains><FieldRef Name="Content"/><Value Type="Text">Google</Value></Contains>
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
                        userField("TargetAudience").includes(55),
                        userField("TargetAudience").includes(66)
                    )
                ),
                or(
                    textField("NotificationScope").equalTo(77),
                    and(
                        textField("NotificationScope").equalTo(88),
                        textField("ScopeWebRelativeUrl").equalTo(99),
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
                        <Eq><FieldRef Name="Enabled"/><Value Type="Integer">1</Value></Eq>
                        <Or>
                            <Eq><FieldRef Name="TargetAudience"/><Value Type="UserMulti">55</Value></Eq>
                            <Eq><FieldRef Name="TargetAudience"/><Value Type="UserMulti">66</Value></Eq>
                        </Or>
                    </And>
                    <Or>
                        <Eq><FieldRef Name="NotificationScope"/><Value Type="Text">77</Value></Eq>
                        <And>
                            <Eq><FieldRef Name="NotificationScope"/><Value Type="Text">88</Value></Eq>
                            <Eq><FieldRef Name="ScopeWebRelativeUrl"/><Value Type="Text">99</Value></Eq>
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
                <FieldRef Name="Title" />
                <FieldRef Name="Country" />
                <FieldRef Name="Population" />
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