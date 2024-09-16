const vinyl = document.getElementById('vinyl');
const music = document.getElementById('music-blue-rhas');
let isPlaying = false;

vinyl.addEventListener('click', function(){
    if (isPlaying) {
        music.pause()
        vinyl.classList.remove('playing');
    } else {
        music.play()
        vinyl.classList.add('playing')
    }
    isPlaying = !isPlaying;
});