let courseId = 6;
let courses = [
  {
    id: 1,
    title: 'Math 101',
    description: 'Introduction to mathematics',
    subject: 'math',
    readingMaterials: [
      { title: 'Mathematics for Dummies' },
      { title: 'Calculus by Michael Spivak' },
      { title: 'Linear Algebra by Gilbert Strang' }
    ],
    videoContents: [
      { title: 'Introduction to Calculus' },
      { title: 'Linear Algebra Tutorial' },
      { title: 'Mathematics for Physics' }
    ],
    quizzes: [
      { title: 'Calculus Quiz' },
      { title: 'Linear Algebra Quiz' },
      { title: 'Mathematics for Physics Quiz' }
    ],
    assignments: [
      { title: 'Calculus Homework' },
      { title: 'Linear Algebra Project' },
      { title: 'Mathematics for Physics Lab' }
    ],
    instructors: [
      { id: 1, name: 'John Doe', role: 'INSTRUCTOR' }
    ],
    students: [
      { id: 1, name: 'Jane Doe', role: 'STUDENT' },
      { id: 2, name: 'Bob Smith', role: 'STUDENT' }
    ]
  },
  {
    id: 2,
    title: 'Science 101',
    description: 'Introduction to science',
    subject: 'science',
    readingMaterials: [
      { title: 'Biology by Campbell' },
      { title: 'Chemistry by Atkins' },
      { title: 'Physics by Halliday' }
    ],
    videoContents: [
      { title: 'Introduction to Biology' },
      { title: 'Chemistry Tutorial' },
      { title: 'Physics for Scientists' }
    ],
    quizzes: [
      { title: 'Biology Quiz' },
      { title: 'Chemistry Quiz' },
      { title: 'Physics Quiz' }
    ],
    assignments: [
      { title: 'Biology Lab Report' },
      { title: 'Chemistry Project' },
      { title: 'Physics Homework' }
    ],
    instructors: [
      { id: 2, name: 'Jane Smith', role: 'INSTRUCTOR' }
    ],
    students: [
      { id: 3, name: 'Alice Johnson', role: 'STUDENT' },
      { id: 4, name: 'Mike Brown', role: 'STUDENT' }
    ]
  },
  {
    id: 4,
    title: 'Science 202',
    description: 'Advanced science',
    subject: 'science',
    readingMaterials: [
      { title: 'Organic Chemistry by Jerry March' },
      { title: 'Biochemistry by Jeremy M. Berg' },
      { title: 'Quantum Mechanics by Lev Landau' }
    ],
    videoContents: [
      { title: 'Organic Chemistry Tutorial' },
      { title: 'Biochemistry Lecture' },
      { title: 'Quantum Mechanics Explained' }
    ],
    quizzes: [
      { title: 'Organic Chemistry Quiz' },
      { title: 'Biochemistry Quiz' },
      { title: 'Quantum Mechanics Quiz' }
    ],
    assignments: [
      { title: 'Organic Chemistry Lab Report' },
      { title: 'Biochemistry Project' },
      { title: 'Quantum Mechanics Homework' }
    ]
  },
  {
    id: 5,
    title: 'English 101',
    description: 'Introduction to English literature',
    subject: 'english',
    readingMaterials: [
      { title: 'To Kill a Mockingbird by Harper Lee' },
      { title: 'The Great Gatsby by F. Scott Fitzgerald' },
      { title: 'Pride and Prejudice by Jane Austen' }
    ],
    videoContents: [
      { title: 'Introduction to English Literature' },
      { title: 'American Literature Tutorial' },
      { title: 'English Literature Lecture' }
    ],
    quizzes: [
      { title: 'English Literature Quiz' },
      { title: 'American Literature Quiz' },
      { title: 'English Literature Analysis Quiz' }
    ],
    assignments: [
      { title: 'English Literature Essay' },
      { title: 'American Literature Project' },
      { title: 'English Literature Analysis Homework' }
    ]
  },
  {
    id: 6,
    title: 'History 101',
    description: 'Introduction to world history',
    subject: 'history',
    readingMaterials: [
      { title: 'A History of the World by J.M. Roberts' },
      { title: 'The History of Civilization by Will Durant' },
      { title: 'World History by William J. Duiker' }
    ],
    videoContents: [
      { title: 'Introduction to World History' },
      { title: 'Ancient Civilizations Tutorial' },
      { title: 'Modern World History Lecture' }
    ],
    quizzes: [
      { title: 'World History Quiz' },
      { title: 'Ancient Civilizations Quiz' },
      { title: 'Modern World History Quiz' }
    ],
    assignments: [
      { title: 'World History Essay' },
      { title: 'Ancient Civilizations Project' },
      { title: 'Modern World History Homework' }
    ]
  }
  // Add more courses as needed
];

export const getNextId = () => {
  return courseId++
}

export default courses;