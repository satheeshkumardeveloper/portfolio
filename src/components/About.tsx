export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">
          About Me
        </h2>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-slate-100 shadow-sm">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed space-y-4">
            <span className="block">
              Senior Full Stack Engineer with 8+ years of experience building scalable, high-performance web applications.
              I specialize in architecting distributed systems and optimizing application performance at scale.
            </span>

            <span className="block">
              My expertise spans the entire development lifecycle, from system design to deployment, with a proven track record
              of improving API performance by 80% and successfully migrating 2M+ records with zero downtime.
            </span>

            <span className="block">
              As a technical leader, I've mentored development teams, established coding standards, and implemented best practices
              that significantly improved code quality and delivery speed. I thrive in fast-paced environments where I can solve
              complex technical challenges and deliver measurable business impact.
            </span>

            <span className="block">
              Currently focused on building robust distributed systems using Laravel, React, Redis, RabbitMQ, and PostgreSQL,
              with a strong emphasis on performance engineering and scalable architecture.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
