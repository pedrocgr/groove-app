import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Given está em common-step-definitions.ts

When("o usuário clica no {string}", (button: string) => {
  cy.getDataCy(button).click();
});

Then("o usuário deve ser à pagina {string} e ver a música {string}", (page: string, musicTitle: string) => {
  // Verifique se o URL atual é o esperado
  cy.url().should('include', page);
  
  // Verifique se o título da música está sendo exibido na página
  cy.contains(musicTitle).should('be.visible');
});

// Scenario: Visualizar tests
//Given: common-step-definitions.ts

//When("o usuário clica na imagem {string}", (button: string) => {
//    cy.getDataCy(button).click();
//    }
//);