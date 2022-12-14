import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

const auth = getAuth();
const db = getFirestore();

const main = db.collection('main');

const ipDocument = main.doc('ip'),
    timeDocument = main.doc('time'),
    apikeyDocument = main.doc('apikey');

export const verify = async (token: string): Promise<boolean> => {
    try {
        auth.verifyIdToken(token);
        return true;
    } catch (err) {
        return false;
    };
};

export const getIp = async () => (await ipDocument.get()).data()?.ip;
export const updateIp = async (ip: string) => (await ipDocument.update({ ip }));

export const getTimeConstraints = async () => (await timeDocument.get()).data();
export const getApiKey = async () => (await apikeyDocument.get()).data()?.apikey;