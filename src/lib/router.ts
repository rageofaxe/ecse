import express from 'express';
import child_process from 'child_process';

const router = express.Router();

const createHugo = (name: string) => {
  const defaultTheme = 'crochet';
  return [
    `hugo new site sites/${name};`,
    `cp themes/${defaultTheme}/ sites/${name}/themes/${defaultTheme} -r;`,
    `cd sites/${name};`,
    `hugo --theme ${defaultTheme};`,
    `echo theme = \"${defaultTheme}\" >> config.toml`,
  ].join('');
};

router.post<{ name: string }>('/create', async (req, res) => {
  const name = req.body.name;
  child_process.exec(createHugo(name), (err, _stout, sterr) => {
    if (err) {
      console.log('error', sterr);
      res.status(200).json({ message: 'ERROR' });
    } else {
      res.status(200).json({ message: name, _stout });
    }
  });
});

export default router;
