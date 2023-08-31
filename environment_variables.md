# Environment Variables

以下の環境変数は、アプリケーションの設定と動作に必要です。内容を`.env`ファイルに保存してください。

## Database Configuration

- `DB_HOST`: PostgreSQLデータベースのホスト名
- `DB_PORT`: PostgreSQLデータベースのポート番号
- `DB_NAME`: 接続するデータベース名
- `DB_USER`: データベースのユーザ名
- `DB_PASS`: データベースのパスワード

## Authentication

- `ACCESS_TOKEN_SECRET`: JWT認証の秘密鍵。ランダムな半角英数文字列で17文字以上を指定してください。
- `PASSWORD_PEPPER`: パスワードハッシュのペッパー。ランダムな半角英数文字列で8文字以上を指定してください。

## Server Configuration

- `PORT`: APIサーバーがリッスンするポート番号

## Environment

- `NODE_ENV`: 実行環境。`production`または`development`のいずれかでなければなりません。本番環境であれば`production`を、開発環境であれば`development`を指定します。

## Sample
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASS=password
ACCESS_TOKEN_SECRET=Pr3AbYOiYkfXAc18HVhOuxb1uIgtVqRX
PASSWORD_PEPPER=N0oXIjJnFg
PORT=3000
NODE_ENV=development
```