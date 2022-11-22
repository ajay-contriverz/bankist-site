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

const navLinks = document.querySelectorAll(".nav__link");
const logo = document.querySelector(".nav__logo");

const hoverHandler = function(e){
  const hovered = e.target.classList.contains("nav__link");
  if (!hovered) return;
  navLinks.forEach(link => link.style.opacity = this)
  logo.style.opacity = this
  e.target.style.opacity = 1
}

navLinkMove.addEventListener("mouseover", hoverHandler.bind(.5));
navLinkMove.addEventListener("mouseout", hoverHandler.bind(1));

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContents = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function(e){
  const clickedTab = e.target.closest(".operations__tab");
  if (!clickedTab) return;
  tabs.forEach(tab=> tab.classList.remove("operations__tab--active"));
  clickedTab.classList.add("operations__tab--active");
  tabsContents.forEach(tab=> tab.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add("operations__content--active")
})

const navbar = document.querySelector(".nav");
const header = document.querySelector("header");
// const headerHeight = header.offsetHeight;
// document.addEventListener("scroll", function(){
//   if(window.scrollY > headerHeight){
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky")
//   }
// })
const navbarHeight = -navbar.getBoundingClientRect().height+"px";
const stickyNav = entries => {
  const [entry] = entries;
  entry.isIntersecting ? navbar.classList.remove("sticky") : navbar.classList.add("sticky")
}
const stickyObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: navbarHeight
});
stickyObserver.observe(header);


const sections = document.querySelectorAll(".section");
const sectionAnimation = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observe.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(sectionAnimation, {
  root: null,
  threshold: .1
})
sections.forEach(function(sec){
  sectionObserver.observe(sec)
  // sec.classList.add("section--hidden");
})


const lazyImg = document.querySelectorAll("img[data-src]");
const lazyLoad = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener("load", function(){
    entry.target.classList.remove("lazy-img");
  })
  observe.unobserve(entry.target)
}
const lazyObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
})
lazyImg.forEach(function(img){
  lazyObserver.observe(img)
})

const prev = document.querySelector(".slider__btn--left");
const next = document.querySelector(".slider__btn--right");
const slides = document.querySelectorAll(".slide");
let curSlide = 0;
const maxSlides = slides.length - 1;
const dotsSize = slides.length;
const dots = document.querySelector(".dots");

for (let i = 0; i < dotsSize; i++) {
  const dotsSpan = `<span class="dots__dot" data-dot="${i}"></span>`
  dots.insertAdjacentHTML("beforeend", dotsSpan)
}
const dot = document.querySelectorAll(".dots__dot");

const slideChange = function(slide){
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  dot.forEach((d, i) => {
    if (100 * (i - slide) === 0) {
      d.classList.add("dots__dot--active")
    } else {
      d.classList.remove("dots__dot--active")
    }
  })
}
slideChange(0)
const dotsClick = function(){
  dot.forEach(d => {
    d.addEventListener("click", function(e){
      curSlide = Number(e.target.dataset.dot);
      slideChange(curSlide)
      console.log(curSlide)
    })
  })
}
dotsClick();
const prevSlide = function(){
  if (curSlide === 0) {
    curSlide = maxSlides;
  } else {
    curSlide--
  }
  slideChange(curSlide) 
  console.log(curSlide)
}
const nextSlide = function(){
  if (curSlide === maxSlides) {
    curSlide = 0
  } else {
    curSlide++
  }
  slideChange(curSlide)
  console.log(curSlide)
}
prev.addEventListener("click" , prevSlide)
next.addEventListener("click" , nextSlide)