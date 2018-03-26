'use strict'

$(document).ready(() => {
    var elem, stats, may_bay, oBird, frame, oCloud, core, size, info, key, oSao, oNL, control, play, result, mute = false, font = 16;
    elem = {
        nl: $('.bar .nhien_lieu'),
        t_nl: $('.bar .txt_nl'),
        sao: $('.bar .sao'),
        t_sao: $('.bar .txt_sao'),
        t_time: $('.bar .txtTime'),
        btn_start: $('.bar .start'),
        btn_loa: $('.bar .loa'),
        btn_loa_dis: $('.bar .loa_dis'),
        btn_pause: $('.bar .pause'),
        btn_up: $('.bar .fUp'),
        btn_down: $('.bar .fDown'),
        ins_btn: $('#btn1'),
        rank_btn: $('#btn2'),
        over_btn: $('#btn3'),
        over_dis_btn: $('#btn3-dis'),
        sc_ins: $('.ins'),
        sc_rank: $('.rank'),
        sc_main: $('.main'),
        may_bay: $('.may_bay'),
        dynamic: $('#dynamic'),
        control: $('.control'),
        sc_over: $('.over'),
        input: $('#name'),
        table: $('#tab')
    }

    control = {
        up: $('#c1'),
        right: $('#c2'),
        down: $('#c4'),
        left: $('#c3')
    }

    size = {
        bird: [100, 50],
        khi_cau: [50, 100],
        may_bay: [150, 75],
        may: [200, 100],
        sao: [25, 25]
    }

    var sound = {
        bg: new Audio('./audios/background.mp3'),
        fn: new Audio('./audios/finish.mp3'),
        hit: new Audio('./audios/hit.mp3'),
        star: new Audio('./audios/star.mp3')
    }

    elem.ins_btn.click((e) => {
        elem.sc_ins.addClass('hide');
        elem.sc_main.removeClass('hide');
        elem.control.removeClass('hide');
        init();
        loop();
    })

    elem.rank_btn.click((e) => {
        elem.sc_rank.addClass('hide');
        elem.sc_main.removeClass('hide');
        elem.control.removeClass('hide');
        elem.may_bay.attr('style', 'left:100px; top:334px');
        init();
        loop();
    })

    var XLfont = (type = 0) => {
        if (type === 1 && font < 32) {
            font++;
        } else if (type === 2 && font > 8) {
            font--;
        }
        var f = $('.cF');
        for (var i = 0; i < f.length; i++) {
            f.eq(i).attr('style', `font-size:${font}px`);
        }
    }

    XLfont();

    var cUp = (direc) => {
        switch (direc) {
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
            case 80:
                pause();
                break;
            case 32:
                resume();
                break;
        }
    }

    var cDown = (direc) => {
        switch (direc) {
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
    }

    var init = () => {
        stats = 0; // 0: Playing, 1: Over, 2:Ins, 3: Rank
        frame = 0;
        oCloud = [];
        oBird = [];
        oSao = [];
        oNL = [];
        play = true;
        if (!mute) {
            sound.bg.loop = true;
            sound.bg.play();
        }

        info = {
            time: 0,
            nl: 10,
            sao: 0
        }

        key = {
            left: false,
            top: false,
            right: false,
            bottom: false
        }

        $(window).mouseup((e) => {
            key.top = false;
            key.left = false;
            key.right = false;
            key.bottom = false;
        })

        $(window).keydown((e) => {
            cDown(e.which);
        })

        $(window).keyup((e) => {
            cUp(e.which);
        })

        control.up.mousedown((e) => {
            cDown(38);
        })

        control.up.mouseup((e) => {
            cUp(38);
        })

        control.right.mousedown((e) => {
            cDown(39);
        })

        control.right.mouseup((e) => {
            cUp(39);
        })

        control.down.mousedown((e) => {
            cDown(40);
        })

        control.down.mouseup((e) => {
            cUp(40);
        })

        control.left.mousedown((e) => {
            cDown(37);
        })

        control.left.mouseup((e) => {
            cUp(37);
        })

        elem.btn_pause.click((e) => {
            pause();
        })

        elem.btn_start.click((e) => {
            resume();
        })

        elem.input.keyup((e) => {
            if (e.target.value.length === 0) {
                elem.over_btn.addClass('hide');
                elem.over_dis_btn.removeClass('hide');
            } else {
                elem.over_btn.removeClass('hide');
                elem.over_dis_btn.addClass('hide');
            }
        })

        elem.over_btn.click((e) => {
            ajaxSend(elem.input.val(), info.time, info.sao);
        })

        elem.btn_loa.click((e) => {
            XLsound();
        })
        elem.btn_loa_dis.click((e) => {
            XLsound();
        })

        elem.btn_up.click((e) => {
            XLfont(1);
        })
        elem.btn_down.click((e) => {
            XLfont(2);
        })
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
            if ((type && left < -size[o][0]) || (!type && top > 768 + size[o][1])) {
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
        for (var i = 0; i < obj.length; i++) {
            var { left, top } = pInt(obj[i]);
            if (!(tMB > top + sO[1] || lMB > left + sO[0] || tMB + sMB[1] < top || lMB + sMB[0] < left)) {
                callback();
                obj[i].remove();
                obj.splice(i, 1);
                break;
            }
        }
    }

    var pause = () => {
        if (play) {
            elem.btn_start.removeClass('hide');
            elem.btn_pause.addClass('hide');
            clearTimeout(core);
        }
        play = false;
    }

    var resume = () => {
        if (!play) {
            elem.btn_start.addClass('hide');
            elem.btn_pause.removeClass('hide');
            loop();
        }
        play = true;
    }

    var gameOver = () => {
        stats = 1;
        if (!mute) {
            sound.bg.pause();
        }
        clearTimeout(core);
        elem.dynamic.html('');
        elem.sc_main.addClass('hide');
        elem.sc_over.removeClass('hide');
        elem.control.addClass('hide');
    }

    var ajaxSend = (name, time, stars) => {
        $.post('./register.php', { name, time, stars }, (res, err) => {
            if (err === 'success') {
                result = JSON.parse(res);
                result.sort((a, b) => {
                    if (a.stars === b.stars) {
                        return b.time - a.time;
                    } else {
                        return b.stars - a.stars;
                    }
                })
                stats = 3;
                renderTable();
                elem.sc_over.addClass('hide');
                elem.sc_rank.removeClass('hide');
                XLfont();
            }
        })
    }

    var renderTable = () => {
        var html = '';
        var last = {
            name: '',
            stars: -1,
            time: -1
        }
        var pos = 0;
        for (var i = 0; i < 5; i++) {
            if (result[i].stars !== last.stars || result[i].time !== last.time) {
                pos++;
            }
            html += `<tr>
            <td class="cF">${pos}</td>
            <td class="cF">${result[i].name}</td>
            <td class="cF">${result[i].stars}</td>
            <td class="cF">${result[i].time}</td>
            </tr>`;
            last = result[i];
        }
        elem.table.html(html);
    }

    var XLsound = () => {
        mute = !mute;
        if (mute) {
            elem.btn_loa_dis.removeClass('hide');
            elem.btn_loa.addClass('hide');
            sound.bg.pause();
        } else {
            elem.btn_loa.removeClass('hide');
            elem.btn_loa_dis.addClass('hide');
            sound.bg.play();
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
                    gameOver();
                    if (!mute) {
                        sound.fn.play();
                    }
                }

                initElem('may', oCloud, true);
                initElem('bird', oBird, true);
                initElem('sao', oSao, false);
                initElem('khi_cau', oNL, false);
                frame = 0;
            }
            moveElem(oCloud, 5, true);
            delElem('may', oCloud, true);
            moveElem(oBird, 3, true);
            delElem('bird', oBird, true);
            moveElem(oSao, 3, false);
            delElem('sao', oSao, false);
            moveElem(oNL, 3, false);
            delElem('khi_cau', oNL, false);
            moveMB();
            collision(oBird, 'bird', () => {
                if (!mute) {
                    sound.hit.play();
                }
                gameOver();
            });
            collision(oNL, 'khi_cau', () => {
                if (info.nl + 10 <= 30) {
                    info.nl += 10;
                } else {
                    info.nl = 30;
                }
                elem.t_nl.text(info.nl);
            })
            collision(oSao, 'sao', () => {
                if (!mute) {
                    sound.star.play();
                }
                info.sao++;
                elem.t_sao.text(info.sao);
            })
            frame++;
            if (stats === 0) {
                loop();
            }
        }, 17)
    }
})