import { Server, Monitor, Database, Cloud, Zap, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: 'Backend',
    icon: Server,
    skills: ['Laravel', 'PHP', 'Node.js', 'RESTful APIs', 'Yii'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Frontend',
    icon: Monitor,
    skills: ['React', 'Vue.js', 'TypeScript', 'Bootstrap CSS', 'JavaScript'],
    color: 'from-violet-500 to-violet-600'
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Query Optimization'],
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    title: 'DevOps',
    icon: Cloud,
    skills: ['Linux', 'CI/CD','Cron job automation','Environment configuration'],
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Distributed Systems',
    icon: Cpu,
    skills: ['RabbitMQ', 'Redis Caching', 'WebSockets', 'Microservices', 'Event-Driven'],
    color: 'from-pink-500 to-pink-600'
  },
  {
    title: 'Performance',
    icon: Zap,
    skills: ['Code Optimization', 'Database Indexing', 'Caching Strategies', 'Load Balancing', 'Profiling'],
    color: 'from-amber-500 to-amber-600'
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-center">
          Technical Expertise
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-center mb-16 text-lg">
          Technologies and tools I use to build exceptional products
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-700/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-100 dark:border-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
