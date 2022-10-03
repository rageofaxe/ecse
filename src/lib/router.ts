import express from 'express';
import child_process from 'child_process';
import MetaAuth from 'meta-auth';
import { User } from '../types';
import { addUser, getUser } from './db';
import { createHugo, isExistedSubdomain } from './utils';

const router = express.Router();
const metaAuth: any = new MetaAuth({ banner: 'not your business' });

const MESSAGES = {
  SUBDOMAIN_NAME_ALREADY_EXISTED: 'This name already existed',
  SUBDOMAIN_ALREADY_EXISTED: 'Your site already existed',
  WAS_CREATED: 'was createMetaAuthd',
  NAME_IS_FREE: 'You can use this name',
  ANOTHER_ERROR: 'Unresolved mistake',
};

router.get('/auth/:MetaAddress', metaAuth, (req: any, res) => {
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});

router.get(
  '/auth/:MetaMessage/:MetaSignature',
  metaAuth,
  async (req: any, res) => {
    if (req.metaAuth && req.metaAuth.recovered) {
      const account = req.metaAuth.recovered;
      const user = (await getUser(account)) || { account };
      res.send(user);
    } else {
      res.status(400).send();
    }
  }
);

router.post('/user', async (req, res) => {
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

// get /site
router.post('/check-name', async (req, res) => {
  const isExisted = await isExistedSubdomain(req.body.name);
  res.status(200).json({
    message: isExisted
      ? MESSAGES.SUBDOMAIN_NAME_ALREADY_EXISTED
      : MESSAGES.NAME_IS_FREE,
  });
});

export default router;
