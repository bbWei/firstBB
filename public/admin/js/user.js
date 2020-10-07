window.addEventListener('load', function () {
    // 删除框
    var oDeletbtn = document.querySelector('.table').querySelectorAll('.icon-ashbin');
    var oDelete = document.querySelector('.modal-dialog');
    var oButton = document.querySelector('.modal').querySelectorAll('.btn');

    for (var i = 0; i < oDeletbtn.length; i++) {
        oDeletbtn[i].addEventListener('click', function () {
            oDelete.style.display = 'block';
        });
    };
    for (var i = 0; i < oButton.length; i++) {
        oButton[i].addEventListener('click', function () {
            oDelete.style.display = 'none';
        });
    };

    // 页码
    var oPage = document.querySelector('.pagination').querySelectorAll('li');

    for (var i = 0; i <  oPage.length; i++) {
        oPage[i].addEventListener('click', function () {
            for (var i = 0; i <  oPage.length; i++) {
                oPage[i].className = '';
            }
            this.className = 'page_current';
        });
    };
})