import { createEvent } from 'effector';
import { User } from '../../../types';
import createLocalStore from '../localStore';

export const $userProfile = createLocalStore<User | null>('user')(null);
export const setUserProfile = createEvent<User | null>('set_user');
export const $active = $userProfile.map((user) => !!user);
