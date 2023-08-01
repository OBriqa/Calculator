const botons = document.querySelectorAll('.boto');
const screen = document.querySelector('.res');
const track = document.querySelector('.track');

var eval = '';

botons.forEach(boto => {
    boto.addEventListener('click',function(e){
        let elem = e.currentTarget;
        switch (elem.classList[1]) { 
            case 'num': 
                let txt = screen.innerHTML;
                if(notOperation(txt)){
                    screen.innerHTML += elem.innerText;
                    eval += elem.innerText; 
                }
                else{
                    screen.innerHTML = '';
                    screen.innerHTML += elem.innerText;
                    eval += elem.innerText; 
                }
                break;

            case 'dec':
                if(!screen.innerHTML.includes('.')){
                    screen.innerHTML += elem.innerText;
                    eval += elem.innerText; 
                }
                break;

            case 'op':
                if(classOperation(elem)){ 
                    if(notOperation(eval)){
                        screen.innerHTML += elem.innerText;
                        eval += elem.innerText; 
                    }
                    else{
                        if(eval.length > 0){
                            screen.innerHTML = screen.innerHTML.slice(0,-1) + elem.innerText;
                            eval = eval.slice(0,-1) + elem.innerText; 
                        }
                    }
                    console.log(eval);
                }
                else if(elem.classList[2] == 'rem'){
                    screen.innerHTML = screen.innerHTML.slice(0,-1);
                    eval = eval.slice(0,-1); 
                }
                else if(elem.classList[2] == 'clear'){
                    screen.innerHTML = '';
                    eval = ''; 
                }
                break;

            case 'igual':
                if(notOperation(eval)){
                    let oper = eval.replaceAll('⨯','*').replaceAll('÷','/');
                    let res = math.round(math.evaluate(oper),2);
                    screen.innerHTML = `${res}`;
                    eval = `${res}`; 
                }
                break;
            
            default:
                break;
        }
        track.innerHTML = eval;
    });
});

function classOperation(element){
    return( element.classList[2] == 'mod' ||
            element.classList[2] == 'div' ||
            element.classList[2] == 'mul' ||
            element.classList[2] == 'sub' ||
            element.classList[2] == 'add');
}

function notOperation(txt){
    return (txt.slice(-1) != '%' &&
            txt.slice(-1) != '÷' &&
            txt.slice(-1) != '⨯' &&
            txt.slice(-1) != '-' &&
            txt.slice(-1) != '+');
}