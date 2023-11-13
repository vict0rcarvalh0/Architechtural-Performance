# Architechtural-Performance
Esse repositório tem como objetivo registrar uma atividade feita em sala de aula depois de uma aula sobre táticas arquiteturais.
<br><br>
A proposta do exercício foi a seguinte:
<br><br>
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/exercise.png" width="70%">
<br>

---

Diante disso, o projeto em questão foi desenvolvido em Node.js, para interagir com um banco de dados PostgreSQL e um servidor Redis. O PostgreSQL é executado em um container Docker, enquanto o servidor Redis está sendo executado localmente em uma máquina Linux.

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
# Registro do fluxo de funcionamento

**1. Rodando a aplicação**
<br>
<br>
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/app_flow_1.png" width="100%">
<br>
<br>

**2. Populando o banco**
<br>
<br>
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/app_flow_2.png" width="100%">
<br>
<br>

**3. Verificando se há usuários no Redis, como ainda não existe, ocorre a consulta o banco de dados PostgreSQL e armazenamento dos usuários no cache Redis**
<br>
<br>
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/app_flow_3.png" width="100%">
<br>
<br>

**4. Excluindo todos os usuários do banco de dados**
<br>
<br>
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/app_flow_4.png" width="100%">
<br>
<br>

**5. Observando o funcionamento do Redis com o registro dos usuários na tela puxados do cache, já que o banco se encontra vazio**
<br>
<br>
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/app_flow_5.png" width="100%">
<br>
<br>

# Rodando o projeto
```bash
# Clone o repositório
git clone <url>
```
```bash
# Na raíz do projeto(Architechture-Performance), utilize este comando para acessar a api
cd src/api
```
```bash
# Instale as dependências
npm i
```
```bash
# Rode a aplicação
node server.js
```
```bash
# Para acessar o banco de dados 
npx prisma studio
```

# Conclusão
<img src="https://github.com/vict0rcarvalh0/Architechtural-Performance/blob/main/assets/conclusion.png" width="80%">
A integração do Redis como um sistema de cache na arquitetura do projeto proporciona benefícios substanciais, evidenciados por métricas de desempenho. As seguintes métricas, especificamente, destacam a eficácia do Redis em comparação com o acesso direto ao banco de dados PostgreSQL:

1. **Tempo de Resposta do Redis: 0.489ms**
   - A resposta rápida do Redis é notável, indicando a eficiência do cache em recuperar dados sem a necessidade de acessar o banco de dados principal. Essa agilidade é crucial para operações que exigem tempos de resposta rápidos, como consultas frequentes.

2. **Tempo de Resposta do PostgreSQL: 6.331ms**
   - Em contraste, o tempo de resposta do PostgreSQL é significativamente maior. Isso ressalta a complexidade e a sobrecarga associada ao acesso direto ao banco de dados, especialmente quando há uma carga substancial de consultas.

3. **Tempo de Resposta do Redis Após o Cache: 0.609ms**
   - Mesmo após a criação do cache, o Redis continua a fornecer tempos de resposta notavelmente baixos. Isso destaca a capacidade do Redis de manter um desempenho consistente mesmo com o aumento da carga de solicitações, uma vez que os dados frequentemente acessados são armazenados em cache.

Dessa forma, a implementação do Redis como sistema de cache proporciona uma melhoria significativa na eficiência e no desempenho geral do projeto. A redução substancial no tempo de resposta, aliada à capacidade de aliviar a carga do banco de dados principal, torna o Redis uma escolha valiosa para otimizar a arquitetura do projeto e proporcionar uma experiência mais ágil aos usuários. Essa abordagem é especialmente relevante em cenários onde tempos de resposta rápidos e escalabilidade são necessários
