
# Monolis Backend Web API エンドポイント一覧

以下は、Monolis Backend Web APIのエンドポイント、必要なJSONリクエスト、期待される返答、および必要なクエリパラメータの一覧です。

## 1. ユーザー登録 (POST /register)

### 送信するJSON
```json
{
  "username": "ユーザー名",
  "email": "メールアドレス",
  "password": "パスワード"
}
```

### 期待される返答
- 成功の場合: 201 Created と新しいユーザーのID
- ユーザー名がすでに使用されている場合: 409 Conflict とエラーメッセージ `Username already registered`
- メールアドレスがすでに登録されている場合: 409 Conflict とエラーメッセージ `Email already registered`
- 失敗の場合: 500 Internal Server Error とエラーメッセージ

## 2. ユーザー削除 (DELETE /user)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 期待される返答
 - 成功の場合: 200 OK と成功メッセージ
 - ユーザーが見つからない場合: 404 Not Found とエラーメッセージ `User not found`
 - 失敗の場合: 500 Internal Server Error とエラーメッセージ

### 補足
 - このエンドポイントは、認証されたユーザーとそのユーザーが作成したすべてのページを削除します。トランザクションを使用しているため、途中でエラーが発生した場合は、変更はロールバックされます。
 - アカウント削除後は自動的に認証トークンが削除され、ログアウトします。

## 3. ログイン (POST /login)

### 送信するJSON
```json
{
  "usernameOrEmail": "ユーザー名またはメールアドレス",
  "password": "パスワード"
}
```

### 期待される返答
- 成功の場合: 200 OK と成功メッセージ
- パスワードが間違っている場合: 403 Forbidden とエラーメッセージ `Incorrect password`
- ユーザーが見つからない場合: 404 Not Found とエラーメッセージ `User not found`
- 失敗の場合: 500 Internal Server Error とエラーメッセージ

## 4. ログアウト (POST /logout)

### 期待される返答
- 成功の場合: 200 OK と成功メッセージ

## 5. ユーザの編集できるページ一覧の取得 (GET /pages)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 期待される返答
- 成功の場合: 200 OK とユーザーがアクセス可能なページの一覧
```json
[
  {
    "id": ページID,
    "title": "タイトル1",
    "access_type": アクセスタイプ(0: 公開, 1: パスワード制限, 2: 特定ユーザのみ),
    "password": "パスワード",
    "allowed_user_ids": [許可されたユーザーIDのリスト],
    "co_editor_user_ids": [共同編集者のユーザーIDのリスト],
    "creator_id": 作者のユーザーID,
    "thumbnail" : "ページのサムネイル (Base64エンコードされたWebPイメージ)",
    "created_at": "作成日時",
    "updated_at": "最終更新日時"
  },{
    "id": ページID,
    "title": "タイトル2",
    "access_type": アクセスタイプ(0: 公開, 1: パスワード制限, 2: 特定ユーザのみ),
    "password": "パスワード",
    "allowed_user_ids": [許可されたユーザーIDのリスト],
    "co_editor_user_ids": [共同編集者のユーザーIDのリスト],
    "creator_id": 作者のユーザーID,
    "thumbnail" : "ページのサムネイル (Base64エンコードされたWebPイメージ)",
    "created_at": "作成日時",
    "updated_at": "最終更新日時"
  },
  ...
]
```
- 失敗の場合: 500 Internal Server Error とエラーメッセージ

## 6. ページの作成 (POST /pages)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 送信するJSON
```json
{
  "title": "タイトル",
  "content": "内容",
  "access_type": アクセスタイプ(0: 公開, 1: パスワード制限, 2: 特定ユーザのみ),
  "password": "パスワード（任意）",
  "allowed_user_ids": [許可されたユーザーIDのリスト],
  "co_editor_user_ids": [共同編集者のユーザーIDのリスト]
}
```

### 期待される返答
- 成功の場合: 200 OK と作成されたページの情報
- 失敗の場合: 500 Internal Server Error とエラーメッセージ

