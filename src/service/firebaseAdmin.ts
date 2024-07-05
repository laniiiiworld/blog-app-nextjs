import admin, { ServiceAccount } from 'firebase-admin';
import { NextRequest } from 'next/server';
import { isAdmin } from './users';

export const FIREBASE_SERVICE_ACCOUNT_KEY = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
} as ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT_KEY),
  });
}

export async function withSessionUser(
  req: NextRequest,
  handler: (userId: string) => Promise<Response>
): Promise<Response> {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.split(' ')[1] : '';
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userId = decodedToken.uid;

  if (!userId) {
    return new Response('Authentication Error', { status: 401 });
  }

  return handler(userId);
}

export async function onlyAdminUserSession(
  req: NextRequest,
  handler: (userId: string) => Promise<Response>
): Promise<Response> {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.split(' ')[1] : '';
  const decodedToken = await admin.auth().verifyIdToken(token);
  const userId = decodedToken.uid;

  if (!userId) {
    return new Response('Authentication Error', { status: 401 });
  }

  const adminYn = await isAdmin(userId);
  if (!adminYn) {
    return new Response('Authentication Error: You are not an administrator', { status: 403 });
  }

  return handler(userId);
}
