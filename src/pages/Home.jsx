import React, { useState } from 'react';
import { Code2, Database, Server, Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X } from 'lucide-react';
import { projects, skills, personalInfo } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ContactForm from '../components/ContactForm';

const Home = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0f2e] to-[#0a0a0a] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5 text-purple-300" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105">
                About
              </button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105">
                Skills
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105">
                Contact
              </button>
            </div>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-6 border-t border-white/10 mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-2"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-2"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-2"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139,92,246,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-12 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02]">
            <div className="mb-6">
              <div className="inline-block backdrop-blur-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full px-6 py-2 mb-6 border border-purple-500/30 animate-pulse">
                <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">{personalInfo.title}</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-gradient">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {personalInfo.tagline}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-6 text-lg rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
              >
                View Projects
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-purple-500/50 text-white hover:bg-purple-500/10 hover:border-purple-400 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                Contact Me
              </Button>
            </div>
          </div>
          <button 
            onClick={() => scrollToSection('about')}
            className="mt-12 animate-bounce hover:text-purple-400 transition-colors"
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] group">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {personalInfo.about}
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center space-x-3 backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg px-4 py-3 border border-purple-500/20 hover:border-purple-400/40 transition-all group-hover:scale-105">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Code2 className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-gray-200 font-medium">Java Development</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg px-4 py-3 border border-blue-500/20 hover:border-blue-400/40 transition-all group-hover:scale-105">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Database className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="text-gray-200 font-medium">Database Design</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-md bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 rounded-lg px-4 py-3 border border-indigo-500/20 hover:border-indigo-400/40 transition-all group-hover:scale-105">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Server className="w-5 h-5 text-indigo-300" />
                  </div>
                  <span className="text-gray-200 font-medium">Backend Systems</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <Card 
                key={index}
                className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline"
                        className="backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 text-gray-200 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all hover:scale-110"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card 
                key={project.id}
                className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.05] cursor-pointer group overflow-hidden relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                      <ExternalLink 
                        className={`w-5 h-5 text-purple-300 transition-all duration-300 ${
                          hoveredProject === project.id ? 'translate-x-1 -translate-y-1' : ''
                        }`}
                      />
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className="w-fit backdrop-blur-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/40 text-purple-200"
                  >
                    {project.category}
                  </Badge>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge 
                        key={idx}
                        className="backdrop-blur-md bg-white/10 border border-white/20 text-gray-300 group-hover:bg-purple-500/20 group-hover:border-purple-400/40 transition-all"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Get In Touch</h2>
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
            <CardContent className="p-12">
              <p className="text-lg text-gray-300 text-center mb-12">
                I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out!
              </p>
              <ContactForm />
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 text-center mb-6">Or connect with me on social media:</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <a 
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-xl px-6 py-4 border border-white/10 transition-all duration-300 w-full md:w-auto justify-center hover:scale-105"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-xl px-6 py-4 border border-white/10 transition-all duration-300 w-full md:w-auto justify-center hover:scale-105"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center space-x-2 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-xl px-6 py-4 border border-white/10 transition-all duration-300 w-full md:w-auto justify-center hover:scale-105"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 backdrop-blur-md bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 {personalInfo.name}. Built with React & passion for backend development.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;