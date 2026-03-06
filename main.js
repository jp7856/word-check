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

// Recognize text using a structural approach
recognizeBtn.addEventListener('click', () => {
    if (uploadedImage) {
        textResult.textContent = 'Recognizing...';
        Tesseract.recognize(
            uploadedImage,
            'eng+kor', // Use both languages for context
            {
                logger: m => console.log(m)
            }
        ).then(({ data }) => {
            extractedWords = []; // Reset words list
            
            // Process each recognized line to find isolated English words
            data.lines.forEach(line => {
                const wordsInLine = line.text.trim().split(/\s+/);
                
                // Check if the line contains exactly one word
                if (wordsInLine.length === 1) {
                    const singleWord = wordsInLine[0];
                    // Clean the word and check if it's a valid English word of 3+ chars
                    const cleanWord = singleWord.replace(/[^a-zA-Z]/g, '');
                    
                    if (cleanWord.length >= 3 && cleanWord === singleWord) {
                        extractedWords.push(cleanWord);
                    }
                }
            });

            if (extractedWords.length > 0) {
                // Remove duplicates for a clean, final list
                extractedWords = [...new Set(extractedWords)];
                textResult.textContent = "Extracted Words: \n" + extractedWords.join(', ');
            } else {
                textResult.textContent = "Could not find any isolated vocabulary words.";
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
