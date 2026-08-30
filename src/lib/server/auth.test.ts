import { describe, expect, it } from 'vitest';

import {
	createPrivateSession,
	PRIVATE_SESSION_SECONDS,
	verifyAccessPassword,
	verifyPrivateSession
} from './auth';

describe('private access authentication', () => {
	it('compares access passwords without exposing the expected value', () => {
		expect(verifyAccessPassword('shared-passphrase', 'shared-passphrase', 'comparison-key')).toBe(
			true
		);
		expect(verifyAccessPassword('wrong', 'shared-passphrase', 'comparison-key')).toBe(false);
		expect(verifyAccessPassword('', 'shared-passphrase', 'comparison-key')).toBe(false);
	});

	it('accepts an intact session only before expiry', () => {
		const now = Date.UTC(2026, 7, 30, 0, 0, 0);
		const token = createPrivateSession('session-secret', now);

		expect(verifyPrivateSession(token, 'session-secret', now + 1_000)).toBe(true);
		expect(
			verifyPrivateSession(token, 'session-secret', now + PRIVATE_SESSION_SECONDS * 1_000)
		).toBe(false);
	});

	it('rejects tampered and incorrectly signed sessions', () => {
		const now = Date.UTC(2026, 7, 30, 0, 0, 0);
		const token = createPrivateSession('session-secret', now);

		expect(verifyPrivateSession(`${token}x`, 'session-secret', now)).toBe(false);
		expect(verifyPrivateSession(token, 'different-secret', now)).toBe(false);
	});
});
