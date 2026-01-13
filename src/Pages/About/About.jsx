import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-heading-1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About PlateShare
          </motion.h1>
          <motion.p 
            className="text-body max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connecting communities through food sharing, reducing waste, and building stronger neighborhoods one meal at a time.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="space-section">
        <div className="container mx-auto space-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-heading-2 mb-6">Our Mission</h2>
              <p className="text-body mb-4">
                PlateShare was born from a simple idea: there's enough food in the world, but it's not always in the right place at the right time. We believe that by connecting people who have extra food with those who need it, we can create stronger, more sustainable communities.
              </p>
              <p className="text-body">
                Our platform makes it easy for individuals, restaurants, and organizations to share surplus food, reducing waste while helping neighbors access fresh, quality meals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-base-200 rounded-lg p-8"
            >
              <h3 className="text-heading-3 mb-4">Impact by Numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-caption">Meals Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">5K+</div>
                  <div className="text-caption">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">50+</div>
                  <div className="text-caption">Communities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2 Tons</div>
                  <div className="text-caption">Waste Prevented</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="space-section bg-base-200">
        <div className="container mx-auto space-container">
          <motion.h2 
            className="text-heading-2 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Community First",
                description: "We believe in the power of neighbors helping neighbors and building stronger local communities.",
                icon: "🤝"
              },
              {
                title: "Sustainability",
                description: "Every shared meal is a step toward reducing food waste and creating a more sustainable future.",
                icon: "🌱"
              },
              {
                title: "Accessibility",
                description: "Good food should be accessible to everyone, regardless of their circumstances.",
                icon: "🍽️"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="card-base p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-heading-3 mb-3">{value.title}</h3>
                <p className="text-body">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-section">
        <div className="container mx-auto space-container">
          <motion.h2 
            className="text-heading-2 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                bio: "Passionate about community building and sustainable living.",
                image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=ebc15e&color=fff&size=200"
              },
              {
                name: "Mike Chen",
                role: "Head of Technology",
                bio: "Full-stack developer with a love for creating impactful solutions.",
                image: "https://ui-avatars.com/api/?name=Mike+Chen&background=8d5751&color=fff&size=200"
              },
              {
                name: "Emma Rodriguez",
                role: "Community Manager",
                bio: "Dedicated to fostering connections and building trust in our community.",
                image: "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=22c55e&color=fff&size=200"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="card-base p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-heading-3 mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-body">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-section bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="container mx-auto space-container text-center">
          <motion.h2 
            className="text-heading-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            Join Our Community
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Ready to make a difference in your community? Start sharing meals and reducing waste today.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <a href="/register" className="btn btn-accent btn-lg">
              Get Started
            </a>
            <a href="/availableFoods" className="btn btn-outline btn-accent btn-lg">
              Browse Food
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;