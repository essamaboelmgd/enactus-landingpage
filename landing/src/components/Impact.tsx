import { useEffect, useState } from 'react';
import { Users, Briefcase, Globe, Clock } from 'lucide-react';

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('impact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      value: 150,
      label: 'Students Involved',
      suffix: '+',
    },
    {
      icon: Briefcase,
      value: 25,
      label: 'Projects Completed',
      suffix: '+',
    },
    {
      icon: Globe,
      value: 2000,
      label: 'Communities Impacted',
      suffix: '+',
    },
    {
      icon: Clock,
      value: 5000,
      label: 'Hours Volunteered',
      suffix: '+',
    },
  ];

  const Counter = ({ end, duration = 2000, isVisible }: { end: number; duration?: number; isVisible: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return <span>{count}</span>;
  };

  return (
    <section id="impact" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Our Impact in <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Measurable results that showcase our commitment to making a difference
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="slide-up text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>

                <div className="text-5xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  <Counter end={stat.value} isVisible={isVisible} />
                  {stat.suffix}
                </div>

                <div className="h-0.5 w-16 bg-primary mx-auto mb-4" />

                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
