import { useState } from "react";
import { quantTopics, learningPath } from "@/data/quant_videos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Play, ExternalLink, Calculator, Triangle, Hash, Sigma, Shuffle, ChevronRight, GraduationCap, Variable,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-5 w-5" />,
  Variable: <Variable className="h-5 w-5" />,
  Triangle: <Triangle className="h-5 w-5" />,
  Hash: <Hash className="h-5 w-5" />,
  Sigma: <Sigma className="h-5 w-5" />,
  Shuffle: <Shuffle className="h-5 w-5" />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function Videos() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="container py-10 max-w-6xl">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <Badge variant="secondary" className="mb-3 gap-1.5">
          <GraduationCap className="h-3.5 w-3.5" /> Quant Preparation
        </Badge>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          Master Quant with <span className="text-gradient-gold">Concept Videos</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Learn concepts topic-wise with the best explanations
        </p>
      </motion.div>

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border bg-card p-5 md:p-6 mb-14"
      >
        <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-accent" /> Start Your Learning Path
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {learningPath.map((s, i) => (
            <a key={s.step} href={`#${s.topic.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="flex items-center gap-2 group">
              <div className="flex items-center gap-1.5 rounded-full border bg-secondary/60 px-3 py-1.5 text-sm font-medium transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <span className="text-xs text-muted-foreground">{s.step}</span>
                <span>{s.topic}</span>
              </div>
              {i < learningPath.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Topic Sections */}
      {quantTopics.map((topic, ti) => (
        <motion.section
          key={topic.id}
          id={topic.id}
          custom={ti}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
              {iconMap[topic.icon]}
            </div>
            <h2 className="font-heading text-xl font-bold">{topic.topic}</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-5 ml-12">{topic.description}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topic.videos.map((v) => {
              const isPlaying = playing === v.id;
              return (
                <div
                  key={v.id}
                  className="group rounded-xl border bg-card overflow-hidden card-hover flex flex-col"
                >
                  {/* Thumbnail / Player */}
                  <div className="aspect-video relative bg-muted overflow-hidden">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                          alt={v.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <button
                          onClick={() => setPlaying(v.id)}
                          className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center shadow-lg">
                            <Play className="h-6 w-6 text-accent-foreground ml-0.5" />
                          </div>
                        </button>
                        <Badge className="absolute top-2 right-2 bg-foreground/70 text-background text-xs border-0">
                          {v.duration}
                        </Badge>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-medium text-sm leading-snug mb-1.5 line-clamp-2">{v.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{v.creator}</p>
                    <div className="mt-auto flex gap-2">
                      <Button size="sm" className="flex-1 gap-1.5" onClick={() => setPlaying(isPlaying ? null : v.id)}>
                        <Play className="h-3.5 w-3.5" /> {isPlaying ? "Close" : "Watch Now"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
