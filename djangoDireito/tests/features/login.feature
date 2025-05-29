Feature: Login de usuário

  Scenario: Login com credenciais válidas
    Given que um usuário "admin" com senha "admin" existe
    When ele tentar fazer login com essas credenciais
    Then ele deve receber um token de acesso
