import * as pdfjsLib from 'pdfjs-dist';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
    }

    return fullText;
};

export const parseQuestionsWithGemini = async (text, apiKey) => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are an expert exam parser. Your task is to extract multiple-choice questions from the provided text of an SSC CGL exam paper.
      
      The text contains questions from sections like 'General Intelligence and Reasoning', 'General Awareness', 'Quantitative Aptitude', and 'English Comprehension'.
      
      Please extract the questions and return a JSON array. Each object in the array should have the following fields:
      - id: A unique string id (e.g., "q1", "q2").
      - section: One of "Reasoning", "General Awareness", "Aptitude", "English". Infer the section based on the content if explicit headers are missing.
      - question: The text of the question.
      - options: An array of strings representing the options.
      - correctAnswer: The correct answer string if available in the text (e.g., marked or in an answer key). If not found, set to null.
      - rationale: A brief explanation or "Extracted from PDF" if not available.

      IMPORTANT: Return ONLY the raw JSON array. Do not include markdown formatting like \`\`\`json.
      
      Text to parse:
      ${text.substring(0, 30000)} // Limit text length to avoid token limits if necessary, though 1.5 flash has a large context window.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up potential markdown formatting
        const jsonString = textResponse.replace(/^```json/i, '').replace(/```$/, '').trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini Parsing Error:", error);
        throw new Error("Failed to parse with Gemini AI. Please check your API Key or try again.");
    }
};

export const parseQuestionsFromText = (text) => {
    const questions = [];
    let currentSection = 'General Awareness'; // Default section

    // Heuristic patterns
    const sectionPattern = /Section\s*:\s*([a-zA-Z\s&]+)/i;
    const questionPattern = /(?:Q\.\d+|Question\s+\d+)[\s.:]+(.+?)(?=(?:Q\.\d+|Question\s+\d+|Section\s*:|$))/gs;
    const optionsPattern = /(?:Options\s*:|A\)|1\))(.+)/i;

    // Split text into chunks that might be sections
    // This is a simple parser and might need refinement based on actual PDF structure
    const lines = text.split('\n');
    let currentQ = null;

    // A more robust approach: Iterate through the text and look for markers
    // We'll use a regex to find all matches

    // 1. Identify Sections
    // We will scan the text. If we find "Section: ...", we update currentSection.
    // If we find "Q.N ...", we start a new question.

    // Let's try a line-by-line state machine approach for better control
    let buffer = '';

    lines.forEach(line => {
        const sectionMatch = line.match(sectionPattern);
        if (sectionMatch) {
            currentSection = sectionMatch[1].trim();
            // Map to our standard sections
            if (currentSection.toLowerCase().includes('reasoning')) currentSection = 'Reasoning';
            else if (currentSection.toLowerCase().includes('awareness') || currentSection.toLowerCase().includes('general knowledge')) currentSection = 'General Awareness';
            else if (currentSection.toLowerCase().includes('quantitative') || currentSection.toLowerCase().includes('aptitude') || currentSection.toLowerCase().includes('math')) currentSection = 'Aptitude';
            else if (currentSection.toLowerCase().includes('english')) currentSection = 'English';
            return;
        }

        // Check for Question Start
        const qStartMatch = line.match(/^(?:Q\.?\s*\d+|Question\s*\d+)[\s.:]+/i);
        if (qStartMatch) {
            if (currentQ) {
                questions.push(currentQ);
            }
            currentQ = {
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                section: currentSection,
                question: line.replace(qStartMatch[0], '').trim(),
                options: [],
                correctAnswer: '', // We might not be able to extract this easily without an answer key
                rationale: 'Extracted from uploaded PDF'
            };
        } else if (currentQ) {
            // Check for Options
            const optionsMatch = line.match(/Options\s*:\s*(.+)/i);
            if (optionsMatch) {
                // Split options by comma or some other delimiter if possible
                // Often options are comma separated in the text extraction
                const rawOptions = optionsMatch[1].split(/,|;/).map(o => o.trim()).filter(o => o.length > 0);
                currentQ.options = rawOptions;
            } else {
                // Append to current question text if it's not an option line
                // But be careful not to append unrelated footer text
                if (line.trim().length > 0 && !line.includes('Page') && !line.includes('Shift')) {
                    // If it looks like an option line (A) ... (B) ...
                    if (line.match(/^\(?[A-D1-4]\)/)) {
                        // It's an option line, maybe we can parse it
                        currentQ.options.push(line.trim());
                    } else {
                        currentQ.question += ' ' + line.trim();
                    }
                }
            }
        }
    });

    if (currentQ) {
        questions.push(currentQ);
    }

    return questions;
};
