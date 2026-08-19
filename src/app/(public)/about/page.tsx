import { Card, CardContent } from "@/components/ui/Card";

const techStack = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "Dart", "Kotlin"] },
  { category: "Frameworks", items: ["Next.js", "Flutter", "React", "Node.js"] },
  { category: "Interests", items: ["AI/ML", "Automation", "Game Modding", "Web Security", "Reverse Engineering"] },
];

export default function AboutPage() {
  return (
    <div className="relative z-10 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
          About
        </h1>

        <Card variant="glass" className="mb-8 border border-neutral-800 bg-neutral-900/60 backdrop-blur-2xl shadow-xl">
          <CardContent className="p-8">
            <p className="text-lg text-neutral-300 leading-relaxed mb-6 font-light">
              Developer who builds things that scratch an itch. Started with automating boring stuff,
              ended up writing AI companions and game translation tools. Mostly Python and JavaScript,
              but reaching for whatever fits the problem.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed font-light">
              This site is where I experiment with web stuff — currently running on Next.js 15 with
              a static export to Cloudflare Pages. The Lab section has a bunch of client-side tools
              I built because I needed them (or just thought they'd be fun).
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {techStack.map((group) => (
            <Card key={group.category} variant="glass" className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="text-sm font-mono text-neutral-600 uppercase tracking-widest mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-3 py-1 text-sm text-neutral-300 bg-neutral-800/60 rounded-full border border-neutral-700/50">
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="glass" className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <h3 className="text-sm font-mono text-neutral-600 uppercase tracking-widest mb-3">
              What I do
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-400 font-light">
              <div className="flex items-start gap-3">
                <span className="text-neutral-600 mt-1">01.</span>
                <p>Build AI-powered tools — from chatbots to vulnerability scanners, exploring how LLMs can automate real workflows.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-neutral-600 mt-1">02.</span>
                <p>Create automation bots and scripts that save time on repetitive tasks, from WhatsApp bots to game translators.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-neutral-600 mt-1">03.</span>
                <p>Tinker with game modding and reverse engineering — because understanding how things work under the hood is half the fun.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-neutral-600 mt-1">04.</span>
                <p>Build web experiments and developer tools in the Lab, pushing what&apos;s possible with client-side JavaScript.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
