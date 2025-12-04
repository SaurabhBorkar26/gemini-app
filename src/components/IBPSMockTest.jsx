import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight, ChevronLeft, Grid, Bookmark, CheckCircle, Menu, X, BarChart2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ==========================================
// DATA SOURCE: COMBINED FROM ALL UPLOADED PAPERS
// Includes samples from 2021, 2022, 2023, 2024, and 2025 papers.
// ==========================================

const QUESTIONS_DATA = {
    "English Language": [
        // --- Previous Questions ---
        {
            id: "e1",
            text: "Which of the following has/have brought the online revolution? (Based on the passage regarding India's consumer behaviour and smartphone usage - 2022 Mock 03).",
            options: ["High availability of cheaper smartphones", "Government promotion", "Inexpensive data plans", "New telecom companies", "None of these"],
            correct: 2
        },
        {
            id: "e8",
            text: "Choose the correct interchange: The school receiving (A) many children because it was obvious (B) that they weren't interested in educating (C) students but only exploited (D) the money paid.",
            options: ["Only (C)-(D)", "Only (B)-(C) & (A)-(D)", "Only (A)-(D)", "Only (B)-(C)", "No interchange needed"],
            correct: 2
        },
        // --- New Questions from 2022-2025 Papers ---
        {
            id: "e_2023_m3_1",
            text: "(2023 Mock 03) What is 'locally acquired malaria' as described in the passage?",
            options: [
                "Malaria acquired during travel to Africa",
                "Disease presenting in patients with no travel history, acquired locally",
                "Malaria transmitted by ticks",
                "A genetic disorder",
                "None of these"
            ],
            correct: 1
        },
        {
            id: "e_2023_m4_1",
            text: "(2023 Mock 04) Which of the following is the antonym of 'culprit' as highlighted in the passage about Shadow Banking?",
            options: ["Victim", "Accused", "Suspect", "Criminal", "Offender"],
            correct: 0
        },
        {
            id: "e_2022_m6_1",
            text: "(2022 Mock 06) According to the passage on consumerism, what is 'hyper lapse consumerism' fueled by?",
            options: ["Television ads", "Ubiquitous growth of Internet and e-commerce", "Radio marketing", "Newspaper ads", "None of these"],
            correct: 1
        },
        {
            id: "e_2022_m7_1",
            text: "(2022 Mock 07) Why is India's reputation as a country with a culture of abstinence regarding alcohol considered underserved?",
            options: ["Due to religious reasons", "Due to rapid proliferation of city bars and nightclubs", "Due to government bans", "Due to lack of production", "None of these"],
            correct: 1
        },
        {
            id: "e_2023_pre_1",
            text: "(2023 Prelims) Why did greenhouse gas emissions plunge 4.6 percent in 2020?",
            options: ["Due to increased industrial activity", "Due to lockdowns restricting global mobility", "Due to new green laws", "Due to solar power", "None of these"],
            correct: 1
        }
    ],
    "Numerical Aptitude": [
        // --- Previous Questions ---
        {
            id: "n36",
            text: "Approx value: 15.98% of 25.05% of 599 + (6.97 × 21.98) = ? × 4.04",
            options: ["45", "37", "40", "52", "56"],
            correct: 0
        },
        {
            id: "n41",
            text: "Quadratic: I. x² + 10x - 75 = 0, II. y² + 13y + 22 = 0",
            options: ["x > y", "x ≥ y", "x < y", "x ≤ y", "x = y or no relation"],
            correct: 4
        },
        // --- New Questions from 2022-2025 Papers ---
        {
            id: "n_2025_1",
            text: "(2025 Mock) Equation: (540M + 600W) - (280M + 600W) = 30/8 - 40/15. What is the value of M?",
            options: ["1/200", "1/240", "1/300", "1/120", "1/360"],
            correct: 1
        },
        {
            id: "n_2024_1",
            text: "(2024 Prelims) Total weight of class = (24+6)×40 = 1200kg. Weight of 24 boys = 24×36 = 864kg. Find the average weight of the remaining 6 students.",
            options: ["50 kg", "56 kg", "60 kg", "54 kg", "52 kg"],
            correct: 1
        },
        {
            id: "n_2022_m8_100",
            text: "(2022 Mock 08) Data Interpretation: If marked price is Rs. 80 and discount is 10%, what is the Selling Price?",
            options: ["70", "72", "75", "68", "74"],
            correct: 1
        },
        {
            id: "n_2023_m3_41",
            text: "(2023 Mock 03) A train crosses a pole in 25 seconds and a platform in 45 seconds. If the speed is constant, find ratio of train length to platform length.",
            options: ["5:4", "4:5", "5:9", "9:5", "1:1"],
            correct: 0
        }
    ],
    "Reasoning Ability": [
        // --- Previous Questions ---
        {
            id: "r71",
            text: "Coding: 'Header row first column' = 'ik cb sx ij', 'First row borders' = 'ib sx cb'. Code for 'row'?",
            options: ["cb", "sx", "ib", "ij", "None of these"],
            correct: 0
        },
        {
            id: "r79",
            text: "Direction: B is 15m north of A. C is 10m west of B... Point D is how far from F?",
            options: ["10m, south", "5m, north", "15m, south", "10m, north", "5m, south"],
            correct: 3
        },
        // --- New Questions from 2022-2025 Papers ---
        {
            id: "r_2025_1",
            text: "(2025 Mock) Seating Arrangement: Three persons sit between A and B. C sits second to right of B. D sits fifth to left of C. How many persons sit between E and G?",
            options: ["One", "Two", "Three", "Four", "More than four"],
            correct: 2
        },
        {
            id: "r_2024_1",
            text: "(2024 Prelims) Circular Seating: 7 persons A-G. F sits 3rd to right of A. Immediate neighbors of A face opposite direction to A. Who sits 2nd to right of E?",
            options: ["A", "D", "C", "F", "G"],
            correct: 2
        },
        {
            id: "r_2023_m1_1",
            text: "(2023 Mock 01) Puzzle: 8 persons born in different years. B is 2nd youngest. Age gap between B and H is 4. How many persons younger than G?",
            options: ["One", "Four", "Two", "Five", "Three"],
            correct: 4
        },
        {
            id: "r_2022_m7_97",
            text: "(2022 Mock 07) Linear Row: P stands diagonally opposite to L. K/M logic applied. Which final arrangement is correct?",
            options: ["PKNQM / ROSJL", "ROSJL / PKNQM", "KMPNQ / ROSJL", "None of these", "Cannot be determined"],
            correct: 0
        }
    ]
};

