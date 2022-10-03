import { getUsers } from './db';

export const isExistedSubdomain = async (subdomain: string) => {
  const users = await getUsers();
  return users.map((user) => user.subdomain).includes(subdomain);
};

export const createHugo = (subdomain: string, theme = 'crochet') => {
  return [
    `hugo new site sites/${subdomain};`,
    `cp themes/${theme}/ sites/${subdomain}/themes/${theme} -r;`,
    `cd sites/${subdomain};`,
    `hugo --theme ${theme};`,
    `echo theme = "${theme}" >> config.toml`,
  ].join('');
};
