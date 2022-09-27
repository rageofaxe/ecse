import { setUserProfile, $userProfile } from '.';

$userProfile.on(setUserProfile, (_, payload) => payload);
