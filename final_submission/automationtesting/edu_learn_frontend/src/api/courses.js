// src/api/courses.js

// Sample data for courses with detailed content
const sampleCourses = [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the basics of React, including components, state, and props.',
      category: 'Programming',
      level: 'Beginner',
      instructor: 'Jane Doe',
      duration: '4 weeks',
      rating: 4.5,
      content: {
        videos: [
          { title: 'Getting Started with React', link: 'https://example.com/video1' },
          { title: 'Understanding Components', link: 'https://example.com/video2' },
          { title: 'State and Props in React', link: 'https://example.com/video3' },
        ],
        quizzes: [
          { title: 'React Basics Quiz', questions: [{ question: 'What is React?', options: ['Library', 'Framework', 'Language'], answer: 'Library' }] },
          { title: 'React Components Quiz', questions: [{ question: 'What is a component?', options: ['Function', 'Class', 'Both'], answer: 'Both' }] },
        ],
        theory: [
          { title: 'Introduction to React', content: 'React is a JavaScript library for building user interfaces...' },
          { title: 'Components in React', content: 'Components are the building blocks of a React application...' },
        ],
        assignments: [
          { title: 'Create a Simple React App', description: 'Build a simple React application that displays a list of items.' },
        ],
      },
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript, covering advanced topics like closures and prototypes.',
      category: 'Programming',
      level: 'Advanced',
      instructor: 'John Smith',
      duration: '6 weeks',
      rating: 4.7,
      content: {
        videos: [
          { title: 'Closures in JavaScript', link: 'https://example.com/video4' },
          { title: 'Prototypes and Inheritance', link: 'https://example.com/video5' },
          { title: 'Asynchronous JavaScript', link: 'https://example.com/video6' },
        ],
        quizzes: [
          { title: 'JavaScript Advanced Quiz', questions: [{ question: 'What is a closure?', options: ['Function within a function', 'Global variable', 'Method in class'], answer: 'Function within a function' }] },
        ],
        theory: [
          { title: 'Understanding Closures', content: 'A closure is the combination of a function bundled together with references to its surrounding state...' },
        ],
        assignments: [
          { title: 'Build a JavaScript Quiz App', description: 'Create a JavaScript application that quizzes users on various topics.' },
        ],
      },
    },
    {
      id: 3,
      title: 'Introduction to Data Science',
      description: 'An overview of data science concepts, including data analysis and visualization.',
      category: 'Data Science',
      level: 'Beginner',
      instructor: 'Alice Johnson',
      duration: '5 weeks',
      rating: 4.6,
      content: {
        videos: [
          { title: 'Data Science Fundamentals', link: 'https://example.com/video7' },
          { title: 'Data Analysis Techniques', link: 'https://example.com/video8' },
        ],
        quizzes: [
          { title: 'Data Science Basics Quiz', questions: [{ question: 'What is data science?', options: ['Study of data', 'Science of computers', 'Both'], answer: 'Study of data' }] },
        ],
        theory: [
          { title: 'Introduction to Data Science', content: 'Data science is a multi-disciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data...' },
        ],
        assignments: [
          { title: 'Analyze a Dataset', description: 'Choose a dataset and perform exploratory data analysis to uncover interesting insights.' },
        ],
      },
    },
    {
      id: 4,
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core principles of machine learning, including supervised and unsupervised learning.',
      category: 'Data Science',
      level: 'Intermediate',
      instructor: 'Robert Brown',
      duration: '8 weeks',
      rating: 4.8,
      content: {
        videos: [
          { title: 'Introduction to Machine Learning', link: 'https://example.com/video9' },
          { title: 'Supervised vs Unsupervised Learning', link: 'https://example.com/video10' },
          { title: 'Machine Learning Algorithms', link: 'https://example.com/video11' },
        ],
        quizzes: [
          { title: 'Machine Learning Basics Quiz', questions: [{ question: 'What is supervised learning?', options: ['Learning from labeled data', 'Learning from unlabeled data', 'Learning from errors'], answer: 'Learning from labeled data' }] },
        ],
        theory: [
          { title: 'Machine Learning Overview', content: 'Machine learning is a method of data analysis that automates analytical model building...' },
        ],
        assignments: [
          { title: 'Build a Simple Machine Learning Model', description: 'Create a simple machine learning model using a dataset of your choice.' },
        ],
      },
    },
    // Add more sample courses as needed
  ];
  
  // Mock API call to fetch courses
  export const fetchCourses = async (filterCriteria) => {
    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Apply filtering based on filterCriteria
    const filteredCourses = sampleCourses.filter((course) => {
      const matchesSearchTerm = course.title.toLowerCase().includes(filterCriteria.searchTerm.toLowerCase());
      const matchesCategory = !filterCriteria.selectedCategory || course.category === filterCriteria.selectedCategory;
      const matchesLevel = !filterCriteria.selectedLevel || course.level === filterCriteria.selectedLevel;
  
      return matchesSearchTerm && matchesCategory && matchesLevel;
    });
  
    // Return filtered courses
    return filteredCourses;
  };
  
  export const fetchCourseById = async (id) => {
    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Find the course by ID
    const course = sampleCourses.find((course) => course.id === parseInt(id, 10));
  
    // Return the found course or null if not found
    return course || null;
  };
  