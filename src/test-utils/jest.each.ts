import { db } from '../data-source';

beforeEach(async () => {
  if (!db.isInitialized) {
    await db.initialize();
  }
});

afterEach(async () => {
  await db.synchronize(true);
});

afterAll(async () => {
  await db.close();
});