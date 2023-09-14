import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page);
});

Then('o usuário deve ver a música {string} na tela', (musicTitle: string) => {
  cy.getDataCy(musicTitle).should("contain", musicTitle);
});