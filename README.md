# popupbox
a mobile popupbox component

## Usage
使用：`var popupbox = new Popupbox()`，兼容AMd、CMD。

## API
+ popupbox.show(); // 展示弹窗
+ popupbox.show(5); // 展示弹窗，5s后自动关闭
+ popupbox.hide(); // 关闭弹窗
+ popupbox.set(title, desc) // 设置弹窗标题及描述
+ popupbox.set(title, desc, callback) // 3个参数时，有两个选项按钮，第二选项按钮带有一个 callback 函数

业务简化版本，删掉了很多功能，保留最基本的功能，根据情况自行拓展。

## License
MIT

