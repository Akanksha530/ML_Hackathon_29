import { DifficultyLevel, Question, QuestionType } from '../types';

// Helper function to generate unique IDs
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Technical Questions
const technicalQuestions: Question[] = [
  {
    id: generateId(),
    text: "Can you explain what React hooks are and why they were introduced?",
    type: "technical",
    difficulty: "intermediate",
    expectedKeywords: ["useState", "useEffect", "functional components", "class components", "lifecycle"],
    sampleAnswer: "React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 to allow developers to use state and lifecycle features without writing class components, making code more readable and reusable."
  },
  {
    id: generateId(),
    text: "What is the difference between supervised and unsupervised learning in machine learning?",
    type: "technical",
    difficulty: "intermediate",
    expectedKeywords: ["labeled data", "unlabeled data", "classification", "clustering", "training"],
    sampleAnswer: "Supervised learning uses labeled training data with known output values to learn the mapping function from inputs to outputs. Unsupervised learning, on the other hand, works with unlabeled data and tries to find patterns or structures in the input data without predefined outputs."
  },
  {
    id: generateId(),
    text: "Explain the concept of recursion and provide an example where it would be useful.",
    type: "technical",
    difficulty: "intermediate",
    expectedKeywords: ["base case", "recursive case", "stack", "fibonacci", "tree traversal"],
    sampleAnswer: "Recursion is a programming technique where a function calls itself to solve a problem. Each recursive call handles a smaller subset of the problem until reaching a base case. It's particularly useful for problems like tree traversal, factorial calculation, or fibonacci sequences."
  },
  {
    id: generateId(),
    text: "What are the key components of a neural network and how do they work together?",
    type: "technical",
    difficulty: "advanced",
    expectedKeywords: ["neurons", "weights", "activation function", "layers", "backpropagation"],
    sampleAnswer: "A neural network consists of layers of interconnected neurons. Each neuron applies weights to its inputs, sums them, and passes the result through an activation function. The network learns by adjusting these weights through backpropagation, minimizing the difference between predicted and actual outputs."
  },
];

// Behavioral Questions
const behavioralQuestions: Question[] = [
  {
    id: generateId(),
    text: "Tell me about a time when you had to work under pressure to meet a deadline.",
    type: "behavioral",
    difficulty: "beginner",
    expectedKeywords: ["prioritize", "time management", "teamwork", "stress", "deliver"],
    sampleAnswer: "In my previous role, our team had an unexpected deadline change for a major client project. I immediately reprioritized my tasks, communicated with stakeholders about realistic timelines, and coordinated with team members to divide work efficiently. We created a streamlined workflow that eliminated unnecessary steps and successfully delivered the project on time."
  },
  {
    id: generateId(),
    text: "Describe a situation where you had to resolve a conflict within your team.",
    type: "behavioral",
    difficulty: "intermediate",
    expectedKeywords: ["communication", "compromise", "understanding", "resolution", "mediation"],
    sampleAnswer: "During a project, two team members had different approaches to a technical solution. I organized a meeting to let both present their ideas, ensured everyone felt heard, and facilitated a discussion of pros and cons. We eventually created a hybrid solution that incorporated the strengths of both approaches, which actually resulted in a better outcome than either original proposal."
  },
  {
    id: generateId(),
    text: "Give an example of a time when you had to adapt to a significant change at work.",
    type: "behavioral",
    difficulty: "intermediate",
    expectedKeywords: ["flexibility", "learning", "positive attitude", "challenges", "opportunity"],
    sampleAnswer: "When our company switched to a new project management system, I volunteered to be part of the transition team. I took online courses to quickly learn the new system, created documentation for my department, and offered one-on-one help sessions for colleagues who were struggling. This proactive approach helped our team adapt more quickly and minimize disruption to our workflow."
  },
];

// Leadership Questions
const leadershipQuestions: Question[] = [
  {
    id: generateId(),
    text: "How do you motivate team members who are facing challenges or setbacks?",
    type: "leadership",
    difficulty: "intermediate",
    expectedKeywords: ["empathy", "recognition", "clear goals", "support", "feedback"],
    sampleAnswer: "I believe in combining empathy with practical support. First, I acknowledge their frustrations and listen to understand the specific challenges. Then I help break down problems into manageable steps, provide necessary resources, recognize progress along the way, and connect their work to the bigger purpose. I also share relevant experiences where I've overcome similar obstacles to show that setbacks are part of growth."
  },
  {
    id: generateId(),
    text: "Describe your approach to delegating tasks and responsibilities.",
    type: "leadership",
    difficulty: "intermediate",
    expectedKeywords: ["strengths", "development", "clear expectations", "trust", "follow-up"],
    sampleAnswer: "I delegate by matching tasks to team members' strengths while also creating growth opportunities. I clearly communicate expectations, desired outcomes, and available resources, but avoid micromanaging the process. I establish regular check-in points to provide support and feedback, and I publicly recognize successful completion to build confidence and motivation."
  },
  {
    id: generateId(),
    text: "How do you approach strategic planning and setting long-term goals for your team?",
    type: "leadership",
    difficulty: "advanced",
    expectedKeywords: ["vision", "collaboration", "metrics", "adaptability", "alignment"],
    sampleAnswer: "I start with understanding the broader organizational objectives and market trends. I then collaborate with team members to develop a shared vision that aligns with these objectives while leveraging our team's unique strengths. We establish measurable goals with specific timelines and key performance indicators, while building in flexibility to adapt to changing conditions. I ensure regular reviews of progress and make adjustments as needed."
  },
];

// Combine all questions
export const allQuestions: Question[] = [
  ...technicalQuestions,
  ...behavioralQuestions,
  ...leadershipQuestions,
];

// Function to get questions by type and difficulty
export const getQuestions = (
  type: QuestionType,
  difficulty: DifficultyLevel,
  count: number = 5
): Question[] => {
  const filteredQuestions = allQuestions.filter(
    (q) => q.type === type && q.difficulty === difficulty
  );
  
  // If not enough questions of the specified type and difficulty,
  // fallback to questions of the same type but any difficulty
  if (filteredQuestions.length < count) {
    const typeQuestions = allQuestions.filter((q) => q.type === type);
    return typeQuestions.slice(0, count);
  }
  
  // Shuffle and return the requested number of questions
  return [...filteredQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

// Function to create a new interview
export const createInterview = (
  title: string,
  description: string,
  category: QuestionType,
  difficulty: DifficultyLevel,
  questionCount: number = 5
): Interview => {
  return {
    id: generateId(),
    title,
    description,
    category,
    difficulty,
    questions: getQuestions(category, difficulty, questionCount),
    currentQuestionIndex: 0,
    answers: [],
    inProgress: false,
  };
};

// Import at the bottom to avoid circular dependencies
import { Interview } from '../types';