document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".asksContainer-item");
  
  items.forEach((item) => {
    const top = item.querySelector(".asksContainer-item-top");
    const bottom = item.querySelector(".asksContainer-item-bottom");
    const arrow = item.querySelector(".q-arrow");
    const q = item.querySelector(".q");

    bottom.style.maxHeight = "0";
    bottom.style.overflow = "hidden";
    bottom.style.transition = "max-height 0.4s ease";

    top.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".asksContainer-item-bottom").style.maxHeight = "0";
        el.querySelector(".q-arrow").style.transform = "rotate(0deg)";
        el.querySelector(".q").style.color = "#8F8F8F";
      });

      if (!isActive) {
        item.classList.add("active");
        bottom.style.maxHeight = bottom.scrollHeight + "px";
        arrow.style.transform = "rotate(180deg)";
        q.style.color = "#97ff74";
      }
    });
  });

  // First question is open by default (per design)
  const first = items[0];
  if (first) {
    first.classList.add("active");
    const firstBottom = first.querySelector(".asksContainer-item-bottom");
    // open instantly on page load (no slide animation), then restore the transition
    firstBottom.style.transition = "none";
    firstBottom.style.maxHeight = firstBottom.scrollHeight + "px";
    void firstBottom.offsetHeight;
    requestAnimationFrame(() => {
      firstBottom.style.transition = "max-height 0.4s ease";
    });
    const firstArrow = first.querySelector(".q-arrow");
    const firstQ = first.querySelector(".q");
    firstArrow.style.transition = "none";
    firstQ.style.transition = "none";
    firstArrow.style.transform = "rotate(180deg)";
    firstQ.style.color = "#97ff74";
    requestAnimationFrame(() => {
      firstArrow.style.transition = "";
      firstQ.style.transition = "";
    });
    window.addEventListener("load", () => {
      if (first.classList.contains("active")) {
        firstBottom.style.maxHeight = firstBottom.scrollHeight + "px";
      }
    });
  }
})