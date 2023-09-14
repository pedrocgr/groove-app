import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: teste de busca por artista
//Given: common-step-definitions.ts
//Then: common-step-definitions.ts

When(
  "o usuário preenche o campo {string} com {string} e clica no botão {string}",
  (field: string, value: string, button: string) => {
    cy.getDataCy(field).type(value);
    cy.getDataCy(button).click();
  }
);

// Scenario: teste de busca por ano
//Given: common-step-definitions.ts
//Then: common-step-definitions.ts

When(
  "o usuário clica no botão {string} e preenche o campo {string} com {string} e clica no botão {string}",
  (button: string, field: string, value: string, button2: string) => {
    cy.getDataCy(button).click();
    cy.getDataCy(field).type(value);
    cy.getDataCy(button2).click();
  }
);

// Scenario: teste de busca invalida
//Given: common-step-definitions.ts

When(
  "o usuário preenche o input {string} com {string} e clica no botão {string}",
  (field: string, value: string, button: string) => {
    cy.getDataCy(field).type(value);
    cy.getDataCy(button).click();
  }
);

Then('o usuário deve ver a mensagem de erro na tela', () => {
  cy.get('[data-testid=ErrorContainer]').should('be.visible');
  cy.get('[data-testid=ErrorMsg]').should('contain.text', 'Oooops! Parece que estamos enfrentando problemas ao localizar sua pesquisa.');
  cy.get('[data-testid=ErrorOtherMsg]').should('contain.text', 'Tente refazer a busca.');
});

// Scenario: teste de busca por genero
//Given: common-step-definitions.ts

When('o usuário clica no botão {string} e seleciona a opção "Pop" no dropdown de gênero e clica no botão {string}', 
  (button1: string, button2: string) => {
  cy.getDataCy(button1).click();
  cy.get('[data-cy=GenreButton]').select('Pop');
  cy.getDataCy(button2).click();
});

Then('o usuário deve ver a música {string} e a música {string} e a música {string} na tela', 
  (musicTitle1: string, musicTitle2: string, musicTitle3: string) => {
  cy.getDataCy(musicTitle1).should("contain", "lover");
  cy.getDataCy(musicTitle2).should("contain", "Flowers");
  cy.getDataCy(musicTitle3).should("contain", "Vampire");
});
