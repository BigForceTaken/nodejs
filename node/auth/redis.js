(async () => {
  const { createClient } = require('redis');
  const client = createClient(6379,'localhost')
  client.on('error', err => console.log('Redis Client Error', err));

  await client.connect();
  await client.set('hello','hahaha')
  const value = await client.get('hello');
  console.log(value)
  await client.disconnect();
})()
