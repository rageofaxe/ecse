import { JsonDB, Config } from 'node-json-db';
import { User } from '../types';

const db = new JsonDB(new Config('db', true, false));

export async function addUser(user: User) {
  const currentUser = await getUser(user.account);
  await db.push(`/users/${user.account}`, { ...user, ...currentUser });
}

export async function getUser(account: User['account']) {
  const users = await db.getData('/users');
  return users[account];
}

export async function getUsers() {
  const users = await db.getData('/users');
  return Object.values(users) as User[];
}
