import { getCurrentVisibleArticleIndexJQuery } from "@/js/commons/functions";

/* VARIABLES */
const $window = $(window);
const $navItemList = $("#header nav ul li");
const $articleList = $("#main > .container > article");
const $imgList = $("#main > .container > article .img");
const $imgWrapList = $("#main > .container > article .img-wrap");
const $descWrapList = $("#main > .container > article .desc-wrap");
const $currentScrollY = $("#scroll-info .current-scroll-y span");

/* EVENTS */
$window.on("load", initArticleScrollYList);

$navItemList.on("click", goToArticle);

$window.on("scroll", () => {
  const currentArticleIndex = getCurrentVisibleArticleIndexJQuery($articleList);

  updateCurrentScrollY();
  updateCurrentNavItem(currentArticleIndex);
  animateFollowingImg(currentArticleIndex);
  animateArticle();
});

/* FUNCTIONS */
function initArticleScrollYList() {
  const $spanList = $("#scroll-info .article-scroll-y-list li span");

  for (let i = 0; i < $articleList.length; i++) {
    $spanList.eq(i).text(`${parseInt($articleList.eq(i).offset().top)}`);
  }
}

function goToArticle() {
  const articleOffsetTop = $articleList.eq($(this).index()).offset().top - 50;
  $("html, body").animate({ scrollTop: articleOffsetTop }, 400);
}

function updateCurrentScrollY() {
  $currentScrollY.text(`${$window.scrollTop()}`);
}

function updateCurrentNavItem(currentArticleIndex) {
  $navItemList.removeClass("on");
  $navItemList.eq(currentArticleIndex).addClass("on");
}

function animateFollowingImg(currentArticleIndex) {
  if ($imgList.eq(currentArticleIndex).hasClass("scale-20")) {
    const offset = ($window.scrollTop() - $articleList.eq(currentArticleIndex).offset().top) * 0.2;
    $imgList.eq(currentArticleIndex).css({ transform: `translateY(${offset}px)` });
  }
}

function animateArticle() {
  for (let i = 0; i < $articleList.length; i++) {
    if ($window.scrollTop() > $articleList.eq(i).offset().top - $window.outerHeight() / 3) {
      $imgWrapList.eq(i).addClass("show");
      $descWrapList.eq(i).addClass("show");
    } else {
      $imgWrapList.eq(i).removeClass("show");
      $descWrapList.eq(i).removeClass("show");
    }
  }
}
