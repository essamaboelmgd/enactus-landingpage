import { Instagram, Linkedin, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/enactuskafrelsheikh?igsh=cmVxYno2Zjd4MWwy', label: 'Instagram' },
    { icon: Linkedin, href: 'https://eg.linkedin.com/company/enactus-kafr-el-sheikh-university', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/EnactusKSU?mibextid=ZbWKwL', label: 'Facebook' },
    // { icon: Mail, href: 'mailto:info@enactus.org', label: 'Email' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-card/50 border-t-2 border-primary/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-24 h-auto rounded-xl flex items-center justify-center font-heading font-bold text-xl">
                <img src="/logo.png" alt="Enactus Logo" className="w-full h-full object-contain" />
              </div>
              {/* <span className="font-heading font-bold text-2xl">ENACTUS</span> */}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering students to create sustainable impact through entrepreneurial action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover-lift group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            © {currentYear} Enactus KSU. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;