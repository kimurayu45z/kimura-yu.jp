import type { Locale } from '@/paraglide/runtime';

interface PortfolioImage {
	src: string;
	width: number;
	height: number;
	alt: string;
	caption: string;
	source: string;
}

export function portfolioImage(id: string, locale: Locale): PortfolioImage | undefined {
	if (id === 'fuku-steel-plate-fund')
		return {
			src: '/assets/portfolio/fuku-rfid-plate.jpg',
			width: 4080,
			height: 3072,
			alt: {
				ja: '敷鉄板に取り付けたRFIDタグ',
				en: 'RFID tag attached to a steel plate',
				zh: '安装在钢板上的RFID标签'
			}[locale],
			caption: {
				ja: '敷鉄板とRFIDタグ。FUKU公開サイトの掲載写真。',
				en: 'Steel plate and RFID tag. Photograph published on the FUKU website.',
				zh: '钢板与RFID标签，照片来自FUKU公开网站。'
			}[locale],
			source: 'https://teppan.ownerbook.io'
		};
	if (id === 'd6e-systems')
		return {
			src: '/assets/portfolio/d6e-ai-agent.jpg',
			width: 2050,
			height: 1280,
			alt: {
				ja: 'D6EのAIエージェントが経費レポートを作成した公開デモ画面',
				en: 'Public D6E demo showing an AI agent preparing an expense report',
				zh: 'D6E AI智能体生成费用报告的公开演示界面'
			}[locale],
			caption: {
				ja: 'D6E公式サイト掲載の実際のデモ画面。個別の顧客案件の納品画面ではありません。',
				en: 'Actual demo interface published by D6E, not a screenshot from a client engagement.',
				zh: 'D6E官网公开的实际演示界面，并非客户项目的交付画面。'
			}[locale],
			source: 'https://www.d6e.ai'
		};
	return undefined;
}
