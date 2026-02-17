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
    .then((response) => response.json())
    .then((data) => {
      const clickedBTN = document.querySelector(`#lesson-btn-${id}`);
      removeActive();
      clickedBTN.classList.add("active");
      displayWords(data.data);
    })
    .catch((error) => console.log("ERROR", error));
};

const removeActive = () => {
  const lessonBTNs = document.querySelectorAll(".lesson-btn");
  lessonBTNs.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const speakWord = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB"; // Set to English
  window.speechSynthesis.speak(utterance);
};

const openModal = (word, meaning, pronunciation, sentence, pos, synonyms) => {
  const modalWord = document.querySelector("#modal-word");
  const modalMeaning = document.querySelector("#modal-meaning");
  const modalPronunciation = document.querySelector("#modal-pronunciation");
  const modalSentence = document.querySelector("#modal-sentence");
  const modalPOS = document.querySelector("#modal-pos");
  const modalSynonyms = document.querySelector("#modal-synonyms");

  modalWord.innerText = word;
  modalMeaning.innerText = meaning;
  modalPronunciation.innerText = pronunciation;
  modalSentence.innerText = sentence;
  modalPOS.innerText = pos;
  modalSynonyms.innerText = synonyms;

  const modalE = document.getElementById("my_modal");
  modalE.showModal();
};

const displayWords = (words) => {
  const wordsContainer = document.querySelector("#words-container");
  wordsContainer.innerHTML = "";

  if (words.length === 0) {
    wordsContainer.innerHTML = `
        <div class="text-center col-span-full space-y-5 font-siliguri flex flex-col items-center justify-center">
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><title xmlns="">alert-line</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 16h.008M12 10v3m-1.425-7.783L3.517 17a1.667 1.667 0 0 0 1.425 2.5h14.116a1.666 1.666 0 0 0 1.425-2.5L13.426 5.217a1.666 1.666 0 0 0-2.85 0"/></svg>
                </span>
                <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-2xl font-semibold">নেক্সট Lesson এ যান</h2>
               </div>
        `;
    return;
  }

  words.forEach((word) => {
    const divE = document.createElement("div");
    divE.innerHTML = ` <div class="bg-white p-10 text-center rounded">
                    <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                    <p class="text-gray-400 my-5 font-siliguri">${word.pronunciation}</p>
                    <p class="text-xl font-bold text-indigo-600 font-siliguri">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>

                    <div class="icons flex justify-between items-center mt-5">
                        <button onclick="openModal('${word.word}', '${word.meaning}', '${word.pronunciation}', '${word.sentence}', '${word.partsOfSpeech}', '${word.synonyms}')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="size-6 hover:text-indigo-400 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg></button>

                        <button onclick="speakWord('${word.word}')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="size-6 hover:text-indigo-400 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg></button>

                    </div>
                </div>`;
    wordsContainer.append(divE);
  });
};

const displayLessons = (lessons) => {
  // Get the parent
  const lessonContainer = document.querySelector("#lesson-container");
  lessonContainer.innerHTML = "";

  for (let lesson of lessons) {
    // Create the element
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `<button onClick="loadLevelWord('${lesson.level_no}')" id="lesson-btn-${lesson.level_no}" class="btn btn-outline btn-sm btn-primary lesson-btn">
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
