import SlimSelect from 'slim-select';
import {fetchBreeds, fetchCatByBreed} from './cat-api.js';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const divEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error')
const loaderS = document.querySelector('.loader-s');;

loaderEl.style.display = 'none';
errorEl.style.display = 'none';

let breeds = [];

function takeBreeds(response) {
    for(let breed in response) {
        breeds.push({name: response[breed].name, id: response[breed].id})
    }
}

async function addBreeds() {
    try {
        const response = await fetchBreeds(errorEl);
        takeBreeds(response);
        let listOfBreedsEl = breeds.map(i => {
            let optionEl = document.createElement('option');
            optionEl.value = i.id;
            optionEl.textContent = i.name;
            return optionEl;
        });
        selectEl.append(...listOfBreedsEl);
    } catch (error) {
        Notiflix.Notify.failure(errorEl.textContent);
        throw error; 
    }
}

addBreeds();

function getElements(elements) {
    const name = elements[0].breeds[0].name;
    const description = elements[0].breeds[0].description;
    const temperament = elements[0].breeds[0].temperament;
    const image = elements[0].url;

    return {'name': name, 'description': description, 'temperament': temperament, 'image': image}
}

function showBreed(returnedPromise) {
    const elements = getElements(returnedPromise);
    const {name, description, temperament, image} = elements;

    let htmlEls = `<img src="${image}" alt="${name}" class="image"><h1 class="title">${name}</h1><p class="description">${description}</p><p class="temperament"><b class="title-temperament">Temperament: </b>${temperament}</p>`
    divEl.innerHTML = htmlEls;
    loaderS.style.display = 'none';
    loaderEl.style.display = 'none';
}

async function onSelectChange(event) {
    try {
        const breedId = selectEl.options[selectEl.selectedIndex].value;
        selectEl.style.display = 'none';
        divEl.style.display = 'none';
        loaderS.style.display = 'block';
        loaderEl.style.display = 'block';
        const returnedPromise = await fetchCatByBreed(breedId, errorEl, loaderEl, loaderS, selectEl);
        showBreed(returnedPromise);
        divEl.style.display = 'block';
        selectEl.style.display = 'block';
    } catch (error) {
        Notiflix.Notify.failure(errorEl.textContent);
        loaderS.style.display = 'none';
        loaderEl.style.display = 'none';
        selectEl.style.display = 'block';
    }
}









new SlimSelect({
    select: '.select-breed'
  })
 selectEl.addEventListener('change', onSelectChange)
