export interface VideoItem {
  id: string;
  title: string;
  creator: string;
  youtubeId: string;
  duration: string;
}

export interface TopicSection {
  id: string;
  topic: string;
  description: string;
  icon: string;
  videos: VideoItem[];
}

export const learningPath = [
  { step: 1, label: "Beginner", topic: "Arithmetic" },
  { step: 2, label: "Foundation", topic: "Number System" },
  { step: 3, label: "Core", topic: "Algebra" },
  { step: 4, label: "Intermediate", topic: "Geometry" },
  { step: 5, label: "Advanced", topic: "Modern Math" },
  { step: 6, label: "Expert", topic: "P & C" },
];

export const quantTopics: TopicSection[] = [
  {
    id: "arithmetic",
    topic: "Arithmetic",
    description: "Master percentages, profit & loss, time-speed-distance, and more.",
    icon: "Calculator",
    videos: [
      { id: "a1", title: "Arithmetic Foundation – Complete Strategy", creator: "Ravi Sir", youtubeId: "dQw4w9WgXcQ", duration: "42 min" },
      { id: "a2", title: "Percentages & Profit-Loss Made Easy", creator: "Ravi Sir", youtubeId: "dQw4w9WgXcQ", duration: "35 min" },
      { id: "a3", title: "Time, Speed & Distance – All Concepts", creator: "Arun Sir", youtubeId: "dQw4w9WgXcQ", duration: "48 min" },
    ],
  },
  {
    id: "algebra",
    topic: "Algebra",
    description: "Equations, inequalities, functions and graphs simplified.",
    icon: "Variable",
    videos: [
      { id: "al1", title: "Best Strategy to Master Algebra", creator: "Ravi Sir", youtubeId: "dQw4w9WgXcQ", duration: "50 min" },
      { id: "al2", title: "Quadratic Equations – Tricks & Shortcuts", creator: "Priya Ma'am", youtubeId: "dQw4w9WgXcQ", duration: "38 min" },
      { id: "al3", title: "Inequalities & Modulus – Complete Guide", creator: "Arun Sir", youtubeId: "dQw4w9WgXcQ", duration: "44 min" },
    ],
  },
  {
    id: "geometry",
    topic: "Geometry",
    description: "Lines, angles, triangles, circles and coordinate geometry.",
    icon: "Triangle",
    videos: [
      { id: "g1", title: "Geometry Basics to Advanced in One Shot", creator: "Ravi Sir", youtubeId: "dQw4w9WgXcQ", duration: "55 min" },
      { id: "g2", title: "Circles & Tangents – All Properties", creator: "Priya Ma'am", youtubeId: "dQw4w9WgXcQ", duration: "40 min" },
      { id: "g3", title: "Coordinate Geometry Shortcuts", creator: "Arun Sir", youtubeId: "dQw4w9WgXcQ", duration: "32 min" },
    ],
  },
  {
    id: "number-system",
    topic: "Number System",
    description: "Factors, remainders, divisibility, HCF/LCM and more.",
    icon: "Hash",
    videos: [
      { id: "n1", title: "Number System – Complete Revision", creator: "Ravi Sir", youtubeId: "dQw4w9WgXcQ", duration: "45 min" },
      { id: "n2", title: "Remainder Theorem & Fermat's Theorem", creator: "Arun Sir", youtubeId: "dQw4w9WgXcQ", duration: "38 min" },
    ],
  },
  {
    id: "modern-math",
    topic: "Modern Math",
    description: "Probability, set theory, progressions and logarithms.",
    icon: "Sigma",
    videos: [
      { id: "m1", title: "Probability – From Zero to Hero", creator: "Priya Ma'am", youtubeId: "dQw4w9WgXcQ", duration: "42 min" },
      { id: "m2", title: "Progressions & Series – All Types", creator: "Ravi Sir", youtubeId: "dQw4w9WgXcQ", duration: "36 min" },
    ],
  },
  {
    id: "pnc",
    topic: "Permutation & Combination",
    description: "Counting principles, arrangements and selections made simple.",
    icon: "Shuffle",
    videos: [
      { id: "p1", title: "P&C – Concept Building from Scratch", creator: "Ravi Sir", youtubeId: "dQw4w9WgXcQ", duration: "50 min" },
      { id: "p2", title: "Advanced P&C Problems & Tricks", creator: "Arun Sir", youtubeId: "dQw4w9WgXcQ", duration: "44 min" },
    ],
  },
];
