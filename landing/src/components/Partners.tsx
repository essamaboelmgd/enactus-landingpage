const Partners = () => {
  const partners = [
    { name: 'Crystal', logo: '/crystal.png' },
    { name: 'In General', logo: '/in-general.png' },
    { name: 'Chickers', logo: '/chickers.png' },
    { name: 'More Marketing', logo: '/moremarkting.png' },
  ];

  return (
    <section id="partner" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Our Partners & <span className="text-gradient">Supporters</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proud to collaborate with organizations that share our vision
          </p>
        </div>

        {/* Logo Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="slide-up hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] flex items-center justify-center h-64">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 slide-up">
          <p className="text-muted-foreground mb-4">Interested in partnering with us?</p>
          <a
            href="#contact"
            className="inline-block text-primary hover:text-primary/80 font-medium transition-colors duration-300"
          >
            Get in Touch →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partners;