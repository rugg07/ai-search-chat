export const sampleSearchData = [
  {
    id: '1',
    title: 'Introduction to AI Search',
    description: 'Learn about the fundamentals of AI-powered search engines and how they work.',
    url: 'https://example.com/ai-search',
    timestamp: '2024-02-03',
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    description: 'Understanding the core concepts of machine learning and its applications.',
    url: 'https://example.com/ml-basics',
    timestamp: '2024-02-03',
  },
  {
    id: '3',
    title: 'Natural Language Processing',
    description: 'Explore how computers understand and process human language.',
    url: 'https://example.com/nlp',
    timestamp: '2024-02-03',
  },
  {
    id: '4',
    title: 'Deep Learning Applications',
    description: 'Real-world applications of deep learning in various industries.',
    url: 'https://example.com/deep-learning',
    timestamp: '2024-02-03',
  },
  {
    id: '5',
    title: 'AI Ethics and Safety',
    description: 'Important considerations for ethical AI development and deployment.',
    url: 'https://example.com/ai-ethics',
    timestamp: '2024-02-03',
  },
  {
    id: '6',
    title: 'Computer Vision Systems',
    description: 'How AI systems process and understand visual information.',
    url: 'https://example.com/computer-vision',
    timestamp: '2024-02-03',
  },
  {
    id: '7',
    title: 'Reinforcement Learning',
    description: 'Understanding how AI agents learn through interaction with environments.',
    url: 'https://example.com/rl',
    timestamp: '2024-02-03',
  },
  {
    id: '8',
    title: 'AI in Healthcare',
    description: 'Applications of artificial intelligence in medical diagnosis and treatment.',
    url: 'https://example.com/ai-healthcare',
    timestamp: '2024-02-03',
  },
  {
    id: '9',
    title: 'Robotics and AI',
    description: 'How AI is revolutionizing robotics and automation.',
    url: 'https://example.com/robotics',
    timestamp: '2024-02-03',
  },
  {
    id: '10',
    title: 'Future of AI',
    description: 'Predictions and trends for the future of artificial intelligence.',
    url: 'https://example.com/future-ai',
    timestamp: '2024-02-03',
  },
];

export const getAIResponse = (query: string): string => {
  const responses = {
    default: "I understand you're interested in AI. Let me help you explore that topic. What specific aspects would you like to know more about?",
    machine_learning: "Machine learning is a branch of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It works by identifying patterns in data and making decisions with minimal human intervention. Would you like to know more about specific ML techniques or applications?",
    ethics: "AI ethics is a crucial field that addresses the moral implications of artificial intelligence. Key concerns include bias in AI systems, privacy, transparency, and ensuring AI benefits all of humanity. What specific ethical aspects interest you?",
    deep_learning: "Deep learning is a subset of machine learning that uses neural networks with multiple layers (deep neural networks) to analyze various factors of data. It's particularly powerful in tasks like image recognition, natural language processing, and autonomous systems. Would you like specific examples?",
    nlp: "Natural Language Processing (NLP) is the branch of AI that helps computers understand, interpret, and generate human language. It's what powers technologies like chatbots, translation services, and voice assistants. What aspects of NLP would you like to explore?",
  };

  const query_lower = query.toLowerCase();
  if (query_lower.includes('machine learning')) return responses.machine_learning;
  if (query_lower.includes('ethics')) return responses.ethics;
  if (query_lower.includes('deep learning')) return responses.deep_learning;
  if (query_lower.includes('nlp') || query_lower.includes('natural language')) return responses.nlp;
  return responses.default;
}; 