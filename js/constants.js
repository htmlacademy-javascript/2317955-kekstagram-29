export const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

export const ACCEPTABLE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

export const RANDOM_FOTOS_NUMBER = 10;

export const SHOWN_COMMENTS_NUMBER = 5;

export const MAX_HASHTAG_LENGTH = 19;
export const MAX_HASHTAG_NUMBER = 5;
export const MAX_DESCRIPTION_LENGTH = 140;
export const HASHTAG_RULE_REGEX = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH}}$`, 'i');

export const SCALE_STEP = 25;


export const RERENDER_DELAY = 500;
export const ALERT_SHOW_TIME = 5000;
