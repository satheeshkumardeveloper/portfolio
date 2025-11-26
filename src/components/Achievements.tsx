import { Award, TrendingUp, Users, Zap, Package, Database } from 'lucide-react';

const achievements = [
  {
    icon: TrendingUp,
    title: 'API Performance',
    value: '80%',
    description: 'Faster response times',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Zap,
    title: 'Server Load',
    value: '-60%',
    description: 'Reduction achieved',
    color: 'from-violet-500 to-violet-600'
  },
  {
    icon: Package,
    title: 'Bundle Size',
    value: '-68%',
    description: 'Optimization impact',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Database,
    title: 'Data Migration',
    value: '2M+',
    description: 'Records migrated',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Users,
    title: 'Team Mentoring',
    value: '15+',
    description: 'Developers mentored',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Award,
    title: 'System Uptime',
    value: '99.9%',
    description: 'Reliability maintained',
    color: 'from-amber-500 to-amber-600'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
          Key Achievements
        </h2>
        <p className="text-slate-600 text-center mb-16 text-lg">
          Measurable results that drive business success
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <achievement.icon className="w-7 h-7 text-white" />
              </div>

              <div className="text-4xl font-bold text-slate-900 mb-2">
                {achievement.value}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {achievement.title}
              </h3>

              <p className="text-slate-600">
                {achievement.description}
              </p>

              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
