
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

// Recognize text with preserved order and stricter validation
recognizeBtn.addEventListener('click', () => {
    if (uploadedImage) {
        textResult.textContent = 'Recognizing...';
        Tesseract.recognize(
            uploadedImage,
            'eng', // English is sufficient
            {
                logger: m => console.log(m)
            }
        ).then(({ data }) => {
            const orderedWords = [];
            const wordSet = new Set(); // To track duplicates efficiently

            data.lines.forEach(line => {
                const trimmedText = line.text.trim();
                
                // Stricter Rule: The line must contain exactly one word,
                // and that word must be only alphabetic and 3+ characters long.
                const match = trimmedText.match(/^[a-zA-Z]{3,}$/);
                
                if (match) {
                    const word = match[0];
                    // Add the word only if it hasn't been added before
                    // This preserves the original top-to-bottom order
                    if (!wordSet.has(word)) {
                        orderedWords.push(word);
                        wordSet.add(word);
                    }
                }
            });

            extractedWords = orderedWords;

            if (extractedWords.length > 0) {
                textResult.textContent = "Extracted Words: \n" + extractedWords.join(', ');
            } else {
                textResult.textContent = "Could not find any valid vocabulary words. Please ensure the image is clear and words are on separate lines.";
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
                utterance.onend = speakNext; 
                speechSynthesis.speak(utterance);
            } 
        };
        speakNext();

    } else {
        const text = textResult.textContent;
        if (text && !text.startsWith('Recognizing')) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    }
});
