/* istanbul ignore file */

import { history, store } from 'data/store';
import { endpoints } from 'constants/endpoints';
import { signOut } from 'data/actions/userActions';

const baseUrl = 'https://food-delivery-app-api.herokuapp.com/';

const buildUrl = endpoint => {
    return `${baseUrl}${endpoint}`;
}

const validateExpiration = async () => {
    const state = await store.getState();
    if (state.user.expiration && state.user.expiration < Date.now()) {
        store.dispatch(signOut(state.user._id, true));
        history.push('/sign-in');
        throw Error('session has expired');
    }
}

const getHeaders = async () => {
    const state = await store.getState();
    const token = state.user._id;
    if (!!token) {
        return {
            'x-authrz': token,
            'Content-Type': 'application/json'
        }
    } else {
        return {
            'Content-Type': 'application/json'
        };
    }
}

export const httpService = {
    get: async (endpoint) => {
        await validateExpiration();
        const url = buildUrl(endpoint);
        const response = await fetch(url, {
            headers: await getHeaders()
        });
        const json = response.json();
        return json;
    },
    post: async (endpoint, body) => {
        await validateExpiration();
        const url = buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(body)
        });
        const json = await response.json();
        return json;
    },
    put: async (endpoint, body) => {
        const url = buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify(body)
        });
        const json = await response.json();
        return json;
    },
    patch: async (endpoint, body) => {
        if (endpoint !== endpoints.users.signOut) {
            await validateExpiration();
        }
        const url = buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'PATCH',
            headers: await getHeaders(),
            body: JSON.stringify(body)
        });
        const json = await response.json();
        return json;
    },
    delete: async (endpoint, body) => {
        await validateExpiration();
        const url = buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: await getHeaders(),
            body: JSON.stringify(body)
        });
        const json = await response.json();
        return json;
    }
}
