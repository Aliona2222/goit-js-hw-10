import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from "notiflix";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

function showLoader() {
  loader.style.display = "block";
  breedSelect.style.display = "block";
  catInfo.style.display = "none";
  error.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  error.style.display = "block";
  catInfo.style.display = "none";
}

async function handleBreedSelectChange() {
  showLoader();

  const breedId = breedSelect.value;
  try {
    const response = await fetchCatByBreed(breedId);
    const catData = response.data[0];
    displayCatInfo(catData);
  } catch (error) {
    showError();
  } finally {
    hideLoader();
  }
}

function populateBreedSelect(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

function displayCatInfo(catData) {
  catInfo.style.display = "block";
  catInfo.innerHTML = `
    <img src="${catData.url}" alt="Cat Image" />
    <h3>${catData.breeds[0].name}</h3>
    <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
  `;
}

breedSelect.addEventListener("change", handleBreedSelectChange);

async function init() {
  try {
    const response = await fetchBreeds();
    const breeds = response.data;
    populateBreedSelect(breeds);
  } catch (error) {
    showError();
    catInfo.style.display = "none"; 
  }
}
init();
