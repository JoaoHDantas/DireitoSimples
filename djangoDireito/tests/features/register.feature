Feature: Registro de usuário

  Scenario: Registro com dados válidos
    Given que não existe um usuário com email "teste@exemplo.com"
    When eu tento registrar com email "teste@exemplo.com", senha "123456" e username "teste"
    Then o usuário deve ser criado com sucesso
