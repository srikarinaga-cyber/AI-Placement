import type { Branch } from "./languageMeta";

export type InterviewType = "technical" | "hr" | "aiml";

export type InterviewQuestion = {
  id: number;
  question: string;
  questionLocal?: string;
  category: string;
  hints: string[];
  sampleResponse: string;
  sampleResponseLocal?: string;
};

const hrQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "Tell me about yourself. (Introduce yourself)",
    questionLocal: "మీ గురించి చెప్పండి. (Self-Introduction)",
    category: "HR",
    hints: ["name", "college", "branch", "skills", "project", "strengths", "career goal"],
    sampleResponse:
      "Hello, my name is [Name], I am studying [Branch] at [College]. My skills include Python, SQL, and Web Development. I recently built a placement portal project. I am a quick learner and eager to start my career in your company.",
    sampleResponseLocal:
      "నమస్కారం, నా పేరు [పేరు]. నేను [కాలేజీ] లో [బ్రాంచ్] చదువుతున్నాను. నా నైపుణ్యాలు పైథాన్, SQL మరియు వెబ్ డెవలప్‌మెంట్.",
  },
  {
    id: 2,
    question: "Why do you want to join this company?",
    questionLocal: "మీరు ఈ కంపెనీలో ఎందుకు చేరాలనుకుంటున్నారు?",
    category: "HR",
    hints: ["reputation", "growth", "learning", "innovative", "skills alignment"],
    sampleResponse:
      "I want to join your company because of its great reputation for training freshers and working on innovative projects. I believe my skills will allow me to contribute while learning from experienced professionals.",
    sampleResponseLocal:
      "మీ కంపెనీ ఫ్రెషర్లకు మంచి శిక్షణ ఇస్తుంది మరియు కొత్త టెక్నాలజీలపై పనిచేస్తుంది.",
  },
  {
    id: 3,
    question: "How do you handle stress or tight deadlines?",
    questionLocal: "మీరు ఒత్తిడి లేదా తక్కువ గడువు ఉన్న పనులను ఎలా ఎదుర్కొంటారు?",
    category: "HR",
    hints: ["prioritize", "break down", "calm", "to-do list", "communication"],
    sampleResponse:
      "When facing stress or tight deadlines, I remain calm, prioritize tasks by urgency, and focus on one task at a time. If needed, I communicate with my team early to adjust expectations.",
    sampleResponseLocal:
      "నేను ఒత్తిడి వచ్చినప్పుడు ప్రశాంతంగా ఉండి, పనులను ఒక లిస్ట్‌గా రాసుకుంటాను.",
  },
];

