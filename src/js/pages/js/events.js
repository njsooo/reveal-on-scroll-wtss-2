import { getCurrentVisibleArticleIndexJS } from "@/js/commons/functions";

/* VARIABLES */
const $navItemList = document.querySelectorAll("#header nav ul li");
const $articleList = document.querySelectorAll("#main > .container > article");
const $imgList = document.querySelectorAll("#main > .container > article .img");
const $imgWrapList = document.querySelectorAll("#main > .container > article .img-wrap");
const $descWrapList = document.querySelectorAll("#main > .container > article .desc-wrap");
const $currentScrollY = document.querySelector("#scroll-info .current-scroll-y span");

/* EVENTS */
window.addEventListener("load", initArticleScrollYList);

$navItemList.forEach(($navItem) => {
  $navItem.addEventListener("click", goToArticle);
});

window.addEventListener("scroll", () => {
  const currentArticleIndex = getCurrentVisibleArticleIndexJS($articleList);

  updateCurrentScrollY();
  updateCurrentNavItem(currentArticleIndex);
  animateFollowingImg(currentArticleIndex);
  animateArticle();
});

/* FUNCTIONS */
function initArticleScrollYList() {
  const $spanList = document.querySelectorAll("#scroll-info .article-scroll-y-list li span");

  for (let i = 0; i < $articleList.length; i++) {
    $spanList[i].textContent = `${parseInt($articleList[i].offsetTop)}`;
  }
}

function goToArticle() {
  const articleIndex = Array.from($navItemList).findIndex((navItem) => navItem === this);
  const articleOffsetTop = $articleList[articleIndex].offsetTop - 50;
  window.scroll({
    top: articleOffsetTop,
    behavior: "smooth",
  });
}

function updateCurrentScrollY() {
  $currentScrollY.textContent = `${window.scrollY}`;
}

function updateCurrentNavItem(currentArticleIndex) {
  $navItemList.forEach(($navItem) => $navItem.classList.remove("on"));
  $navItemList[currentArticleIndex].classList.add("on");
}

function animateFollowingImg(currentArticleIndex) {
  if ($imgList[currentArticleIndex].classList.contains("scale-20")) {
    const offset = (window.scrollY - $articleList[currentArticleIndex].offsetTop) * 0.2;
    $imgList[currentArticleIndex].style.transform = `translateY(${offset}px)`;
  }
}

function animateArticle() {
  for (let i = 0; i < $articleList.length; i++) {
    if (window.scrollY > $articleList[i].offsetTop - window.innerHeight / 3) {
      $imgWrapList[i].classList.add("show");
      $descWrapList[i].classList.add("show");
    } else {
      $imgWrapList[i].classList.remove("show");
      $descWrapList[i].classList.remove("show");
    }
  }
}
