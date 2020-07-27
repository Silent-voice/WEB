

window.onload = function(){
    let form = document.querySelector('#form_1');
    let bt = document.querySelector('#bt_1');


    bt.onclick = sendData;


    function sendData(){
        event.preventDefault();     // 取消当前元素的默认行为


        let xhr = new XMLHttpRequest();

        // 自动初始化，有name的字段都会生成一个key/value对
        let fd = new FormData(form);
        // 手动添加字段
        fd.append("key1", "value1");

        xhr.onload = function(event){
            alert(event.target.responseText);
        };

        xhr.onerror = function(event){
            alert('哎呀！出了一些问题。');
        };


        xhr.open("POST", "https://example.com/cors.php");

        xhr.send(fd);

    }


}