const uploadInput = document.getElementById('upload-input');
const imagePreview = document.getElementById('image-preview');
const recognizeBtn = document.getElementById('recognize-btn');
const textResult = document.getElementById('text-result');
const speakBtn = document.getElementById('speak-btn');

let uploadedImage = null;

// Handle file upload
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage = e.target.result;
            imagePreview.src = uploadedImage;
            imagePreview.classList.remove('hidden');
            recognizeBtn.classList.remove('hidden');
            textResult.textContent = ''; // Clear previous results
        };
        reader.readAsDataURL(file);
    }
});

// Recognize text
recognizeBtn.addEventListener('click', () => {
    if (uploadedImage) {
        textResult.textContent = 'Recognizing...';
        Tesseract.recognize(
            uploadedImage,
            'eng',
            {
                logger: m => console.log(m)
            }
        ).then(({ data: { text } }) => {
            textResult.textContent = text;
        });
    }
});

// Speak text
speakBtn.addEventListener('click', () => {
    const text = textResult.textContent;
    if (text && text !== 'Recognizing...') {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
});
