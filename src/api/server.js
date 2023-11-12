const app = require('./config/express')();
const port = app.get('port');
const prisma = require('./db/prisma');
const Redis = require('ioredis');
const client = new Redis();

client.on('error', (err) => {
  console.error('Erro no cliente Redis:', err);
});

app.get('/', (req, res) => {
  res.send('Healthy!');
});

app.get('/create_user', async (req, res) => {
  for (let i = 0; i < 1000; i++) {
    await prisma.user.create({
      data: {
        name: "Victor",
      },
    })
  }

  res.send('User created!');
});

app.get('/delete_users', async (req, res) => {
  try {
    await prisma.user.deleteMany();
    res.send('Todos os usuários foram excluídos com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir usuários:', error);
    res.status(500).send('Ocorreu um erro ao excluir os usuários.');
  }
});

app.get('/get_users', async (req, res) => {
  console.time("Redis Response Time");

  try {
    const cachedUsers = await client.get('cached_users');

    if (cachedUsers) {
      console.timeEnd("Redis Response Time");
      const users = JSON.parse(cachedUsers);
      const names = users.map((user) => user.name);

      res.send(
        `There are ${names.length} users with the names of: ${names.join(', ')} (from Redis Cache)`
      );
    } else {
      console.timeEnd("Redis Response Time");
      console.time("Postgres Response Time");

      const users = await prisma.user.findMany();
      console.timeEnd("Postgres Response Time");

      const names = users.map((user) => user.name);

      // Armazenar os usuários no Redis para futuras consultas
      await client.set('cached_users', JSON.stringify(users));
      await client.expire('cached_users', 360);

      res.send(
        `There are ${names.length} users with the names of: ${names.join(', ')} (from Postgres)`
      );
    }
  } catch (err) {
    console.error('Erro ao acessar o Redis:', err);
    res.status(500).send('Ocorreu um erro ao acessar o Redis.');
  }
});

app.get('/reset_redis', async (req, res) => {
  try {
    await client.flushall();
    res.send('Redis resetado com sucesso.');
  } catch (error) {
    console.error('Erro ao resetar o Redis:', error);
    res.status(500).send('Ocorreu um erro ao resetar o Redis.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em localhost:${port}`)
});
