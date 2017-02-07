;
/**
 * @author Coco
 * @YY 909074129
 * @name Popupbox 1.0.5
 * @description 弹窗相关
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *
 * 1、使用：var popupbox = new Popupbox();
 *
 * 2、API:
 *  1) popupbox.show(); // 不自动关闭
 *  2) popupbox.show(5); // 5s后自动关闭
 *  3) popupbox.hide(); // 关闭弹窗
 *  4) popupbox.set(title, desc) // 设置弹窗标题描述
 *
 */
(function (name, definition) {
    if (typeof define === 'function') {
        define(definition);
    } else {
        this[name] = definition();
    }
})('Popupbox', function () {
    /**
     *
     * @param options
     * @constructor
     */
    function Popupbox(options) {
        this.version = '1.0.5';
        this._default = {
            // 遮罩层
            'popupwrap': '.popupwrap',
            // 弹框层
            'popupbox': '.popupbox',
            // 单个确定按钮
            'confirmBtn': '.btn-confirm',
            // 两个确定按钮盒子
            'chooseBox': '.g-choose-box',
            // 是按钮
            'yesBtn': '.btn-yes',
            // 否按钮
            'noBtn': '.btn-no',
            // 标题
            'title': '.title',
            // 描述
            'desc': '.desc',
            // 倒计时时间
            'time': 3
        };
        this._options = extend(this._default, options);
        this._countdown = null;
        this._commodityType = 0;
        this._commodityId = 0;
        this._showType = 1;

        this._isMinLive = 0;

        // 通用框
        this.$popupwrap = document.querySelector(this._options.popupwrap);
        this.$popupbox = document.querySelector(this._options.popupbox);
        this.$popupbtn = this.$popupbox.querySelector(this._options.confirmBtn);
        this.$popuptitle = this.$popupbox.querySelector(this._options.title);
        this.$popupdesc = this.$popupbox.querySelector(this._options.desc);
        this.$popupChooseBox = this.$popupbox.querySelector(this._options.chooseBox);
        this.$popupYesBtn = this.$popupbox.querySelector(this._options.yesBtn);
        this.$popupNoBtn = this.$popupbox.querySelector(this._options.noBtn);

        this._bind();
    }

    Popupbox.prototype.constructor = Popupbox;

    /**
     * _show
     * @param  {[DOM]} elem [show dom]
     * @return {*}
     */
    Popupbox.prototype._show = function (elem) {
        elem.style.display = "block";
    };

    /**
     * _hide
     * @param  {[type]} elem [hide dom]
     * @return {*}
     */
    Popupbox.prototype._hide = function (elem) {
        elem.style.display = "none";
    };

    /**
     * show
     * @return {*}
     */
    Popupbox.prototype.show = function (countDownTime) {
        if (this._showType == 1) {
            this._hide(this.$popupChooseBox);
            this._show(this.$popupbtn);
        } else {
            this._hide(this.$popupbtn);
            this._show(this.$popupChooseBox);
        }

        this._show(this.$popupwrap);
        this._show(this.$popupbox);

        if (countDownTime) {
            this._interval(countDownTime);
        }
    };

    /**
     * hide
     * @return {*}
     */
    Popupbox.prototype.hide = function () {
        this._hide(this.$popupwrap);
        this._hide(this.$popupbox);

        clearInterval(this._countdown);
    };

    /**
     * set title && desc
     * @param {[String]} title
     * @param {[String]} desc
     */
    Popupbox.prototype.set = function (title, desc, callback) {
        if (arguments.length === 2) {
            this._showType = 1;
        } else if (arguments.length === 3) {
            this._showType = 2;
        }

        this.$popuptitle.innerText = title;
        this.$popupdesc.innerText = desc;

        if (callback && typeof callback === "function") {
            this.$popupYesBtn.addEventListener('click', function (e) {
                callback();
            });
        }
    };

    Popupbox.prototype._interval = function (countDownTime) {
        var me = this;
        var time = countDownTime || this._options.time;
        console.log(time);
        me.$popupbtn.innerText = '知道了(' + time-- + '秒)';

        me._countdown = setInterval(function () {
            me.$popupbtn.innerText = '知道了(' + time-- + '秒)';

            if (time == -1) {
                clearInterval(me._countdown);
                me.hide();
                me.$popupbtn.innerText = '知道了';
            }
        }, 1000);
    };

    /**
     * event bind
     * @return {*}
     */
    Popupbox.prototype._bind = function () {
        var me = this;

        this.$popupbtn.addEventListener('click', function (e) {
            me.hide();
        });

        this.$popupNoBtn.addEventListener('click', function (e) {
            me.hide();
        });

        this.$popupwrap.addEventListener('click', function (e) {
            me.hide();
            me._successBoxHide();
        });
    };

    /**
     * simple `extend` method
     * @param target
     * @param source
     * @returns {*}
     */
    function extend(target, source) {
        for (var key in source) {
            target[key] = source[key];
        }

        return target;
    }

    /**
     * export
     */
    return Popupbox;
});