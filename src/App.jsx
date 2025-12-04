import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, BarChart2, BookOpen, Calculator, Brain, ChevronRight, ChevronLeft, RotateCcw, Home as HomeIcon, LogOut, Briefcase } from 'lucide-react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { questionBank } from './data/questions';
import SectionCard from './components/SectionCard';
import Timer from './components/Timer';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import IBPSMockTest from './components/IBPSMockTest';

// Protected Route Wrapper
const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main Game Component (The original App logic, now user-aware)
const Game = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [visited, setVisited] = useState(new Set([0]));

  // Load progress on mount or when user changes
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`progress_${user.id}`);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setAnswers(parsed.answers || {});
        setVisited(new Set(parsed.visited || [0]));
        setActiveSection(parsed.activeSection || null);
        setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
        setIsFinished(parsed.isFinished || false);
      }
    }
  }, [user]); // Keeping user as dependency is correct if user object reference changes on auth load.


  // Save progress on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify({
        answers,
        visited: Array.from(visited),
        activeSection,
        currentQuestionIndex,
        isFinished
      }));
    }
  }, [answers, visited, activeSection, currentQuestionIndex, isFinished, user]);

  const startTest = (section) => {
    // If we are already in this section and not finished, don't reset
    if (activeSection === section && !isFinished) {
      return;
    }

    setActiveSection(section);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
    setVisited(new Set([0]));
  };

  const handleAnswer = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const navigateQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisited(prev => new Set([...prev, index]));
  };

  const finishTest = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let score = 0;
    const questions = questionBank[activeSection];
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  // --- RENDERING VIEWS ---

  // 1. DASHBOARD VIEW
  if (!activeSection) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-indigo-600 text-white p-6 shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">JSO Exam Prep Series</h1>
              <p className="opacity-90 mt-2 text-indigo-100">Welcome, {user.username}!</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <SectionCard
              title="Numerical Aptitude"
              icon={Calculator}
              color="blue"
              questionCount={questionBank.numerical.length}
              onClick={() => startTest('numerical')}
            />
            <SectionCard
              title="English Language"
              icon={BookOpen}
              color="green"
              questionCount={questionBank.english.length}
              onClick={() => startTest('english')}
            />
            <SectionCard
              title="General Reasoning"
              icon={Brain}
              color="purple"
              questionCount={questionBank.reasoning.length}
              onClick={() => startTest('reasoning')}
            />
            <SectionCard
              title="IBPS PO Exam"
              icon={Briefcase}
              color="orange"
              questionCount="100+"
              onClick={() => window.location.hash = '#/ibpo'}
            />
          </div>

          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">About this Test Series</h2>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Questions extracted directly from uploaded JSO/GPSC question papers.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Includes Reading Comprehension, Time & Work, Coding-Decoding, and more.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Real-time scoring and performance analysis.</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    );
  }

  // 2. RESULT VIEW
  if (isFinished) {
    const score = calculateScore();
    const questions = questionBank[activeSection];
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Test Result</h2>
            <p className="opacity-80 uppercase tracking-wider text-sm">{activeSection}</p>
            <div className="mt-6 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10">
                <div className="text-center">
                  <span className="text-4xl font-bold block">{percentage}%</span>
                  <span className="text-xs opacity-75">Score</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xl">You scored {score} out of {questions.length}</p>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-indigo-600" />
              Detailed Analysis
            </h3>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const isCorrect = userAns === q.correct;
                const isSkipped = userAns === undefined;

                return (
                  <div key={q.id} className={`border rounded-lg p-4 ${isCorrect ? 'border-green-200 bg-green-50' : isSkipped ? 'border-gray-200 bg-gray-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-500 text-sm">Q{idx + 1}</span>
                      {isCorrect ? (
                        <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">Correct</span>
                      ) : isSkipped ? (
                        <span className="text-xs font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded">Skipped</span>
                      ) : (
                        <span className="text-xs font-bold text-red-700 bg-red-200 px-2 py-1 rounded">Incorrect</span>
                      )}
                    </div>
                    {q.passage && (
                      <div className="text-xs text-gray-500 italic mb-2 p-2 bg-white/50 rounded border border-gray-100 line-clamp-2">
                        Passage ref: {q.passage.substring(0, 60)}...
                      </div>
                    )}
                    <p className="text-gray-800 mb-3 font-medium">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`text-sm p-2 rounded flex items-center ${oIdx === q.correct
                            ? 'bg-green-200 text-green-800 font-semibold'
                            : oIdx === userAns
                              ? 'bg-red-200 text-red-800'
                              : 'bg-white text-gray-600'
                            }`}
                        >
                          {oIdx === q.correct && <CheckCircle className="w-4 h-4 mr-2" />}
                          {oIdx === userAns && oIdx !== q.correct && <XCircle className="w-4 h-4 mr-2" />}
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => startTest(activeSection)}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Retry Section
              </button>
              <button
                onClick={() => setActiveSection(null)}
                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <HomeIcon className="w-4 h-4 mr-2" /> Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. QUIZ INTERFACE VIEW
  const questions = questionBank[activeSection];
  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="text-lg font-bold text-gray-800 capitalize">{activeSection} Section</h2>
          <span className="text-xs text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Timer duration={1200} onTimeUp={finishTest} />
          <button
            onClick={finishTest}
            className="px-4 py-2 bg-red-100 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-200"
          >
            Finish Test
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 gap-4">
        {/* Question Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-y-auto">
          {currentQ.instruction && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-800 text-sm rounded border border-blue-100">
              <span className="font-bold mr-2">Instruction:</span>
              {currentQ.instruction}
            </div>
          )}

          {currentQ.passage && (
            <div className="mb-6 p-4 bg-gray-50 text-gray-700 text-sm leading-relaxed rounded-lg border border-gray-200 font-serif">
              {currentQ.passage}
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 leading-snug">
              <span className="font-bold mr-2 text-indigo-600">{currentQuestionIndex + 1}.</span>
              {currentQ.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center group ${answers[currentQuestionIndex] === idx
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                  }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${answers[currentQuestionIndex] === idx
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={`${answers[currentQuestionIndex] === idx ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => navigateQuestion(currentQuestionIndex - 1)}
              className={`flex items-center px-4 py-2 rounded-lg ${currentQuestionIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Previous
            </button>

            <button
              onClick={() => {
                if (currentQuestionIndex === questions.length - 1) {
                  finishTest();
                } else {
                  navigateQuestion(currentQuestionIndex + 1);
                }
              }}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transform hover:translate-x-1 transition-all"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit Test' : 'Next'}
              {currentQuestionIndex !== questions.length - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
            </button>
          </div>
        </div>

        {/* Navigation Palette */}
        <div className="w-full md:w-80 bg-white rounded-xl shadow-sm p-4 h-fit">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-wider">Question Palette</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = currentQuestionIndex === idx;
              const isVisited = visited.has(idx);

              let btnClass = "bg-gray-100 text-gray-600";
              if (isCurrent) btnClass = "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 font-bold";
              else if (isAnswered) btnClass = "bg-green-500 text-white";
              else if (isVisited) btnClass = "bg-red-100 text-red-600"; // Visited but not answered

              return (
                <button
                  key={idx}
                  onClick={() => navigateQuestion(idx)}
                  className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-6 space-y-2 text-xs text-gray-500">
            <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-2"></div> Answered</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-red-100 rounded mr-2"></div> Visited</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-gray-100 rounded mr-2"></div> Not Visited</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ibpo" element={
            <RequireAuth>
              <IBPSMockTest />
            </RequireAuth>
          } />
          <Route path="/" element={
            <RequireAuth>
              <Game />
            </RequireAuth>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
