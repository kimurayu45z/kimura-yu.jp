import type { APIRoute } from 'astro';

import {
	createPrivateSession,
	PRIVATE_SESSION_COOKIE,
	PRIVATE_SESSION_SECONDS,
	verifyAccessPassword
} from '@/lib/server/auth';
import { privateAuthConfiguration } from '@/lib/server/contacts';
import { getLocale } from '@/paraglide/runtime';

const MAX_BODY_BYTES = 2_048;

class BodyTooLargeError extends Error {}

async function limitedFormData(request: Request): Promise<FormData> {
	if (!request.body) return new FormData();
	const reader: ReadableStreamDefaultReader<Uint8Array> = request.body.getReader();
	const chunks: Uint8Array[] = [];
	let total = 0;

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		total += value.byteLength;
		if (total > MAX_BODY_BYTES) {
			await reader.cancel();
			throw new BodyTooLargeError();
		}
		chunks.push(value);
	}

	const buffer: ArrayBuffer = new ArrayBuffer(total);
	const body: Uint8Array<ArrayBuffer> = new Uint8Array(buffer);
	let offset = 0;
	for (const chunk of chunks) {
		body.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return new Request(request.url, {
		method: 'POST',
		headers: request.headers,
		body: buffer
	}).formData();
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const locale = getLocale();

	const contentLength: number = Number(request.headers.get('content-length') ?? 0);
	if (contentLength > MAX_BODY_BYTES) return redirect(`/${locale}/private?error=invalid`, 303);

	const auth = privateAuthConfiguration();
	if (!auth.password || !auth.sessionSecret) {
		return new Response(null, { status: 503 });
	}

	let form: FormData;
	try {
		form = await limitedFormData(request);
	} catch {
		return redirect(`/${locale}/private?error=invalid`, 303);
	}
	const candidate: string = String(form.get('password') ?? '').slice(0, 256);
	if (!verifyAccessPassword(candidate, auth.password, auth.sessionSecret)) {
		return redirect(`/${locale}/private?error=invalid`, 303);
	}

	cookies.set(PRIVATE_SESSION_COOKIE, createPrivateSession(auth.sessionSecret), {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: PRIVATE_SESSION_SECONDS
	});
	return redirect(`/${locale}/private`, 303);
};
