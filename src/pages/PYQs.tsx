import { useState } from "react";
import { sampleQuestions } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";

const years = [2024, 2023, 2022, 2021, 2020];

export default function PYQs() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [category, setCategory] = useState("all");

  const pyqs = sampleQuestions.filter((q) => {
    if (!q.year) return false;
    if (selectedYear && q.year !== selectedYear) return false;
    if (category !== "all" && q.category !== category) return false;
    return true;
  });

  return (
    <div className="container py-10">
      <h1 className="font-heading text-3xl font-bold mb-2">Previous Year Questions</h1>
      <p className="text-muted-foreground mb-8">Practice with actual CAT questions, filtered by year and topic</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant={selectedYear === null ? "default" : "outline"} size="sm" onClick={() => setSelectedYear(null)}>All Years</Button>
        {years.map((y) => (
          <Button key={y} variant={selectedYear === y ? "default" : "outline"} size="sm" onClick={() => setSelectedYear(y)}>
            {y}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {["all", "quant", "lrdi", "verbal"].map((c) => (
          <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => setCategory(c)} className="capitalize">
            {c === "all" ? "All Sections" : c === "quant" ? "Quant" : c === "lrdi" ? "LRDI" : "Verbal"}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {pyqs.length > 0 ? (
          pyqs.map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No PYQs found for the selected filters. More questions coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
