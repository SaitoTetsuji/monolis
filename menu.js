        // ボタン要素とメニュー要素の取得
        const menuButton = document.getElementById('menu-button');
        const slideMenu = document.getElementById('slide-menu');
        const content = document.getElementById('menu');

        // ボタンクリック時の処理
        menuButton.addEventListener('click', () => {
            // メニューの表示・非表示を切り替える
            if (slideMenu.style.right === '-240px') {
                slideMenu.style.right = '0px';
                menuButton.style.right = '250px';
                //content.style.marginRight = '600px';
            } else {
                slideMenu.style.right = '-240px';
                menuButton.style.right = '10px';
                //content.style.marginRight = '0px';
            }
        });