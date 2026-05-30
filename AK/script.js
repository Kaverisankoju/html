function showWish(){

    let surprise = document.getElementById("surprise");

    surprise.innerHTML = "";

    let text =
    "🎉 Happy Birthday Tom! 🎂❤️ My Hero, My Pilli, My Favorite Idiot Forever ❤️";

    let i = 0;

    let typing = setInterval(()=>{

        if(i < text.length){

            surprise.innerHTML += text.charAt(i);

            i++;

        }
        else{
            clearInterval(typing);
        }

    },50);


    // HEARTS

    for(let i=0;i<30;i++){

        let heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.classList.add("heart");

        heart.style.left = Math.random()*100 + "vw";

        heart.style.animationDuration =
        (Math.random()*3+2)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{
            heart.remove();
        },5000);
    }


    // CONFETTI
// CELEBRATION EMOJIS

let emojis = [
"🎉",
"🎊",
"🎂",
"🎈",
"💖",
"✨",
"🥳"
];

for(let i=0;i<40;i++){

    let e = document.createElement("div");

    e.innerHTML =
    emojis[Math.floor(Math.random()*emojis.length)];

    e.classList.add("heart");

    e.style.left =
    Math.random()*100 + "vw";

    e.style.fontSize =
    (Math.random()*20+25)+"px";

    document.body.appendChild(e);

    setTimeout(()=>{
        e.remove();
    },5000);
}

    let card = document.querySelector(".card");

card.classList.add("shake");

setTimeout(()=>{

    card.classList.remove("shake");

},500);

}


let cakes = [

"images/Cake-1.jpg",
"images/Cake-2.jpg",
"images/Cake-3.jpg",
"images/Cake-4.jpg",
"images/Cake-5.jpg",
"images/Cake-6.jpg"

];

let cakeIndex = 0;

function cutCake(){

    cakeIndex++;

    if(cakeIndex < cakes.length){

        document
        .getElementById("cakeImage")
        .src = cakes[cakeIndex];

        document
        .getElementById("cakeStatus")
        .innerHTML =
        `Cake Slice ${cakeIndex} Served 🍰`;

    }

    else{

        document
        .getElementById("cakeStatus")
        .innerHTML =
        "🎉 Cake Finished! Happy Birthday Tom ❤️";

    }

}


/* PHOTOS */

let photos = [

"images/Img-1.jpg",
"images/Img-2.jpg",
"images/Img-3.jpg",
"images/Img-4.jpg",
"images/Img-5.jpg"

];

let current = 0;


/* MEMORY POPUP */

function showMemories(){

    document.getElementById("memoryModal")
    .style.display = "flex";
}

function closeMemories(){

    document.getElementById("memoryModal")
    .style.display = "none";
}

function nextPhoto(){

    current++;

    if(current >= photos.length){
        current = 0;
    }

    document.getElementById("memoryImage").src =
    photos[current];
}

function prevPhoto(){

    current--;

    if(current < 0){
        current = photos.length - 1;
    }

    document.getElementById("memoryImage").src =
    photos[current];
}


/* LETTER POPUP */

function showLetter(){

    document.getElementById("letterModal")
    .style.display = "flex";
}

function closeLetter(){

    document.getElementById("letterModal")
    .style.display = "none";
}
function showAwards(){

    document
    .getElementById("awardsModal")
    .style.display="flex";

}

function closeAwards(){

    document
    .getElementById("awardsModal")
    .style.display="none";

}
function showCake(){

    document
    .getElementById("cakeModal")
    .style.display="flex";

}

function closeCake(){

    document
    .getElementById("cakeModal")
    .style.display="none";

}

document.addEventListener("mousemove",(e)=>{

    let heart=document.createElement("div");

    heart.innerHTML="💖";

    heart.style.position="fixed";

    heart.style.left=e.clientX+"px";

    heart.style.top=e.clientY+"px";

    heart.style.fontSize="20px";

    heart.style.pointerEvents="none";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },1000);

});