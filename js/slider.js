const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");
let index = 0;
const totalSlides = dots.length;

function updateDots(activeIndex) {
  dots.forEach((dot, i) => {
    dot.style.backgroundColor =
      i === activeIndex ? "#0F6B5B" : "#1C1C1C26";
  });
}

function goToSlide(i) {
  index = i;
  slider.style.transform = `translateX(-${i * 100}%)`;
  updateDots(i);
}

// ACTIVATE FIRST DOT ON LOAD
updateDots(0);
// Click pagination
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    goToSlide(i);
  });
});
