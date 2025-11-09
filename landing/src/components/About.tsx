import { Lightbulb, TrendingUp, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: TrendingUp,
      title: 'Entrepreneurship',
      description: 'Building sustainable business solutions that create economic opportunity.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Developing creative approaches to solve complex social challenges.',
    },
    {
      icon: Heart,
      title: 'Impact',
      description: 'Making a measurable difference in communities around us.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Who We <span className="text-gradient">Are</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Enactus is a global community of student, academic, and business leaders committed to using the power of
            entrepreneurial action to transform lives and shape a better, more sustainable world. We enable progress
            through entrepreneurial action, empowering students to make a difference.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="slide-up hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl p-8 h-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
