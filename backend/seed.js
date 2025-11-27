import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from './models/User.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';
import Notification from './models/Notification.js';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const courses = [
  {
    title: 'Full Stack Web Development',
    description: 'Master modern web development with React, Node.js, and MongoDB',
    instructor: 'Sarah Johnson',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '12 weeks',
    price: 15999,
    color: '#1976D2',
    whatYouWillLearn: [
      'Build full-stack applications with MERN stack',
      'RESTful API design and implementation',
      'Authentication and authorization',
      'Database design with MongoDB',
      'Deploy applications to cloud platforms',
    ],
    prerequisites: ['Basic JavaScript knowledge', 'HTML and CSS fundamentals'],
    syllabus: [
      {
        title: 'Frontend with React',
        topics: ['Components', 'Hooks', 'State Management', 'React Router'],
      },
      {
        title: 'Backend with Node.js',
        topics: ['Express.js', 'REST APIs', 'Middleware', 'Authentication'],
      },
    ],
    whyThisCourse: 'This comprehensive course will take you from beginner to job-ready full-stack developer.',
    whoShouldTake: 'Aspiring web developers, career switchers, and anyone looking to build modern web applications.',
  },
  {
    title: 'Python for Data Science',
    description: 'Learn data analysis, visualization, and machine learning with Python',
    instructor: 'Dr. Michael Chen',
    category: 'Data Science',
    level: 'Beginner',
    duration: '10 weeks',
    price: 12999,
    color: '#2E7D32',
    whatYouWillLearn: [
      'Python programming fundamentals',
      'Data manipulation with Pandas',
      'Data visualization with Matplotlib',
      'Statistical analysis',
      'Machine learning basics with Scikit-learn',
    ],
    prerequisites: ['Basic programming knowledge helpful but not required'],
    syllabus: [
      {
        title: 'Python Basics',
        topics: ['Variables', 'Data Types', 'Control Flow', 'Functions'],
      },
      {
        title: 'Data Analysis',
        topics: ['NumPy', 'Pandas', 'Data Cleaning', 'Exploratory Analysis'],
      },
    ],
    whyThisCourse: 'Get hands-on experience with real-world datasets and build a strong foundation in data science.',
    whoShouldTake: 'Anyone interested in data analysis, business analysts, and aspiring data scientists.',
  },
  {
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android',
    instructor: 'Alex Martinez',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '8 weeks',
    price: 13999,
    color: '#7B1FA2',
    whatYouWillLearn: [
      'React Native fundamentals',
      'Navigation and routing',
      'State management with Redux',
      'API integration',
      'Publishing apps to App Store and Play Store',
    ],
    prerequisites: ['JavaScript and React basics', 'Understanding of mobile app concepts'],
    syllabus: [
      {
        title: 'Getting Started',
        topics: ['Setup', 'Components', 'Styling', 'Layout'],
      },
      {
        title: 'Advanced Topics',
        topics: ['Navigation', 'State Management', 'Async Storage', 'Push Notifications'],
      },
    ],
    whyThisCourse: 'Build professional mobile apps with a single codebase for both iOS and Android.',
    whoShouldTake: 'Web developers looking to expand into mobile, React developers, and mobile app enthusiasts.',
  },
  {
    title: 'AWS Cloud Practitioner',
    description: 'Master AWS cloud services and prepare for certification',
    instructor: 'Jennifer White',
    category: 'Cloud Computing',
    level: 'Beginner',
    duration: '6 weeks',
    price: 9999,
    color: '#F57C00',
    whatYouWillLearn: [
      'AWS core services (EC2, S3, RDS)',
      'Cloud architecture best practices',
      'Security and compliance',
      'Cost optimization strategies',
      'Prepare for AWS certification exam',
    ],
    prerequisites: ['Basic understanding of IT concepts'],
    syllabus: [
      {
        title: 'AWS Fundamentals',
        topics: ['Cloud Concepts', 'AWS Global Infrastructure', 'IAM', 'VPC'],
      },
      {
        title: 'Core Services',
        topics: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFormation'],
      },
    ],
    whyThisCourse: 'Start your cloud career with the most in-demand cloud platform.',
    whoShouldTake: 'IT professionals, developers, and anyone looking to start a cloud career.',
  },
  {
    title: 'DevOps Engineering',
    description: 'Learn CI/CD, Docker, Kubernetes, and modern DevOps practices',
    instructor: 'David Kumar',
    category: 'DevOps',
    level: 'Advanced',
    duration: '14 weeks',
    price: 18999,
    color: '#C62828',
    whatYouWillLearn: [
      'CI/CD pipeline design and implementation',
      'Containerization with Docker',
      'Orchestration with Kubernetes',
      'Infrastructure as Code',
      'Monitoring and logging',
    ],
    prerequisites: ['Linux basics', 'Programming experience', 'Cloud fundamentals'],
    syllabus: [
      {
        title: 'CI/CD Fundamentals',
        topics: ['Git', 'Jenkins', 'GitLab CI', 'GitHub Actions'],
      },
      {
        title: 'Containers and Orchestration',
        topics: ['Docker', 'Kubernetes', 'Helm', 'Service Mesh'],
      },
    ],
    whyThisCourse: 'Become a sought-after DevOps engineer with hands-on experience in modern tools and practices.',
    whoShouldTake: 'System administrators, developers, and IT professionals looking to transition to DevOps.',
  },
  {
    title: 'Machine Learning A-Z',
    description: 'Comprehensive machine learning course from basics to advanced topics',
    instructor: 'Dr. Emily Roberts',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '16 weeks',
    price: 19999,
    color: '#00695C',
    whatYouWillLearn: [
      'Supervised and unsupervised learning',
      'Deep learning with TensorFlow',
      'Natural language processing',
      'Computer vision',
      'Model deployment',
    ],
    prerequisites: ['Python programming', 'Basic statistics', 'Linear algebra'],
    syllabus: [
      {
        title: 'ML Fundamentals',
        topics: ['Regression', 'Classification', 'Clustering', 'Dimensionality Reduction'],
      },
      {
        title: 'Deep Learning',
        topics: ['Neural Networks', 'CNNs', 'RNNs', 'Transfer Learning'],
      },
    ],
    whyThisCourse: 'Complete hands-on machine learning course with real-world projects and datasets.',
    whoShouldTake: 'Data scientists, analysts, and developers looking to master machine learning.',
  },
  {
    title: 'JavaScript Masterclass',
    description: 'From fundamentals to advanced JavaScript concepts',
    instructor: 'Tom Anderson',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    price: 10999,
    color: '#F9A825',
    whatYouWillLearn: [
      'JavaScript fundamentals',
      'ES6+ features',
      'Asynchronous programming',
      'DOM manipulation',
      'Modern JavaScript patterns',
    ],
    prerequisites: ['Basic HTML and CSS knowledge'],
    syllabus: [
      {
        title: 'JavaScript Basics',
        topics: ['Variables', 'Functions', 'Objects', 'Arrays'],
      },
      {
        title: 'Advanced Concepts',
        topics: ['Closures', 'Promises', 'Async/Await', 'Modules'],
      },
    ],
    whyThisCourse: 'Build a solid foundation in JavaScript, the language of the web.',
    whoShouldTake: 'Beginners to programming, web developers, and anyone wanting to learn JavaScript.',
  },
  {
    title: 'Cybersecurity Fundamentals',
    description: 'Learn to protect systems, networks, and data from cyber threats',
    instructor: 'Robert Taylor',
    category: 'Programming',
    level: 'Beginner',
    duration: '10 weeks',
    price: 14999,
    color: '#5E35B1',
    whatYouWillLearn: [
      'Network security fundamentals',
      'Cryptography basics',
      'Web application security',
      'Penetration testing',
      'Security best practices',
    ],
    prerequisites: ['Basic networking knowledge', 'Command line familiarity'],
    syllabus: [
      {
        title: 'Security Basics',
        topics: ['Threats', 'Vulnerabilities', 'Risk Management', 'CIA Triad'],
      },
      {
        title: 'Practical Security',
        topics: ['Firewalls', 'IDS/IPS', 'Encryption', 'Ethical Hacking'],
      },
    ],
    whyThisCourse: 'Start your cybersecurity career with practical, hands-on training.',
    whoShouldTake: 'IT professionals, network administrators, and security enthusiasts.',
  },
  {
    title: 'UI/UX Design Complete Course',
    description: 'Master user interface and user experience design',
    instructor: 'Lisa Park',
    category: 'Web Development',
    level: 'Beginner',
    duration: '8 weeks',
    price: 11999,
    color: '#D32F2F',
    whatYouWillLearn: [
      'Design thinking principles',
      'User research methods',
      'Wireframing and prototyping',
      'Visual design fundamentals',
      'Usability testing',
    ],
    prerequisites: ['No prior design experience required'],
    syllabus: [
      {
        title: 'UX Fundamentals',
        topics: ['User Research', 'Personas', 'User Flows', 'Information Architecture'],
      },
      {
        title: 'UI Design',
        topics: ['Typography', 'Color Theory', 'Layout', 'Design Systems'],
      },
    ],
    whyThisCourse: 'Learn to create beautiful, user-friendly designs that solve real problems.',
    whoShouldTake: 'Aspiring designers, developers, and product managers.',
  },
  {
    title: 'Blockchain Development',
    description: 'Build decentralized applications on Ethereum',
    instructor: 'Kevin Wright',
    category: 'Programming',
    level: 'Advanced',
    duration: '12 weeks',
    price: 17999,
    color: '#0097A7',
    whatYouWillLearn: [
      'Blockchain fundamentals',
      'Smart contract development with Solidity',
      'Web3.js and Ethereum integration',
      'DApp architecture',
      'Security best practices',
    ],
    prerequisites: ['JavaScript knowledge', 'Basic cryptography understanding'],
    syllabus: [
      {
        title: 'Blockchain Basics',
        topics: ['Distributed Ledgers', 'Consensus Mechanisms', 'Ethereum', 'Gas'],
      },
      {
        title: 'Smart Contracts',
        topics: ['Solidity', 'Truffle', 'Testing', 'Deployment'],
      },
    ],
    whyThisCourse: 'Enter the exciting world of blockchain and decentralized applications.',
    whoShouldTake: 'Developers interested in blockchain, crypto enthusiasts, and tech innovators.',
  },
  {
    title: 'SQL and Database Design',
    description: 'Master SQL and relational database design',
    instructor: 'Monica Garcia',
    category: 'Data Science',
    level: 'Beginner',
    duration: '6 weeks',
    price: 8999,
    color: '#E64A19',
    whatYouWillLearn: [
      'SQL fundamentals',
      'Complex queries and joins',
      'Database normalization',
      'Indexing and optimization',
      'Stored procedures and triggers',
    ],
    prerequisites: ['No prior database experience required'],
    syllabus: [
      {
        title: 'SQL Basics',
        topics: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'WHERE', 'ORDER BY'],
      },
      {
        title: 'Advanced SQL',
        topics: ['Joins', 'Subqueries', 'Views', 'Transactions', 'Performance'],
      },
    ],
    whyThisCourse: 'SQL is essential for working with data. Master it here.',
    whoShouldTake: 'Data analysts, developers, and anyone working with databases.',
  },
  {
    title: 'Flutter Mobile Development',
    description: 'Build beautiful mobile apps with Flutter and Dart',
    instructor: 'Chris Brown',
    category: 'Mobile Development',
    level: 'Beginner',
    duration: '10 weeks',
    price: 13499,
    color: '#1565C0',
    whatYouWillLearn: [
      'Dart programming language',
      'Flutter widgets and layouts',
      'State management',
      'API integration',
      'Publish to stores',
    ],
    prerequisites: ['Basic programming knowledge'],
    syllabus: [
      {
        title: 'Flutter Basics',
        topics: ['Dart', 'Widgets', 'Layouts', 'Navigation'],
      },
      {
        title: 'Building Apps',
        topics: ['State Management', 'Firebase', 'REST APIs', 'Local Storage'],
      },
    ],
    whyThisCourse: 'Flutter is the fastest growing mobile framework. Start building today.',
    whoShouldTake: 'Aspiring mobile developers and developers looking to learn Flutter.',
  },
];

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'student',
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
];

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Course.deleteMany();
    await Enrollment.deleteMany();
    await Notification.deleteMany();

    await User.insertMany(users);
    await Course.insertMany(courses);

    console.log('✅ Data Imported Successfully');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Course.deleteMany();
    await Enrollment.deleteMany();
    await Notification.deleteMany();

    console.log('✅ Data Destroyed Successfully');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
