
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
            
            // Process each line of text recognized by the OCR
            data.lines.forEach(line => {
                // Split the line into individual words
                const wordsInLine = line.text.trim().split(/\s+/);
                
                // Find the first valid English word (3+ letters) in the line
                for (const word of wordsInLine) {
                    // Remove any non-alphabetic characters from the word
                    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                    
                    if (cleanWord.length >= 3) {
                        extractedWords.push(cleanWord);
                        break; // Found the word, move to the next line
                    }
                }
            });

            if (extractedWords.length > 0) {
                // Remove any duplicate words to ensure a clean list
                extractedWords = [...new Set(extractedWords)];
                textResult.textContent = "Extracted Words: \n" + extractedWords.join(', ');
            } else {
                // If no words were extracted, show the full text as a fallback
                textResult.textContent = "Could not extract valid words. Full text: \n" + data.text; 
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
        if (text && text !== 'Recognizing...') {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    }
});
