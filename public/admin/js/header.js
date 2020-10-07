window.addEventListener('load', function () {
    // 下拉框
    var oBtn = document.querySelector('.header').querySelector('.info').querySelector('.profile');
    var oMenu = document.querySelector('.dropdown-menu');

    oBtn.addEventListener('mouseover', function () {
        oMenu.style.display = 'block';
    });
    oBtn.addEventListener('mouseout', function () {
        oMenu.style.display = 'none';
    });

    
})