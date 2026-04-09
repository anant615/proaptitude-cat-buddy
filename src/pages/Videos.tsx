import { useState } from "react";
import { videoLibrary } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

const cats = [
  { value: "all", label: "All" },
  { value: "quant", label: "Quant" },
  { value: "lrdi", label: "LRDI" },
  { value: "verbal", label: "Verbal" },
];

export default function Videos() {
  const [category, setCategory] = useState("all");
  const filtered = category === "all" ? videoLibrary : videoLibrary.filter((v) => v.category === category);

  return (
    <div className="container py-10">
      <h1 className="font-heading text-3xl font-bold mb-2">Video Library</h1>
      <p className="text-muted-foreground mb-8">YouTube lessons categorized by topic</p>

      <div className="flex gap-2 mb-8">
        {cats.map((c) => (
          <Button key={c.value} variant={category === c.value ? "default" : "outline"} size="sm" onClick={() => setCategory(c.value)}>
            {c.label}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border bg-card overflow-hidden card-hover"
          >
            <div className="aspect-video bg-muted relative flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-6 w-6 text-accent-foreground ml-1" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2 line-clamp-2">{v.title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">{v.category}</Badge>
                <span className="text-xs text-muted-foreground">{v.duration}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
