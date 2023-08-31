# Monolis Backend Web API データベース構造 (PostgreSQL)

## Usersテーブル

| Column         | Type                                  | Description                        |
|----------------|---------------------------------------|------------------------------------|
| id             | SERIAL PRIMARY KEY                    | ユーザID                            |
| username       | TEXT NOT NULL                         | ユーザ名                           |
| email          | TEXT NOT NULL UNIQUE                  | メールアドレス                      |
| password_hash  | TEXT NOT NULL                         | ハッシュ化されたパスワード                    |
| password_salt  | TEXT NOT NULL                         | パスワードのハッシュ化に使用するソルト          |
| created_at     | TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP | ユーザ作成日時        |
| updated_at     | TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP | ユーザ更新日時          |

## Pagesテーブル

| Column                | Type                                  | Description                                               |
|-----------------------|---------------------------------------|-----------------------------------------------------------|
| id                    | SERIAL PRIMARY KEY                    | ページID                                                   |
| title                 | TEXT NOT NULL                         | ページタイトル                                              |
| content               | TEXT                                  | ページの内容 (HTML, Markdownなど)                            |
| thumbnail              | TEXT                                 | ページのサムネイル (Base64エンコードされたWebPイメージ)  |
| access_type           | INT NOT NULL                          | アクセス制限の種類 (0: 公開, 1: パスワード制限, 2: 特定ユーザのみ)  |
| password              | TEXT                                  | アクセス制限に使用するパスワード (アクセス制限がパスワード制限の場合)  |
| allowed_user_ids      | INT[]                                 | アクセス可能なユーザIDのリスト                                 |
| co_editor_user_ids    | INT[]                                 | 共同編集者のユーザIDのリスト                                    |
| creator_id            | INT REFERENCES Users(id)              | ページの作成者ID（`Users`テーブルの`id`への外部キー）                |
| created_at            | TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP | ページ作成日時                              |
| updated_at            | TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP | ページ更新日時                              |

## データベース作成SQLコマンド

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    access_type INT NOT NULL,
    password TEXT,
    allowed_user_ids INT[],
    co_editor_user_ids INT[],
    creator_id INT REFERENCES users(id),
    thumbnail TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```


#### コマンドライン貼り付け用
```sql
CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, password_salt TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP); CREATE TABLE pages (id SERIAL PRIMARY KEY, title TEXT NOT NULL, content TEXT, access_type INT NOT NULL, password TEXT, allowed_user_ids INT[], co_editor_user_ids INT[], creator_id INT REFERENCES users(id), thumbnail TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);
```
