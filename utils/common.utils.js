import { convertHexToString } from 'xrpl';

export const xrplTokenName = value =>
    value?.length === 40 ? convertHexToString(value).replaceAll('\u0000', '') : value;
