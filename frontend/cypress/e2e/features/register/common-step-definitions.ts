import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page);
});

When("o usuário clica em {string}", (button: string) => {
  cy.getDataCy(button).click();
});


When('o usuario clica em "submmit"', () => {
  cy.getDataCy('submmit').click();
}
);
Then("o modal é fechado e o usuário visualiza a mensagem {string}", (text: string) => {
  cy.getDataCy('alert_message_modal').should('contain', text);
});