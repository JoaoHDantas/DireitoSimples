Feature: Acesso ao sistema
    Como usuário, eu quero acessar o sistema com user e senha, para que eu possa utilizar com minha conta.
Scenario: Realizando login
    Given que o usuário não está logado no sistema
    When o usuário preenche todos os campos obrigatórios no formulário de login e clica em "Entrar"
    Then o usuário é redirecionado para HomePage