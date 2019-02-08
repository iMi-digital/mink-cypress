/* global Given, Then */

/*
|--------------------------------------------------------------------------
| GIVEN
|--------------------------------------------------------------------------
*/
Given('I wait for {int} seconds', (seconds) => {
    cy.wait(seconds * 1000);
});

Given(/^(?:|I )am on (?:|the )homepage$/, () => {
    cy.visit('https://dealer.sata.com.testing.imi.de');
});

Given(/^(?:|I )am on "(?<page>[^"]+)"$/, page => {
    cy.visit(page);
});

/*
|--------------------------------------------------------------------------
| WHEN
|--------------------------------------------------------------------------
*/

When(/^(?:|I ) go to (?:|the )homepage$/, (url) => {
    cy.visit('https://dealer.sata.com.testing.imi.de' + url)
});

When(/^(?:|I )am on "(?<page>[^"]+)"$/, page => {
    cy.visit(page);
});

When(/^(?:|I )move forward one page$/, () => {
    cy.go('back');
});

When(/^(?:|I )move backward one page$/, () => {
    cy.go('forward');
});

When(/^(?:|I )press "(?<button>(?:[^"]|\\")*)"$/, button => {
    cy.get('#' + button).click();
});

When(/^(?:|I )follow "(?<link>(?:[^"]|\\")*)"$/, () => {
    //tdb
});

When(/^(?:|I )fill in "(?<field>[^"]+)" with "(?<value>[^"]+)"$/, (field, value) => {
    cy.get("#" + field).type(value);
});

When(/^(?:|I )fill in "(?<field>)" with:$/, (field, dataTable) => {
    fillTableIntoField(field, dataTable);
});

When(/^(?:|I )fill in "(?<value>(?:[^"])+)" for "(?<field>(?:[^"])+)"$/, (value, field) => {
    cy.get('#' + field).type(value);
});

When(/^(?:|I )select "(?<option>(?:[^"]|\\")*)" from "(?<select>(?:[^"]|\\")*)"$/, (option,select)=>{
    cy.get("#"+select);
});

When('I click {string}', (el) => {
    cy.contains(el).click();
});

When("I reload the page", () => {
    cy.reload();
});

When('I select {string} from {string}', (el, selectForm) => {
    cy.get(selectForm).check(el);
});

When('I check {string}', (el) => {
    //to do
});

When('I uncheck {string}', (el) => {
    //to do
});

When('I attach {string} to {string}', (file, fileUploader) => {
    //to do
});

When('I click {string} in {string}', (el, parent) => {
    cy.get(parent).contains(el).click();
});

When('I click {string} via CSS', (el) => {
    cy.get("." + el).click();
});

When('I fill in the following:', (dataTable) => {
    fillFromTable(dataTable);
});

When('I select {string} for {string}', (value, select) => {
    cy.get(select).select(value);
});

When('I wait for {int} seconds', (seconds) => {
    cy.wait(seconds * 1000);
});

/*
|--------------------------------------------------------------------------
| THEN
|--------------------------------------------------------------------------
*/

Then('I see {string} in the title', (title) => {
    cy.title()
        .should('include', title);
});

Then('I see {string} in {string}', (title, htmlobj) => {
    cy.get(htmlobj)
        .should('include', title);
});

Then('I should be on {string}', (url) => {
    cy.url()
        .should('include', url);
});

Then('I see {string} in {string}', (text, htmlobj) => {
    cy.contains(htmlobj, text);
});

Then('The response should contain {string}', (response) => {
    //to do
});

Then('I should not see {string}', (response) => {
    //to do
});


Then('I should see {string} in {string}', (string, parent) => {
    cy.get(parent)
        .contains(string)
        .should('exist');
});

Then('I should see in {string}:', function (parent, dataTable) {
    dataTable.rawTable.forEach(function (value) {
        cy.get(parent)
            .contains(':visible', value[0])
            .should('exist');
    });
});

Then('I wait for {int} seconds', (seconds) => {
    cy.wait(seconds * 1000);
});

/*
|--------------------------------------------------------------------------
| FUNCTIONS
|--------------------------------------------------------------------------
*/

export let fillFromTable = function (table) {
    table.rawTable.forEach(function (value) {
        console.log(value);

        if (value[1] === "generated-mail-address") {
            value[1] = generateMailAddress();
        }
        cy.get('#' + value[0]).type(value[1]);

    });
}

export let fillTableIntoField = function (field, table) {
    table.rawTable.forEach(function (value) {

        cy.get('#' + field).type(value);

    });
}

function generateMailAddress() {
    return guid() + '@example.com'
}

/**
 * @see https://stackoverflow.com/a/105074/8374833
 * @returns {string}
 */
function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

/**
 * Mink
 * **/

