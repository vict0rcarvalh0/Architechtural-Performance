# Architechtural-Performance
Esse repositório tem como objetivo registrar uma atividade feita em sala de aula depois de uma aula sobre táticas arquiteturais.
<br><br>
A proposta do exercício foi a seguinte:
<br><br>
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/exercise.png" width="70%">
<br>

---

Diante disso, O projeto em questão foi desenvolvido em Node.js, para interagir com um banco de dados PostgreSQL e um servidor Redis. O PostgreSQL é executado em um container Docker, enquanto o servidor Redis está sendo executado localmente em uma máquina Linux.

---

### 1. `/create_user`

**Descrição:**
Este endpoint é responsável por criar 1000 usuários no banco de dados usando o Prisma. Cada usuário tem o nome "Victor".

**Método HTTP:**
`GET`

**Funcionamento:**
- Utiliza um loop para criar 1000 usuários no banco de dados.
- Retorna a mensagem 'User created!' quando a operação é concluída com sucesso.

---

### 2. `/delete_users`

**Descrição:**
Este endpoint é responsável por excluir todos os usuários do banco de dados usando o Prisma.

**Método HTTP:**
`GET`

**Funcionamento:**
- Utiliza o método `deleteMany` do Prisma para excluir todos os usuários.
- Retorna a mensagem 'Todos os usuários foram excluídos com sucesso.' em caso de sucesso.
- Em caso de erro, retorna uma mensagem de erro e um status HTTP 500.

---

### 3. `/get_users`

**Descrição:**
Este endpoint é responsável por recuperar os usuários, preferencialmente do Redis Cache. Se o cache não estiver disponível, os usuários são recuperados do banco de dados PostgreSQL e armazenados em cache para consultas futuras.

**Método HTTP:**
`GET`

**Funcionamento:**
- Verifica se há usuários armazenados no Redis Cache.
  - Se existir, retorna os usuários do cache.
  - Se não existir, consulta o banco de dados PostgreSQL e armazena os usuários no cache Redis.
- Mede o tempo de resposta tanto para a busca no Redis quanto para a busca no PostgreSQL.
- Retorna a quantidade de usuários e seus nomes, indicando se a informação é proveniente do Redis Cache ou do PostgreSQL.
- Em caso de erro no acesso ao Redis, retorna uma mensagem de erro e um status HTTP 500.

---

### 4. `/reset_redis`

**Descrição:**
Este endpoint é responsável por resetar todos os dados armazenados no Redis.

**Método HTTP:**
`GET`

---
