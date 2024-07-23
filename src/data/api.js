export const API_URL = 'https://dailynotice-backend.vercel.app';
export const authCodeEndpoint = '/auth_code';
export const verifyCodeEndpoint = '/verify_auth_code';
export const noticeProfileEndpoint = '/notice_profile';

export async function getAuthCode(type, account) {
    try {
        const resp = await fetch(API_URL + authCodeEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                type,
                account
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

        if (!resp.ok) {
            throw 'Something wrong';
        } else {
            const data = await resp.json();
            if (data.error) {
                throw data.error;
            }
            return data;
        }
    } catch(e) {
        throw e;
    }
}

export async function verifyAuthCode(type, account, fullname, sessionId, authCode) {
    try {
        const resp = await fetch(API_URL + verifyCodeEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                type,
                account,
                fullname,
                sessionId,
                authCode
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

        if (!resp.ok) {
            throw 'Something wrong';
        } else {
            const data = await resp.json();
            if (data.error) {
                throw data.error;
            }
            return data;
        }
    } catch(e) {
        throw e;
    }
}

export async function getUserNoticeProfile(account, userToken) {
    try {
        const resp = await fetch(API_URL + noticeProfileEndpoint, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + userToken
            }
        });
        if (!resp.ok) {
            throw 'Something wrong';
        } else {
            const data = await resp.json();
            if (data.error) {
                throw data.error;
            }
            return data;
        }
    } catch(e) {
        throw e;
    }
}

export async function updateUserNoticeProfile(account, userToken, userProfile) {
    try {
        const resp = await fetch(API_URL + noticeProfileEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                account,
                userProfile
            }),
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + userToken
            }
        });

        if (!resp.ok) {
            throw 'Something wrong';
        } else {
            const data = await resp.json();
            if (data.error) {
                throw data.error;
            }
            return data;
        }
    } catch(e) {
        throw e;
    }
}