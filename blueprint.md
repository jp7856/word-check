
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

- **Goal:** Modify the application to use file uploads instead of a direct camera feed.
- **Steps:**
  1.  **Update `index.html`:** Replace the `<video>` element and capture button with a file input, an image preview element, and a "Recognize" button.
  2.  **Update `style.css`:** Adjust styles for the new file input and image preview elements.
  3.  **Update `main.js`:**
      - Remove camera access logic.
      - Implement image preview functionality when a user uploads a file.
      - Modify the recognition logic to work with the uploaded image instead of a video frame.
