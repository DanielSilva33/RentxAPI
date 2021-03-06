**RF** -> Requisitos Funcionais.

**RNF** -> Requisitos não Funcionais.

**RN** -> Regra de negócio.

---

"email": "admin@rentx.com.br",
"password": "admin"

# Cadastro de carro

**RF**

-   Deve ser possivel cadastrar um novo carro.
-   Deve ser possível listar todas as categorias.

**RN**

-   Não deve ser possivel cadastrar um carro com uma placa já existente.
-   Não deve ser possivel alterar a placa de um carro já cadastrado.
-   O carro deve ser cadastrado, por padrão com disponibilidade.
-   O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**

-   Deve ser possível listar todos os carros disponíveis.
-   Dev ser possível listar todos os carros disponíveis pelo nome da categoria.
-   Dev ser possível listar todos os carros disponíveis pelo nome da marca.
-   Dev ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

-   O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**

-   Deve ser possível cadastrar uma especificação para um carro.
-   Deve ser possível listar todas as especificações.
-   Deve ser possível listar todas os carros.

**RN**

-   Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
-   Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
-   O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**

-   Deve ser possível cadastrar a imagem do carro.
-   Deve ser possível listar todos os carros.

**RNF**

-   Utilizar o multer para upload do arquivo.

**RN**

-   O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
-   O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carros

**RF**

-   Deve ser possível cadastrar um aluguel.

**RN**

-   O aluguel deve ter duração minima de 24 hora.
-   Não deve ser possível cadastrar um novo aluguel caso já exista para o mesmo usuário.
-   Não deve ser possível cadastrar um novo aluguel caso já exista para o mesmo carro.
