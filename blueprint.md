
# Project Blueprint: Photo to Speech

## Overview

This application allows users to **upload a photo**, recognizes English words within that picture, and provides Text-to-Speech (TTS) audio for the recognized words.

## Implemented Features

### Version 2 (File Upload)
- **UI/UX:**
  - A clean, modern interface with a title and a main content area.
  - An "Upload Image" button for users to select a photo from their device.
  - A preview area to display the uploaded image.
  - A "Recognize Text" button to start the OCR process.
  - An area to display the recognized text.
  - A "Speak" button to trigger the TTS.
- **Functionality:**
  - **Image Upload:** Users can select an image file (e.g., PNG, JPG) from their computer or mobile device.
  - **Image Preview:** The selected image is displayed on the screen.
  - **Text Recognition (OCR):** It uses Tesseract.js to perform Optical Character Recognition on the uploaded image to identify English text.
  - **Text-to-Speech (TTS):** It uses the browser's built-in Web Speech API (`SpeechSynthesis`) to convert the recognized text into speech.

### Initial Version (Camera Capture - Replaced)
- **UI/UX:**
  - A video element to display the camera feed.
  - A "Capture" button to take a picture.
- **Functionality:**
  - **Camera Access:** The application requested permission to use the user's camera.
  - **Image Capture:** Clicking the "Capture" button froze a frame from the video feed.

## Current Plan

**Goal:** Modify the application to extract specific words from the uploaded image and repeat them using TTS.

**Steps:**
1.  **Update `main.js`:**
    *   **Improve OCR:**
        *   Modify `Tesseract.recognize` to process both English and Korean (`eng+kor`) to better handle the provided image content.
        *   Instead of just getting the full text, process the structured `lines` data from the OCR result.
    *   **Word Extraction:**
        *   For each line of text identified by the OCR, extract the first word.
        *   Filter these words to ensure they are valid English words (e.g., not numbers or Korean characters).
        *   Display the extracted list of words in the results area.
    *   **Update TTS Functionality:**
        *   Modify the "Speak" button's logic.
        *   When clicked, the app will iterate through the extracted list of words.
        *   Each word will be spoken 5 times consecutively.
        *   Implement a fallback to read the entire text if no specific words could be extracted.
