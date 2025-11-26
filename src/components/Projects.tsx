import { ExternalLink, TrendingUp, Users, Zap, Package } from 'lucide-react';

const projects = [
  {
    title: 'Avera ERP System',
    description: 'Enterprise resource planning system with advanced inventory management, multi-location support, and real-time analytics.',
    metrics: [
      { label: 'Performance Boost', value: '80%', icon: TrendingUp },
      { label: 'Records Handled', value: '2M+', icon: Package }
    ],
    technologies: ['Laravel', 'React', 'PostgreSQL', 'Redis', 'RabbitMQ'],
    gradient: 'from-blue-500 to-violet-600'
  },
  {
    title: 'AI-Driven IPE Platform',
    description: 'Intelligent platform for inter-professional education with AI-powered recommendations and collaborative learning features.',
    metrics: [
      { label: 'Active Users', value: '10K+', icon: Users },
      { label: 'Response Time', value: '<100ms', icon: Zap }
    ],
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'WebSockets', 'Redis'],
    gradient: 'from-violet-500 to-pink-600'
  },
  {
    title: 'COVID Appointment System',
    description: 'High-traffic appointment scheduling system handling thousands of concurrent bookings with real-time availability.',
    metrics: [
      { label: 'Concurrent Users', value: '5K+', icon: Users },
      { label: 'Uptime', value: '99.9%', icon: TrendingUp }
    ],
    technologies: ['Laravel', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    gradient: 'from-emerald-500 to-blue-600'
  },
  {
    title: 'Laboratory Tracker',
    description: 'Comprehensive lab management system with sample tracking, automated reporting, and quality control workflows.',
    metrics: [
      { label: 'Bundle Size', value: '-68%', icon: Package },
      { label: 'Load Time', value: '2s', icon: Zap }
    ],
    technologies: ['Laravel', 'React', 'MongoDB', 'Redis', 'CI/CD'],
    gradient: 'from-orange-500 to-pink-600'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-slate-600 text-center mb-16 text-lg">
          Real-world solutions that deliver measurable impact
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {project.metrics.map((metric, metricIndex) => (
                  <div
                    key={metricIndex}
                    className={`bg-gradient-to-br ${project.gradient} p-4 rounded-xl text-white`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <metric.icon className="w-4 h-4" />
                      <div className="text-xs opacity-90">{metric.label}</div>
                    </div>
                    <div className="text-2xl font-bold">{metric.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-sm font-medium border border-slate-200"
                  >
                    {tech}
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
