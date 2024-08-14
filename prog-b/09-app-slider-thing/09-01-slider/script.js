const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (()=>{
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = (value*10) + "%";
  slideValue.classList.add("show");
});
inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});