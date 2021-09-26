let socket = io();

let startingSection = document.querySelector('.starting-section');
let homeBtn = document.querySelector('.home-btn');
let starButton = document.getElementById('startButton');
let crazyButton = document.getElementById('crazyButton');

starButton.addEventListener('click', () => {
    socket.emit('startGame');
});

socket.on('startGame', () => {
    hideStartButton();
})

function hideStartButton() {
    starButton.style.display = "none";
    crazyButton.style.display = "block";
    startingSection.style.display = "none";
}

crazyButton.addEventListener('click', () => {
    socket.emit('crazyIsClicked', {
        offsetLeft: Math.random() * ((window.innerWidth - crazyButton.clientWidth) - 100),
        offsetTop: Math.random() * ((window.innerHeight - crazyButton.clientHeight) - 50)
    });
})

socket.on('crazyIsClicked', (data) => {
    goCrazy(data.offsetLeft, data.offsetTop);
});

function goCrazy(offLeft, offTop) {
    let top, left;

    left = offLeft;
    top = offTop;

    crazyButton.style.top = top + 'px';
    crazyButton.style.left = left + 'px';
    crazyButton.style.animation = "none";
}