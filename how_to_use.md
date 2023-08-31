## インポート方法
```html
<script src="https://monolis.f5.si/js/api_access.js"></script>
```
## 使い方

### 0. 初期化方法

```javascript
const api = new MonolisAPI("monolis.f5.si/api");
```

### 1. ユーザー登録 (POST /register)

```javascript
api.register('username', 'email@example.com', 'password').then(res => {
    if(res.status === 201){
        // 成功の処理
    } else if(res.status === 409){
        // ユーザー名またはメールアドレスがすでに登録されている場合の処理
    } else {
        // その他のエラー処理
    }
});
```

### 2. ユーザー削除 (DELETE /user)

```javascript
api.deleteUser().then(res => {
    if(res.status === 200){
        // 成功の処理
    } else if(res.status === 404){
        // ユーザーが見つからない場合の処理
    } else {
        // その他のエラー処理
    }
});
```

### 3. ログイン (POST /login)

```javascript
api.login('usernameOrEmail', 'password').then(res => {
    if(res.status === 200){
        // 成功の処理
    } else if(res.status === 403){
        // パスワードが間違っている場合の処理
    } else if(res.status === 404){
        // ユーザーが見つからない場合の処理
    } else {
        // その他のエラー処理
    }
});
```

### 4. ログアウト (POST /logout)

```javascript
api.logout().then(res => {
    if(res.status === 200){
        // 成功の処理
    } else {
        // エラー処理
    }
});
```

### 5. ユーザの編集できるページ一覧の取得 (GET /pages)

```javascript
api.getPages().then(res => {
    if(res.status === 200){
        // 成功の処理
        let pages = res.data; // ページ一覧
    } else {
        // エラー処理
    }
});
```

### 6. ページの作成 (POST /pages)

```javascript
let page = {
  "title": "タイトル",
  "content": "内容",
  "access_type": 0,
  "password": "パスワード",
  "allowed_user_ids": [1, 2],
  "co_editor_user_ids": [3, 4]
};

api.createPage(page).then(res => {
    if(res.status === 200){
        // 成功の処理
    } else {
        // エラー処理
    }
});
```

### 7. ページの取得 (GET /pages/:id)

```javascript
let pageId = "ページID";

api.getPage(pageId).then(res => {
    if(res.status === 200){
        // 成功の処理
    } else if(res.status === 403){
        // アクセス権が無い場合の処理
    } else if(res.status === 404){
        // ページが見つからない場合の処理
    } else {
        // その他のエラー処理
    }
});
```

### 8. ページの更新 (PUT /pages/:id)

```javascript
let pageId = "ページID";
let newPage = {
  "title": "新しいタイトル",
  "content": "新しい内容",
  "access_type": 1,
  "password": "新しいパスワード",
  "allowed_user_ids": [5, 6],
  "co_editor_user_ids": [7, 8]
};

api.updatePage(pageId, newPage).then(res => {
    if(res.status === 200){
        // 成功の処理
    } else if(res.status === 404){
        // ページが見つからない、または編集権限がない場合の処理
    } else {
        // その他のエラー処理
    }
});
```

### 9. ページの削除 (DELETE /pages/:id)

```javascript
let pageId = "ページID";

api.deletePage(pageId).then(res => {
    if(res.status === 200){
        // 成功の処理
    } else if(res.status === 404){
        // ページが見つからない、または削除権限がない場合の処理
    } else {
        // その他のエラー処理
    }
});
```

### 10. 配信ページの取得 (GET /page/:id)

```javascript
let pageId = "ページID";
let password = "パスワード"; // 任意

api.getPublicPage(pageId, password).then(res => {
    if(res.status === 200){
        // 成功の処理
    } else if(res.status === 403){
        // パスワードが不正または欠落している、または許可されていないユーザーの場合の処理
    } else if(res.status === 404){
        // ページが見つからない場合の処理
    } else {
        // その他のエラー処理
    }
});
```

### 11. ユーザー名からユーザーIDへの変換 (POST /usernamesToIds)

```javascript
let usernames = ["ユーザー名1", "ユーザー名2"];

api.usernamesToIds(usernames).then(res => {
    if(res.status === 200){
        // 成功の処理
    } else {
        // エラー処理


    }
});
```

### 12. ユーザーIDからユーザー名への変換 (POST /idsToUsernames)

```javascript
let ids = [ユーザーID1, ユーザーID2];

api.idsToUsernames(ids).then(res => {
    if(res.status === 200){
        // 成功の処理
    } else {
        // エラー処理
    }
});
```

### 13. ユーザー情報の取得 (GET /getUserInfo)

```javascript
api.getUserInfo().then(res => {
    if(res.status === 200){
        // 成功の処理
        let userInfo = res.data; // ユーザー情報
    } else {
        // エラー処理
    }
});
```

