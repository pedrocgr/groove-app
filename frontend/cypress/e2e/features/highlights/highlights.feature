Feature: Em Alta

Scenario: Exibir informações sobre as músicas em alta
  Given o usuário está na página "/"
  When o usuário clica no "highlights"
  Then o usuário deve ser redirecionado à página "in-high" e visualizar a música "Lover" e a música "Lover" e a música "Lover" e a música "Lover" e a música "Lover" e a música "Lover" e a música "Lover" e a música "Lover" e a música "Lover" e a música "Lover"

Scenario: Tratamento de música indisponível em serviços externos
  Given o usuário está na página "in-high"
  When o usuário clica na imagem "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/summer-music-album-cover-template-design-59377ace589326768f660ee5d60e2d48_screen.jpg?ts=1566602098"