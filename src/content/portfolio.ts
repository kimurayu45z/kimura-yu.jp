import type { Locale } from '@/paraglide/runtime';

export interface PortfolioCase {
	id: 'fuku-steel-plate-fund' | 'd6e-systems' | 'crypto-asset-rescue';
	title: string;
	summary: string;
	href: string;
}

export interface Portfolio {
	title: string;
	cases: PortfolioCase[];
}

const portfolios: Record<Locale, Portfolio> = {
	ja: {
		title: '実績',
		cases: [
			{
				id: 'crypto-asset-rescue',
				title: 'ホワイトハッカー',
				summary: '当時約5億円規模の暗号資産救出。回収システムの開発・運用を担当。',
				href: 'https://note.com/kimurayu45z/n/n563e2170a134'
			},
			{
				id: 'd6e-systems',
				title: 'D6E',
				summary: 'D6Eを基盤に、業務に合わせた複数のシステムを設計・開発。',
				href: 'https://www.d6e.ai'
			},
			{
				id: 'fuku-steel-plate-fund',
				title: 'FUKU STEEL PLATE FUND',
				summary:
					'シンガポールの敷鉄板リースファンド。スキーム設計・投資家対応・システム開発を担当。',
				href: 'https://teppan.ownerbook.io'
			}
		]
	},
	en: {
		title: 'Selected work',
		cases: [
			{
				id: 'crypto-asset-rescue',
				title: 'White-hat hacking',
				summary:
					'Helped rescue crypto assets worth about JPY 500 million at the time, building and operating the recovery tools.',
				href: 'https://note.com/kimurayu45z/n/n563e2170a134'
			},
			{
				id: 'd6e-systems',
				title: 'D6E',
				summary: 'Designing and developing multiple business systems on the D6E foundation.',
				href: 'https://www.d6e.ai'
			},
			{
				id: 'fuku-steel-plate-fund',
				title: 'FUKU STEEL PLATE FUND',
				summary:
					'A steel-plate leasing fund in Singapore. I handle structure design, investor communication and systems development.',
				href: 'https://teppan.ownerbook.io'
			}
		]
	},
	zh: {
		title: '项目成果',
		cases: [
			{
				id: 'crypto-asset-rescue',
				title: '白帽安全',
				summary: '参与救出当时估值约5亿日元的加密资产，负责回收系统的开发与运维。',
				href: 'https://note.com/kimurayu45z/n/n563e2170a134'
			},
			{
				id: 'd6e-systems',
				title: 'D6E',
				summary: '基于D6E平台，设计和开发适合具体业务的多个系统。',
				href: 'https://www.d6e.ai'
			},
			{
				id: 'fuku-steel-plate-fund',
				title: 'FUKU STEEL PLATE FUND',
				summary: '新加坡建筑钢板租赁基金。负责结构设计、投资者沟通和系统开发。',
				href: 'https://teppan.ownerbook.io'
			}
		]
	}
};

export function getPortfolio(locale: Locale): Portfolio {
	return portfolios[locale];
}
