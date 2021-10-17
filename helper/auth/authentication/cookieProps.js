const currentDate = Date().split('+')[0].split(' ');
currentDate[2] = String(Number(currentDate[2]) + 1);

export const expireOnTime = `expires = ${currentDate.join(' ')}`;

export const expireNow = `expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
export const secure = 'secure=true';
