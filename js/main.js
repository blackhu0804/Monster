(function () {
    let code = `/* 今天我们动手用CSS画一个会动的小怪兽 */
/* 首先我们画出怪兽的轮廓 */
.monster {
    background-color: currentColor;
    width: 10em;
    height: 13em;
    font-size: 16px;
    color: blueviolet;
    border-radius: 5em 5em 5% 5% / 6em 6em 5% 5%;
    position: relative;
    transform-origin: bottom center;
    animation: body-bounce 1s infinite;
}
/* 我们让小怪兽动起来 */
@keyframes body-bounce {
    50% {
        transform: scaleX(1.03) scaleY(0.97);
    }
}
/* 接下来画出它的眼睛 */
.eye {
    position: absolute;
    width: 6.5em;
    height: 6.5em;
    background:
            radial-gradient(
                    circle at 50% 25%,
                    white 0.4em,
                    transparent 0.4em
            ),
            radial-gradient(
                    circle at 50% 40%,
                    black 1.7em,
                    transparent 1.7em
            ),
            white;
    border-radius: 77% 77% 77% 77% / 92% 92% 60% 60%;
    top: 2em;
    left: calc((10em - 6.5em) / 2);
    box-shadow: 0.2em 0.9em 0 rgba(0, 0, 0, 0.1);
    animation: eye-blink 5s infinite;
}
/* 然后让它的眼睛可以眨起来 */
@keyframes eye-blink {
    0%, 6% {
        transform: scaleX(1) scaleY(1);
    }

    3% {
        transform: scaleX(1.03) scaleY(0.1);
    }
}
/* 下面画出嘴的轮廓 */
.mouth {
    background-color: black;
    position: absolute;
    width: 3em;
    height: 2.1em;
    border-radius: 70% 70% 3.5em 3.5em;
    bottom: 0.9em;
    left: calc((10em - 3em) / 2);
    overflow: hidden;
}
/* 用伪元素画出舌头 */
.mouth::before {
    background-color: tomato;
    content: '';
    position: absolute;
    width: inherit;
    height: 0.6em;
    border-radius: 50% 50% 0 0;
    bottom: 0;
}
/*画出三颗牙齿的中间那颗*/
.tooth,
.tooth::before,
.tooth::after {
    position: absolute;
    border-top: 0.8em solid white;
    border-left: 0.4em solid transparent;
    border-right: 0.4em solid transparent;
    left: 1.1em;
}
/*画出三颗牙齿的左右两颗*/
.tooth::before {
    content: '';
    left: -1.1em;
    transform: translateY(-100%);
}

.tooth::after {
    content: '';
    left: 0.3em;
    transform: translateY(-100%);
}
/*下面我们开始画耳朵*/
.ear {
    position: absolute;
    width: 2.4em;
    height: 4.5em;
    top: -3em;
    transform-origin: bottom center;
    transform: rotate(calc(10deg * var(--direction)));
    animation: ears-shake 5s infinite;
}

.ear::before {
    background-color: currentColor;
    content: '';
    position: absolute;
    width: 0.9em;
    height: inherit;
    left: calc((2.4em - 0.9em) / 2);
}

.ear::after {
    background-color: currentColor;
    content: '';
    position: absolute;
    width: 2.4em;
    height: 2.4em;
    top: -0.5em;
    border-radius: 50%;
    box-shadow: inset -0.3em -0.2em 0 rgba(0, 0, 0, 0.1);
}

/*让耳朵移动到正确的位置上*/
.ear.left {
    left: 2em;
    --direction: -1;
}

.ear.right {
    right: 2em;
    --direction: 1;
}


/*让耳朵可以晃动*/
@keyframes ears-shake {
    50% {
        transform: rotate(calc(20deg * var(--direction)));
    }
}
/*OK!我们的小怪兽就大功告成了！*/
`

    let time = 10;
    $('.actions').on('click', 'button', function(e){
        $button = $(e.currentTarget); // 点击的button
        speed = $button.attr('data-speed');
        $button.addClass('active').siblings('.active').removeClass('active')
        if(speed === 'slow'){
            time = 20;
        } else if(speed === 'normal') {
            time = 10;
        } else {
            time = 5;
        }
    });

    function writeCode(perfix, code, fn){
        let container = document.querySelector('#code');
        let styleTag = document.querySelector('#styleTag');
        let n = 0;
        setTimeout( function run() {
            n += 1;
            container.innerHTML = code.substring(0, n);
            container.innerHTML = Prism.highlight(container.innerHTML, Prism.languages.css);
            styleTag.innerHTML = code.substring(0, n);
            container.scrollTop = container.scrollHeight;
            if( n < code.length) {
                setTimeout(run, time);
            } else {
                fn && fn.call();
            }
        }, time)
    }

    writeCode('', code);

})();
