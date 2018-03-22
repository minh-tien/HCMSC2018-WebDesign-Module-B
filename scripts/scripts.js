'use strict'

$(document).ready(() => {
    var elem, stats, may_bay, oBird, frame, oCloud, core, size, info, key, oSao, oNL;
    elem = {
        nl: $('.bar .nhien_lieu'),
        t_nl: $('.bar .txt_nl'),
        sao: $('.bar .sao'),
        t_sao: $('.bar .txt_sao'),
        t_time: $('.bar .txtTime'),
        btn_start: $('.bar .start'),
        btn_loa: $('.bar .loa'),
        btn_up: $('.bar .fUp'),
        btn_down: $('.bar .fDown'),
        ins_btn: $('#btn1'),
        rank_btn: $('#btn2'),
        sc_ins: $('.ins'),
        sc_rank: $('.rank'),
        sc_main: $('.main'),
        may_bay: $('.may_bay'),
        dynamic: $('#dynamic')
    }

    size = {
        bird: [100, 50],
        khi_cau: [50, 100],
        may_bay: [150, 75],
        may: [200, 100]
    }


    elem.ins_btn.click((e) => {
        elem.sc_ins.addClass('hide');
        elem.sc_main.removeClass('hide');
        init();
        loop();
    })

    $(window).keydown((e) => {
        switch (e.which) {
            case 37:
                key.left = true;
                break;
            case 38:
                key.top = true;
                break;
            case 39:
                key.right = true;
                break;
            case 40:
                key.bottom = true;
                break;
        }
    })

    $(window).keyup((e) => {
        switch (e.which) {
            case 37:
                key.left = false;
                break;
            case 38:
                key.top = false;
                break;
            case 39:
                key.right = false;
                break;
            case 40:
                key.bottom = false;
                break;
        }
    })

    var init = () => {
        stats = 2; // 0: Playing, 1: Over, 2:Ins, 3: Rank
        frame = 0;
        oCloud = [];
        oBird = [];
        oSao = [];
        oNL = [];
        info = {
            time: 0,
            nl: 10
        }

        key = {
            left: false,
            top: false,
            right: false,
            bottom: false
        }
    }

    var initElem = (o, s, type) => { // true: left
        var cL, cT;
        if (type) {
            cL = 1024;
            cT = 0;
        } else {
            cL = 0;
            cT = -768;
        }
        var left = Math.round(Math.random() * 1024 + cL);
        var top = Math.round(Math.random() * 768 + cT);
        var html = `<div class="${o}" style="top:${top}px;left:${left}px"></div>`;
        elem.dynamic.append(html);
        s.push($('#dynamic>div:last-child'));
    }

    var delElem = (o, s, type) => {
        for (var i = 0; i < s.length; i++) {
            var { left, top } = pInt(s[i]);
            if ((type && left < -size[o][0]) || (!type && top > 768)) {
                s[i].remove();
                s.splice(i, 1);
                i--;
            }
        }
    }

    var delElemRight = (o, s, type) => {
        for (var i = 0; i < s.length; i++) {
            if (type) {
                var { left } = pInt(s[i]);
            } else {
                var { top } = pInt(s[i]);
            }
            if ((type ? left : top) < -size[o][0]) {
                s[i].remove();
                s.splice(i, 1);
                i--;
            }
        }
    }

    var moveElem = (s, speed, type) => {
        for (var e of s) {
            var { left, top } = pInt(e);
            if (type) {
                left -= speed;
            } else {
                top += speed;
            }
            e.attr('style', `left:${left}px; top:${top}px`);
        }
    }

    var pInt = (obj) => {
        return {
            left: parseInt(obj.css('left').split('px')[0]),
            top: parseInt(obj.css('top').split('px')[0])
        }
    }

    var moveMB = () => {
        var { top, left } = pInt(elem.may_bay);
        if (key.top && top > 0) {
            top -= 5;
            elem.may_bay.attr('style', `left:${left}px; top:${top}px`);
        }
        if (key.right && left + size.may_bay[0] < 1024) {
            left += 5;
            elem.may_bay.attr('style', `left:${left}px; top:${top}px`);
        }
        if (key.bottom && top + size.may_bay[1] < 768) {
            top += 5;
            elem.may_bay.attr('style', `left:${left}px; top:${top}px`);
        }
        if (key.left && left > 0) {
            left -= 5;
            elem.may_bay.attr('style', `left:${left}px; top:${top}px`);
        }
    }

    var collision = (obj, text, callback) => {
        var mb = pInt(elem.may_bay);
        var lMB = mb.left;
        var tMB = mb.top;
        var sMB = size.may_bay;
        var sO = size[text];
        for (var e of obj) {
            var { left, top } = pInt(e);
            if (!(tMB > top + sO[1] || lMB > left + sO[0] || tMB + sMB[1] < top || lMB + sMB[0] < left)) {
                callback();
            }
        }
    }

    var loop = () => {
        core = setTimeout(() => {
            if (frame === 60) {
                // Time vs nl
                info.time++;
                elem.t_time.text(info.time);
                info.nl--;
                elem.t_nl.text(info.nl);
                if (info.nl === 0) {
                    stats = 1;
                    // Over
                }

                initElem('may', oCloud, true);
                initElem('bird', oBird, true);
                initElem('sao', oSao, false);
                initElem('nhien_lieu', oNL, false);

                frame = 0;
            }
            moveElem(oCloud, 5, true);
            delElem('may', oCloud, true);
            moveElem(oBird, 3, true);
            delElem('bird', oBird, true);
            moveMB();
            collision(oBird, 'bird', () => {
                stats = 1;
                // Over
            });
            frame++;
            loop();
        }, 17)
    }


})