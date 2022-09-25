import express from 'express';
import child_process from 'child_process';
import fs from 'fs';

const router = express.Router();

const MESSAGES = {
  ALREADY_EXISTED: 'This name already existed',
  WAS_CREATED: 'was created',
  NAME_IS_FREE: 'You can use this name',
};

// insert into public.users (account, site_name, theme_id, nft_storage_key) values ();

const isExistedName = (name: any): boolean => {
  let isExisted = false;
  if (fs.existsSync(`./sites/${name}`)) {
    isExisted = true;
  }
  return isExisted;
};

const createHugo = (name: string) => {
  const defaultTheme = 'crochet';
  return [
    `hugo new site sites/${name};`,
    `cp themes/${defaultTheme}/ sites/${name}/themes/${defaultTheme} -r;`,
    `cd sites/${name};`,
    `hugo --theme ${defaultTheme};`,
    `echo theme = "${defaultTheme}" >> config.toml`,
  ].join('');
};

router.post<{ name: string }>('/create', async (req, res) => {
  const name = req.body.name;
  const account = req.body.account;
  console.log(account);
  const isExisted = isExistedName(name);
  child_process.exec(createHugo(name), (err, _stout, sterr) => {
    if (err) {
      console.log('error', sterr);
      res.status(200).json({ message: sterr });
    } else if (isExisted) {
      res.status(200).json({ message: MESSAGES.ALREADY_EXISTED });
    } else {
      res.status(200).json({ message: MESSAGES.WAS_CREATED, _stout });
    }
  });
});

router.post<{ name: string }>('/check-name', async (req, res) => {
  const isExisted = isExistedName(req.body.name);
  res.status(200).json({
    message: isExisted ? MESSAGES.ALREADY_EXISTED : MESSAGES.NAME_IS_FREE,
  });
});

export default router;
