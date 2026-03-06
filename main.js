const uploadInput = document.getElementById('upload-input');
const imagePreview = document.getElementById('image-preview');
const recognizeBtn = document.getElementById('recognize-btn');
const textResult = document.getElementById('text-result');
const speakBtn = document.getElementById('speak-btn');

let uploadedImage = null;
let extractedWords = [];

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
            extractedWords = []; // Clear previous words
        };
        reader.readAsDataURL(file);
    }
});

// Recognize text and extract words
recognizeBtn.addEventListener('click', () => {
    if (uploadedImage) {
        textResult.textContent = 'Recognizing...';
        Tesseract.recognize(
            uploadedImage,
            'eng+kor', // Recognize both English and Korean
            {
                logger: m => console.log(m)
            }
        ).then(({ data }) => {
            extractedWords = []; // Reset words list
            // Process lines to find the first English word in each
            data.lines.forEach(line => {
                // Split the line into words
                const words = line.text.trim().split(/\s+/);
                if (words.length > 0) {
                    const firstWord = words[0];
                    // Check if the first word contains only English letters
                    if (/^[a-zA-Z]+$/.test(firstWord)) {
                        extractedWords.push(firstWord);
                    }
                }
            });

            if (extractedWords.length > 0) {
                textResult.textContent = "Extracted Words: \n" + extractedWords.join(', ');
            } else {
                textResult.textContent = data.text; // Fallback to full text
            }
        });
    }
});

// Speak the extracted words 5 times each
speakBtn.addEventListener('click', () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); // Stop any currently playing speech
    }

    if (extractedWords.length > 0) {
        // Create a sequence of utterances
        const utterances = [];
        extractedWords.forEach(word => {
            for (let i = 0; i < 5; i++) {
                const utterance = new SpeechSynthesisUtterance(word);
                utterances.push(utterance);
            }
        });

        // Speak the utterances one after another
        const speakNext = () => {
            if (utterances.length > 0) {
                const utterance = utterances.shift();
                utterance.onend = speakNext; // When one finishes, speak the next
                speechSynthesis.speak(utterance);
            }
        };

        speakNext();

    } else {
        // Fallback for cases where no words were extracted
        const text = textResult.textContent;
        if (text && text !== 'Recognizing...') {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    }
});
