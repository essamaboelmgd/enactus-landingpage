import { Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const leadership = [
    {
      name: 'Osama Salama',
      role: 'President',
      image: '/final osama.jpg',
    },
    {
      name: 'Mohamed Emad',
      role: 'Vice President',
      image: '/final znky.jpg',
    },
  ];

  const heads = [
    {
      name: 'Assem Ahmed',
      role: 'Head of GFX',
      image: '/final asem.jpg',
    },
    {
      name: 'Habiba Ali',
      role: 'Head of PR & FR',
      image: '/final HABIBA.jpg',
    },
    {
      name: 'Mohanad Reda',
      role: 'Head of MK',
      image: '/final mohanad.jpg',
    },
    {
      name: 'Hady Yaser',
      role: 'Head of HR',
      image: '/final HADY.jpg',
    },
    {
      name: 'Sama Aymen',
      role: 'Head of PM',
      image: '/final SAMA.jpg',
    },
    {
      name: 'Mohamed El-Saudi',
      role: 'Head of PT',
      image: '/final saudi.jpg',
    },
    // {
    //   name: 'Ava Wilson',
    //   role: 'Head of Logistics',
    //   image: '/final HABIBA.jpg',
    // },
    // {
    //   name: 'Noah Garcia',
    //   role: 'Head of Media',
    //   image: '/final osama.jpg',
    // },
  ];

  const TeamCard = ({
    member,
    isLeadership = false,
    index,
  }: {
    member: { name: string; role: string; image: string };
    isLeadership?: boolean;
    index: number;
  }) => (
    <div
      className={`slide-up hover-lift group ${isLeadership ? 'md:col-span-1' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] h-full">
        {/* Image */}
        <div className={`relative overflow-hidden ${isLeadership ? 'h-75' : 'h-75'}`}>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Social Links - Appear on Hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-10 h-10 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
              <Linkedin className="w-5 h-5 text-primary-foreground" />
            </button>
            <button className="w-10 h-10 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3
            className={`font-heading font-semibold mb-1 group-hover:text-primary transition-colors duration-300 ${
              isLeadership ? 'text-2xl' : 'text-xl'
            }`}
          >
            {member.name}
          </h3>
          <p className="text-muted-foreground">{member.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="team" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate leaders driving innovation and impact
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-semibold text-center mb-8">Leadership</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {leadership.map((member, index) => (
              <div key={member.name} className="w-full">
                <TeamCard member={member} isLeadership index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Department Heads */}
        <div>
          <h3 className="text-2xl font-heading font-semibold text-center mb-8">Committee Heads</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {heads.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
