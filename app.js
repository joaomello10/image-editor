const inputFile = document.querySelector("#input-file");
const selectFile = document.querySelector("#select-file");
const image = document.querySelector("#image");
const inputFilter = document.querySelectorAll(".input-filter");
const filterContainer = document.querySelector("#filter-container");
let imageVerification = false;

const filterValues = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  sepia: 0,
};

image.addEventListener("click", () => {
  if (imageVerification) {
    filterContainer.classList.toggle("invisible");
    filterImage(true)
  }
  if(filterContainer.classList[0] == 'invisible'){
    filterImage(false)
  }
});

selectFile.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", () => {
  if (inputFile.files <= 0) {
  }
  let reader = new FileReader();

  reader.onload = () => {
    image.src = reader.result;
  };

  reader.readAsDataURL(inputFile.files[0]);
  filterContainer.classList.remove("invisible");
  image.style.border = 'none'
  imageVerification = true;

  image.classList.add('slider-animation')
  setTimeout(() => {
    image.classList.remove('slider-animation')
  }, 900);
});

inputFilter.forEach((input) => {
  input.addEventListener("mousemove", () => {
    updateFilterValues(input);
    filterImage(true);
  });
});

function updateFilterValues(element) {
  const id = element.id;

  if (id == "brightness") {
    filterValues.brightness = element.value;
  }
  if (id == "contrast") {
    filterValues.contrast = element.value;
  }
  if (id == "saturate") {
    filterValues.saturate = element.value;
  }
  if (id == "grayscale") {
    filterValues.grayscale = element.value;
  }
  if (id == "sepia") {
    filterValues.sepia = element.value;
  }
}

function filterImage(parameter) {
  if (parameter) {
    image.style.filter = `
      brightness(${filterValues.brightness}%)
      contrast(${filterValues.contrast}%)
      saturate(${filterValues.saturate}%)
      grayscale(${filterValues.grayscale}%)
      sepia(${filterValues.sepia}%)
      `;
  } else {
    image.style.filter = "none";
  }
}