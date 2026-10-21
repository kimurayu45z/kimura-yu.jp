# 実績とPDF

## 正本

実績本文の正本は `src/content/portfolio.ts`。Paraglideから取得した `en`、`ja`、`zh` のlocaleに対応する本文を返す。公開画像と出典は `src/content/portfolio-media.ts` で管理する。

`PortfolioDocument.astro` をWebと印刷ページの両方で使う。別のPDF用原稿は作らない。各事例のIDは固定し、`/{locale}/portfolio#fuku-steel-plate-fund` のような直接リンクを維持する。

## 経路

- `/{locale}`: 既存の名刺に実績への入口を追加。
- `/{locale}/portfolio`: 自己紹介と3事例。
- `/{locale}/portfolio/print`: 操作UIを含まない印刷版。検索結果には掲載しない。
- `/portfolio/kimura-yu-portfolio-ja.pdf`: 同じ原稿から生成した提出用の日本語PDF。

公開ページの言語切り替えは現在の `pagePath` を維持する。

## PDF生成

```sh
pnpm exec playwright install chromium
pnpm run portfolio:pdf
```

一時的なループバックのAstroサーバーから印刷ページを読み、画像とフォントの読み込みを待ってChromiumで出力する。A4縦、本文はテキスト、リンクと文書のアウトラインを保持。ブラウザのヘッダー・フッターは出力しない。文書独自の氏名・URL・ページ番号を余白に配置する。

成果物は `output/pdf/kimura-yu-portfolio-ja.pdf` に置き、公開アセットにもコピーする。PDF、生成manifest、検証用スナップショットはGit管理せず、`pnpm run build` とCIで毎回再生成する。manifestのsourceHashは原稿のSHA-256。PDFだけが古いまま配信されることを防ぐ。

## 公開範囲

電話番号、メールアドレス、Telegram、Instagramの非公開情報は、実績データやPDFへ渡さない。連絡先は公開プロフィールURLとし、公開済みのSNSへの導線を利用する。TRPや依頼者の氏名はサイト・PDFに掲載しない。

確認済みの掲載根拠は [原稿の確認記録](../editorial/portfolio-evidence.md)。ファンド組成と運用成績、プロダクトの実装と将来構想、会社の業務と本人の担当を区別する。
