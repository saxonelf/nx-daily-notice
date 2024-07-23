
export const API_URL = '';
export const authCodeEndpoint = '/auth_code';
export const verifyCodeEndpoint = '/verify_auth_code';
export const noticeProfileEndpoint = '/notice_profile';

export async function getAuthCode(type, account) {
    try {
        const data = await fetch(API_URL + authCodeEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                type,
                account
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

        if (data.error) {
            throw data.error;
        } else {
            return data;
        }
    } catch(e) {
        throw e;
    }
}

export async function verifyAuthCode(type, account, fullname, sessionId, authCode) {
    try {
        const data = await fetch(API_URL + verify_auth_code, {
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

        if (data.error) {
            throw data.error;
        } else {
            return data;
        }
    } catch(e) {
        throw e;
    }
}

export async function getUserNoticeProfile(account, userToken) {
    try {
        const data = await fetch(API_URL + noticeProfileEndpoint, {
            method: 'GET',
            body: JSON.stringify({
                account
            }),
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + userToken
            }
        });

        if (data.error) {
            throw data.error;
        } else {
            return data;
        }
    } catch(e) {
        throw e;
    }
}

export async function updateUserNoticeProfile(account, userToken, userProfile) {
    try {
        const data = await fetch(API_URL + noticeProfileEndpoint, {
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

        if (data.error) {
            throw data.error;
        } else {
            return data;
        }
    } catch(e) {
        throw e;
    }
}