const technicalByBranch: Record<Branch, InterviewQuestion[]> = {
  cse: [
    {
      id: 1,
      question: "Explain Object-Oriented Programming (OOP) and its four pillars.",
      category: "Technical",
      hints: ["class", "object", "inheritance", "polymorphism", "encapsulation", "abstraction", "reusability"],
      sampleResponse:
        "OOP is a paradigm based on objects containing data and code. Its pillars are Inheritance, Encapsulation, Polymorphism, and Abstraction, which make code modular and maintainable.",
    },
    {
      id: 2,
      question: "What is the difference between a Stack and a Queue? Give real-world examples.",
      category: "Technical",
      hints: ["LIFO", "FIFO", "push", "pop", "enqueue", "dequeue", "plates", "ticket"],
      sampleResponse:
        "A Stack follows LIFO (like a stack of plates). A Queue follows FIFO (like a ticket line). Stacks use push/pop; queues use enqueue/dequeue.",
    },
    {
      id: 3,
      question: "Explain primary key vs foreign key in a relational database.",
      category: "Database",
      hints: ["unique", "not null", "relationship", "referential integrity", "identifies"],
      sampleResponse:
        "A primary key uniquely identifies each row and cannot be NULL. A foreign key links to a primary key in another table to establish relationships.",
    },
  ],
  aiml: [
    {
      id: 1,
      question: "What is Supervised Learning? Give two examples.",
      questionLocal: "సూపర్‌వైజ్డ్ లెర్నింగ్ అంటే ఏమిటి? రెండు ఉదాహరణలు ఇవ్వండి.",
      category: "AI/ML",
      hints: ["labeled data", "target variable", "regression", "classification", "house price", "spam filter"],
      sampleResponse:
        "Supervised Learning trains on labeled input-output pairs. Examples include house price prediction (Regression) and spam email classification (Classification).",
      sampleResponseLocal:
        "లేబుల్డ్ డేటా ఉపయోగించి మోడల్‌కు శిక్షణ ఇవ్వడం. ఉదాహరణ: ఇళ్ల ధరల అంచనా, ఈమెయిల్ స్పామ్ క్లాసిఫికేషన్.",
    },
    {
      id: 2,
      question: "What is overfitting in Machine Learning, and how do you prevent it?",
      questionLocal: "ఓవర్‌ఫిట్టింగ్ అంటే ఏమిటి? దానిని ఎలా నివారించవచ్చు?",
      category: "AI/ML",
      hints: ["training data", "test data", "generalization", "regularization", "cross-validation", "dropout"],
      sampleResponse:
        "Overfitting means the model memorizes training noise and fails on new data. Prevent it with regularization, cross-validation, simpler models, or more data.",
      sampleResponseLocal:
        "మోడల్ ట్రైనింగ్ డేటాను అతిగా నేర్చుకుని టెస్ట్ డేటాలో తప్పు ఫలితాలు ఇవ్వడం. రెగ్యులరైజేషన్ మరియు క్రాస్-వాలిడేషన్ ఉపయోగించండి.",
    },
    {
      id: 3,
      question: "Explain the bias-variance tradeoff in simple terms.",
      category: "AI/ML",
      hints: ["underfitting", "overfitting", "generalization", "complex model", "training error", "test error"],
      sampleResponse:
        "High bias means underfitting (too simple). High variance means overfitting (too complex). A good model balances both to generalize well on unseen data.",
    },
  ],
  ece: [
    {
      id: 1,
      question: "Explain the difference between analog and digital signals.",
      category: "Electronics",
      hints: ["continuous", "discrete", "ADC", "DAC", "sampling", "amplitude", "binary"],
      sampleResponse:
        "Analog signals are continuous in time and amplitude. Digital signals use discrete values (0/1). ADC converts analog to digital; DAC does the reverse.",
    },
    {
      id: 2,
      question: "What is an embedded system? Give a real-world example.",
      category: "Embedded",
      hints: ["microcontroller", "firmware", "real-time", "IoT", "sensor", "RTOS", "Arduino"],
      sampleResponse:
        "An embedded system is a dedicated computer inside a device, like a washing machine controller or traffic signal, running firmware on a microcontroller.",
    },
    {
      id: 3,
      question: "What is the purpose of a voltage regulator in a circuit?",
      category: "Electronics",
      hints: ["stable voltage", "7805", "power supply", "fluctuation", "IC", "load"],
      sampleResponse:
        "A voltage regulator maintains a stable output voltage despite input variations, protecting sensitive components like microcontrollers from power fluctuations.",
    },
  ],
  mech_civil: [
    {
      id: 1,
      question: "What is the difference between stress and strain in materials?",
      category: "Mechanical",
      hints: ["force", "deformation", "elastic", "Young modulus", "tensile", "unit area"],
      sampleResponse:
        "Stress is internal force per unit area. Strain is the deformation caused by stress. Young's modulus relates stress to strain in the elastic region.",
    },
    {
      id: 2,
      question: "Explain the working principle of a centrifugal pump.",
      category: "Mechanical",
      hints: ["impeller", "rotation", "kinetic energy", "pressure", "fluid", "volute"],
      sampleResponse:
        "A centrifugal pump uses a rotating impeller to add kinetic energy to fluid, which is converted to pressure energy in the volute casing to move liquid.",
    },
    {
      id: 3,
      question: "What is PLC and where is it used in industrial automation?",
      category: "Automation",
      hints: ["programmable logic controller", "ladder logic", "factory", "relay", "SCADA", "sensors"],
      sampleResponse:
        "A PLC is a rugged industrial computer that automates machines using ladder logic. It is used in assembly lines, conveyors, and process control systems.",
    },
  ],
};

const aimlDeepQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "Explain train/validation/test split and why we need all three.",
    category: "AI/ML",
    hints: ["overfitting", "hyperparameter", "generalization", "unseen data", "70-15-15"],
    sampleResponse:
      "Training data fits the model, validation tunes hyperparameters, and test data gives an unbiased final performance estimate on unseen data.",
  },
  {
    id: 2,
    question: "What is a confusion matrix? Define precision and recall.",
    category: "AI/ML",
    hints: ["true positive", "false positive", "classification", "TP", "FP", "FN", "metrics"],
    sampleResponse:
      "A confusion matrix shows prediction vs actual classes. Precision = TP/(TP+FP). Recall = TP/(TP+FN). They measure correctness of positive predictions and coverage.",
  },
  {
    id: 3,
    question: "Compare batch gradient descent vs stochastic gradient descent.",
    category: "AI/ML",
    hints: ["full dataset", "mini-batch", "convergence", "noise", "memory", "epoch"],
    sampleResponse:
      "Batch GD uses the full dataset per update (stable but slow). SGD uses one sample (fast but noisy). Mini-batch is the practical middle ground.",
  },
];

export function getInterviewQuestions(type: InterviewType, branch: Branch): InterviewQuestion[] {
  if (type === "hr") return hrQuestions;
  if (type === "aiml") return branch === "aiml" ? aimlDeepQuestions : technicalByBranch.aiml;
  return technicalByBranch[branch] ?? technicalByBranch.cse;
}

export function getAvailableInterviewTypes(branch: Branch): InterviewType[] {
  const types: InterviewType[] = ["technical", "hr"];
  if (branch === "aiml") types.push("aiml");
  return types;
}

export function getInterviewerTitle(type: InterviewType | null, branch: Branch) {
  const titles: Record<InterviewType, string> = {
    technical:
      branch === "ece"
        ? "Embedded Systems Interviewer"
        : branch === "mech_civil"
          ? "Core Engineering Interviewer"
          : branch === "aiml"
            ? "AI/ML Technical Lead"
            : "Software Engineering Interviewer",
    hr: "Senior HR Specialist",
    aiml: "AI/ML Principal Architect",
  };
  return type ? titles[type] : "Recruiter";
}
