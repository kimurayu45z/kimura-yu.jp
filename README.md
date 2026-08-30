# kimura-yu.jp

Astro 7 + Svelte 5 + shadcn-svelte (Luma) + Paraglide JS で構築した、3言語対応の個人プロフィール／デジタル名刺です。Cloudflare Workers のSSRとして動作します。

## ローカル開発

```sh
pnpm install
cp .dev.vars.example .dev.vars
pnpm run types
pnpm dev
```

`en`、`ja`、`zh` がParaglideのlocaleです。URLは `/en`、`/ja`、`/zh` を使い、中国語ページのHTML言語タグも `zh` を出力します。

## 非公開モード

非公開ページは `/{locale}/private` です。日付やアクセス元のタイムゾーンは認証に使いません。日付は推測可能で、IPベースの所在地はVPN・ローミング・組織ネットワーク・日付境界の影響を受けるためです。

代わりに、独立した高エントロピー値を設定します。

```sh
pnpm exec wrangler secret put PRIVATE_ACCESS_PASSWORD
pnpm exec wrangler secret put PRIVATE_SESSION_SECRET
```

認証に成功すると、8時間有効なHMAC署名済みCookieを発行します。Cookieは `HttpOnly`、`Secure`、`SameSite=Strict` です。非公開HTMLと非公開vCardは毎回Cookieを検証し、`no-store` と `noindex` を付けます。

本番公開時は、Cloudflare側でも `*/private/session` の失敗試行を対象にRate Limiting Ruleを設定してください。アプリ側は入力サイズを制限し、パスワードを定数時間で照合しますが、分散ブルートフォース対策はエッジ側のルールで補完します。

電話番号、すべてのメールアドレス、Instagramは公開HTML、公開vCard、公開QRに含まれません。公開QRは常に公開プロフィールURLだけをエンコードします。

## 本番ドメイン

`www.kimura-yu.jp` を本体WorkerのCustom DomainとしてPersonalアカウントに接続します。wwwを正規URLとして配信し、apexは専用のRedirect Workerからパスとクエリを保持したHTTP 308としてwwwへ転送します。

canonical、hreflang、OG URLはwwwを使います。QRコード、共有リンク、vCardのSOURCEは短いapex URLを入口として使い、アクセス時にwwwへ転送されます。

## 環境変数

一覧とローカル用の空テンプレートは `.dev.vars.example` にあります。個人情報を含む `.dev.vars` はGit管理されません。本番では `wrangler secret put` またはCloudflareのSecret設定を使ってください。

## 検証

```sh
pnpm run check
pnpm run lint
pnpm run test:unit
pnpm run test:e2e
pnpm run deploy:dry-run
```

## 継続デプロイ

GitHub ActionsはPull Requestで検証のみを行い、`main`へのpushと手動実行では検証に成功した成果物だけをCloudflare Workersへデプロイします。GitHubの`Production` Environmentに次を設定します。

- Environment variable: `CLOUDFLARE_ACCOUNT_ID`
- Environment secret: `CLOUDFLARE_API_TOKEN`

Cloudflare API TokenはPersonalアカウントだけにスコープを限定し、Workers Scriptsの編集権限だけを付与します。値はリポジトリやWorkflowへ直接記載しません。

個人情報を含む15個の実行時SecretはCloudflare Worker側だけで管理します。通常の`wrangler deploy`では登録済みのWorker Secretは削除されないため、GitHubへ複製しません。

Custom DomainとapexからwwwへのPermanent Redirectは一度だけCloudflare側で設定し、通常のCDには含めません。Astroの成果物生成には`wrangler.astro.jsonc`を使い、Custom Domainを管理する`routes`をデプロイトークンの権限境界から外します。

本番デプロイ時は、ローカルの `.dev.vars` をSecretとしてコードと同時に登録します。

```sh
pnpm run build
pnpm exec wrangler deploy --secrets-file .dev.vars
pnpm run deploy:apex
```
