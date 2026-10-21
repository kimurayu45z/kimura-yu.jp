import type { APIRoute } from 'astro';
import { getLocale } from '@/paraglide/runtime';

export const GET: APIRoute = ({ redirect }) => redirect(`/${getLocale()}#portfolio`, 308);
