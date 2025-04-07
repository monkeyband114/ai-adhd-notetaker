
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, BrainCircuit, ScrollText, Bot, Accessibility } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to notes page after a short delay
    const timer = setTimeout(() => {
      navigate('/notes');
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/notes');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-4">
      <div className="max-w-3xl text-center">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-lavender mb-4">
            Focus Flow Notes
          </h1>
          <p className="text-xl text-bluegray mb-8">
            A distraction-minimized note-taking app designed for neurodiverse minds
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-lavender/20">
            <BrainCircuit className="h-10 w-10 text-lavender mb-4 mx-auto" />
            <h2 className="text-xl font-bold mb-2">ADHD-Friendly Design</h2>
            <p className="text-muted-foreground">
              Calm interface with minimal distractions and visual noise to help maintain focus
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-lavender/20">
            <ScrollText className="h-10 w-10 text-lavender mb-4 mx-auto" />
            <h2 className="text-xl font-bold mb-2">Distraction-Free</h2>
            <p className="text-muted-foreground">
              Clean, spacious layout with ample white space and a soothing color palette
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-lavender/20">
            <Bot className="h-10 w-10 text-lavender mb-4 mx-auto" />
            <h2 className="text-xl font-bold mb-2">Speech to Text</h2>
            <p className="text-muted-foreground">
              Capture your thoughts naturally with voice input when typing feels too demanding
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-lavender/20">
            <Accessibility className="h-10 w-10 text-lavender mb-4 mx-auto" />
            <h2 className="text-xl font-bold mb-2">Accessibility First</h2>
            <p className="text-muted-foreground">
              Fully WCAG compliant with dyslexia-friendly fonts and strong color contrast
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Key Features</h3>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-lavender" />
              <span>Speech-to-Text</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-lavender" />
              <span>Tag Organization</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-lavender" />
              <span>Content Summarization</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-lavender" />
              <span>Distraction-Free UI</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleGetStarted} 
          size="lg"
          className="bg-lavender hover:bg-lavender-dark text-white"
        >
          Get Started with Focus Flow
        </Button>
      </div>
    </div>
  );
};

export default Index;
