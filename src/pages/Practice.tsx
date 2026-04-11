import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { sampleQuestions, pyqQuestions } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Timer, RotateCcw } from "lucide-react";

const allQuestions = [...sampleQuestions, ...pyqQuestions];

const categories = [
  { value: "all", label: "All" },
  { value: "quant", label: "Quantitative Aptitude" },
  { value: "lrdi", label: "LRDI" },
  { value: "verbal", label: "Verbal Ability" },
];

const difficulties = ["all", "easy", "medium", "hard"];

export default function Practice() {
  const [params] = useSearchParams();
  const [category, setCategory] = useState(params.get("cat") || "all");
  const [difficulty, setDifficulty] = useState("all");
  const [timerOn, setTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!timerOn) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [timerOn]);

  const filtered = allQuestions.filter((q) => {
    if (category !== "all" && q.category !== category) return false;
    if (difficulty !== "all" && q.difficulty !== difficulty) return false;
    return true;
  });

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Practice Questions</h1>
        <p className="text-muted-foreground">Topic-wise CAT questions with detailed solutions — {allQuestions.length} questions available</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex gap-1 flex-wrap">
          {categories.map((c) => (
            <Button key={c.value} variant={category === c.value ? "default" : "outline"} size="sm" onClick={() => setCategory(c.value)}>
              {c.label}
            </Button>
          ))}
        </div>
        <div className="h-6 w-px bg-border hidden sm:block" />
        <div className="flex gap-1 flex-wrap">
          {difficulties.map((d) => (
            <Button key={d} variant={difficulty === d ? "default" : "outline"} size="sm" onClick={() => setDifficulty(d)} className="capitalize">
              {d}
            </Button>
          ))}
        </div>
        <div className="h-6 w-px bg-border hidden sm:block" />
        <div className="flex items-center gap-2">
          <Button variant={timerOn ? "default" : "outline"} size="sm" onClick={() => setTimerOn(!timerOn)}>
            <Timer className="mr-1 h-4 w-4" /> {timerOn ? formatTime(seconds) : "Start Timer"}
          </Button>
          {timerOn && (
            <Button variant="ghost" size="sm" onClick={() => { setTimerOn(false); setSeconds(0); }}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {filtered.length > 0 ? (
          filtered.map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No questions found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
