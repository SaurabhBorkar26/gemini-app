import React from 'react';

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

export default SectionCard;
