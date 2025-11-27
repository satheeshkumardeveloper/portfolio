import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'iBridge LLC',
    role: 'Senior Soft Developer to Lead Software Engineer - Full Stack',
    duration: '2022 - Present',
    achievements: [
      'Led development of enterprise ERP system handling 2M+ records with 80% performance improvement',
      'Architected distributed system using RabbitMQ and Redis for real-time data processing',
      'Migrated monolithic application to PostgreSQL with zero downtime',
      'Mentored team of 5 developers and established coding standards',
      'Reduced server load by 60% through strategic caching and query optimization'
    ],
    color: 'from-blue-500 to-violet-600'
  },
  {
    company: 'Zeoner Tech',
    role: 'Senior Software Engineer',
    duration: '2020 - 2022',
    achievements: [
      'Built AI-driven IPE platform serving 10K+ active users',
      'Implemented WebSocket-based real-time collaboration features',
      'Reduced bundle size by 68% through code splitting and optimization',
      'Designed and developed RESTful APIs used by multiple client applications',
      'Improved code quality through comprehensive testing practices'
    ],
    color: 'from-violet-500 to-pink-600'
  },
  {
    company: 'MEQUALS Technologies',
    role: 'Software Developer',
    duration: '2018 - 2020',
    achievements: [
      'Developed COVID appointment system handling 5K+ concurrent users',
      'Implemented Redis caching strategy reducing database queries by 70%',
      'Built comprehensive laboratory tracking system with automated workflows',
      'Optimized database queries improving response times by 50%'
    ],
    color: 'from-emerald-500 to-blue-600'
  },
  {
    company: 'Weblogics',
    role: 'Junior Web Design & Developer',
    duration: '2017 - 2018',
    achievements: [
      'Developed multiple client websites and web applications',
      'Implemented responsive designs and cross-browser compatibility',
      'Collaborated with design team to deliver pixel-perfect implementations',
      'Maintained and enhanced existing codebases'
    ],
    color: 'from-orange-500 to-pink-600'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-center">
          Professional Journey
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-center mb-16 text-lg">
          Building impactful solutions across diverse industries
        </p>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-700/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex items-start gap-4 mb-4 md:mb-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                      {exp.company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{exp.duration}</span>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color} mt-2 flex-shrink-0`} />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
