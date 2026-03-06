
# Project Blueprint: Photo to Speech

## Overview

This application allows users to **upload a photo**, recognizes English words within that picture in their original order, and provides Text-to-Speech (TTS) audio for the recognized words.

## Implemented Features

### Version 7 (Logic Refinement)
- **UI/UX:** No changes.
- **Functionality:**
  - **Simplified Core Logic:** Reverted to a more robust and direct extraction logic based on user feedback. The system now checks if a recognized line contains *exactly one word* by splitting the text. This is more resilient than the previous strict regex.
  - **Clean & Validate:** After identifying a single-word line, the word is cleaned of any non-alphabetic characters and validated to be at least 3 characters long.
  - **Order Preservation:** The application continues to process words in top-to-bottom order and removes duplicates without altering the sequence.

### Version 6 (Overly Strict Regex)
- **Functionality:** Introduced a strict regex (`/^[a-zA-Z]{3,}$/`) that unintentionally caused regressions, failing to detect words with minor variations.

### Version 5 (Structural Word Extraction)
- **Functionality:** Analyzed text structure to isolate single-word lines.

### Version 2, 3, 4 (Initial Versions)
- **UI/UX & Functionality:** File upload, basic OCR, and TTS.

## Current Plan

**Goal:** Implement the user's clear and correct logic: extract a word if and only if it appears alone on a line, and ignore lines with multiple words.

**Last Action:**
1.  **Updated `main.js`:**
    *   The OCR processing logic inside the `recognizeBtn` event listener was corrected.
    *   It now splits each line by whitespace (`line.text.trim().split(/\s+/)`) and checks if the resulting array has a length of exactly `1`.
    *   If it does, the single word is cleaned of non-alphabetic characters and validated for length before being added to the final list.
