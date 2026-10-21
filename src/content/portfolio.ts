import type { Locale } from '@/paraglide/runtime';

export interface PortfolioLink {
	label: string;
	href: string;
}

export interface PortfolioCase {
	id: string;
	title: string;
	category: string;
	period: string;
	status: string;
	summary: string;
	overview: { title: string; summary: string };
	background: string;
	role: string;
	actions: string[];
	outcomes: string[];
	scope: string;
	links: [PortfolioLink, ...PortfolioLink[]];
}

export interface Portfolio {
	title: string;
	name: string;
	intro: string;
	bio: string;
	approachTitle: string;
	approach: { title: string; body: string }[];
	labels: {
		profile: string;
		portfolio: string;
		read: string;
		pdf: string;
		print: string;
		updated: string;
		contents: string;
		background: string;
		role: string;
		actions: string;
		outcomes: string;
		links: string;
		contact: string;
		contactBody: string;
		caseLink: string;
		publicImage: string;
	};
	cases: PortfolioCase[];
}

export const portfolioUpdated = '2026-10-21';
export const portfolioPdfPath = '/portfolio/kimura-yu-portfolio-ja.pdf';

const links = {
	fuku: 'https://teppan.ownerbook.io',
	announcement: 'https://prtimes.jp/main/html/rd/p/000000001.000180544.html',
	note: 'https://note.com/kimurayu45z/n/n563e2170a134',
	cosmos:
		'https://www.mintscan.io/cosmos/txs/670DDE59C7B0C06C4D1965EB57BCCC4BF017C9DC3951D32808E7B728F9B14073',
	d6e: 'https://www.d6e.ai',
	gateway: 'https://gateway.d6e.ai',
	signkit: 'https://signkit.d6e.ai',
	signkitCode: 'https://github.com/d6e-ai/signkit'
} as const;

