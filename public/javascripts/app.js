// jshint esversion:6
// const n = 1;
// window.setInterval(() => {
//     document.body.style.opacity = Number(body.style.opacity - 0.3);
// }, 1000);

document.getElementById("read-more").addEventListener("click", e => {
    if (document.querySelector("#short-bio>p").classList.contains("more")) {

        document.querySelector("#short-bio>p").textContent = `
    YOWA is a Nigerian singer / song writer from Lagos Nigeria. Born on December 19. She made her debut in the music industry with the single “overdose” in 2018. In 2019, she was nominated as artist of the year at trendymates award which she emerged the winner in the category. Yowa has worked with Nigerian producers such as Taleenbeatz, Soundz, Sashengine, Konamee amongst others. With Yowa's very unique vocals and catchy and electrifying AFRO RnB sound, she has managed to create a niche in the Nigerian Afro
pop dominated Music Industry .
YOWA frequently collaborates with her music producer ‘TALEEN BEATZ’ on most of her songs, including her last body of work “FIRST OF HER KIND (EP)” which gathered over 50k streams on all platforms in 24 hours of it release. The amazing body of work which was released on December 18 2020 has a lead Single titled “NO STOP” The song with the new dance called the SHEBEBE DANCE, which has got everyone talking on the streets.
`;
        e.target.value = "Read less";
        document.querySelector("#short-bio>p").classList.replace('more', 'less');
    } else if (document.querySelector("#short-bio>p").classList.contains('less')) {
        document.querySelector("#short-bio>p").textContent = `
      YOWA is a Nigerian singer / song writer from Lagos Nigeria. Born on December 19. She made her debut in the music industry with the single “overdose” in 2018. In 2019, she was nominated as artist of the year at trendymates award
                            which she emerged the winner in the category. Yowa has worked with Nigerian producers such as Taleenbeatz, Soundz, Sashengine, Konamee amongst others. With Yowa's very unique vocals and catchy and electrifying AFRO RnB sound....`;
        e.target.value = "Read more";
        // console.log(e.target.textContent)
        document.querySelector("#short-bio>p").classList.replace('less', 'more');
    }
});
let ar = [];
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener("playing", e => {
        // audio.volume = 0;

        console.log(audio.volume);
        // audio.play().then(p => console.log("playing: ", p)).catch(console.error("Cant play audio"));

    });
    audio.addEventListener("play", e => {
        e.target.volume = 1;
        // if (ar.length > 1) {

        //     audio.ended = true;
        //     ar[0].paused = true;

        // } else ar.push(e.target);

        if (ar.length == 1) {

            console.log(ar);
            ar[ar.length - 1].volume = 0;
            ar.shift();
            // audio.paused = true;
        } else ar.push(e.target);
        // console.log(ar);
        // e.target.paused = false;


    });
});