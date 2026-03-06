
# Project Blueprint: Photo to Speech

## Overview

This application allows users to **upload a photo**, recognizes English words within that picture, and provides Text-to-Speech (TTS) audio for the recognized words.

## Implemented Features

### Version 5 (Structural Word Extraction)
- **UI/UX:** No changes.
- **Functionality:**
  - **Context-Aware OCR:** The application now analyzes the structure of the recognized text instead of relying on image regions.
  - **Single-Word Line Detection:** It iterates through every line detected by the OCR. A word is only considered a target if it appears on a line by itself (i.e., the line contains exactly one valid English word of 3+ characters).
  - **High-Precision Extraction:** This method accurately isolates words from a vocabulary list while ignoring multi-word sentences, directly addressing user feedback for a more robust solution.

### Version 4 (Region-Based OCR - Superseded)
- This approach was planned but superseded by a more intelligent structural analysis before implementation.

### Version 3 (Improved Word Extraction)
- **Functionality:** Extracted the first valid English word from each line, which had limitations.

### Version 2 (File Upload)
- **UI/UX & Functionality:** File upload, basic OCR, and TTS.

## Current Plan

**Goal:** The application now uses a sophisticated, structure-based analysis to accurately extract vocabulary words from complex images, marking a significant improvement in precision.

**Last Action:**
1.  **Updated `main.js`:**
    *   The OCR logic was completely refactored.
    *   It now iterates through `data.lines` provided by Tesseract.
    *   It checks if a line contains exactly one word that is alphabetic and has a length of 3 or more characters.
    *   This successfully isolates the vocabulary list from the example sentences on the right.
