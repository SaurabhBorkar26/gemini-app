import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, BarChart2, BookOpen, Calculator, Brain, ChevronRight, ChevronLeft, RotateCcw, Home } from 'lucide-react';

// --- DATA EXTRACTION FROM ALL UPLOADED FILES ---
// Sourced from: JSO24_PreScreen1, JSO24_RPre, JSO24_PreScreening, JSO24_PreScreen_P3, 
// JSO22_PreScreen4, JSO24_Pre_P, JSO22_PreScreen5, JSO24_PreScreening2, 
// JSO24_PreScreen_P2, JSO22_PreScreen (and variants)

const questionBank = {
  english: [
    {
      id: 'e1',
      source: 'JSO24_PreScreen_P',
      instruction: 'Read the following passage and answer the questions below:',
      passage: "A list of articles lost by railway travellers and now on sale at a great London station has been published, and many people who read it have been astonished at the absent-mindedness of their fellows. If statistical records were available on the subject, however, I doubt whether it would be found that absent mindedness is common. It is the efficiency rather than inefficiency of human memory that compels my wonder. Modern man remembers even telephone numbers. He remembers the address of his friends. He remembers that dates of good vintages. He remembers appointments for lunch and dinner.",
      question: 'The phrase "good vintages" means:',
      options: ['advantages', 'spurious liquor', 'wines made in a particular year', 'old fruit-bearing vines'],
      correct: 2
    },
    {
      id: 'e2',
      source: 'JSO24_PreScreen1',
      instruction: 'Read the passage below:',
      passage: "And on top of all this was Smattering Hall itself. Smattering Hall destroyed Mordred's last hope. It was one of those vast edifices... whose original founders seem to have budgeted for families of twenty-five or so... Mordred's reaction of passing through the front door was a sort of sick sensation, a kind of settled despair.",
      question: 'From the sense of the passage, the statement "And on top of all this was Smattering Hall itself" implies that:',
      options: [
        'Smattering Hall was atop a great hill',
        'Smattering Hall with its size and cost shattered Mordred\'s final hopes',
        'Smattering Hall faced an unequal problem',
        'Smattering Hall was one of the greatest challenges'
      ],
      correct: 1
    },
    {
      id: 'e3',
      source: 'JSO24_PreScreening2',
      instruction: 'Choose the word closest in meaning to the context:',
      question: 'DOCILE - It was a rude shock to see Prem, who is usually docile, fighting ferociously.',
      options: ['Impudent', 'Obedient', 'Indignant', 'Brittle'],
      correct: 1
    },
    {
      id: 'e4',
      source: 'JSO24_PreScreening2',
      instruction: 'Read the passage below:',
      passage: "Direct taxes can be graded, not only by taking into account the size of a person's income, but also considering the use he makes of it and making suitable allowances. The proportion of taxable income may be reduced by allowances for expenses incurred on behalf of children of school age or dependent relatives or for money spent on insurance. Such a system of grading is not possible in case of indirect taxation.",
      question: 'The levels of direct tax are decided on the basis of:',
      options: [
        'allowances for expenses on children, dependents and insurance',
        'differing expenditure of the rich and poor',
        'the size of a person\'s income',
        'actual income, its use and appropriate allowances'
      ],
      correct: 3
    },
    {
      id: 'e5',
      source: 'JSO24_PreScreen_P3',
      instruction: 'Select the grammatically correct statement:',
      question: 'From the following options, identify the grammatically correct statement regarding the conductor:',
      options: [
        'Observing the conductor, his discomfiture overlooked his money',
        'Sensing the conductor\'s discomfiture he did not insist on payment',
        'Understanding his discomfiture, the conductor did not compel his pay',
        'Observing his discomfiture, the conductor did not insist on his fare'
      ],
      correct: 3
    },
    {
      id: 'e6',
      source: 'JSO22_PreScreen',
      instruction: 'Read the Passage Below and answer the questions',
      passage: "The present era has seen a very considerable acceleration in the speed of technological development and the problem of the growth of the gross materialistic outlook is inevitably more acute. The danger obviously that spiritual values will be submerged by a wave of material prosperity such as the world has never seen before, which may upset the traditional equilibrium of the Western society.",
      question: 'Identify from the options below, a word or phrase which is near synonymous to "certain to happen or unavoidable"',
      options: ['inevitably', 'obviously', 'considerable', 'inherent'],
      correct: 0
    },
    {
      id: 'e7',
      source: 'JSO22_PreScreen2',
      instruction: 'Read the Passage Below and answer the questions',
      passage: "Rabbits are eaten in most European countries, and some of the early settlers introduced rabbits into that country as meat was hard to obtain. The European rabbit has many natural enemies which prevent the rabbit population from growing, but in Australia it had no such enemies... Rabbits breed very easily... they caused a great deal of damage.",
      question: 'Rabbits caused much damage in Australia because they:',
      options: [
        'bred easily and soon their number was enormously high',
        'made holes in the ground to live in and ate up grass and other plants',
        'were eating up grass and other plants needed to feed sheep and other cattle',
        'consumed the food of animals which were the source of country\'s wealth'
      ],
      correct: 3
    },
    {
      id: 'e8',
      source: 'JSO22_PreScreen2',
      instruction: 'Read the Passage Below and answer the questions',
      passage: "An ambassador is required by his own government to get information about the state of affairs, the economic and military strength, and the internal political situation of the country in which he stays... On many occasions, the ambassador of a powerful nation has endeavoured to intervene in the political happenings of the country in which his embassy is established.",
      question: 'Identify from the options provided, the synonym of "powerful" in the sense it is used in the passage',
      options: ['strong and influential', 'imperialist', 'authoritarian', 'fit and formidable'],
      correct: 0
    },
    {
      id: 'e9',
      source: 'JSO24_PreScreen_P',
      instruction: 'Read the Passage Below and answer the questions',
      passage: "Most malnutrition is invisible. Consistent undernutrition... can retard growth... For timely prevention of malnutrition, the UNICEF has been using the simple inexpensive method of growth monitoring charts...",
      question: 'Identify the original full form of UNICEF from the options given below',
      options: [
        'United Nations International Cultural Economic Forum',
        'United National Cultural Economic Federation',
        'United Nations International Children\'s Emergency Fund',
        'United Nations Intellectual Cultural Economic Foundation'
      ],
      correct: 2
    },
    {
      id: 'e10',
      source: 'JSO24_PreScreening',
      type: 'analogy',
      instruction: 'Choose the correct word from the following options:',
      question: 'Foundation : Edifice :: Constitution : ?',
      options: ['Government', 'State', 'Nation', 'Cabinet'],
      correct: 2
    },
    {
      id: 'e11',
      source: 'JSO22_PreScreen2',
      instruction: 'Read the Passage Below and answer the questions',
      passage: "Since the end of the last World War, the Emperor has several times rejected the suggestion that a new palace should be built for him... The Emperor refused to live in a luxurious palace, because millions of his people were rendered homeless during the war...",
      question: 'According to the passage, the Emperor refused to live in a palace because:',
      options: [
        'he was the Emperor',
        'his country suffered a defeat in the war',
        'his people were rendered homeless by war',
        'he did not wish to live better when his people were homeless and suffering hardships'
      ],
      correct: 3
    },
    {
      id: 'e12',
      source: 'JSO24_PreScreen_P',
      type: 'vocabulary',
      instruction: 'Pick the word closest in meaning to the context:',
      question: 'GAINSAY - Harish, known for his honesty, is not likely to gainsay the facts of the report.',
      options: ['Deny', 'Lie', 'Prevaricate', 'Exaggerate'],
      correct: 0
    },
    {
      id: 'e13',
      source: 'JSO22_PreScreen5',
      instruction: 'Read the passage below:',
      passage: "An arbitrator's work is to settle dispute, but that is not all; he must try to make both sides accept his decision... He makes their attitudes converge... His settlement is likely to be durable if he can persuade the opponents to make complementary concessions.",
      question: 'Identify a word or phrase from the passage that means "something that a disputant agrees to do in order to end an argument":',
      options: ['avoid arbitration', 'seek accommodation', 'make a concession', 'refuse convergence'],
      correct: 2
    },
    {
      id: 'e14',
      source: 'JSO24_PreScreening',
      instruction: 'Read the passage below:',
      passage: "Non-fiction prose is an area of humungous potential... It is one of the most accommodative literary genres... Its style eschews tension, monotony and self-conscious craft. With scant exceptions, there is the marked presence of the author in the text.",
      question: 'Identify a suitable title for this passage:',
      options: [
        'Introduction to Non-fiction writing',
        'Characteristics of Non-fiction',
        'Shortcomings of the Genre of Non-fiction',
        'An Introduction to Non-fiction Prose'
      ],
      correct: 3
    },
    {
      id: 'e15',
      source: 'JSO24_PreScreen_P2',
      instruction: 'Read the passage below:',
      passage: "It is beyond question that in its severest forms theology has an extremely noxious influence... Ingersoll's work has a positive aspect... In his belief that human activity is limited to the present life, he was a Secularist. In his rejection of the problematic, he was an Agnostic.",
      question: 'As per the passage, in its extreme form theology has a/an ______ influence.',
      options: ['unpleasant', 'harmful', 'punitive', 'rigorous'],
      correct: 1
    },
    {
      id: 'e16',
      source: 'JSO24_PreScreen_P',
      type: 'vocabulary',
      instruction: 'Pick the word closest in meaning to the context:',
      question: 'RETINUE - The chief weapons inspector with his retinue searched the palaces.',
      options: ['Opponents', 'Superiors', 'Pall bearers', 'Attendants'],
      correct: 3
    }
  ],
  numerical: [
    {
      id: 'n1',
      source: 'JSO24_RPre',
      question: '4 men and 6 women can complete a work in 8 days, while 3 men and 7 women can complete it in 10 days. In how many days will 10 women complete it?',
      options: ['35', '40', '45', '50'],
      correct: 1
    },
    {
      id: 'n2',
      source: 'JSO24_RPre',
      question: "A man's speed with the current is 15 km/hr and the speed of the current is 2.5 km/hr. The man's speed against the current is:",
      options: ['8.5 km/hr', '9 km/hr', '10 km/hr', '12.5 km/hr'],
      correct: 2
    },
    {
      id: 'n3',
      source: 'JSO22_PreScreen',
      question: "Arun's present age in years is 40% of Barun's. In another few years, Arun's age will be half of Barun's. By what percentage will Barun's age increase during this period?",
      options: ['20', '10', '15', '25'],
      correct: 0
    },
    {
      id: 'n4',
      source: 'JSO24_PreScreening',
      question: 'The increase in the price of a certain item was 25%. Then the price was decreased by 20% and then again increased by 10%. What is the resultant increase in the price?',
      options: ['5%', '10%', '12.5%', '15%'],
      correct: 1
    },
    {
      id: 'n5',
      source: 'JSO24_PreScreen_P3',
      question: 'What is the remainder when 85 × 87 × 89 × 91 × 95 × 96 is divided by 100?',
      options: ['0', '1', '2', '4'],
      correct: 0
    },
    {
      id: 'n6',
      source: 'JSO22_PreScreen3',
      question: 'A contract on construction job specifies a penalty for delay in completion of the work beyond a certain date is as follows: Rs. 200 for the first day, Rs. 250 for the second day, Rs. 300 for the third day etc. How much penalty should the contractor pay if he delays the work by 10 days?',
      options: ['Rs. 4950', 'Rs. 4250', 'Rs. 3600', 'Rs. 650'],
      correct: 1
    },
    {
      id: 'n7',
      source: 'JSO22_PreScreen3',
      question: 'A tank is filled by three pipes with uniform flow. The first two pipes operating simultaneously fill the tank in the same time during which the tank is filled by the third pipe alone. The second pipe fills the tank 5 hours faster than the first pipe and 4 hours slower than the third pipe. The time required by the first pipe is:',
      options: ['6 hours', '10 hours', '15 hours', '30 hours'],
      correct: 2
    },
    {
      id: 'n8',
      source: 'JSO24_PreScreening2',
      question: 'A starts business with Rs. 3500 and after 5 months, B joins with A as his partner. After a year, the profit is divided in the ratio 2: 3. What is B\'s contribution in the capital?',
      options: ['Rs. 7500', 'Rs. 8000', 'Rs. 8500', 'Rs. 9000'],
      correct: 3
    },
    {
      id: 'n9',
      source: 'JSO22_PreScreen2',
      question: 'Ms. Rani has to pay each security guard half of the money she has in her purse and 2 rupees more to pass through. There are 3 doors. She has only 1 rupee left at the end. How much money did she have in the beginning?',
      options: ['Rs. 40', 'Rs. 36', 'Rs. 25', 'Rs. 42'],
      correct: 1
    },
    {
      id: 'n10',
      source: 'JSO24_PreScreening2',
      question: 'A telecom service provider engages male (M) and female (F) operators for 1000 calls/day. M handles 40 calls, wage Rs. 250 + Rs. 15/call. F handles 50 calls, wage Rs. 300 + Rs. 10/call. To minimize cost (employing >7 females out of 12 available), how many males should be employed?',
      options: ['15', '14', '12', '10'],
      correct: 3
    },
    {
      id: 'n11',
      source: 'JSO22_PreScreen2',
      question: 'X and Y run a 3 km race along a circular course of length 300m. Their speeds are in the ratio 3:2. If they start together in the same direction, how many times would the first one pass the other?',
      options: ['2', '3', '4', '5'],
      correct: 1
    },
    {
      id: 'n12',
      source: 'JSO24_PreScreen_P',
      question: 'Three travelers are sitting around a fire. 1st has 5 loaves, 2nd has 3 loaves. 3rd has 8 coins and no food. They share equally. How much should the 1st traveler get?',
      options: ['5 coins', '7 coins', '1 coin', '0 coins'],
      correct: 1
    },
    {
      id: 'n13',
      source: 'JSO22_PreScreen2',
      question: 'Owner of an art shop increases prices by x%, then decreases by x%. After one cycle, price of a painting reduced by Rs. 441. After second cycle, sold for Rs. 1944.81. What was original price?',
      options: ['Rs. 2756.25', 'Rs. 2256.25', 'Rs. 2500', 'Rs. 2000'],
      correct: 1
    },
    {
      id: 'n14',
      source: 'JSO24_RPre',
      question: 'At what angle the hands of a clock are inclined at 15 minutes past 5?',
      options: ['58 1/2 degrees', '64 degrees', '67 1/2 degrees', '72 1/2 degrees'],
      correct: 2
    },
    {
      id: 'n15',
      source: 'JSO22_PreScreen2',
      question: 'Flight A and B with equal capacity. Hall capacity 200, 10% empty. 40% passengers ladies. Flight capacity = 4/3 of waiting passengers. Half of Flight A are women. Ratio of empty seats in Flight B to airhostesses in Flight A (1 airhostess per 20 passengers in hall)?',
      options: ['10:1', '5:1', '20:1', '1:1'],
      correct: 0
    }
  ],
  reasoning: [
    {
      id: 'r1',
      source: 'JSO24_RPre',
      question: "How many such pair(s) of letters are there in the word 'POCKETBOOK' which have as many letters between them as in the alphabetical series as we move from left to right?",
      options: ['One', 'Two', 'Three', 'Four'],
      correct: 1
    },
    {
      id: 'r2',
      source: 'JSO24_PreScreening',
      question: 'AVIATOR = 6, FIXTURE = 9, WIZARDS = 1. Then DIVERSE = ?',
      options: ['2', '3', '4', '5'],
      correct: 2
    },
    {
      id: 'r3',
      source: 'JSO22_PreScreen5',
      question: "If the order of the letters in the English alphabet is reversed and each letter represents the letter whose position it occupies, then which one of the following represents 'LUCKNOW'?",
      options: ['OGXPMLD', 'OGXQMLE', 'OFXPMLE', 'OFXPMLD'],
      correct: 3
    },
    {
      id: 'r4',
      source: 'JSO24_PreScreen_P',
      question: 'Pointing to a man, Rohan said, "His only brother is the father of my daughter\'s father." How is Rohan related to the man?',
      options: ['Father', 'Grandson', 'Uncle', 'Nephew'],
      correct: 3
    },
    {
      id: 'r5',
      source: 'JSO24_PreScreening',
      question: 'Find the odd one out:',
      options: ['optimize', 'retrograde', 'ameliorate', 'regenerate'],
      correct: 1
    },
    {
      id: 'r6',
      source: 'JSO24_PreScreening',
      question: 'In a code language, "start walk stop diet" is coded as 8% #21 3$7 *6, "walk rest start bite" is coded as #9 *6 2@9 #21. Find the code for "work diet"?',
      options: ['3$7 #9', '78 3$7', '^78 #9', '3$7 *6'],
      correct: 1
    },
    {
      id: 'r7',
      source: 'JSO24_PreScreening2',
      question: 'If Karan says, "Rocky\'s mother is the only daughter of my mother", How is Karan related to Rocky?',
      options: ['Brother', 'Father', 'Uncle', 'Grandfather'],
      correct: 2
    },
    {
      id: 'r8',
      source: 'JSO22_PreScreen2',
      question: 'At what time between 4 and 5 o\'clock will the hands of a watch point in opposite directions?',
      options: ['45 min. past 4', '40 min. past 4', '50 4/11 min. past 4', '54 6/11 min. past 4'],
      correct: 3
    },
    {
      id: 'r9',
      source: 'JSO22_PreScreen2',
      question: 'Seven persons A, B, C, D, E, F and G live in a 7 story building. G is on floor 7. D is on floor 6. C is on floor 3. A is immediately above B. Who lives on the first floor?',
      options: ['The one who works with Reebok', 'The one who works with Sonata', 'The one who works with Puma', 'Can\'t be determined'],
      correct: 1
    },
    {
      id: 'r10',
      source: 'JSO22_PreScreen2',
      question: 'Statements: A few Ostriches are Peacocks. All Peacocks are Swans. Some Swans are Ducks. Conclusions: I. A few Swans are Ostriches. II. Some Ducks are Peacocks.',
      options: ['Only conclusion I follows', 'Only conclusion II follows', 'Neither I nor II follows', 'Both follow'],
      correct: 0
    },
    {
      id: 'r11',
      source: 'JSO22_PreScreen2',
      question: 'Direction: Find the correct mirror image of the given figure where the mirror is placed on the line AB/MN.',
      options: ['Figure A', 'Figure B', 'Figure C', 'Figure D'],
      correct: 3
    },
    {
      id: 'r12',
      source: 'JSO22_PreScreen',
      question: 'Zachary has invited his three buddies... #1: All agree first three numbers are 995. #2: Three agree fourth is 9. #3: Three agree fifth is 2. #4: Three agree sixth is 6... Which is likely the number?',
      options: ['995-9266', '995-9336', '995-9268', '995-8266'],
      correct: 0
    },
    {
      id: 'r13',
      source: 'JSO24_PreScreening2',
      question: '500 men are arranged in an array of 10 rows and 50 columns. Tallest among each row come out, shortest is A. Shortest among each column come out, tallest is B. Who is taller?',
      options: ['Only A', 'Only B', 'Both A and B are same', 'Neither A nor B'],
      correct: 2
    },
    {
      id: 'r14',
      source: 'JSO22_PreScreen2',
      question: 'Three friends Budha, Lallu and Sharad are either from Earth (Truth tellers) or Jupiter (Liars). Budha: "Both Lallu and Sharad are from Jupiter". Sharad: "Lallu says he is not from Jupiter". Who is definitely from Jupiter?',
      options: ['Budha', 'Sharad', 'Both Budha and Sharad', 'Lallu'],
      correct: 0
    },
    {
      id: 'r15',
      source: 'JSO22_PreScreen2',
      question: 'Inequalities: Statements: G=T, T<=W, W>=K. Conclusions: I. W>G, II. W=G',
      options: ['Only II follows', 'Only I follows', 'Both follow', 'Either I or II follows'],
      correct: 3
    },
    {
      id: 'r16',
      source: 'JSO22_PreScreen5',
      question: 'Directions: Alphanumeric series: 8HP&6R4%X$U3O#BA!2LC?5ES7@D. Step 1: If letter is immediately followed by symbol but not preceded by letter... Step 2... Which is 7th element from left after Step 1 if composite numbers dropped?',
      options: ['S', '%', '#', 'U'],
      correct: 3
    },
    {
      id: 'r17',
      source: 'JSO24_PreScreening',
      question: 'Ten guards A to J on pentagon gates. B is 3rd to right of E. C is immediate left of D. I is neighbor of B... Four of the following five are alike. Which does not belong?',
      options: ['D', 'I', 'E', 'B'],
      correct: 0
    },
    {
      id: 'r18',
      source: 'JSO22_PreScreen5',
      question: 'Six persons on a bus: Kalyan, Kumar, Kiran, Karan, Krishna, Keerthan... Who was the first person among the six to get off the bus?',
      options: ['Kalyan', 'Keerthan', 'Kumar', 'Cannot be determined'],
      correct: 0
    },
    {
      id: 'r19',
      source: 'JSO24_PreScreen_P3',
      question: 'Statement: "Buy pure butter of company A" - advertisement. Assumptions: I. No other company supplies pure butter. II. People read advertisement.',
      options: ['Only I implicit', 'Only II implicit', 'Either I or II', 'Neither I nor II'],
      correct: 1
    }
  ]
};

const SectionCard = ({ title, icon: Icon, color, onClick, questionCount }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-white border-2 border-transparent hover:border-${color}-500 w-full`}
  >
    <div className={`p-4 rounded-full bg-${color}-100 mb-4`}>
      <Icon className={`w-10 h-10 text-${color}-600`} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{questionCount} Questions</p>
    <div className={`mt-4 px-4 py-1 rounded-full text-xs font-semibold bg-${color}-50 text-${color}-600 uppercase`}>
      Start Test
    </div>
  </button>
);

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2 text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
      <Clock size={18} />
      <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-500' : ''}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [visited, setVisited] = useState(new Set([0]));

  const startTest = (section) => {
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
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold">JSO Exam Prep Series</h1>
            <p className="opacity-90 mt-2 text-indigo-100">Practice authentic questions from previous papers</p>
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
                <Home className="w-4 h-4 mr-2" /> Home
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
}
