import express from 'express';
import child_process from 'child_process';
import { User } from '../types';
import { addUser, getUser, getUsers } from './db';

const router = express.Router();

const MESSAGES = {
  SUBDOMAIN_NAME_ALREADY_EXISTED: 'This name already existed',
  SUBDOMAIN_ALREADY_EXISTED: 'Your site already existed',
  WAS_CREATED: 'was created',
  NAME_IS_FREE: 'You can use this name',
  ANOTHER_ERROR: 'Unresolved mistake',
};

const isExistedSubdomain = async (subdomain: any) => {
  const users = await getUsers();
  return users.map((user) => user.subdomain).includes(subdomain);
};

const createHugo = (subdomain: string, theme = 'crochet') => {
  return [
    `hugo new site sites/${subdomain};`,
    `cp themes/${theme}/ sites/${subdomain}/themes/${theme} -r;`,
    `cd sites/${subdomain};`,
    `hugo --theme ${theme};`,
    `echo theme = "${theme}" >> config.toml`,
  ].join('');
};

router.post('/connect', async (req, res) => {
  const account = req.body.account;
  try {
    await addUser({ account });
    const user = await getUser(account);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(200).json({ message: MESSAGES.ANOTHER_ERROR });
  }
});

router.post('/create', async (req, res) => {
  const subdomain = req.body.name;
  const account = req.body.account;
  const user: User = await getUser(account);
  if (user?.subdomain) {
    res.status(200).json({ message: MESSAGES.SUBDOMAIN_ALREADY_EXISTED });
    return;
  }

  const isExisted = await isExistedSubdomain(req.body.name);
  if (isExisted) {
    res.status(200).json({ message: MESSAGES.SUBDOMAIN_NAME_ALREADY_EXISTED });
  }

  child_process.exec(createHugo(subdomain), async (err, _stout, sterr) => {
    if (err) {
      res.status(200).json({ message: sterr });
    } else {
      try {
        await addUser({
          account,
          subdomain,
        });
        const user = await getUser(account);
        res
          .status(200)
          .json({ message: MESSAGES.WAS_CREATED, _stout, data: user });
      } catch (error) {
        res.status(200).json({ message: MESSAGES.ANOTHER_ERROR });
      }
    }
  });
});

router.post('/check-name', async (req, res) => {
  const isExisted = await isExistedSubdomain(req.body.name);
  res.status(200).json({
    message: isExisted
      ? MESSAGES.SUBDOMAIN_NAME_ALREADY_EXISTED
      : MESSAGES.NAME_IS_FREE,
  });
});

export default router;
