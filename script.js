'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////
// document.documentElement.addEventListener("resize", console.log(getComputedStyle(document.documentElement).width))


// document.body.classList.add("body");
// console.log(document.body.classList.contains("d"))
// document.querySelector("header").addEventListener("click", () => document.body.classList.toggle("open"))


const bannerBtn = document.querySelector(".btn--scroll-to");
const bannerBtnScrollTo = document.querySelector("#section--1");

bannerBtn.onclick = (() => bannerBtnScrollTo.scrollIntoView({behavior: "smooth"}))

// const navLinkMove = document.querySelectorAll(".nav__link");
// const sectionTarget = document.querySelectorAll("section");

// navLinkMove.forEach(function(navLink){
//     navLink.addEventListener("click", function(e){
//         e.preventDefault();
//         document.querySelector(`${this.getAttribute("href")}`).scrollIntoView({behavior: "smooth"})
//     })
// })
const navLinkMove = document.querySelector(".nav__links");

navLinkMove.addEventListener("click", function(e){
    e.preventDefault();
    if(e.target.classList.contains("nav__link")){
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({behavior: "smooth"})
    }
})