
# API Brokkr - Desafio

Este repositório contém a API desenvolvida para o desafio técnico da **Brokkr**.

## 📂 Conteúdo do Projeto

- 🗃️ Uma cópia do banco de dados em formato `.sql` está disponível na raiz do projeto.
- 🔄 Dois arquivos de exportação de requisições estão incluídos:
  - Um para **Postman**
  - Outro para **Insomnia**

Esses arquivos podem ser importados para facilitar o teste das rotas da API.

## ▶️ Como rodar a aplicação

Siga os passos abaixo, na ordem indicada:

1. Instale as dependências:
   ```bash
   yarn
   ```
   ou
   ```bash
   npm install
   ```

2. Suba o banco de dados com Docker:
   ```bash
   docker compose up -d
   ```

3. Execute as migrations:
   ```bash
   yarn migration:run
   ```

4. Inicie a aplicação em modo desenvolvimento:
   ```bash
   yarn dev
   ```

5. Caso necessário derrubar o docker
   ```bash
   docker compose down --volumes
   ```

---

Após esses passos, a API estará disponível em `http://localhost:3333`.
