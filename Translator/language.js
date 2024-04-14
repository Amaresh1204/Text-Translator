const translateButton = document.getElementById('translateButton');
const clearButton = document.getElementById('clearButton');
const swapButton = document.getElementById('swapButton');
const inputText = document.getElementById('inputText');
const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const translatedText = document.getElementById('translatedText');

translateButton.addEventListener('click', () => {
    const textToTranslate = inputText.value;
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;

    const apiKey = 'AIzaSyBu6AjavNmuFfHA6ctYqd-RgaaM_AS5sS4';
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const requestData = {
        q: textToTranslate,
        target: targetLang,
    };

    if (sourceLang !== 'en') {
        requestData.source = sourceLang;
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const translatedTextResult = data.data.translations[0].translatedText;
            translatedText.textContent = translatedTextResult;
        })
        .catch(error => {
            console.error('Translation error:', error);
            translatedText.textContent = 'Translation failed.';
        });
});

clearButton.addEventListener('click', () => {
    inputText.value = '';
    translatedText.textContent = '';
});

swapButton.addEventListener('click', () => {
    const sourceLangValue = sourceLanguage.value;
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = sourceLangValue;
});
