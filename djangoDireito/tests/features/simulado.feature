Feature: Acesso ao simulado

  Scenario: Usuário realiza um simulado
    Given que o usuário "admin" está autenticado com senha "admin"
    When ele acessa um simulado com ID 1
    Then ele deve receber as questões do simulado
