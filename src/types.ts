export type User = {
  account: string;
  subdomain?: string;
  email?: string;
  nftStorageKey?: string;
  meta?: {
    title: string;
    description: string;
    keywords: string;
  };
};

export type Db = {
  users: User[];
};
