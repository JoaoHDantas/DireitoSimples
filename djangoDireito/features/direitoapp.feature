Feature: Acesso ao sistema
    Como usuário, eu quero acessar o sistema com user e senha, para que eu possa utilizar com minha conta.
Scenario: Realizando login
    Given Campos vazios e usuario não logado
    When o usuário preenche todos os campos obrigatórios no formulário de login e clica em "Entrar"
    Then o usuãrio é redirecionado para HomePage