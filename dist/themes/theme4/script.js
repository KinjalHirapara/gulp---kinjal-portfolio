var circle = document.querySelector(".cookie-center");
var text1 = document.querySelector(".frame-1-left-t");
var text2 = document.querySelector(".frame-1-right-t");
var cookieLB = document.querySelector(".cookie-left-bottom");
var cookieTR = document.querySelector(".cookie-top");
var cookieRB = document.querySelector(".cookie-right-bottom");
var cookie2 = document.querySelector(".cookie-2");
var cookie3 = document.querySelector(".cookie-3");
var connectNow = document.querySelector(".connect-now");
var stayPlayful = document.querySelector(".stay-playful");

setTimeout(() => {
    circle.style.left = 150 + 'px';
}, 0);

setTimeout(() => {
    text1.style.transform = `translateX(0px)`;
    text2.style.transform = `translateX(0px)`;
}, 2000);

setTimeout(() => {
    cookieLB.style.transform = `translate3d(0, 0, 0)`;
}, 3000);

setTimeout(() => {
    cookieTR.style.transform = `translate3d(0, 0, 0)`;
}, 3500);

setTimeout(() => {
    cookieRB.style.transform = `translate3d(0, 0, 0)`;
}, 4000);

setTimeout(() => {
    cookieRB.style.transform = `translate3d(0, 0, 0)`;
}, 6000);

setTimeout(() => {
    text1.style.transform = `translateX(-250px)`;
    text2.style.transform = `translateX(250px)`;
}, 7000);

setTimeout(() => {
    text1.style.transform = `translateX(0px)`;
    text2.style.transform = `translateX(0px)`;
    text1.innerHTML = "Is scoring";
    text2.innerHTML = "the last oreo";
}, 8000);

setTimeout(() => {
    cookieLB.style.transform = `translate3d(-130px, 100px, 0)`;
}, 10000);

setTimeout(() => {
    cookieTR.style.transform = `translate3d(130px, -100px, 0)`;
}, 10500);

setTimeout(() => {
    cookieRB.style.transform = `translate3d(10px, 100px, 0)`;
}, 11000);

setTimeout(() => {
    text1.style.transform = `translateX(-250px)`;
    text2.style.transform = `translateX(250px)`;
}, 13000);

setTimeout(() => {
    circle.style.left = 450 + 'px';
}, 14000);

setTimeout(() => {
    cookie2.style.opacity = 1;
}, 15000);

setTimeout(() => {
    text1.style.transform = `translateX(0px)`;
    text2.style.transform = `translateX(0px)`;
    text1.innerHTML = "join the";
    text2.innerHTML = "the last oreo";
}, 16000);

setTimeout(() => {
    connectNow.style.bottom = "50px";
}, 17000);

setTimeout(() => {
    cookie2.style.opacity = 0;
    text1.style.opacity = 0;
    text2.style.opacity = 0;
}, 20000);

setTimeout(() => {
    cookie3.style.opacity = 1;
    stayPlayful.style.opacity = 1;
}, 21000);