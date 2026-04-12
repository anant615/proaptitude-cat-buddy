import { useState } from "react";
import { quantTopics, learningPath, type TopicSection } from "@/data/quant_videos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, ExternalLink, Calculator, Triangle, Hash, Sigma, Shuffle,
  ArrowLeft, GraduationCap, Variable, Sparkles, BookOpen,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-6 w-6" />,
  Variable: <Variable className="h-6 w-6" />,
  Triangle: <Triangle className="h-6 w-6" />,
  Hash: <Hash className="h-6 w-6" />,
  Sigma: <Sigma className="h-6 w-6" />,
  Shuffle: <Shuffle className="h-6 w-6" />,
};

const iconMapSm: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-4 w-4" />,
  Variable: <Variable className="h-4 w-4" />,
  Triangle: <Triangle className="h-4 w-4" />,
  Hash: <Hash className="h-4 w-4" />,
  Sigma: <Sigma className="h-4 w-4" />,
  Shuffle: <Shuffle className="h-4 w-4" />,
};

export default function Videos() {
  const [selectedTopic, setSelectedTopic] = useState<TopicSection | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const recommendedTopic = quantTopics.find((t) => t.recommended);

  return (
    <div className="container py-10 max-w-6xl min-h-[80vh]">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <Badge variant="secondary" className="mb-3 gap-1.5">
          <GraduationCap className="h-3.5 w-3.5" /> Quant Preparation
        </Badge>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          Master Quant with <span className="text-gradient-gold">Concept Videos</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Select a topic below to start learning step-by-step
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!selectedTopic ? (
          /* ───── TOPIC SELECTION VIEW ───── */
          <motion.div
            key="topics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Recommended */}
            {recommendedTopic && (
              <div className="mb-8 rounded-xl border border-accent/30 bg-accent/5 p-4 flex items-center gap-3 flex-wrap">
                <Sparkles className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm font-medium">
                  Start with <span className="text-accent font-semibold">{recommendedTopic.topic}</span> — recommended for beginners
                </span>
                <Button size="sm" className="ml-auto gap-1.5" onClick={() => { setSelectedTopic(recommendedTopic); setPlaying(null); }}>
                  <BookOpen className="h-3.5 w-3.5" /> Start Learning
                </Button>
              </div>
            )}

            {/* Learning path */}
            <div className="rounded-xl border bg-card p-5 mb-8">
              <h2 className="font-heading text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                <GraduationCap className="h-4 w-4" /> Recommended Order
              </h2>
              <div className="flex flex-wrap items-center gap-1.5">
                {learningPath.map((s, i) => (
                  <span key={s.step} className="flex items-center gap-1.5">
                    <span className="rounded-full border bg-secondary/60 px-3 py-1 text-xs font-medium">
                      {s.step}. {s.topic}
                    </span>
                    {i < learningPath.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Topic cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {quantTopics.map((topic, i) => (
                <motion.button
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onClick={() => { setSelectedTopic(topic); setPlaying(null); }}
                  className="group relative rounded-xl border bg-card p-6 text-left transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {topic.recommended && (
                    <Badge className="absolute top-3 right-3 bg-accent/15 text-accent border-accent/30 text-[10px]">
                      <Sparkles className="h-3 w-3 mr-0.5" /> Start Here
                    </Badge>
                  )}
                  <div className="h-11 w-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 transition-colors group-hover:bg-accent/20">
                    {iconMap[topic.icon]}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-1">{topic.topic}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{topic.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Play className="h-3 w-3" />
                    <span>{topic.videos.length} videos</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* ───── TOPIC DETAIL VIEW ───── */
          <motion.div
            key={selectedTopic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back + topic header */}
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => { setSelectedTopic(null); setPlaying(null); }} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Back to Topics
              </Button>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                {iconMap[selectedTopic.icon]}
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold">{selectedTopic.topic}</h2>
                <p className="text-muted-foreground text-sm">{selectedTopic.description}</p>
              </div>
            </div>

            {/* Other topics quick-switch */}
            <div className="flex flex-wrap gap-2 mt-4 mb-8">
              {quantTopics.filter((t) => t.id !== selectedTopic.id).map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTopic(t); setPlaying(null); }}
                  className="flex items-center gap-1.5 rounded-full border bg-secondary/40 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/15 hover:text-accent hover:border-accent/30"
                >
                  {iconMapSm[t.icon]} {t.topic}
                </button>
              ))}
            </div>

            {/* Video grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {selectedTopic.videos.map((v, i) => {
                const isPlaying = playing === v.id;
                return (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                    className="group rounded-xl border bg-card overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col"
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
                            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                              <Play className="h-5 w-5 text-accent-foreground ml-0.5" />
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
                      <h3 className="font-medium text-sm leading-snug mb-1 line-clamp-2">{v.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{v.creator}</p>
                      <div className="mt-auto flex gap-2">
                        <Button size="sm" className="flex-1 gap-1.5" onClick={() => setPlaying(isPlaying ? null : v.id)}>
                          <Play className="h-3.5 w-3.5" /> {isPlaying ? "Close" : "Watch"}
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
