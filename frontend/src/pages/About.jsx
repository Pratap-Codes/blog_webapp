import React from 'react'
import { FaBookOpen, FaPenNib, FaUsers, FaBolt } from 'react-icons/fa6'

const stats = [
  { label: 'Ideas shared', value: '120+' },
  { label: 'Topics covered', value: '18' },
  { label: 'Weekly readers', value: '8k+' },
]

const values = [
  {
    icon: FaBookOpen,
    title: 'Practical learning',
    description: 'Focused tutorials and guides that help readers solve real problems quickly.',
  },
  {
    icon: FaPenNib,
    title: 'Clear writing',
    description: 'Short, structured articles that are easy to scan and simple to apply.',
  },
  {
    icon: FaUsers,
    title: 'Community first',
    description: 'Built for people who want to learn, share, and grow together.',
  },
  {
    icon: FaBolt,
    title: 'Fresh ideas',
    description: 'A place for new thoughts on web development, tech, and digital growth.',
  },
]

const About = () => {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/70">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-14">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              About this blog
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              A blog built to share useful ideas, not just opinions.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
              This platform is designed for practical articles about web development,
              tools, and digital growth. Every post aims to be clear, actionable,
              and worth the reader's time.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-white/70 p-4 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900/40"
                >
                  <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-stretch bg-linear-to-br from-slate-200 via-stone-100 to-zinc-200 p-8 sm:p-10 lg:p-14 text-gray-800 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.35),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_30%)]" />
            <div className="relative grid w-full gap-4 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <article
                    key={value.title}
                    className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <Icon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
                    <h2 className="mt-4 text-lg font-semibold">{value.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/70 lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What you will find here</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Tutorials, blog workflows, feature breakdowns, and practical notes
            that help you build faster and write better. The goal is to keep the
            content useful, current, and easy to revisit.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold">Stay connected</h2>
          <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
            Browse the latest posts, explore the archive, and come back when new
            articles drop.
          </p>
          <a
            href="/blogs"
            className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-gray-900"
          >
            Explore blogs
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
