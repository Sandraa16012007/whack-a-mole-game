const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];

const scoreEl = document.querySelector('.score span');
let score = 0;



const whack = new Audio("whack.mp3");
whack.volume = 1;
const bgm = new Audio("bgm.mp3");
bgm.loop = true;
bgm.volume = 0.5;
const over = new Audio("stop.mp3");

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i];
    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'mole.png';
    img.style.borderBottomLeftRadius = '30%';
    img.style.borderBottomRightRadius = '30%';

    img.addEventListener('click', () => {
        score += 10;
        whack.play();
        scoreEl.textContent = score;
        img.src = 'mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500);
    })

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500);

}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    cursor.style.display = 'block';
    bgm.play();

    score = 0;
    scoreEl.textContent = score;
    holes.forEach(hole => {
        const mole = hole.querySelector('.mole');
        if (mole) {
            hole.removeChild(mole);
        }
    });
    run();
});
const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener("mouseenter", () => {
    cursor.style.display = "none";
});
pauseButton.addEventListener('click', () => {
    over.play();
    bgm.pause();
    cursor.style.display = 'none';
    holes.forEach(hole => {
        const mole = hole.querySelector('.mole');
        if (mole) {
            hole.removeChild(mole);
        }
    });
    clearTimeout(timer);
});


window.addEventListener( "mousemove", e=>{
    cursor.style.top = e.pageY + "px";  
    cursor.style.left = e.pageX + "px";
})

window.addEventListener( "mousedown", ()=>{
    cursor.classList.add("active");
})

window.addEventListener( "mouseup", ()=>{
    cursor.classList.remove("active");
})
