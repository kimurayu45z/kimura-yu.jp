import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const PRIVATE_SESSION_COOKIE = '__Host-kimura_private';
export const PRIVATE_SESSION_SECONDS = 8 * 60 * 60;

const TOKEN_VERSION = 'v1';

function hmac(value: string, secret: string): Buffer {
	return createHmac('sha256', secret).update(value, 'utf8').digest();
}

function encodeSignature(value: Buffer): string {
	return value.toString('base64url');
}

export function verifyAccessPassword(
	candidate: string,
	expected: string,
	comparisonSecret: string
): boolean {
	if (!candidate || !expected || !comparisonSecret) return false;
	const candidateDigest: Buffer = hmac(candidate, comparisonSecret);
	const expectedDigest: Buffer = hmac(expected, comparisonSecret);
	return timingSafeEqual(candidateDigest, expectedDigest);
}

export function createPrivateSession(secret: string, now = Date.now()): string {
	if (!secret) throw new Error('A private session secret is required.');

	const expiresAt: number = Math.floor(now / 1000) + PRIVATE_SESSION_SECONDS;
	const nonce: string = randomBytes(18).toString('base64url');
	const payload: string = `${TOKEN_VERSION}.${expiresAt}.${nonce}`;
	const signature: string = encodeSignature(hmac(payload, secret));
	return `${payload}.${signature}`;
}

export function verifyPrivateSession(
	token: string | undefined,
	secret: string,
	now = Date.now()
): boolean {
	if (!token || !secret) return false;

	const parts: string[] = token.split('.');
	if (parts.length !== 4) return false;
	const [version, expiresAtValue, nonce, signature] = parts;
	if (version !== TOKEN_VERSION || !expiresAtValue || !nonce || !signature) return false;

	const expiresAt: number = Number(expiresAtValue);
	const nowSeconds: number = Math.floor(now / 1000);
	if (!Number.isSafeInteger(expiresAt)) return false;
	if (expiresAt <= nowSeconds || expiresAt > nowSeconds + PRIVATE_SESSION_SECONDS + 60)
		return false;

	const payload: string = `${version}.${expiresAtValue}.${nonce}`;
	const expectedSignature: Buffer = hmac(payload, secret);
	let suppliedSignature: Buffer;
	try {
		suppliedSignature = Buffer.from(signature, 'base64url');
	} catch {
		return false;
	}
	if (suppliedSignature.length !== expectedSignature.length) return false;
	return timingSafeEqual(suppliedSignature, expectedSignature);
}