## 7. ページの取得 (GET /pages/:id)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 期待される返答
- 成功の場合: 200 OK とページの情報
```json
{
  "id": ページID,
  "title": "タイトル",
  "content": "内容",
  "access_type": アクセスタイプ(0: 公開, 1: パスワード制限, 2: 特定ユーザのみ),
  "password": "パスワード",
  "allowed_user_ids": [許可されたユーザーIDのリスト],
  "co_editor_user_ids": [共同編集者のユーザーIDのリスト],
  "creator_id": 作者のユーザーID,
  "thumbnail" : "ページのサムネイル (Base64エンコードされたWebPイメージ)",
  "created_at": "作成日時",
  "updated_at": "最終更新日時"
}
```
- アクセス権が無い場合: 403 Forbidden とエラーメッセージ `Do not have permission`
- ページが見つからない場合: 404 Not Found とエラーメッセージ `Page not found`
- 失敗の場合: 500 Internal Server Error とエラーメッセージ

## 8. ページの更新 (PUT /pages/:id)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 送信するJSON
```json
{
  "title": "新しいタイトル",
  "content": "新しい内容",
  "access_type": 新しいアクセスタイプ(0: 公開, 1: パスワード制限, 2: 特定ユーザのみ),
  "password": "新しいパスワード（任意）",
  "allowed_user_ids": [新しい許可されたユーザーIDのリスト],
  "co_editor_user_ids": [新しい共同編集者のユーザーIDのリスト]
}
```

### 期待される返答
- 成功の場合: 200 OK と成功メッセージ
- ページが見つからない、または編集権限がない場合: 404 Not Found とエラーメッセージ `Page not found or Do not have permission`
- 失敗の場合: 500 Internal Server Error とエラーメッセージ

## 9. ページの削除 (DELETE /pages/:id)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 期待される返答
- 成功の場合: 200 OK と成功メッセージ
- ページが見つからない、または削除権限がない場合: 404 Not Found とエラーメッセージ `Page not found or Do not have permission`
- 失敗の場合: 500 Internal Server Error とエラーメッセージ


## 10. 配信ページの取得 (GET /page/:id)

### クエリパラメータ
 - password: ページへのアクセスに必要なパスワード（ページがパスワード制限されている場合）
```url
https://server_domain/page/ページID?password=パスワード
```

### 期待される返答
 - 成功の場合: 200 OK とページの情報
```json
{
  "content": "ページ内容"
}
```
 - パスワードが不正または欠落している場合: 403 Forbidden とエラーメッセージ `Incorrect password`
 - 許可されていないユーザーの場合: 403 Forbidden とエラーメッセージ `Do not have permission`
 - ページが見つからない場合: 404 Not Found とエラーメッセージ `Page not found`
 - 失敗の場合: 500 Internal Server Error とエラーメッセージ


 ## 11. ユーザー名からユーザーIDへの変換 (POST /usernamesToIds)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 送信するJSON
```json
{
  "usernames": ["ユーザー名1", "ユーザー名2", ...]
}
```

### 期待される返答
- 成功の場合: 200 OK とユーザー名からユーザーIDへのマッピング
```json
{
  "ユーザー名1": ユーザーIDまたは'no match',
  "ユーザー名2": ユーザーIDまたは'no match',
  ...
}
```
- 失敗の場合: 500 Internal Server Error とエラーメッセージ

## 12. ユーザーIDからユーザー名への変換 (POST /idsToUsernames)

### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。

### 送信するJSON
```json
{
  "ids": [ユーザーID1, ユーザーID2, ...]
}
```

### 期待される返答
- 成功の場合: 200 OK とユーザーIDからユーザー名へのマッピング
```json
{
  ユーザーID1: "ユーザー名"または'no match',
  ユーザーID2: "ユーザー名"または'no match',
  ...
}
```
- 失敗の場合: 500 Internal Server Error とエラーメッセージ


## 13. ユーザー情報の取得 (GET /getUserInfo)
### 前提条件
 - このエンドポイントの使用には認証（ログイン）が必要です。認証はCookieに保存されたトークンで自動的に行われます。
### 期待される返答
- 成功の場合: 200 OK とログインユーザーの情報
```json
{
  "id": "ユーザーID",
  "username": "ユーザー名",
  "email": "メールアドレス"
}
```

- 失敗の場合: 401 Unauthorized または 500 Internal Server Error とエラーメッセージ
