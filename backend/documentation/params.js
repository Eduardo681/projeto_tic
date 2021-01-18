var docs = [
  {
    "id": "login",
    "endpoint": "/login",
    "method": "POST",
    "params": [
      {
        "name": "login",
        "type": "string",
        "required": "true",
        "description": "E-mail de login do usuario"
      },
      {
        "name": "password",
        "type": "string",
        "required": "true",
        "description": "Senha correspondente ao cadastro do usuario"
      }
    ]
  },
  {
    "id": "post-clients-content",
    "endpoint": "/users/clients</span>",
    "method": "POST",
    "params": [
      {
        "name": "login",
        "type": "string",
        "required": "true",
        "description": "E-mail de login"
      },
      {
        "name": "password",
        "type": "string",
        "required": "true",
        "description": "Senha correspondente ao cadastro do usuario"
      },
      {
        "name": "type_user",
        "type": "string",
        "required": "true",
        "description": "Tipos possiveis : [administrator, service provider, client, provider_company, client_company]"
      },
      {
        "name": "birth",
        "type": "date",
        "required": "true",
        "description": "Data de nascimento ou de criação(caso empresa)"
      },
      {
        "name": "username",
        "type": "string",
        "required": "true",
        "description": "Nome de usuario"
      },
      {
        "name": "cpf_cnpj",
        "type": "string",
        "required": "true",
        "description": "CPF para pessoas fisicas e CNPJ para juridica"
      },
      {
        "name": "rg",
        "type": "string",
        "required": "false",
        "description": "Número de carteira de identidade"
      },
      {
        "name": "street",
        "type": "string",
        "required": "true",
        "description": "Rua de residencia do usuario"
      },
      {
        "name": "n_house",
        "type": "integer",
        "required": "true",
        "description": "Número da residencia do usuario"
      },
      {
        "name": "neighborhood",
        "type": "string",
        "required": "true",
        "description": "Bairro do usuario."
      },
      {
        "name": "zip_code",
        "type": "string",
        "required": "true",
        "description": "CEP da residencia do usuario"
      },
      {
        "name": "city",
        "type": "integer",
        "required": "true",
        "description": "Cidade da residencia do usuario"
      },
      {
        "name": "uf",
        "type": "integer",
        "required": "true",
        "description": "Estado de residencia do usuario"
      },
      {
        "name": "complement",
        "type": "string",
        "required": "false",
        "description": "Complemento do endereço se necessario"
      },
      {
        "name": "picture",
        "type": "string",
        "required": "false",
        "description": "Foto de perfil do usuario"
      },
      {
        "name": "company",
        "type": "bool",
        "required": "true",
        "description": "Identifica se cliente é empresa ou não"
      },
      {
        "name": "status_login",
        "type": "bool",
        "required": "true",
        "description": "Identifica se usuario esta ativo no app no momento ou não"
      },
      {
        "name": "status_active",
        "type": "string",
        "required": "true",
        "description": "Status possiveis - [active, inactive, blocked, waiting]"
      },
      {
        "name": "contact",
        "type": "string",
        "required": "true",
        "description": "Nome da pessoa que vai atender o prestador"
      },
    ]
  },
  {
    "id": "get-clients",
    "endpoint": "/users/clients",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "get-client-content",
    "endpoint": "/users/client/<span class='query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "Id do cliente a ser recuperado no banco de dados"
      },
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "put-client-content",
    "endpoint": "/users/client/<span class='query-param'>id</span>",
    "method": "PUT",
    "params": [
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "Id do cliente a ser atualizado no banco de dados"
      },
      {
        "name": "type_user",
        "type": "string",
        "required": "true",
        "description": "Tipos possiveis : [administrator, service provider, client, provider_company, client_company]"
      },
      {
        "name": "birth",
        "type": "date",
        "required": "true",
        "description": "Data de nascimento ou de criação(caso empresa)"
      },
      {
        "name": "username",
        "type": "string",
        "required": "true",
        "description": "Nome de usuario"
      },
      {
        "name": "cpf_cnpj",
        "type": "string",
        "required": "true",
        "description": "CPF para pessoas fisicas e CNPJ para juridica"
      },
      {
        "name": "rg",
        "type": "string",
        "required": "false",
        "description": "Número de carteira de identidade"
      },
      {
        "name": "street",
        "type": "string",
        "required": "true",
        "description": "Rua de residencia do usuario"
      },
      {
        "name": "n_house",
        "type": "integer",
        "required": "true",
        "description": "Número da residencia do usuario"
      },
      {
        "name": "neighborhood",
        "type": "string",
        "required": "true",
        "description": "Bairro do usuario."
      },
      {
        "name": "zip_code",
        "type": "string",
        "required": "true",
        "description": "CEP da residencia do usuario"
      },
      {
        "name": "city",
        "type": "integer",
        "required": "true",
        "description": "Cidade da residencia do usuario"
      },
      {
        "name": "uf",
        "type": "integer",
        "required": "true",
        "description": "Estado de residencia do usuario"
      },
      {
        "name": "complement",
        "type": "string",
        "required": "false",
        "description": "Complemento do endereço se necessario"
      },
      {
        "name": "picture",
        "type": "string",
        "required": "false",
        "description": "Foto de perfil do usuario"
      },
      {
        "name": "company",
        "type": "boll",
        "required": "true",
        "description": "Identifica se cliente é empresa ou não"
      },
      {
        "name": "status_login",
        "type": "boll",
        "required": "true",
        "description": "Identifica se usuario esta ativo no app no momento ou não"
      },
      {
        "name": "status_active",
        "type": "string",
        "required": "true",
        "description": "Status possiveis - [active, inactive, blocked, waiting]"
      },
      {
        "name": "contact",
        "type": "string",
        "required": "true",
        "description": "Nome da pessoa que vai atender o prestador"
      },
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "del-client-content",
    "endpoint": "/users/client/<span class='query-param'>id</span>",
    "method": "DELETE",
    "params": [
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "Id do cliente a ser deletado no banco de dados"
      },
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "post-providers-content",
    "endpoint": "/users/providers</span>",
    "method": "POST",
    "params": [
      {
        "name": "login",
        "type": "string",
        "required": "true",
        "description": "E-mail de login"
      },
      {
        "name": "password",
        "type": "string",
        "required": "true",
        "description": "Senha correspondente ao cadastro do usuario"
      },
      {
        "name": "type_user",
        "type": "string",
        "required": "true",
        "description": "Tipos possiveis : [administrator, service provider, client, provider_company, client_company]"
      },
      {
        "name": "birth",
        "type": "date",
        "required": "true",
        "description": "Data de nascimento ou de criação(caso empresa)"
      },
      {
        "name": "username",
        "type": "string",
        "required": "true",
        "description": "Nome de usuario"
      },
      {
        "name": "cpf_cnpj",
        "type": "string",
        "required": "true",
        "description": "CPF para pessoas fisicas e CNPJ para juridica"
      },
      {
        "name": "rg",
        "type": "string",
        "required": "false",
        "description": "Número de carteira de identidade"
      },
      {
        "name": "street",
        "type": "string",
        "required": "true",
        "description": "Rua de residencia do usuario"
      },
      {
        "name": "n_house",
        "type": "integer",
        "required": "true",
        "description": "Número da residencia do usuario"
      },
      {
        "name": "neighborhood",
        "type": "string",
        "required": "true",
        "description": "Bairro do usuario."
      },
      {
        "name": "zip_code",
        "type": "string",
        "required": "true",
        "description": "CEP da residencia do usuario"
      },
      {
        "name": "city",
        "type": "integer",
        "required": "true",
        "description": "Cidade da residencia do usuario"
      },
      {
        "name": "uf",
        "type": "integer",
        "required": "true",
        "description": "Estado de residencia do usuario"
      },
      {
        "name": "complement",
        "type": "string",
        "required": "false",
        "description": "Complemento do endereço se necessario"
      },
      {
        "name": "picture",
        "type": "string",
        "required": "false",
        "description": "Foto de perfil do usuario"
      },
      {
        "name": "company",
        "type": "bool",
        "required": "true",
        "description": "Identifica se cliente é empresa ou não"
      },
      {
        "name": "status_login",
        "type": "bool",
        "required": "true",
        "description": "Identifica se usuario esta ativo no app no momento ou não"
      },
      {
        "name": "status_active",
        "type": "string",
        "required": "true",
        "description": "Status possiveis - [active, inactive, blocked, waiting]"
      },
      {
        "name": "validate",
        "type": "bool",
        "required": "true",
        "description": "Indica se o cadastro do prestador foi validado"
      },
      {
        "name": "bank_agency",
        "type": "string",
        "required": "true",
        "description": "Número da agencia bancaria do prestador"
      },
      {
        "name": "bank_account",
        "type": "string",
        "required": "true",
        "description": "Conta bancaria para o repasse"
      },
      {
        "name": "n_bank",
        "type": "string",
        "required": "true",
        "description": "Número do banco do prestador"
      },
      {
        "name": "name_bank",
        "type": "string",
        "required": "true",
        "description": "Nome do banco do prestador"
      },
      {
        "name": "boost",
        "type": "bool",
        "required": "true",
        "description": "Indica se o prestador esta com boost ativo"
      },
      {
        "name": "name_mom",
        "type": "string",
        "required": "true",
        "description": "Nome da mãe do prestador"
      }
    ]
  },
  {
    "id": "get-providers-content",
    "endpoint": "/users/providers",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "get-provider-content",
    "endpoint": "/users/provider/<span class='query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "put-provider-content",
    "endpoint": "/users/provider/<span class='query-param'>id</span>",
    "method": "PUT",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "type_user",
        "type": "string",
        "required": "true",
        "description": "Tipos possiveis : [administrator, service provider, client, provider_company, client_company]"
      },
      {
        "name": "birth",
        "type": "date",
        "required": "true",
        "description": "Data de nascimento ou de criação(caso empresa)"
      },
      {
        "name": "username",
        "type": "string",
        "required": "true",
        "description": "Nome de usuario"
      },
      {
        "name": "cpf_cnpj",
        "type": "string",
        "required": "true",
        "description": "CPF para pessoas fisicas e CNPJ para juridica"
      },
      {
        "name": "rg",
        "type": "string",
        "required": "false",
        "description": "Número de carteira de identidade"
      },
      {
        "name": "street",
        "type": "string",
        "required": "true",
        "description": "Rua de residencia do usuario"
      },
      {
        "name": "n_house",
        "type": "integer",
        "required": "true",
        "description": "Número da residencia do usuario"
      },
      {
        "name": "neighborhood",
        "type": "string",
        "required": "true",
        "description": "Bairro do usuario."
      },
      {
        "name": "zip_code",
        "type": "string",
        "required": "true",
        "description": "CEP da residencia do usuario"
      },
      {
        "name": "city",
        "type": "integer",
        "required": "true",
        "description": "Cidade da residencia do usuario"
      },
      {
        "name": "uf",
        "type": "integer",
        "required": "true",
        "description": "Estado de residencia do usuario"
      },
      {
        "name": "complement",
        "type": "string",
        "required": "false",
        "description": "Complemento do endereço se necessario"
      },
      {
        "name": "picture",
        "type": "string",
        "required": "false",
        "description": "Foto de perfil do usuario"
      },
      {
        "name": "company",
        "type": "bool",
        "required": "true",
        "description": "Identifica se cliente é empresa ou não"
      },
      {
        "name": "status_login",
        "type": "bool",
        "required": "true",
        "description": "Identifica se usuario esta ativo no app no momento ou não"
      },
      {
        "name": "status_active",
        "type": "string",
        "required": "true",
        "description": "Status possiveis - [active, inactive, blocked, waiting]"
      },
      {
        "name": "validate",
        "type": "bool",
        "required": "true",
        "description": "Indica se o cadastro do prestador foi validado"
      },
      {
        "name": "bank_agency",
        "type": "string",
        "required": "true",
        "description": "Número da agencia bancaria do prestador"
      },
      {
        "name": "bank_account",
        "type": "string",
        "required": "true",
        "description": "Conta bancaria para o repasse"
      },
      {
        "name": "n_bank",
        "type": "string",
        "required": "true",
        "description": "Número do banco do prestador"
      },
      {
        "name": "name_bank",
        "type": "string",
        "required": "true",
        "description": "Nome do banco do prestador"
      },
      {
        "name": "boost",
        "type": "bool",
        "required": "true",
        "description": "Indica se o prestador esta com boost ativo"
      },
      {
        "name": "name_mom",
        "type": "string",
        "required": "true",
        "description": "Nome da mãe do prestador"
      }
    ]
  },
  {
    "id": "del-provider-content",
    "endpoint": "/users/provider/<span class='query-param'>id</span>",
    "method": "DELETE",
    "params": [
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "Id do cliente a ser deletado no banco de dados"
      },
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "post-services-content",
    "endpoint": "/services",
    "method": "POST",
    "params": [
      {
        "name": "title_service",
        "type": "string",
        "required": "true",
        "description": "Titulo resumido do serviço"
      },
      {
        "name": "description",
        "type": "string",
        "required": "true",
        "description": "Descrição completa do serviço"
      },
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo prestador ou adm"
      }
    ]
  },
  {
    "id": "get-services-content",
    "endpoint": "/services",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "get-service-content",
    "endpoint": "/service/<span class='query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "ID do serviço a ser recuperado no banco de dados"
      }
    ]
  },
  {
    "id": "post-providers-services-content",
    "endpoint": "/users/provider/service",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo prestador"
      },
      {
        "name": "id_provider",
        "type": "integer",
        "required": "true",
        "description": "ID do prestador a ser associado"
      },
      {
        "name": "id_service",
        "type": "integer",
        "required": "true",
        "description": "ID do serviço a ser associado"
      }
    ]
  },
  {
    "id": "get-providers-services-content",
    "endpoint": "/users/providers/services",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "get-provider-service-content",
    "endpoint": "/provider-service?<span class='query-param'>provider_id=00</span>&&<span class='query-param'>service_id=00</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "provider_id",
        "type": "integer",
        "required": "false",
        "description": "ID do prestador que deseja recuperar as associassões com serviços"
      },
      {
        "name": "service_id",
        "type": "integer",
        "required": "false",
        "description": "ID do serviço que deseja recuperar as associassões com prestadores"
      }
    ]
  },
  {
    "id": "del-provider-service-content",
    "endpoint": "/provider-service?<span class='query-param'>provider_id=00</span>&&<span class='query-param'>service_id=00</span>",
    "method": "DELETE",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "provider_id",
        "type": "integer",
        "required": "true",
        "description": "ID do prestador que deseja deletar a assossiação"
      },
      {
        "name": "service_id",
        "type": "integer",
        "required": "true",
        "description": "ID do serviço que deseja deletar a associação"
      }
    ]
  },
  {
    "id": "post-coments-content",
    "endpoint": "/coments",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo cliente"
      },
      {
        "name": "id_provider",
        "type": "integer",
        "required": "true",
        "description": "ID do prestador que vai receber o comentario"
      },
      {
        "name": "coment",
        "type": "string",
        "required": "true",
        "description": "Texto do comentario"
      }
    ]
  },
  {
    "id": "get-coments-content",
    "endpoint": "/coments",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id_provider",
        "type": "integer",
        "required": "true",
        "description": "ID do prestador a ter os comentarios recuperados"
      }
    ]
  },
  {
    "id": "get-coment-content",
    "endpoint": "/coment/<span class='query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "ID do comentario a ser recuperado"
      }
    ]
  },
  {
    "id": "post-adresses-content",
    "endpoint": "/users/client/adresses",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo cliente"
      },
      {
        "name": "street",
        "type": "string",
        "required": "true",
        "description": "Rua da manutenção"
      },
      {
        "name": "n_house",
        "type": "integer",
        "required": "true",
        "description": "Número da casa da manutenção"
      },
      {
        "name": "neighborhood",
        "type": "string",
        "required": "true",
        "description": "Bairro"
      },
      {
        "name": "zip_code",
        "type": "string",
        "required": "true",
        "description": "CEP do endereço."
      },
      {
        "name": "city",
        "type": "string",
        "required": "true",
        "description": "Cidade do endereço."
      },
      {
        "name": "UF",
        "type": "string",
        "required": "true",
        "description": "Estado do endereço."
      },
      {
        "name": "complement",
        "type": "string",
        "required": "false",
        "description": "Complemento do endereço se necessario."
      },
      
      
    ]
  },
  {
    "id": "get-adresses-content",
    "endpoint": "/users/client/<span class = 'query-param'>id/</span>adresses",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
      
    ]
  },
  {
    "id": "get-adress-content",
    "endpoint": "/users/client/adress/<span class = 'query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "ID do endereço a ser recuperado"
      }
      
    ]
  },
  {
    "id": "del-adress-content",
    "endpoint": "/users/client/adress/<span class = 'query-param'>id</span>",
    "method": "DELETE",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "ID do endereço a ser deletado"
      }
    ]
  },
  {
    "id": "put-adress-content",
    "endpoint": "/users/client/adress/<span class = 'query-param'>id</span>",
    "method": "PUT",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo cliente"
      },
      {
        "name": "street",
        "type": "string",
        "required": "true",
        "description": "Rua da manutenção"
      },
      {
        "name": "n_house",
        "type": "integer",
        "required": "true",
        "description": "Número da casa da manutenção"
      },
      {
        "name": "neighborhood",
        "type": "string",
        "required": "true",
        "description": "Bairro"
      },
      {
        "name": "zip_code",
        "type": "string",
        "required": "true",
        "description": "CEP do endereço."
      },
      {
        "name": "city",
        "type": "string",
        "required": "true",
        "description": "Cidade do endereço."
      },
      {
        "name": "UF",
        "type": "string",
        "required": "true",
        "description": "Estado do endereço."
      },
      {
        "name": "complement",
        "type": "string",
        "required": "false",
        "description": "Complemento do endereço se necessario."
      }
    ]
  },
  {
    "id": "post-chat-content",
    "endpoint": "/chat",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id_provider",
        "type": "integer",
        "required": "true",
        "description": "ID do prestador"
      },
      {
        "name": "id_client",
        "type": "integer",
        "required": "true",
        "description": "ID do cliente"
      },
      {
        "name": "message",
        "type": "string",
        "required": "true",
        "description": "Corpo da mensagem a ser enviada"
      },
      {
        "name": "media",
        "type": "string",
        "required": "false",
        "description": "Arquivo de midia"
      }
    ]
  },
  {
    "id": "get-chat-content",
    "endpoint": "/chat",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "put-chat-content",
    "endpoint": "/chat/<span class= 'query-param'>id</span>",
    "method": "PUT",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "date_received",
        "type": "date",
        "required" : "false",
        "description": "Data de recebimento da mensagem"
      },
      {
        "name": "message_received",
        "type": "bool",
        "required" : "false",
        "description" : "Mensagem recebida ?"
      }
    ]
  },
  {
    "id": "post-schedules-content",
    "endpoint": "/schedules",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id_provider",
        "type": "integer",
        "required" : "true",
        "description": "ID do prestador"
      },
      {
        "name": "id_adresse",
        "type": "integer",
        "required" : "true",
        "description" : "ID do endereço da manutenção"
      }, 
      {
        "name":"date",
        "type":"date",
        "required": "true",
        "description": "Data do agendamento"
      },
      {
        "name": "your",
        "type":"datetime",
        "required": "true",
        "description": "Horario do agendamento"
      },
      {
        "name":"description",
        "type":"string",
        "required":"true",
        "description": "Descrição da atividade a ser realizada no agendamento"
      },
    ]
  },
  {
    "id": "get-schedules-content",
    "endpoint": "/schedules",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
    ]
  },
  {
    "id": "get-schedule-content",
    "endpoint": "/schedule/<span class='query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type":"integer",
        "required": "true",
        "description": "ID do agendamento a ser recuperado"
      }
    ]
  },
  {
    "id": "put-schedule-content",
    "endpoint": "/schedule/<span class='query-param'>id</span>",
    "method": "PUT",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id_provider",
        "type": "integer",
        "required" : "false",
        "description": "ID do prestador"
      },
      {
        "name": "id_adresse",
        "type": "integer",
        "required" : "false",
        "description" : "ID do endereço da manutenção"
      }, 
      {
        "name":"date",
        "type":"date",
        "required": "false",
        "description": "Data do agendamento"
      },
      {
        "name": "your",
        "type":"datetime",
        "required": "false",
        "description": "Horario do agendamento"
      },
      {
        "name":"description",
        "type":"string",
        "required":"false",
        "description": "Descrição da atividade a ser realizada no agendamento"
      },
    ]
  },
  {
    "id": "del-schedule-content",
    "endpoint": "/schedule/<span class='query-param'>id</span>",
    "method": "DELETE",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type":"integer",
        "required": "true",
        "description": "ID do agendamento a ser deletado"
      }
    ]
  },
  {
    "id": "post-os-content",
    "endpoint": "/os",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id_diary",
        "type": "integer",
        "required": "true",
        "description": "ID do agendamento que a ordem de serviço faz referencia"
      },
      {
        "name": "value_manpower",
        "type": "double",
        "required": "false",
        "description": "Valor da mão de obra"
      }
    ]
  },
  {
    "id": "get-os-content",
    "endpoint": "/os",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "get-os-id-content",
    "endpoint": "/os/<span class='query-param'>id</span",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "ID da Ordem de Serviço a ser recuperada"
      }
    ]
  },
  {
    "id": "put-os-content",
    "endpoint": "/os/<span class='query-param'>id</span",
    "method": "PUT",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      },
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "ID da Ordem de Serviço a ser atualizada"
      },
      {
        "name": "status_os",
        "type": "string",
        "required": "false",
        "description": "Status da Ordem de Serviço - valores aceitos (pendent, finished, awaiting_payment, canceled"
      },
      {
        "name": "value_manpower",
        "type": "double",
        "required": "false",
        "description": "Valor da mão de obra"
      },
      {
        "name": "maintenance_description",
        "type": "string",
        "required": "false",
        "description": "Descrição da Ordem de Serviço"
      }
    ]
  },
  {
    "id": "post-products-content",
    "endpoint": "/products",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo prestador"
      },
      {
        "name": "description",
        "type": "string",
        "required": "true",
        "description": "Descrição do produto"
      }
    ]
  },
  {
    "id": "get-products-content",
    "endpoint": "/products",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "get-product-content",
    "endpoint": "/product/<span class='query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }
    ]
  },
  {
    "id": "put-product-content",
    "endpoint": "/product/<span class='query-param'>id</span>",
    "method": "PUT",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo administrador"
      }, 
      {
        "name": "description",
        "type": "string",
        "required": "false",
        "description": "Descrição do produto"
      },
      {
        "name": "status",
        "type": "integer",
        "required": "false",
        "description": "Status do produto - 1 ativo, 0 inativo"
      }
    ]
  },
  {
    "id": "post-os-product-content",
    "endpoint": "/os/products",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo administrador"
      }, 
      {
        "name": "id_os",
        "type": "integer",
        "required": "true",
        "description": "ID da Ordem de Serviço"
      },
      {
        "name": "id_product",
        "type": "integer",
        "required": "true",
        "description": "ID do produto"
      },
      {
        "name": "amount",
        "type": "integer",
        "required": "true",
        "description": "Quantidade do produto"
      },
      {
        "name": "value_unitary",
        "type": "double",
        "required": "true",
        "description": "Preço unitario do produto"
      }
    ]
  },
  {
    "id": "del-os-product-content",
    "endpoint": "/os/products",
    "method": "DELETE",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo administrador"
      }, 
      {
        "name": "id_os",
        "type": "integer",
        "required": "true",
        "description": "ID da Ordem de Serviço"
      },
      {
        "name": "id_product",
        "type": "integer",
        "required": "true",
        "description": "ID do produto"
      }
    ]
  },
  {
    "id": "get-os-product-content",
    "endpoint": "/os/<span class='query-param'>id</span>/products",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo administrador"
      }, 
      {
        "name": "id",
        "type": "integer",
        "required": "true",
        "description": "ID da Ordem de Serviço"
      },
    ]
  },
  {
    "id": "get-favorites",
    "endpoint": "/users/favorites",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo cliente"
      }, 
    ]
  },
  {
    "id": "post-favorites",
    "endpoint": "/users/favorites/<span class='query-param'>id</span>",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo cliente"
      }, 
      {
        "name": "id",
        "type": "string",
        "required": "true",
        "description": "ID do prestador a ser adicionado nos favoritos"
      }
    ]
  },
  {
    "id": "del-favorites",
    "endpoint": "/users/favorites/<span class='query-param'>id</span>",
    "method": "DELETE",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token do tipo cliente"
      }, 
      {
        "name": "id",
        "type": "string",
        "required": "true",
        "description": "ID do prestador a ser removido nos favoritos"
      }
    ]
  },
  {
    "id": "get-working",
    "endpoint": "/users/provider/<span class='query-param'>id</span>/working_yours/",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }, 
      {
        "name": "id",
        "type": "string",
        "required": "true",
        "description": "ID do prestador a ter os horarios recuperados"
      }
    ]
  },
  {
    "id": "post-working",
    "endpoint": "/users/provider/working_yours/",
    "method": "POST",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }, 
      {
        "name": "day_of_week",
        "type": "string",
        "required": "true",
        "description": "Dia da semana"
      },
      {
        "name": "start_time",
        "type": "string",
        "required": "true",
        "description": "Horario de inicio"
      },
      {
        "name": "final_hour",
        "type": "string",
        "required": "true",
        "description": "Horario final"
      }
    ]
  },
  {
    "id": "get-working-one",
    "endpoint": "/users/provider/working_yours/<span class='query-param'>id</span>",
    "method": "GET",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }, 
      {
        "name": "id",
        "type": "string",
        "required": "true",
        "description": "ID a ser buscado"
      }
    ]
  },
  {
    "id": "del-working",
    "endpoint": "/users/provider/working_yours/<span class='query-param'>id</span>",
    "method": "DELETE",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }, 
      {
        "name": "id",
        "type": "string",
        "required": "true",
        "description": "ID a ser deletado"
      }
    ]
  },
  {
    "id": "put-working",
    "endpoint": "/users/provider/working_yours/<span class='query-param'>id</span>",
    "method": "PUT",
    "params": [
      {
        "name": "token",
        "type": "string",
        "required": "true",
        "description": "Bearer Token"
      }, 
      {
        "name": "id",
        "type": "string",
        "required": "true",
        "description": "ID a ser deletado"
      },
      {
        "name": "day_of_week",
        "type": "string",
        "required": "false",
        "description": "Dia da semana"
      },
      {
        "name": "start_time",
        "type": "string",
        "required": "false",
        "description": "Horario de inicio"
      },
      {
        "name": "final_hour",
        "type": "string",
        "required": "false",
        "description": "Horario final"
      }
    ]
  },
];