// ==========================================
// PAPER STATS DATA
// ==========================================

const PAPER_STATS = [
    { name: "IBPS PO Pre 2025 Memory Based (23rd Aug)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Prelims Memory Based 2024", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Prelims Previous Year 2023", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2023 Mock 01 (30th Sept)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2023 Mock 03 (23rd Sept)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2023 Mock 04 (23rd Sept)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Mains 2024 (1st Shift)", english: 35, numerical: 35, reasoning: 45, total: "115*" },
    { name: "IBPS PO Mains 2023 Memory Based", english: 35, numerical: 35, reasoning: 45, total: "115*" },
    { name: "IBPS PO Pre 2022 Mock 08 (16th Oct)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2022 Mock 07 (16th Oct)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2022 Mock 06 (16th Oct)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2022 Mock 05 (16th Oct)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2022 Mock 04 (15th Oct)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2022 Mock 03 (15th Oct)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Pre 2022 Mock 02 (15th Oct)", english: 30, numerical: 35, reasoning: 35, total: 100 },
    { name: "IBPS PO Mains 2022 Memory Based", english: 35, numerical: 35, reasoning: 45, total: "115*" },
    { name: "IBPS PO Prelims 2021 (4th Dec)", english: 30, numerical: 35, reasoning: 35, total: 100 },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function IBPSMockTest() {
    const navigate = useNavigate();
    // --- State ---
    const [currentSection, setCurrentSection] = useState("Reasoning Ability");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState({});
    const [visited, setVisited] = useState({ "Reasoning Ability": { 0: true } });
    const [timeLeft, setTimeLeft] = useState(3600);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showStatsModal, setShowStatsModal] = useState(false); // New State for Stats Table

    // --- Derived State ---
    const questions = QUESTIONS_DATA[currentSection];
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = Object.values(QUESTIONS_DATA).reduce((acc, curr) => acc + curr.length, 0);

    // --- Timer ---
    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isSubmitted) {
            handleSubmit();
        }
    }, [timeLeft, isSubmitted]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // --- Handlers ---
    const handleSectionChange = (section) => {
        setCurrentSection(section);
        setCurrentQuestionIndex(0);
        setSidebarOpen(false);
        setVisited(prev => ({
            ...prev,
            [section]: { ...prev[section], 0: true }
        }));
    };

    const handleOptionSelect = (idx) => {
        setAnswers(prev => ({
            ...prev,
            [currentSection]: {
                ...prev[currentSection],
                [currentQuestion.id]: idx
            }
        }));
    };

    const handleNavigation = (direction) => {
        const newIndex = direction === 'next'
            ? Math.min(currentQuestionIndex + 1, questions.length - 1)
            : Math.max(currentQuestionIndex - 1, 0);

        setCurrentQuestionIndex(newIndex);
        setVisited(prev => ({
            ...prev,
            [currentSection]: { ...prev[currentSection], [newIndex]: true }
        }));
    };

    const jumpToQuestion = (idx) => {
        setCurrentQuestionIndex(idx);
        setVisited(prev => ({
            ...prev,
            [currentSection]: { ...prev[currentSection], [idx]: true }
        }));
        setSidebarOpen(false);
    };

    const toggleReview = () => {
        setMarkedForReview(prev => {
            const sectionMarks = prev[currentSection] || {};
            return {
                ...prev,
                [currentSection]: {
                    ...sectionMarks,
                    [currentQuestion.id]: !sectionMarks[currentQuestion.id]
                }
            };
        });
    };

    const clearResponse = () => {
        setAnswers(prev => {
            const newSectionAnswers = { ...prev[currentSection] };
            delete newSectionAnswers[currentQuestion.id];
            return { ...prev, [currentSection]: newSectionAnswers };
        });
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleRetake = () => {
        setAnswers({});
        setMarkedForReview({});
        setVisited({ "Reasoning Ability": { 0: true } });
        setTimeLeft(3600);
        setIsSubmitted(false);
        setCurrentSection("Reasoning Ability");
        setCurrentQuestionIndex(0);
    };

    const calculateScore = () => {
        let score = 0;
        let correctCount = 0;
        let wrongCount = 0;
        let attemptedCount = 0;

        Object.keys(QUESTIONS_DATA).forEach(section => {
            QUESTIONS_DATA[section].forEach(q => {
                const userAnswer = answers[section]?.[q.id];
                if (userAnswer !== undefined) {
                    attemptedCount++;
                    if (userAnswer === q.correct) {
                        score += 1;
                        correctCount++;
                    } else {
                        score -= 0.25;
                        wrongCount++;
                    }
                }
            });
        });

        return { score, correctCount, wrongCount, attemptedCount };
    };

    const getQuestionStatus = (section, qIndex) => {
        const qId = QUESTIONS_DATA[section][qIndex].id;
        const isAnswered = answers[section]?.[qId] !== undefined;
        const isMarked = markedForReview[section]?.[qId];
        const isVisited = visited[section]?.[qIndex];

        if (isMarked && isAnswered) return "bg-purple-600 text-white relative";
        if (isMarked) return "bg-purple-200 text-purple-800";
        if (isAnswered) return "bg-green-500 text-white";
        if (isVisited) return "bg-red-500 text-white";
        return "bg-white border border-gray-300 text-gray-600";
    };

    // --- Render Result Screen ---
    if (isSubmitted) {
        const stats = calculateScore();
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-800">Test Submitted Successfully</h1>
                        <p className="text-gray-500 mt-2">Here is your performance summary</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                            <p className="text-sm text-blue-600 font-semibold uppercase">Total Score</p>
                            <p className="text-4xl font-bold text-blue-800 mt-2">{stats.score}/{totalQuestions}</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg text-center">
                            <p className="text-sm text-purple-600 font-semibold uppercase">Accuracy</p>
                            <p className="text-4xl font-bold text-purple-800 mt-2">
                                {stats.attemptedCount > 0 ? Math.round((stats.correctCount / stats.attemptedCount) * 100) : 0}%
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t pt-6">
                        <div className="text-center">
                            <p className="text-gray-500 text-sm">Attempted</p>
                            <p className="text-xl font-bold text-gray-800">{stats.attemptedCount}</p>
                        </div>
                        <div className="text-center border-l border-r">
                            <p className="text-green-500 text-sm">Correct</p>
                            <p className="text-xl font-bold text-green-600">{stats.correctCount}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-red-500 text-sm">Wrong</p>
                            <p className="text-xl font-bold text-red-600">{stats.wrongCount}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button onClick={() => navigate('/')} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                            Back to Home
                        </button>
                        <button onClick={handleRetake} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Retake Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Main Render ---
    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-hidden font-sans relative">
            {/* Header */}
            <header className="bg-white border-b h-16 px-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Back to Dashboard">
                        <Home className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold">IBPS PO</div>
                    <h1 className="text-lg font-semibold text-gray-700 hidden md:block">Combined Mock Test (2021-2025)</h1>
                </div>
                <div className="flex items-center gap-4">
                    {/* Stats Button */}
                    <button
                        onClick={() => setShowStatsModal(true)}
                        className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md border border-indigo-200 hover:bg-indigo-100 transition-colors text-sm font-medium"
                    >
                        <BarChart2 className="w-4 h-4" /> Stats
                    </button>

                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-md">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className={`font-mono font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                    <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
                        Submit
                    </button>
                    <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left: Question Area */}
                <main className="flex-1 flex flex-col overflow-hidden relative">
                    <div className="bg-white border-b flex px-4 overflow-x-auto hide-scrollbar">
                        {Object.keys(QUESTIONS_DATA).map(section => (
                            <button
                                key={section}
                                onClick={() => handleSectionChange(section)}
                                className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${currentSection === section ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
                        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6 min-h-[400px]">
                            <div className="flex justify-between items-start mb-6 border-b pb-4">
                                <span className="text-sm font-bold text-gray-500">Question {currentQuestionIndex + 1}</span>
                                <div className="flex gap-2">
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">+1.0</span>
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">-0.25</span>
                                </div>
                            </div>
                            <p className="text-lg text-gray-800 mb-8 leading-relaxed font-medium whitespace-pre-wrap">
                                {currentQuestion.text}
                            </p>
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = answers[currentSection]?.[currentQuestion.id] === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 group ${isSelected ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-blue-600 bg-blue-600" : "border-gray-400 group-hover:border-blue-400"
                                                }`}>
                                                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <span className={`text-sm md:text-base ${isSelected ? "text-blue-800 font-medium" : "text-gray-700"}`}>
                                                {option}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-3 md:p-4 flex flex-wrap gap-3 justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex gap-2 md:gap-3 order-2 md:order-1 w-full md:w-auto justify-center">
                            <button onClick={toggleReview} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 text-sm font-medium">
                                <Bookmark className={`w-4 h-4 ${markedForReview[currentSection]?.[currentQuestion.id] ? 'fill-current' : ''}`} />
                                {markedForReview[currentSection]?.[currentQuestion.id] ? 'Unmark' : 'Mark for Review'}
                            </button>
                            <button onClick={clearResponse} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">
                                Clear
                            </button>
                        </div>
                        <div className="flex gap-3 order-1 md:order-2 w-full md:w-auto">
                            <button onClick={() => handleNavigation('prev')} disabled={currentQuestionIndex === 0} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium disabled:opacity-50 hover:bg-gray-200 transition-colors">
                                <ChevronLeft className="w-4 h-4" /> Prev
                            </button>
                            <button onClick={() => handleNavigation('next')} disabled={currentQuestionIndex === questions.length - 1} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50 hover:bg-blue-700 transition-colors shadow-sm">
                                Save & Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </main>

                {/* Right: Sidebar */}
                <aside className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 z-20 flex flex-col md:relative md:translate-x-0 md:w-72 md:shadow-none md:border-l ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-2">
                            <Grid className="w-5 h-5 text-gray-600" />
                            <span className="font-bold text-gray-800">Question Palette</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">{currentSection}</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {questions.map((q, idx) => {
                                const statusClass = getQuestionStatus(currentSection, idx);
                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => jumpToQuestion(idx)}
                                        className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all shadow-sm hover:ring-2 ring-blue-200 ${statusClass} ${currentQuestionIndex === idx ? "ring-2 ring-offset-2 ring-blue-500 z-10 scale-110" : ""}`}
                                    >
                                        {idx + 1}
                                        {statusClass.includes('bg-purple-600') && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t text-xs text-gray-600 space-y-2">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500"></div> Answered</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"></div> Not Answered</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white border border-gray-300"></div> Not Visited</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-200"></div> Marked for Review</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-600"></div> Ans & Marked for Review</div>
                    </div>
                </aside>
            </div>

            {/* Overlay for Sidebar */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* STATS MODAL */}
            {showStatsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <BarChart2 className="w-6 h-6 text-blue-600" />
                                Available Question Bank Stats
                            </h2>
                            <button onClick={() => setShowStatsModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 border-collapse">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 rounded-tl-lg">Paper Name</th>
                                            <th scope="col" className="px-6 py-3 text-center">English</th>
                                            <th scope="col" className="px-6 py-3 text-center">Numerical</th>
                                            <th scope="col" className="px-6 py-3 text-center">Reasoning</th>
                                            <th scope="col" className="px-6 py-3 text-center rounded-tr-lg">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PAPER_STATS.map((paper, index) => (
                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{paper.name}</td>
                                                <td className="px-6 py-4 text-center">{paper.english}</td>
                                                <td className="px-6 py-4 text-center">{paper.numerical}</td>
                                                <td className="px-6 py-4 text-center">{paper.reasoning}</td>
                                                <td className="px-6 py-4 text-center font-bold text-blue-600">{paper.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50 font-semibold text-gray-900">
                                        <tr>
                                            <td className="px-6 py-3">TOTAL QUESTIONS</td>
                                            <td className="px-6 py-3 text-center">{PAPER_STATS.reduce((acc, p) => acc + p.english, 0)}</td>
                                            <td className="px-6 py-3 text-center">{PAPER_STATS.reduce((acc, p) => acc + p.numerical, 0)}</td>
                                            <td className="px-6 py-3 text-center">{PAPER_STATS.reduce((acc, p) => acc + p.reasoning, 0)}</td>
                                            <td className="px-6 py-3 text-center text-blue-700">{PAPER_STATS.reduce((acc, p) => acc + (typeof p.total === 'number' ? p.total : parseInt(p.total)), 0)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 text-right italic">*Mains papers exclude General Awareness questions.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
