const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLessons(data.data))
    .catch((error) => console.log("ERROR", error));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWords(data.data))
        .catch(error => console.log('ERROR', error));
}

const displayWords = (words) => {
    const wordsContainer = document.querySelector("#words-container");
    wordsContainer.innerHTML = '';

    words.forEach((word) => {

        const divE = document.createElement("div");
        divE.innerHTML = ` <div class="bg-white p-10 text-center rounded">
                    <h2 class="text-2xl font-bold">${word.word}</h2>
                    <p class="text-gray-400 my-5 font-siliguri">${word.pronunciation}</p>
                    <p class="text-xl font-bold text-indigo-600 font-siliguri">${word.meaning}</p>

                    <div class="icons flex justify-between items-center mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="size-6 hover:text-indigo-400 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="size-6 hover:text-indigo-400 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>

                    </div>
                </div>`;
        wordsContainer.append(divE);
    })
}

const displayLessons = (lessons) => {
  // Get the parent
  const lessonContainer = document.querySelector("#lesson-container");
    lessonContainer.innerHTML = "";
    
    for (let lesson of lessons) {
      // Create the element
      const lessonDiv = document.createElement("div");
      lessonDiv.innerHTML = `<button onClick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-sm btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        Lesson - ${lesson.level_no}
                    </button>`;

      // Append
      lessonContainer.append(lessonDiv);
    }

};

loadLessons();
