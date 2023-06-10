import Notiflix from 'notiflix';

export function fetchBreeds(errorEl) {
    let urlBreeds = 'https://api.thecatapi.com/v1/breeds';
    return fetch(urlBreeds)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
    .catch(error => Notiflix.Notify.failure(errorEl.textContent))
};

function urlConstructor(breedId) {
    const urlApi = 'https://api.thecatapi.com/v1/images/search?';
    const apiKey = 'live_PCN9VbUPCUrU8EehKv0gqDLS17WCHC8m3QIPHdGYhFKGPuCHQeigil0oEiTEFWRE';
    const searchParams = new URLSearchParams({
        breed_ids: breedId,
        api_key: apiKey,
    });
    return urlApi + searchParams.toString();
}

export function fetchCatByBreed(breedId, errorEl) {
    const urlBreed = urlConstructor(breedId);
    return fetch(urlBreed)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
    .catch(error => Notiflix.Notify.failure(errorEl.textContent))

}


