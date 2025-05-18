const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Brokkr",
    description: "Documentação da API Brokkr",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Servidor de desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Alunos",
      description: "Operações relacionadas a alunos"
    },
    {
      name: "Cursos",
      description: "Operações relacionadas a cursos"
    },
    {
      name: "Matriculas",
      description: "Operações relacionadas a matrículas"
    }
  ],

  paths: {
    "/alunos": {
      post: {
        tags: ["Alunos"],
        summary: "Cadastrar aluno",
        description: "Cadastra um novo aluno e retorna o objeto criado.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  email: { type: "string" },
                  dataNascimento: { type: "string", format: "date" },
                },
                required: ["nome", "email", "dataNascimento"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Aluno criado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    nome: { type: "string" },
                    email: { type: "string" },
                    dataNascimento: { type: "string", format: "date" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/alunos/{id}": {
      get: {
        tags: ["Alunos"],
        summary: "Buscar um aluno",
        description: "Retorna um aluno pelo ID fornecido.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do aluno",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Aluno encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    nome: { type: "string" },
                    email: { type: "string" },
                    dataNascimento: { type: "string", format: "date" },
                  },
                },
              },
            },
          },
          404: {
            description: "Aluno não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Alunos"],
        summary: "Atualizar aluno",
        description: "Atualiza as informações de um aluno existente.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do aluno",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  email: { type: "string" },
                  dataNascimento: { type: "string", format: "date" },
                },
                required: ["nome", "email", "dataNascimento"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Aluno atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    nome: { type: "string" },
                    email: { type: "string" },
                    dataNascimento: { type: "string", format: "date" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          404: {
            description: "Aluno não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Alunos"],
        summary: "Excluir aluno",
        description: "Exclui um aluno pelo ID fornecido.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do aluno",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Aluno excluído com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          404: {
            description: "Aluno não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/alunos/list-alunos-by-curso/{id}": {
      get: {
        tags: ["Alunos"],
        summary: "Listar alunos por curso",
        description: "Retorna os detalhes do curso e uma lista de alunos matriculados no curso especificado pelo ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do curso para listar os alunos matriculados",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Detalhes do curso e lista de alunos retornados com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    curso: {
                      type: "object",
                      properties: {
                        nome: { type: "string" },
                        descricao: { type: "string" },
                      },
                    },
                    alunos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          nome: { type: "string" },
                          email: { type: "string" },
                          dataMatricula: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Curso não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    ///cursos
    "/cursos": {
      post: {
        tags: ["Cursos"],
        summary: "Cadastrar curso",
        description: "Cadastra um novo curso e retorna o objeto criado.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  descricao: { type: "string" },
                },
                required: ["nome", "descricao"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Curso criado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/cursos/{id}": {
      get: {
        tags: ["Cursos"],
        summary: "Buscar um curso",
        description: "Retorna um curso pelo ID fornecido.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do curso",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Curso encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                  },
                },
              },
            },
          },
          404: {
            description: "Curso não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Cursos"],
        summary: "Atualizar curso",
        description: "Atualiza as informações de um curso existente.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do curso",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  descricao: { type: "string" },
                },
                required: ["nome", "descricao"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Curso atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          404: {
            description: "Curso não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Cursos"],
        summary: "Excluir curso",
        description: "Exclui um curso pelo ID fornecido.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do curso",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Curso excluído com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          404: {
            description: "Curso não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/cursos/list-cursos-by-aluno/{id}": {
      get: {
        tags: ["Cursos"],
        summary: "Listar cursos por aluno",
        description: "Retorna os detalhes do aluno e uma lista de cursos especificado pelo ID do aluno.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do curso para listar os alunos matriculados",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Detalhes do curso e lista de alunos retornados com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    aluno: {
                      type: "object",
                      properties: {
                        nome: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                    cursos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          nome: { type: "string" },
                          email: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Curso não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    ///matriculas
    "/matriculas": {
      post: {
        tags: ["Matriculas"],
        summary: "Criar matrícula",
        description: "Cria uma nova matrícula associando um aluno a um curso.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  alunoId: { type: "string" },
                  cursoId: { type: "string" },
                },
                required: ["alunoId", "cursoId"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Matrícula criada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    aluno: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        nome: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                    curso: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        nome: { type: "string" },
                        descricao: { type: "string" },
                      },
                    },
                    dataMatricula: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/matriculas/{id}": {
      get: {
        tags: ["Matriculas"],
        summary: "Buscar matrícula por ID",
        description: "Retorna uma matrícula pelo ID fornecido.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID da matrícula",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Matrícula encontrada.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    aluno: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        nome: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                    curso: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        nome: { type: "string" },
                        descricao: { type: "string" },
                      },
                    },
                    dataMatricula: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          404: {
            description: "Matrícula não encontrada.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Matriculas"],
        summary: "Listar matrículas",
        description: "Retorna uma lista de matrículas cadastradas.",
        responses: {
          200: {
            description: "Lista de matrículas retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      aluno: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          nome: { type: "string" },
                          email: { type: "string" },
                        },
                      },
                      curso: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          nome: { type: "string" },
                          descricao: { type: "string" },
                        },
                      },
                      dataMatricula: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Matriculas"],
        summary: "Excluir matrícula",
        description: "Exclui uma matrícula pelo ID fornecido.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID da matrícula",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "Matrícula excluída com sucesso.",
          },
          404: {
            description: "Matrícula não encontrada.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    }
  },
}

export { swaggerDocument }
