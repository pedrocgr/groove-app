Feature: Melhores Avaliadas

Scenario: Exibir melhores avaliadas
    Given o usuário está na página "/"
    When o usuário clica no "top-rated"
    Then o usuário deve ser à pagina "top-rated" e ver a música "Borderline"

