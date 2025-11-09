import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'EcoMarket Initiative',
      description: 'Connecting local farmers with urban consumers through a sustainable marketplace platform.',
      impact: '500+ families supported',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop',
    },
    {
      title: 'SkillBridge Program',
      description: 'Providing vocational training and job placement services for underprivileged youth.',
      impact: '200+ trained individuals',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    },
    {
      title: 'Green Campus Drive',
      description: 'Campus-wide sustainability initiative promoting waste reduction and renewable energy.',
      impact: '30% waste reduction',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
    },
    {
      title: 'Digital Literacy Hub',
      description: 'Teaching essential digital skills to senior citizens and rural communities.',
      impact: '150+ participants',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    },
    {
      title: 'Artisan Empowerment',
      description: 'Supporting local artisans through e-commerce and digital marketing training.',
      impact: '80+ artisans empowered',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop',
    },
    {
      title: 'Community Health Drive',
      description: 'Healthcare awareness and free medical camps in underserved communities.',
      impact: '1000+ beneficiaries',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Our <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the initiatives driving positive change in our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="slide-up hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {project.impact}
                    </span>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
