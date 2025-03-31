import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: boolean;
    twitter?: boolean;
    instagram?: boolean;
    facebook?: boolean;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Michael Anderson",
    role: "Founder & CEO",
    bio: "With over 15 years in the automotive industry, Michael founded PremiumShine to bring his passion for perfection to every customer.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=1000&q=80",
    socialLinks: {
      linkedin: true,
      twitter: true
    }
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Master Detailer",
    bio: "Sarah's expert eye and steady hand are responsible for our most challenging paint correction and ceramic coating projects.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=1000&q=80",
    socialLinks: {
      linkedin: true,
      instagram: true
    }
  },
  {
    id: 3,
    name: "David Chen",
    role: "Operations Manager",
    bio: "David ensures that every aspect of our operation runs smoothly, from scheduling to quality control and customer satisfaction.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=1000&q=80",
    socialLinks: {
      linkedin: true,
      facebook: true
    }
  }
];

export default function OurTeam() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The skilled professionals behind PremiumShine's exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-72 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.role}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  {member.socialLinks.linkedin && (
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      <Twitter size={18} />
                    </a>
                  )}
                  {member.socialLinks.instagram && (
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      <Instagram size={18} />
                    </a>
                  )}
                  {member.socialLinks.facebook && (
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      <Facebook size={18} />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
