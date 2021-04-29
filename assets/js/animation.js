window.onload = function () {
  document.body.classList.add("loaded");
};

const elements = document.querySelectorAll(".on-scroll-animation");

observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
});

elements.forEach((element) => {
  observer.observe(element);
});
