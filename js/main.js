const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{

    threshold:.2

});

document.querySelectorAll(".hero-left,.hero-right").forEach(el=>{

    el.classList.add("fade-up");

    observer.observe(el);

});

const glow1=document.querySelector(".glow1");

const glow2=document.querySelector(".glow2");

document.addEventListener("mousemove",(e)=>{

    const x=e.clientX/window.innerWidth;

    const y=e.clientY/window.innerHeight;

    glow1.style.transform=`translate(${x*40}px,${y*30}px)`;

    glow2.style.transform=`translate(${-x*40}px,${-y*30}px)`;

});

const counters=document.querySelectorAll(".counter");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

let count=0;

const update=()=>{

count+=Math.ceil(target/70);

if(count<target){

counter.innerText=count;

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();
counterObserver.unobserve(counter);
}

});

},{threshold:.5});

counters.forEach(counter=>counterObserver.observe(counter));

const navbar=document.getElementById("navbar");

window.addEventListener("scroll",()=>{

navbar.classList.toggle("scrolled",window.scrollY>60);

});

const filterButtons=document.querySelectorAll(".analysis-filter button");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});

document.querySelectorAll(".faq-question").forEach(button=>{

button.addEventListener("click",()=>{

const answer=button.nextElementSibling;

const icon=button.querySelector("i");

if(answer.style.maxHeight){

answer.style.maxHeight=null;

icon.classList.replace("fa-minus","fa-plus");

}else{

answer.style.maxHeight=answer.scrollHeight+"px";

icon.classList.replace("fa-plus","fa-minus");

}

});

});

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").classList.add("loader-hidden");

},800);

});

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

topBtn.style.display=

window.scrollY>400

?

"block"

:

"none";

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};