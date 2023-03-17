"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const message = document.createElement("div");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const footer = document.querySelector(".footer");
const scrollElement = document.createElement("div");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';
header.append(message); // adds the element as the last child element

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.backgroundColor);
console.log(getComputedStyle(message)); // to get all the styles set for any particular element
console.log(getComputedStyle(message).color); // to access any particular style of an particular element
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// CSS custom properties(CSS Variables): documentElement === root(css variables)
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src); // returns the absolute url
console.log(logo.getAttribute("src")); // returns the relative url
console.log(logo.className);
console.log(logo.getAttribute("class")); // same as above

logo.alt = "Beautiful minimalist logo";
console.log(logo.alt);
logo.setAttribute("company", "Bankist"); // same as above for setting random attributes
console.log(logo);

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data Attributes
// console.log(logo.dataset.versionNumber);

// Classes- mutliple classes can be added at once and also can be removed
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c");

// Don't use
// logo.className = 'jonas'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing the scroll function

btnScrollTo.addEventListener("click", function (e) {
  // to get the coordinates
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // Another method to get this
  console.log(e.target.getBoundingClientRect());

  // to just get the distance from x and y axis
  console.log("Current scroll (x/y)", window.pageXOffset, window.pageYOffset);

  // to get the height and width atm
  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Scrolling with better and smooth functionality
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Even easier and better and smooth way
  section1.scrollIntoView({ behavior: "smooth" });
});

// Scroll to top functionality
scrollElement.classList.add("scrollTop-style");
scrollElement.innerHTML = `<ion-icon name="chevron-up-outline" class="scroll-top"></ion-icon>`;
footer.after(scrollElement);

scrollElement.addEventListener("click", function () {
  const scrollToTop = header.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();

//     const id = this.getAttribute('href');  // to get access to the href of the section we want to scroll to
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// });

// 1. Add event Listener to common parent element
// 2. Then determine what element originated the event(through e.target we can get the origination of the event)

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Building the operations Content Tab

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause(basically for the area which is not a button)
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Active Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Menu Fade animation[mouseenter-> mouseleave, mouseover->mouseout  (opposites)]

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link"); // to get hold of the siblings as in the rules
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5)); // bind returns a new function and the 'this' of bind will carry 0.5 here in this case

nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing Sticky Navigation: The Scroll Event
// const intialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function (e) {
//   console.log(window.scrollY);

//   // If part -> We reached a postion where the current position is greater than distance of the 1st section from the top, else -> the else part
//   if (window.scrollY > intialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// Intersection Observer API:
// const obsCallback = function(entries, observer){
//   entries.forEach (entry=> {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Revealing Section
const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // guard-clause
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // null means the root is the view port
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lazy-loading of Images

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // guard-cluase

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SLider Component

// Slider
const slider = function () {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

  // Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};


// Working logic of the function
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

  // Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0; // this is done so that it moves to the start once it reaches the end point and is clicked again
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;  // this is done so that it moves to the end once it reaches the start point and is clicked again
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};
init();

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);


// Keydowm event handler
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});


// Event handler for making the dot work accordingly
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
};
slider();


// For automating the year change
const year = document.querySelector('.year');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;
