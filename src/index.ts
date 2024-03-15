import { startServer } from './fastify/server';
import { db } from './data-source';

const start = async () => {
  await db.initialize();
  console.info('Db was initialized')
  await startServer();
}


(async () => {
  try {
    await start();
  } catch (err) {
    console.error(err as Error);
    process.exit(1);
  }
})();