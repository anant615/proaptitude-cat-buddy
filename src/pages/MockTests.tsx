import { mockTests } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Lock } from "lucide-react";

const sectionLabels: Record<string, string> = {
  quant: "Quantitative Aptitude",
  lrdi: "LRDI",
  verbal: "VARC",
  full: "Full Length",
};

export default function MockTests() {
  return (
    <div className="container py-10">
      <h1 className="font-heading text-3xl font-bold mb-2">Mock Tests</h1>
      <p className="text-muted-foreground mb-8">Sectional and full-length mocks to test your preparation</p>

      <div className="grid md:grid-cols-2 gap-4">
        {mockTests.map((m) => (
          <div key={m.id} className="rounded-xl border bg-card p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-lg">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{sectionLabels[m.section]}</p>
              </div>
              <Badge variant="outline" className="capitalize">{m.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {m.questions} Qs</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {m.time} min</span>
            </div>
            <Button className="w-full bg-gradient-gold text-accent-foreground font-semibold hover:opacity-90" disabled={m.section === "full"}>
              {m.section === "full" ? (
                <><Lock className="mr-1 h-4 w-4" /> Coming Soon</>
              ) : (
                "Start Test"
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
