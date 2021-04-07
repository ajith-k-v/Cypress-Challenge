const moment = require("moment");
import constants from'../fixtures/constant.json';

Cypress.on('uncaught:exception', (err, runnable) => 
{
    return false;
});

var currentTime = moment().format("MMMM-DD-YYYY-HHmm-SSS").toLocaleLowerCase();

describe('Cypress challenge',function()
{
    it('Sign up and verify',function()
    {
        cy.visit('/')
        cy.get(':nth-child(6) > a').click();
        cy.get('[data-test-id="signup-email"]').type(`ajith-jaban-${currentTime}@example.com`);
        cy.get('input[name=get_started]').click();
        cy.get('[data-test-id="signup-password"]',{ timeout: 5000 }).type(constants.password);
        cy.get('input[name="continue"]').click();
        cy.get('[data-test-id="introduction-first-name"]',{ timeout: 9000 }).type(constants.firstName);
        cy.get('[data-test-id="introduction-last-name"]').type(constants.secondName);
        cy.get('[data-test-id="introduction-timezone"]').select('(GMT+05:30) New Delhi');
        cy.get('[id="%d/%m/%Y"]').click({force:true});
        cy.get('[data-test-id="introduction-terms-service-input"]').click();
        cy.get('[data-test-id="introduction-marketing-email-consent-input"]').click();
        cy.get('[data-test-id="introduction-submit"]').click();
        cy.get('[data-test-id="organization-name"]').type(constants.nameofYourCompany);
        cy.get('[data-test-id="organization-submit"]').click();
        cy.get('[data-test-id="client-form-skip"]').click();
        cy.get('.pl-4').should('have.text',constants.congratulationText);
        cy.get('[data-test-id="onboarding-continue"]').click();
        cy.get('[class="header verification-banner py-2"]', { timeout: 10000 }).contains(constants.verificationText);
        cy.get('[data-test-id="header-clients"]', { timeout: 5000 }).click();
        cy.get('[data-test-id="client-add-new"]').click();
        cy.get('[data-test-id="client-name"]').type(constants.clientName);
        cy.get('[data-test-id="client-submit"]').click();
        cy.get('[data-test-id="project-add-new"]').should('have.text',constants.addProjectText);
        cy.get('[data-test-id="project-name"]',{ timeout: 5000 }).type(constants.projectName);
        cy.get('[data-test-id="project-billing-method"]').select('Hourly project rate');
        cy.get('[data-test-id="project-rate"]').clear().type(constants.hourlyProjectRate);
        cy.get('[data-test-id="project-save"]').click({force:true});
        cy.get('.field-value[data-test-id="project-name"]').should('have.text',constants.trixWebText);
        cy.get('[data-test-id="project-billing-method"]',).should('have.text',constants.hourlyRateText);
        cy.get('[class="field-value white-space-pre-wrap text-break"]', { timeout: 10000 }).eq(0).should('have.text',constants.roundingText);
        cy.get('[data-test-id="project-team-member-table-name-1"]').should('have.text',constants.nameText);
        cy.get('[data-test-id="project-hourly-rate"]').should('have.text',constants.rateText);
    });
});