const portfolios: Record<Locale, Portfolio> = {
	ja: {
		title: '仕事と実績',
		name: '木村 優',
		intro:
			'事業の仕組みを考え、それを動かすシステムまでつくる。ファンドの組成・運用、業務システム開発、暗号資産の救出で、事業と技術の両方を担当してきました。',
		bio: '1997年2月23日生まれ、滋賀県出身。CAUCHYE ASIA PTE. LTD.代表。京都大学経済学部卒、同大学経営管理大学院修了。京都大学大学院情報学研究科の博士後期課程でAIを研究。',
		approachTitle: '仕事の進め方',
		approach: [
			{
				title: '事業と業務を理解する',
				body: '誰が何を判断し、どこでお金や情報が動くかを整理。事業上の制約を、仕組みやシステムの要件へ落とし込みます。'
			},
			{
				title: '自分で設計し、実装する',
				body: 'スキーム、業務フロー、データ、画面、APIをつなげて考え、実際に使う成果物へ仕上げます。'
			},
			{
				title: '動かした後も関わる',
				body: '投資家対応、業務運用、障害への対処まで関与。現場で分かったことを、次の設計や改善に戻します。'
			}
		],
		labels: {
			profile: 'プロフィール',
			portfolio: '実績',
			read: '実績を見る',
			pdf: 'PDFをダウンロード',
			print: '印刷用ページ',
			updated: '更新',
			contents: '代表実績',
			background: '背景・課題',
			role: '私の役割',
			actions: '取り組んだこと',
			outcomes: '実現したこと・成果物',
			links: '関連リンク',
			contact: '連絡先',
			contactBody: 'ご連絡はプロフィールに掲載しているSNSからお願いします。',
			caseLink: 'この事例へのリンク',
			publicImage: '公開されている実物の画面'
		},
		cases: [
			{
				id: 'fuku-steel-plate-fund',
				overview: {
					title: 'FUKU',
					summary:
						'シンガポールの敷鉄板リースファンド。スキーム設計・投資家対応・システム開発を担当。'
				},
				title: 'FUKU STEEL PLATE FUND L.P.',
				category: 'ファンド組成・事業構築',
				period: '2026年4月に組成を発表 / 現在も参画',
				status: '組成済み・運用中',
				summary: 'シンガポールの敷鉄板リースを、投資と現場の業務の両側から事業にする。',
				background:
					'建設現場で使う敷鉄板のリースを投資対象とするには、ファンドの仕組みと、資材の調達・配備・契約・請求という実業の流れをつなぐ必要があります。ファンドマネージャーや現地の事業パートナーと連携して、事業として運営できる体制を組み立てる案件です。',
				role: 'RISING SUN VISION PTE. LTD.のCEO / CTOとして、スキーム設計、投資家対応、システム開発を担当。組成後の運用にも関わっています。ファンドマネージャーによる運用業務や、現地パートナーによる調達・リース実務とは担当を分けて参画しています。',
				actions: [
					'投資対象となるリース事業とファンドの関係を整理し、関係者の役割を踏まえてスキームを設計。',
					'投資家とのコミュニケーションを担当し、事業の仕組みや運用に関する説明・対応を継続。',
					'運用業務を支えるシステムを開発。リース契約、資材配備、請求などの業務をデータと画面に落とし込む。'
				],
				outcomes: [
					'FUKU STEEL PLATE FUND L.P.の組成と、組成後の実際の運用への参画。',
					'投資家対応とリース事業の業務システムを含めた、事業運営の仕組みの構築。'
				],
				scope:
					'組成・運用への参画と事業構築の実績です。AUM・利回り・運用損益を示す資料ではありません。ステーブルコイン決済やSunriseの導入構想は、実施済みの成果に含めていません。',
				links: [
					{ label: 'FUKUの公開サイト', href: links.fuku },
					{ label: '組成発表 (2026年4月2日)', href: links.announcement }
				]
			},
			{
				id: 'd6e-systems',
				overview: {
					title: 'D6E',
					summary: 'D6Eを基盤に、業務に合わせた複数のシステムを設計・開発。'
				},
				title: 'D6Eを基盤とした複数システムの開発',
				category: '業務理解・設計・システム実装',
				period: '継続開発',
				status: '開発・提供中',
				summary: '共通基盤と業務ごとのアプリケーションをつなぎ、現場で使う仕組みをつくる。',
				background:
					'AIを業務で使うには、モデルを呼ぶだけでなく、業務データ、既存サービス、認証・権限、利用料の管理をつなぐ必要があります。案件ごとに共通部分を作り直さず、個別の業務に合ったシステムを構築することが課題です。',
				role: 'CAUCHYE ASIA PTE. LTD.のCEO / CTOとして、D6Eを基盤とするシステム開発に従事。業務要件の整理、システム設計、アプリケーション・APIの実装、検証や運用に向けた整備を担当しています。ここでは会社の全案件ではなく、自身が開発に関わる基盤と成果物を紹介します。',
				actions: [
					'業務フローとデータの扱いを整理し、D6Eの認証・API・外部連携を使って個別のアプリケーションへ接続。',
					'AI利用を顧客別に計量し、制限や請求につなぐD6E AI Gatewayの開発。技術側の利用記録と事業側の課金業務を結び付ける。',
					'契約・合意の作成から署名、証跡、完成PDFまでを扱うSignKitなど、業務の一連の流れを実装。画面とAPIの双方から使える構成を整備。'
				],
				outcomes: [
					'D6Eの共通基盤を活用した、複数の業務システム・プロダクトの開発。',
					'成果物例: D6Eの業務自動化基盤、D6E AI Gateway、公開ソースで提供する電子契約プラットフォームSignKit。'
				],
				scope:
					'公開されている基盤・プロダクトと実装済みの成果物を掲載しています。各製品は継続開発中で、顧客名、導入件数、削減率や未有効化の決済機能は成果に含めていません。',
				links: [
					{ label: 'D6E', href: links.d6e },
					{ label: 'D6E AI Gateway', href: links.gateway },
					{ label: 'SignKit', href: links.signkit },
					{ label: 'SignKitのソースコード', href: links.signkitCode }
				]
			},
			{
				id: 'crypto-asset-rescue',
				overview: {
					title: 'ホワイトハッカー',
					summary: '当時約5億円規模の暗号資産救出。回収システムの開発・運用を担当。'
				},
				title: '暗号資産の救出と緊急システム運用',
				category: 'セキュリティ・実装・障害対応',
				period: '2022年1月〜2月',
				status: '対応完了',
				summary: '秘密鍵が流出した状況で、資産を安全なアドレスへ退避させる仕組みを実装・運用。',
				background:
					'第三者に鍵を奪われたウォレットで、ステーキング解除後の資産が流出するおそれがありました。解除時刻やチェーンの違いを把握し、攻撃者より先に退避する必要がある、時間制約の強い依頼でした。',
				role: '本人から依頼を受け、回収方法の設計、自動送金botと手動操作プログラムの開発、ノード運用、障害解析、本番回収を担当。依頼者や外部のノード運用者・チェーン開発者と連携して対応しました。',
				actions: [
					'Cosmos系の複数チェーンに対応した回収プログラムを開発し、少額の送金で事前検証。',
					'ノード停止や応答遅延を調査し、送信経路の分散、接続先や送信処理の見直しを実施。',
					'自動処理と手動操作を併用し、解除のタイミングに合わせて回収を実行。'
				],
				outcomes: [
					'ATOM、JUNO、HUAHUA、OsmosisのLPトークンなど、当時評価額約5億円規模の暗号資産救出に貢献。',
					'自動回収bot、手動送信ツール、運用・障害対応、および公開記事とオンチェーンの回収記録。'
				],
				scope:
					'金額は当時の評価額です。初期の一部OSMOの流出も公開記事に記録されており、すべての被害を防いだという意味ではありません。',
				links: [
					{ label: '本人による対応記録 (note)', href: links.note },
					{ label: '記事内で公開したATOM回収トランザクション', href: links.cosmos }
				]
			}
		]
	},
	en: {
		title: 'Selected work',
		name: 'KIMURA Yu',
		intro:
			'I shape business operations and build the systems that make them work. My work spans fund formation and operations, business software, and crypto-asset rescue, with hands-on responsibility across business and engineering.',
		bio: 'Born in Shiga, Japan, on February 23, 1997. Head of CAUCHYE ASIA PTE. LTD. Economics graduate and MBA from Kyoto University; researching AI in its doctoral program in informatics.',
		approachTitle: 'How I work',
		approach: [
			{
				title: 'Understand the business',
				body: 'Map decisions, money and information flows, then turn business constraints into practical requirements.'
			},
			{
				title: 'Design and build',
				body: 'Connect structures, workflows, data, interfaces and APIs in working deliverables.'
			},
			{
				title: 'Stay involved in operations',
				body: 'Handle investor communication, day-to-day operations and incidents, and feed what I learn back into the design.'
			}
		],
		labels: {
			profile: 'Profile',
			portfolio: 'Work & portfolio',
			read: 'Explore my work',
			pdf: 'Download PDF (Japanese)',
			print: 'Print layout',
			updated: 'Updated',
			contents: 'Selected projects',
			background: 'Background & challenge',
			role: 'My role',
			actions: 'What I did',
			outcomes: 'Results & deliverables',
			links: 'Related links',
			contact: 'Contact',
			contactBody: 'Please contact me through the social links on my profile.',
			caseLink: 'Link to this project',
			publicImage: 'Actual publicly available interface'
		},
		cases: [
			{
				id: 'fuku-steel-plate-fund',
				overview: {
					title: 'FUKU',
					summary:
						'A steel-plate leasing fund in Singapore. I handle structure design, investor communication and systems development.'
				},
				title: 'FUKU STEEL PLATE FUND L.P.',
				category: 'Fund formation & business development',
				period: 'Formation announced April 2026 / ongoing',
				status: 'Established and operating',
				summary:
					'Connecting investment structures with the realities of steel-plate leasing in Singapore.',
				background:
					'A fund investing in steel plates for construction sites needs to connect its investment structure with procurement, deployment, contracts and billing. The business is built in cooperation with a fund manager and local operating partners.',
				role: 'As CEO / CTO of RISING SUN VISION PTE. LTD., I handle structure design, investor communication and systems development, and participate in ongoing operations. My responsibilities are distinct from the fund manager’s investment management and the local partners’ procurement and leasing work.',
				actions: [
					'Designed the structure connecting the leasing business and the fund, with clear responsibilities for each participant.',
					'Handle investor communication about the business and its operations.',
					'Develop systems supporting leasing contracts, deployed materials and billing workflows.'
				],
				outcomes: [
					'Formation of FUKU STEEL PLATE FUND L.P. and participation in its actual operations.',
					'Business operations supported by investor communication and leasing-management software.'
				],
				scope:
					'This case covers fund formation, business development and operational involvement, not AUM or investment returns. Proposed stablecoin settlement and Sunrise integration are not presented as completed work.',
				links: [
					{ label: 'FUKU public website', href: links.fuku },
					{ label: 'Formation announcement (April 2, 2026)', href: links.announcement }
				]
			},
			{
				id: 'd6e-systems',
				overview: {
					title: 'D6E',
					summary: 'Designing and developing multiple business systems on the D6E foundation.'
				},
				title: 'Building business systems on D6E',
				category: 'Business analysis, architecture & implementation',
				period: 'Ongoing development',
				status: 'In development and service',
				summary:
					'Turning a shared foundation into applications shaped around real business workflows.',
				background:
					'Using AI in business requires more than model calls: data, existing services, access control and usage billing must work together. A shared foundation supports applications tailored to each workflow without rebuilding every common component.',
				role: 'As CEO / CTO of CAUCHYE ASIA PTE. LTD., I work on business requirements, system design, application and API implementation, verification and operational preparation. These are selected foundations and deliverables I work on, not a claim to every company engagement.',
				actions: [
					'Map workflows and data, then connect applications through D6E authentication, APIs and service integrations.',
					'Develop D6E AI Gateway to connect per-customer AI usage metering with limits and billing.',
					'Implement end-to-end business workflows in products such as SignKit, from agreement authoring to signatures, evidence and completed PDFs, through both UI and APIs.'
				],
				outcomes: [
					'Multiple business systems and products developed using the D6E foundation.',
					'Examples include D6E’s workflow platform, D6E AI Gateway and the open-source SignKit electronic-agreement platform.'
				],
				scope:
					'Public products and implemented deliverables are shown. Development continues; no customer names, adoption counts, efficiency gains or inactive settlement capabilities are claimed.',
				links: [
					{ label: 'D6E', href: links.d6e },
					{ label: 'D6E AI Gateway', href: links.gateway },
					{ label: 'SignKit', href: links.signkit },
					{ label: 'SignKit source code', href: links.signkitCode }
				]
			},
			{
				id: 'crypto-asset-rescue',
				overview: {
					title: 'White-hat hacking',
					summary:
						'Helped rescue crypto assets worth about JPY 500 million at the time, building and operating the recovery tools.'
				},
				title: 'Crypto-asset rescue & incident operations',
				category: 'Security, engineering & incident response',
				period: 'January-February 2022',
				status: 'Completed',
				summary:
					'Building and operating a rescue system after a wallet’s private key was compromised.',
				background:
					'Assets becoming available after unstaking were at risk of theft. The engagement required understanding different chains and release windows, then moving the assets before an attacker could.',
				role: 'Engaged by the asset owner, I designed the rescue, developed automated and manual transaction tools, operated nodes, investigated failures and executed recovery alongside the owner and external specialists.',
				actions: [
					'Built recovery software for multiple Cosmos-based chains and rehearsed with small transfers.',
					'Investigated node outages and latency, diversified submission routes and improved connection and submission behavior.',
					'Combined automation and manual controls for recovery during release windows.'
				],
				outcomes: [
					'Contributed to rescuing crypto assets worth approximately JPY 500 million at the time, including ATOM, JUNO, HUAHUA and Osmosis LP tokens.',
					'Recovery bots, manual transaction tools, incident operations, a published account and on-chain recovery records.'
				],
				scope:
					'The valuation is historical. The public account also records an early loss of some OSMO; this is not a claim that every loss was prevented.',
				links: [
					{ label: 'My published incident account (note)', href: links.note },
					{ label: 'ATOM recovery transaction linked in the account', href: links.cosmos }
				]
			}
		]
	},
	zh: {
		title: '项目与成果',
		name: '木村优',
		intro:
			'从业务机制的设计，到支撑业务的系统开发，我同时参与商业与技术工作。经历涵盖基金设立与运营、业务系统开发，以及加密资产救援。',
		bio: '1997年2月23日出生于日本滋贺县。CAUCHYE ASIA PTE. LTD.负责人。毕业于京都大学经济学部，获同校经营管理硕士学位，目前在信息学博士课程研究AI。',
		approachTitle: '我的工作方式',
		approach: [
			{
				title: '理解业务与流程',
				body: '梳理决策、资金和信息的流向，将业务限制转化为可实施的需求。'
			},
			{ title: '亲自设计与实现', body: '贯通业务结构、流程、数据、界面与API，交付可使用的成果。' },
			{
				title: '持续参与运营',
				body: '参与投资者沟通、业务运营和故障处理，将实践经验用于后续改进。'
			}
		],
		labels: {
			profile: '个人简介',
			portfolio: '项目与作品集',
			read: '查看项目',
			pdf: '下载PDF (日文)',
			print: '打印版',
			updated: '更新',
			contents: '代表项目',
			background: '背景与挑战',
			role: '我的职责',
			actions: '具体工作',
			outcomes: '成果与交付物',
			links: '相关链接',
			contact: '联系方式',
			contactBody: '请通过个人简介中的社交平台链接与我联系。',
			caseLink: '此项目的链接',
			publicImage: '公开的实际界面'
		},
		cases: [
			{
				id: 'fuku-steel-plate-fund',
				overview: {
					title: 'FUKU',
					summary: '新加坡建筑钢板租赁基金。负责结构设计、投资者沟通和系统开发。'
				},
				title: 'FUKU STEEL PLATE FUND L.P.',
				category: '基金设立与业务构建',
				period: '2026年4月公布设立 / 持续参与',
				status: '已设立并运营',
				summary: '连接投资机制与新加坡建筑钢板租赁业务的实际运作。',
				background:
					'将建筑用钢板租赁作为投资对象，需要贯通基金结构与采购、部署、合同及账单流程，并与基金管理人及当地业务伙伴共同建立运营机制。',
				role: '作为RISING SUN VISION PTE. LTD.的CEO / CTO，我负责结构设计、投资者沟通和系统开发，并参与设立后的运营。我的职责与基金管理人的投资管理、当地伙伴的采购和租赁实务相区分。',
				actions: [
					'梳理基金与租赁业务的关系，根据各方职责设计结构。',
					'持续向投资者说明业务机制并处理运营相关沟通。',
					'开发支撑租赁合同、钢板部署及账单流程的业务系统。'
				],
				outcomes: [
					'FUKU STEEL PLATE FUND L.P.的设立及对实际运营的参与。',
					'建立包括投资者沟通与租赁业务系统在内的运营机制。'
				],
				scope:
					'本案例涉及基金设立、业务构建及运营参与，不展示AUM、收益率或投资损益。稳定币结算及Sunrise集成的构想不列作已完成成果。',
				links: [
					{ label: 'FUKU公开网站', href: links.fuku },
					{ label: '设立公告 (2026年4月2日)', href: links.announcement }
				]
			},
			{
				id: 'd6e-systems',
				overview: { title: 'D6E', summary: '基于D6E平台，设计和开发适合具体业务的多个系统。' },
				title: '基于D6E开发多个业务系统',
				category: '业务分析、架构与系统实现',
				period: '持续开发',
				status: '开发与提供中',
				summary: '将共通基础平台与具体业务相结合，构建实际可用的应用。',
				background:
					'企业使用AI不仅需要模型调用，还需要连接数据、现有服务、权限及费用管理。共通平台可减少重复建设，同时让应用符合具体业务流程。',
				role: '作为CAUCHYE ASIA PTE. LTD.的CEO / CTO，我参与业务需求梳理、系统设计、应用和API开发、验证及运营准备。这里展示的是我参与开发的平台和成果，而非公司全部项目。',
				actions: [
					'梳理流程和数据，通过D6E的认证、API及外部集成连接应用。',
					'开发D6E AI Gateway，贯通客户级AI用量计量、限制和账单。',
					'在SignKit等产品中实现从协议编写到签署、证据和完成PDF的流程，支持界面及API操作。'
				],
				outcomes: [
					'利用D6E基础平台开发多个业务系统和产品。',
					'成果示例包括D6E业务自动化平台、D6E AI Gateway及开源电子协议平台SignKit。'
				],
				scope:
					'展示公开产品及已实现的交付物。产品持续开发中，不披露客户名称、采用数量、效率提升数据，也不将尚未启用的结算能力作为成果。',
				links: [
					{ label: 'D6E', href: links.d6e },
					{ label: 'D6E AI Gateway', href: links.gateway },
					{ label: 'SignKit', href: links.signkit },
					{ label: 'SignKit源代码', href: links.signkitCode }
				]
			},
			{
				id: 'crypto-asset-rescue',
				overview: {
					title: '白帽安全',
					summary: '参与救出当时估值约5亿日元的加密资产，负责回收系统的开发与运维。'
				},
				title: '加密资产救援与应急运维',
				category: '安全、开发与故障响应',
				period: '2022年1月至2月',
				status: '已完成',
				summary: '在钱包私钥泄露后，开发并运行将资产转移至安全地址的救援系统。',
				background:
					'解除质押后的资产面临被盗风险。需要理解各链的释放时间与机制，在攻击者之前完成转移，时间限制十分严格。',
				role: '接受资产所有者委托，负责救援方案、自动及手动交易工具开发、节点运维、故障分析与实际回收，并与委托人及外部专家合作。',
				actions: [
					'为多个Cosmos生态链开发回收程序，并使用小额转账进行演练。',
					'调查节点停机和延迟，分散发送路径，改进节点连接与提交方式。',
					'结合自动化与手动操作，在资产释放窗口执行回收。'
				],
				outcomes: [
					'参与救出按当时估值约5亿日元的资产，包括ATOM、JUNO、HUAHUA及Osmosis LP代币。',
					'交付回收程序、手动交易工具、应急运维，以及公开事件记录和链上回收记录。'
				],
				scope: '金额为当时估值。公开记录也载明早期部分OSMO损失，并不表示避免了全部损失。',
				links: [
					{ label: '本人公开的事件记录 (note)', href: links.note },
					{ label: '记录中公开的ATOM回收交易', href: links.cosmos }
				]
			}
		]
	}
};

export function getPortfolio(locale: Locale): Portfolio {
	return portfolios[locale];
}
