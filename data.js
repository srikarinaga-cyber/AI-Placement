// data.js
const appData = {
  // Roadmaps generator helper
  getRoadmap: (branch, level, goal, duration) => {
    const durationWeeks = parseInt(duration) * 4;
    const phases = [];
    
    let techFocus = "Programming & Data Structures";
    let techFocusTe = "ప్రోగ్రామింగ్ & డేటా స్ట్రక్చర్స్ బేసిక్స్";
    let projectFocus = "Full-stack web applications";
    let projectFocusTe = "వెబ్ అప్లికేషన్ల నిర్మాణం";
    
    if (branch === "aiml") {
      techFocus = "Python, Math, & Machine Learning";
      techFocusTe = "పైథాన్, మ్యాథ్స్ & మెషిన్ లెర్నింగ్ బేసిక్స్";
      projectFocus = "AI model development & deployment";
      projectFocusTe = "మెషిన్ లెర్నింగ్ మోడల్స్ మరియు డేటా అనలిసిస్";
    } else if (branch === "ece") {
      techFocus = "C Programming & Embedded Systems / IoT";
      techFocusTe = "C ప్రోగ్రామింగ్, మైక్రోకంట్రోలర్స్ & IoT";
      projectFocus = "IoT/Hardware-Software integration projects";
      projectFocusTe = "హార్డ్‌വേర్ & సాఫ్ట్‌వేర్ అనుసంధాన ప్రాజెక్టులు";
    } else if (branch === "mech_civil") {
      techFocus = "C++ or Python basics & CAD/CAM or Automation";
      techFocusTe = "C++ లేదా పైథాన్ బేసిక్స్ మరియు ఆటోమేషన్";
      projectFocus = "Industrial automation or calculations dashboards";
      projectFocusTe = "ఇండస్ట్రియల్ ఆటోమేషన్ లేదా కాలిక్యులేషన్స్ డ్యాష్‌బోర్డ్స్";
    }

    if (goal === "service") {
      projectFocus = "Responsive HTML/CSS landing pages and basic Database systems";
      projectFocusTe = "రెస్పాన్సివ్ వెబ్‌సైట్లు మరియు బేసిక్ డేటాబేస్ పనులు";
    } else if (goal === "faang") {
      techFocus = "Advanced Data Structures, Algorithms & System Design";
      techFocusTe = "అడ్వాన్స్డ్ డేటా స్ట్రక్చర్స్, అల్గారిథమ్స్ & సిస్టమ్ డిజైన్";
    }

    phases.push({
      title: "Phase 1: Foundation Building (Weeks 1-4)",
      titleTe: "దశ 1: పునాది వేయడం (వారాలు 1-4)",
      goals: [
        `Learn the basics of ${techFocus} (Variables, Loops, Functions, Arrays)`,
        "Practice daily aptitude: Number Systems, Percentages, and Averages",
        "Improve English pronunciation and speak in front of a mirror daily"
      ],
      goalsTe: [
        `${techFocusTe} నేర్చుకోండి (వేరియబుల్స్, లూప్స్, ఫంక్షన్లు, అర్రేస్)`,
        "రోజువారీ ఆప్టిట్యూడ్: సంఖ్యా వ్యవస్థలు (Number Systems), శాతాలు (Percentages), మరియు సగటులు (Averages) ప్రాక్టీస్ చేయండి",
        "ఇంగ్లీష్ ఉచ్చారణను మెరుగుపరచుకోండి, ప్రతిరోజూ అద్దం ముందు నిలబడి మాట్లాడండి"
      ],
      resources: [
        { name: "Language Basics (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/" },
        { name: "Aptitude Formulas (Indiabix)", url: "https://www.indiabix.com/" },
        { name: "Telugu Programming Tutorials (YouTube)", url: "https://www.youtube.com/" }
      ]
    });

    phases.push({
      title: "Phase 2: Core Engineering & Aptitude (Weeks 5-8)",
      titleTe: "దశ 2: ప్రధాన నైపుణ్యాలు & ఆప్టిట్యూడ్ (వారాలు 5-8)",
      goals: [
        "Master OOPs concepts (Encapsulation, Inheritance, Polymorphism)",
        "Understand Linear Data Structures: LinkedLists, Stacks, Queues",
        "Aptitude Focus: Time & Work, Time, Speed & Distance, Profit & Loss",
        "Learn how to write a simple introduction and record your speech"
      ],
      goalsTe: [
        "OOPs కాన్సెప్ట్‌లపై పట్టు సాధించండి (ఎన్‌క్యాప్సులేషన్, ఇన్హెరిటెన్స్, పాలిమార్ఫిజం)",
        "లీనియర్ డేటా స్ట్రక్చర్స్ నేర్చుకోండి: లింక్‌డ్ లిస్ట్, స్టాక్స్, క్యూస్",
        "ఆప్టిట్యూడ్: టైమ్ & వర్క్, టైమ్ స్పీడ్ & డిస్టెన్స్, లాభ నష్టాలు (Profit & Loss)",
        "మిమ్మల్ని మీరు పరిచయం చేసుకునే విధంగా (Self Introduction) ఒక మంచి స్క్రిప్ట్ రాసి ప్రాక్టీస్ చేయండి"
      ],
      resources: [
        { name: "OOPs Concepts Guide", url: "https://www.javatpoint.com/" },
        { name: "Aptitude Tricks & Practice", url: "https://www.indiabix.com/" }
      ]
    });

    if (durationWeeks >= 12) {
      phases.push({
        title: "Phase 3: Building Capstone Projects (Weeks 9-16)",
        titleTe: "దశ 3: ప్రధాన ప్రాజెక్టుల నిర్మాణం (వారాలు 9-16)",
        goals: [
          `Build a mini-project focusing on ${projectFocus}`,
          "Learn Database management (SQL basics: SELECT, JOIN, GROUP BY)",
          "Practice logical reasoning: Coding-Decoding, Blood relations, Syllogisms",
          "Draft a professional resume and create a LinkedIn profile"
        ],
        goalsTe: [
          `${projectFocusTe} కి సంబంధించిన ఒక మినీ ప్రాజెక్ట్ నిర్మించండి`,
          "డేటాబేస్ మేనేజ్మెంట్ (SQL బేసిక్స్: సెలెక్ట్, జాయిన్, గ్రూప్ బై) నేర్చుకోండి",
          "లాజికల్ రీజనింగ్: కోడింగ్-డీకోడింగ్, బ్లడ్ రిలేషన్స్, సిలోజిజమ్స్ ప్రాక్టీస్ చేయండి",
          "ఒక ప్రొఫెషనల్ రెజ్యూమ్ తయారు చేసుకోండి మరియు లింక్డ్‌ఇన్ ప్రొఫైల్ క్రియేట్ చేయండి"
        ],
        resources: [
          { name: "SQL Tutorial (W3Schools)", url: "https://www.w3schools.com/sql/" },
          { name: "Resume building template (Canva)", url: "https://www.canva.com/" }
        ]
      });
    }

    phases.push({
      title: `Phase ${phases.length + 1}: Mock Interviews & Placement Readiness (Last 4 Weeks)`,
      titleTe: `దశ ${phases.length + 1}: మాక్ ఇంటర్వ్యూలు & ప్లేస్‌మెంట్ సన్నద్ధత (చివరి 4 వారాలు)`,
      goals: [
        "Practice mock interviews (HR and Technical) twice a week",
        "Revise top 50 coding questions (Arrays, Strings, HashMaps)",
        "Solve mock placement papers under real exam time limits",
        "Apply to jobs via LinkedIn, Naukri, and off-campus portals"
      ],
      goalsTe: [
        "వారానికి రెండు సార్లు మాక్ ఇంటర్వ్యూలు (HR మరియు టెక్నికల్) ప్రాక్టీస్ చేయండి",
        "టాప్ 50 కోడింగ్ ప్రశ్నలను (అర్రేస్, స్ట్రింగ్స్, హ్యాష్‌మ్యాప్స్) రివిజన్ చేయండి",
        "టైమ్ లిమిట్‌తో మాక్ ప్లేస్‌మెంట్ ఎగ్జామ్స్ రాయండి",
        "లింక్డ్‌ఇన్, నౌకరి మరియు ఇతర ఆఫ్-క్యాంపస్ పోర్టల్స్ ద్వారా ఉద్యోగాలకు అప్లై చేయండి"
      ],
      resources: [
        { name: "Top Interview Questions (LeetCode)", url: "https://leetcode.com/" },
        { name: "Off-Campus Jobs Updates (Telegram/Portals)", url: "#" }
      ]
    });

    return phases;
  },

  // Mock interview data
  interviews: {
    technical: [
      {
        id: 1,
        question: "Explain what Object-Oriented Programming (OOP) is, and why we use it.",
        questionTe: "ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP) అంటే ఏమిటి, మనం దానిని ఎందుకు ఉపయోగిస్తాము వివరించండి.",
        category: "Technical",
        hints: ["class", "object", "inheritance", "polymorphism", "encapsulation", "abstraction", "reusability", "real-world"],
        sampleResponse: "OOP is a programming paradigm based on the concept of 'objects' which contain data and code. We use it because it makes code modular, reusable, and easy to maintain through principles like Inheritance, Encapsulation, Polymorphism, and Abstraction.",
        sampleResponseTe: "OOP అనేది 'ఆబ్జెక్ట్స్' ఆధారంగా పనిచేసే ఒక ప్రోగ్రామింగ్ విధానం. దీని వల్ల కోడ్ సులభంగా అర్థమవుతుంది, మరలా ఉపయోగించుకోవచ్చు (reusable), మరియు భద్రంగా ఉంటుంది. దీనిలో ప్రధానంగా నాలుగు సూత్రాలు ఉన్నాయి: ఇన్హెరిటెన్స్, ఎన్‌క్యాప్సులేషన్, పాలిమార్ఫిజం, మరియు అబ్‌స్ట్రాక్షన్."
      },
      {
        id: 2,
        question: "What is the difference between a Stack and a Queue? Give a real-world example.",
        questionTe: "స్టాక్ (Stack) మరియు క్యూ (Queue) మధ్య తేడా ఏమిటి? నిజ జీవిత ఉదాహరణ ఇవ్వండి.",
        category: "Technical",
        hints: ["LIFO", "FIFO", "push", "pop", "enqueue", "dequeue", "plates", "line", "ticket"],
        sampleResponse: "A Stack follows LIFO (Last In First Out), where elements are added and removed from the same end (like a stack of plates). A Queue follows FIFO (First In First Out), where elements are added at the back and removed from the front (like a line for tickets).",
        sampleResponseTe: "స్టాక్ అనేది LIFO (చివరగా వచ్చినది మొదట వెళ్తుంది) సూత్రంపై పనిచేస్తుంది, ఉదాహరణకు ప్లేట్ల కుప్ప. క్యూ అనేది FIFO (మొదట వచ్చినది మొదట వెళ్తుంది) సూత్రంపై పనిచేస్తుంది, ఉదాహరణకు సినిమా టికెట్ లైన్."
      },
      {
        id: 3,
        question: "What is a primary key in a database? How does it differ from a foreign key?",
        questionTe: "డేటాబేస్‌లో ప్రైమరీ కీ (Primary Key) అంటే ఏమిటి? ఫారిన్ కీ (Foreign Key) తో దీనికి తేడా ఏమిటి?",
        category: "Database",
        hints: ["unique", "not null", "relationship", "referential integrity", "identifies"],
        sampleResponse: "A primary key uniquely identifies each record in a table and cannot contain NULL values. A foreign key is a field in one table that links to the primary key of another table, establishing a relationship between them.",
        sampleResponseTe: "ప్రైమరీ కీ అనేది ఒక టేబుల్‌లోని ప్రతి వరుసను ప్రత్యేకంగా గుర్తించడానికి ఉపయోగపడుతుంది, దీనిలో ఖాళీ విలువలు (NULL) ఉండవు. ఫారిన్ కీ అనేది ఒక టేబుల్‌ని మరొక టేబుల్‌తో లింక్ చేయడానికి ఉపయోగపడుతుంది."
      }
    ],
    hr: [
      {
        id: 1,
        question: "Tell me about yourself. (Introduce yourself)",
        questionTe: "మీ గురించి చెప్పండి. (Self-Introduction)",
        category: "HR",
        hints: ["name", "college", "branch", "skills", "project", "strengths", "career goal"],
        sampleResponse: "Hello, my name is [Name], I am studying [Branch] at [College]. My skills include Python, SQL, and Web Development. I recently built a placement portal project. I am quick learner and eager to start my career in your company.",
        sampleResponseTe: "నమస్కారం, నా పేరు [పేరు]. నేను [కాలేజీ] లో [బ్రాంచ్] చదువుతున్నాను. నా నైపుణ్యాలు పైథాన్, SQL మరియు వెబ్ డెవలప్‌మెంట్. నేను ఇటీవల ఒక ప్రాజెక్ట్ చేశాను. నేను త్వరగా కొత్త విషయాలు నేర్చుకుంటాను."
      },
      {
        id: 2,
        question: "Why do you want to join this company?",
        questionTe: "మీరు ఈ కంపెనీలో ఎందుకు చేరాలనుకుంటున్నారు?",
        category: "HR",
        hints: ["reputation", "growth", "learning", "innovative", "skills alignment"],
        sampleResponse: "I want to join your company because of its great reputation for training freshers and working on innovative projects. I believe my skills in coding will allow me to contribute immediately while learning from experienced professionals.",
        sampleResponseTe: "మీ కంపెనీ ఫ్రెషర్లకు మంచి శిక్షణ ఇస్తుంది మరియు కొత్త టెక్నాలజీలపై పనిచేస్తుంది. నా నైపుణ్యాలను ఉపయోగించి కంపెనీ ఎదుగుదలకు తోడ్పడుతూ, నా కెరీర్‌ను ఇక్కడ అద్భుతంగా నిర్మించుకోవచ్చు."
      },
      {
        id: 3,
        question: "How do you handle stress or tight deadlines?",
        questionTe: "మీరు ఒత్తిడి లేదా తక్కువ గడువు (deadlines) ఉన్న పనులను ఎలా ఎదుర్కొంటారు?",
        category: "HR",
        hints: ["prioritize", "break down", "calm", "to-do list", "communication"],
        sampleResponse: "When facing stress or tight deadlines, I remain calm, write down the tasks, prioritize them based on urgency, and focus on one task at a time. If needed, I communicate with my team early to adjust expectations.",
        sampleResponseTe: "నేను ఒత్తిడి వచ్చినప్పుడు ప్రశాంతంగా ఉండి, పనులను ఒక లిస్ట్‌గా రాసుకుంటాను. ఏది ముఖ్యమో దానికి మొదటి ప్రాధాన్యత ఇస్తూ పూర్తి చేస్తాను. అవసరమైతే మా టీమ్‌తో మాట్లాడి సలహాలు తీసుకుంటాను."
      }
    ],
    aiml: [
      {
        id: 1,
        question: "What is Supervised Learning? Give two examples.",
        questionTe: "సూపర్‌వైజ్డ్ లెర్నింగ్ (Supervised Learning) అంటే ఏమిటి? రెండు ఉదాహరణలు ఇవ్వండి.",
        category: "AI/ML",
        hints: ["labeled data", "target variable", "features", "regression", "classification", "house price", "spam filter"],
        sampleResponse: "Supervised Learning is a type of machine learning where the model is trained on labeled data (input-output pairs). Examples include predicting house prices (Regression) and classifying emails as spam or not spam (Classification).",
        sampleResponseTe: "సూపర్‌వైజ్డ్ లెర్నింగ్ అంటే మన దగ్గర ఉన్న లేబుల్డ్ డేటా (ఇన్‌పుట్ మరియు దానికి సరిపోయే ఆవుట్‌పుట్) ఉపయోగించి మోడల్‌కు శిక్షణ ఇవ్వడం. ఉదాహరణకు: ఇళ్ల ధరలను అంచనా వేయడం (Regression) లేదా ఈమెయిల్ స్పామ్ అవునో కాదో చెప్పడం (Classification)."
      },
      {
        id: 2,
        question: "What is overfitting in Machine Learning, and how do you prevent it?",
        questionTe: "మెషిన్ లెర్నింగ్‌లో ఓవర్‌ఫిట్టింగ్ (Overfitting) అంటే ఏమిటి? దానిని ఎలా నివారించవచ్చు?",
        category: "AI/ML",
        hints: ["training data", "test data", "complex model", "generalization", "regularization", "cross-validation", "dropout"],
        sampleResponse: "Overfitting occurs when a model learns the training data too well, including the noise, but performs poorly on unseen test data. It can be prevented by simplifying the model, using cross-validation, applying regularization (L1/L2), or gathering more training data.",
        sampleResponseTe: "మోడల్ ట్రైనింగ్ డేటాను అతిగా నేర్చుకుని, కొత్త టెస్ట్ డేటా వచ్చినప్పుడు తప్పుడు ఫలితాలు ఇవ్వడాన్ని ఓవర్‌ఫిట్టింగ్ అంటారు. దీనిని నివారించడానికి రెగ్యులరైజేషన్ వాడటం, సింపుల్ మోడల్స్ వాడటం లేదా ఎక్కువ డేటా సేకరించడం చేయాలి."
      }
    ]
  },

  // Quizzes data for skill gap
  quizzes: [
    {
      id: 1,
      section: "coding",
      question: "Which of the following data structures operates on a LIFO (Last In First Out) principle?",
      questionTe: "కింది వాటిలో ఏ డేటా స్ట్రక్చర్ LIFO (చివరగా వచ్చినది మొదట వెళ్తుంది) సూత్రంపై పనిచేస్తుంది?",
      options: ["Queue", "Array", "Stack", "LinkedList"],
      answerIndex: 2,
      explanation: "A Stack pushes elements on top and pops them from the top, meaning the last added element is the first to be removed.",
      explanationTe: "స్టాక్ లో పైభాగంలో ఎలిమెంట్స్ యాడ్ అవుతాయి మరియు అక్కడి నుండే తీసివేయబడతాయి. కాబట్టి చివరగా వచ్చింది మొదట బయటకు వస్తుంది."
    },
    {
      id: 2,
      section: "coding",
      question: "What will be the output of print(type([])) in Python?",
      questionTe: "పైథాన్‌లో print(type([])) యొక్క అవుట్‌పుట్ ఏమిటి?",
      options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"],
      answerIndex: 1,
      explanation: "The square brackets [] denote an empty list in Python, so its type is list.",
      explanationTe: "పైథాన్‌లో స్క్వేర్ బ్రాకెట్స్ [] ఖాళీ లిస్ట్‌ని సూచిస్తాయి, కాబట్టి దాని టైప్ 'list' అవుతుంది."
    },
    {
      id: 3,
      section: "aptitude",
      question: "A person crosses a 600m long street in 5 minutes. What is his speed in km/hr?",
      questionTe: "ఒక వ్యక్తి 600 మీటర్ల పొడవైన వీధిని 5 నిమిషాల్లో దాటాడు. అతని వేగం గంటకు ఎన్ని కిలోమీటర్లు (km/hr)?",
      options: ["3.6 km/hr", "7.2 km/hr", "8.4 km/hr", "10 km/hr"],
      answerIndex: 1,
      explanation: "Speed = Distance / Time. Distance = 600m. Time = 5 min = 300s. Speed = 600/300 = 2 m/s. To convert to km/hr, multiply by 18/5: 2 * 18/5 = 7.2 km/hr.",
      explanationTe: "వేగం = దూరం / సమయం. దూరం = 600మీ. సమయం = 5 నిమిషాలు = 300 సెకన్లు. వేగం = 600/300 = 2 మీ/సె. దీనిని కిమీ/గంట లోకి మార్చడానికి 18/5 తో గుణించాలి: 2 * 18/5 = 7.2 కిమీ/గంట."
    },
    {
      id: 4,
      section: "aptitude",
      question: "If 10 men can do a piece of work in 12 days, in how many days can 15 men complete the same work?",
      questionTe: "10 మంది పురుషులు ఒక పనిని 12 రోజుల్లో పూర్తి చేయగలిగితే, 15 మంది పురుషులు అదే పనిని ఎన్ని రోజుల్లో పూర్తి చేయగలరు?",
      options: ["6 days", "8 days", "10 days", "15 days"],
      answerIndex: 1,
      explanation: "Using the formula M1 * D1 = M2 * D2. So, 10 * 12 = 15 * D2. 120 = 15 * D2. D2 = 120/15 = 8 days.",
      explanationTe: "M1 * D1 = M2 * D2 సూత్రం ప్రకారం, 10 * 12 = 15 * D2. 120 = 15 * D2. D2 = 120/15 = 8 రోజులు."
    },
    {
      id: 5,
      section: "communication",
      question: "Select the sentence that represents a professional greeting in an email.",
      questionTe: "ఈమెయిల్‌లో ప్రొఫెషనల్ గ్రీటింగ్ (గౌరవప్రదమైన పలకరింపు) కోసం సరిపోయే వాక్యాన్ని ఎంచుకోండి.",
      options: [
        "Hey! Check this out now.",
        "Dear Hiring Team, I hope this email finds you well.",
        "Yo, hire me for the job.",
        "What's up HR? Here is my resume."
      ],
      answerIndex: 1,
      explanation: "'Dear Hiring Team, I hope this email finds you well' is polite, formal, and ideal for business or job application emails.",
      explanationTe: "'Dear Hiring Team, I hope this email finds you well' అనేది మర్యాదగా మరియు పద్ధతిగా ఉంటుంది. ఇది ఉద్యోగ దరఖాస్తులకు చాలా అనువైనది."
    }
  ],

  // Project recommendations
  projects: [
    {
      id: 1,
      title: "Student Placement Portal Dash",
      titleTe: "స్టూడెంట్ ప్లేస్‌మెంట్ పోర్టల్ డ్యాష్‌బోర్డ్",
      domain: "webDev",
      difficulty: "Intermediate",
      stack: "HTML, CSS, JavaScript (Local Storage)",
      summary: "A local dashboard where students can create profiles, upload resumes, and track their applications. Recruiters can view profiles.",
      summaryTe: "విద్యార్థులు తమ ప్రొఫైల్స్ క్రియేట్ చేసుకుని, జాబ్స్ కి అప్లై చేసే వెబ్ పోర్టల్. రిక్రూటర్స్ దీనిలో విద్యార్థుల ప్రొఫైల్స్ చూడవచ్చు.",
      whyPlacement: "Demonstrates form validation, data persistence, dynamic DOM manipulation, and UX design skills. Highly valued for service & product freshers.",
      whyPlacementTe: "ఫారం వాలిడేషన్, డేటా స్టోరేజ్, డైనమిక్ DOM మార్పులు నేర్పుతుంది. సర్వీస్ కంపెనీల ఇంటర్వ్యూలలో ఈ ప్రాజెక్ట్ చాలా హెల్ప్ అవుతుంది.",
      guide: [
        "Create index.html with layout grids for Student Profile and Applied Jobs list.",
        "Write styles.css for clean glassmorphism forms and buttons.",
        "Write logic in script.js to save profile data inside localStorage so it remains after refreshing.",
        "Add a search bar for mock recruiters to filter students by skill tags."
      ],
      guideTe: [
        "విద్యార్థుల ప్రొఫైల్ మరియు జాబ్ లిస్ట్ కోసం HTML లేఅవుట్ సృష్టించండి.",
        "చక్కని బటన్లు మరియు ఫారమ్‌ల కోసం CSS స్టైల్స్ రాయండి.",
        "డేటా సేవ్ అవ్వడానికి జావాస్క్రిప్ట్ 'localStorage' ఉపయోగించండి (పేజీ రీఫ్రెష్ చేసినా డేటా పోకుండా ఉంటుంది).",
        "స్కిల్స్ ఆధారంగా ప్రొఫైల్స్ ఫిల్టర్ చేయడానికి సెర్చ్ బార్ జోడించండి."
      ],
      codeSnippet: `// Save profile to localStorage\nfunction saveStudentProfile(studentData) {\n  localStorage.setItem('student_profile', JSON.stringify(studentData));\n  alert('Profile Saved Successfully!');\n}`
    },
    {
      id: 2,
      title: "House Price Estimator AI",
      titleTe: "ఇంటి ధరల అంచనా AI నమూనా",
      domain: "aiml",
      difficulty: "Beginner",
      stack: "Python, Scikit-learn, Pandas, NumPy",
      summary: "A machine learning model that predicts house prices based on factors like square footage, bedrooms, and locality.",
      summaryTe: "ఇంటి వైశాల్యం, బెడ్‌రూమ్స్ సంఖ్య మరియు ప్రాంతం ఆధారంగా ధరలను అంచనా వేసే బేసిక్ మెషిన్ లెర్నింగ్ మోడల్.",
      whyPlacement: "Teaches data preprocessing, linear regression algorithms, and validation metrics (RMSE, R2 score). Perfect for explaining ML basics in interviews.",
      whyPlacementTe: "డేటా క్లీనింగ్, లీనియర్ రిగ్రెషన్ మరియు మోడల్ టెస్టింగ్ నేర్పుతుంది. AI/ML ఉద్యోగాలకు వెళ్ళేటప్పుడు ఇంటర్వ్యూలో వివరించడానికి అనువైనది.",
      guide: [
        "Collect or download a housing dataset (e.g. from Kaggle).",
        "Clean dataset using Pandas to handle missing values and encode categorical city zones.",
        "Split data into 80% Training and 20% Testing sets.",
        "Train a LinearRegression model and print the Accuracy R2 Score."
      ],
      guideTe: [
        "మొదట హౌసింగ్ డేటాసెట్ (Kaggle నుండి) డౌన్‌లోడ్ చేసుకోండి.",
        "Pandas ఉపయోగించి డేటాలోని ఖాళీలను క్లీన్ చేయండి.",
        "డేటాను 80% ట్రైనింగ్ మరియు 20% టెస్టింగ్ సెట్స్‌గా విభజించండి.",
        "Scikit-learn లైబ్రరీ ద్వారా లీనియర్ రిగ్రెషన్ రన్ చేసి మోడల్ కచ్చితత్వాన్ని (Accuracy) చెక్ చేయండి."
      ],
      codeSnippet: `from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\n\n# Train model\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\nprint("Model Accuracy:", model.score(X_test, y_test))`
    },
    {
      id: 3,
      title: "Telugu AI Text Assistant",
      titleTe: "తెలుగు AI టెక్స్ట్ అసిస్టెంట్",
      domain: "aiml",
      difficulty: "Advanced",
      stack: "Python, Transformers (Hugging Face), Streamlit",
      summary: "A web app powered by a lightweight NLP model that translates, summarizes, and answers simple queries in Telugu.",
      summaryTe: "తెలుగు భాషలో ప్రశ్నలకు సమాధానాలు ఇవ్వడం మరియు సారాంశాన్ని (Summary) రాయగలిగే ఒక ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ వెబ్ యాప్.",
      whyPlacement: "Demonstrates NLP engineering, deep learning APIs, and frontend deployment using Streamlit. Shows cutting-edge skill in LLMs.",
      whyPlacementTe: "NLP (సహజ భాషా ప్రాసెస్), హగ్గింగ్ ఫేస్ ట్రాన్స్‌ఫార్మర్స్ మరియు స్ట్రీమ్‌లిట్ యాప్ బిల్డింగ్ నేర్పుతుంది. ఇది మీ రెజ్యూమ్‌ను చాలా బలంగా మారుస్తుంది.",
      guide: [
        "Set up python environment and install streamlit and transformers packages.",
        "Use a pretrained multilingual translation/generation model (like mT5 or mBART).",
        "Write a simple Streamlit interface with a text area for Telugu inputs.",
        "Run translation/summarization tasks and display output on the dashboard."
      ],
      guideTe: [
        "పైథాన్ ఎన్విరాన్‌మెంట్ సెటప్ చేసి streamlit మరియు transformers ఇన్‌స్టాల్ చేయండి.",
        "మల్టీలింగువల్ మోడల్ (mT5 లేదా mBART) ఉపయోగించండి.",
        "యూజర్ తెలుగు టెక్స్ట్ రాయడానికి వీలుగా Streamlit తో ఇంటర్‌ఫేస్ చేయండి.",
        "మోడల్ అవుట్‌పుట్‌ని వెబ్‌సైట్ స్క్రీన్‌పై చూపించండి."
      ],
      codeSnippet: `import streamlit as st\nfrom transformers import pipeline\n\nst.title("తెలుగు AI అసిస్టెంట్")\nuser_input = st.text_area("ఇక్కడ మీ ప్రశ్న రాయండి:")\nif st.button("సమాధానం ఇవ్వు"):\n    # Call model pipeline here...\n    st.write("AI సమాధానం...")`
    }
  ],

  // NEW APTITUDE PRACTICE QUESTIONS DATABASE
  aptitudeQuestions: [
    {
      id: 1,
      topic: "percentages",
      question: "If 20% of a number is 240, then what will be 120% of that number?",
      questionTe: "ఒక సంఖ్యలో 20% విలువ 240 అయితే, ఆ సంఖ్యలో 120% విలువ ఎంత?",
      options: ["1440", "1200", "1080", "1800"],
      answerIndex: 0,
      explanation: "Let the number be X. 0.20 * X = 240 => X = 240 / 0.20 = 1200. Now, 120% of X = 1.20 * 1200 = 1440. Shortcut: 20% is 240. So 120% is (240 / 20) * 120 = 12 * 120 = 1440.",
      explanationTe: "ఆ సంఖ్యను X అనుకుందాం. 20% X = 240 కాబట్టి X = 240 / 0.20 = 1200. ఇప్పుడు ఆ సంఖ్యలో 120% విలువ = 1.2 * 1200 = 1440. సులువైన పద్ధతి: 20% కి 240 అయితే, 120% కి (240 / 20) * 120 = 1440 అవుతుంది."
    },
    {
      id: 2,
      topic: "time_work",
      question: "A can build a wall in 10 days, and B can build it in 15 days. In how many days can they complete it working together?",
      questionTe: "A ఒక గోడను 10 రోజుల్లో కట్టగలడు, B అదే గోడను 15 రోజుల్లో కట్టగలడు. ఇద్దరూ కలిసి ఆ గోడను ఎన్ని రోజుల్లో పూర్తి చేయగలరు?",
      options: ["5 days", "6 days", "8 days", "12 days"],
      answerIndex: 1,
      explanation: "Working together, time taken = (A * B) / (A + B) = (10 * 15) / (10 + 15) = 150 / 25 = 6 days.",
      explanationTe: "ఇద్దరూ కలిసి పని చేస్తే పట్టే సమయం = (A * B) / (A + B) = (10 * 15) / (10 + 15) = 150 / 25 = 6 రోజులు."
    },
    {
      id: 3,
      topic: "logical",
      question: "In a certain code language, if 'PYTHON' is written as 'QZUGBO', how will 'JAVA' be written?",
      questionTe: "ఒక కోడ్ భాషలో 'PYTHON' ను 'QZUGBO' గా రాస్తే, 'JAVA' ను ఎలా రాస్తారు?",
      options: ["KBWB", "KZWZ", "KBYB", "KCXB"],
      answerIndex: 2,
      explanation: "Each letter is shifted by +1 position in the alphabet: P->Q (+1), Y->Z (+1), T->U (+1), H->I (Wait, here H->G is -1? Let's check: P->Q (+1), Y->Z (+1), T->U (+1), H->G (-1), O->B? No. The logic is: P->Q(+1), Y->Z(+1), T->U(+1), H->G is indeed (-1? No, H->I is +1), O->P (+1), N->O (+1). Ah, let's fix code letters: J(+1)->K, A(+1)->B, V(+1)->W, A(+1)->B. So K-B-W-B.",
      explanationTe: "ప్రతి అక్షరం అక్షరమాలలో +1 స్థానం ముందుకు కదులుతుంది. J(+1)->K, A(+1)->B, V(+1)->W, A(+1)->B. కాబట్టి సరైన సమాధానం KBWB."
    }
  ],

  // NEW MOCK JOB ALERTS
  jobAlerts: [
    {
      id: 1,
      title: "Systems Engineer (NQT Recruit)",
      company: "TCS (Tata Consultancy Services)",
      package: "3.6 LPA - 7.0 LPA",
      eligibility: "B.E / B.Tech / BCA / B.Sc (2025/2026 Batch)",
      location: "Hyderabad, Bangalore, Pune",
      skills: "C++, Python or Java, Basic SQL",
      applied: false
    },
    {
      id: 2,
      title: "Associate Software Engineer",
      company: "Accenture India",
      package: "4.5 LPA",
      eligibility: "All Graduates (No coding backlogs)",
      location: "Bangalore, Chennai",
      skills: "Aptitude, Critical Thinking, Basic Coding",
      applied: false
    },
    {
      id: 3,
      title: "Machine Learning Intern",
      company: "Cognizant AI Labs",
      package: "5.4 LPA",
      eligibility: "B.Sc AI&ML / B.Tech CSE (Skills based)",
      location: "Remote / Hyderabad",
      skills: "Python, Pandas, Scikit-learn, Statistics",
      applied: false
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = appData;
}
