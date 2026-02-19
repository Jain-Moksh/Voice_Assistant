import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-zinc-800/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">Career Guide AI</span>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
            >
              <Link href="/chat">Start Chat</Link>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            Powered by AI
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Your Personal
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career Guidance
            </span>
            <br />
            Voice Assistant
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
            Get personalized career advice, interview preparation, skill
            development guidance, and professional growth strategies — all
            powered by advanced AI.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 bg-gradient-to-r from-violet-600 to-purple-600 px-8 text-lg hover:from-violet-500 hover:to-purple-500"
            >
              <Link href="/chat" className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Start Chatting
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 border-zinc-700 px-8 text-lg hover:bg-zinc-800"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Everything You Need for Career Success
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-zinc-400">
            Our AI assistant is trained to help you navigate your professional
            journey
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/20">
                <svg
                  className="h-6 w-6 text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-100">
                Career Path Planning
              </h3>
              <p className="text-zinc-400">
                Get personalized roadmaps for your career goals based on your
                skills and aspirations.
              </p>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                <svg
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-100">
                Interview Preparation
              </h3>
              <p className="text-zinc-400">
                Practice with AI-powered mock interviews and get feedback to ace
                your next interview.
              </p>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/20">
                <svg
                  className="h-6 w-6 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-100">
                Skill Development
              </h3>
              <p className="text-zinc-400">
                Discover which skills to learn next and get resources to level
                up your expertise.
              </p>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-100">
                Resume Review
              </h3>
              <p className="text-zinc-400">
                Get AI-powered feedback on your resume to make it stand out to
                recruiters.
              </p>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <svg
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-100">
                Salary Insights
              </h3>
              <p className="text-zinc-400">
                Understand market rates and negotiation strategies for your
                target roles.
              </p>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/20">
                <svg
                  className="h-6 w-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-100">
                Networking Tips
              </h3>
              <p className="text-zinc-400">
                Learn how to build meaningful professional connections and grow
                your network.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <Card className="border-zinc-800 bg-gradient-to-br from-violet-900/50 to-purple-900/50 p-12 text-center backdrop-blur-sm">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-zinc-300">
              Start a conversation with our AI assistant and get personalized
              guidance for your professional journey.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 bg-white px-8 text-lg text-zinc-900 hover:bg-zinc-100"
            >
              <Link href="/chat" className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Start Free Conversation
              </Link>
            </Button>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/50 py-8">
          <div className="mx-auto max-w-6xl px-6 text-center text-zinc-500">
            <p>© 2026 Career Guide AI. Built with Next.js and AI.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
