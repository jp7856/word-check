
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

// Recognize text based on the "one word per line" rule
recognizeBtn.addEventListener('click', () => {
    if (uploadedImage) {
        textResult.textContent = 'Recognizing...';
        Tesseract.recognize(
            uploadedImage,
            'eng', 
            {
                logger: m => console.log(m)
            }
        ).then(({ data }) => {
            const orderedWords = [];
            const wordSet = new Set(); // To track duplicates efficiently

            data.lines.forEach(line => {
                const wordsInLine = line.text.trim().split(/\s+/);

                // Rule: Process only if the line contains exactly one word.
                if (wordsInLine.length === 1) {
                    // Clean the word of any non-alphabetic characters
                    const cleanWord = wordsInLine[0].replace(/[^a-zA-Z]/g, '');
                    
                    // Rule: The cleaned word must be 3+ characters long.
                    if (cleanWord.length >= 3) {
                        // Add the word only if it hasn't been added before to preserve order
                        if (!wordSet.has(cleanWord)) {
                            orderedWords.push(cleanWord);
                            wordSet.add(cleanWord);
                        }
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
