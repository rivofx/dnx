'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Youtube, Stamp as Steam, Music, Github } from 'lucide-react';

export default function Home() {
  const [revealed, setRevealed] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);


  useEffect(() => {
    document.body.style.cursor = `url(https://custom-cursors.netlify.app/cursors/middle-finger.cur), auto`;
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    const audio = audioRef.current;

    if (!card || !glare || !audio) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Increased rotation effect
      const rotateX = ((y - centerY) / 10) * -1; // Inverted for natural feel
      const rotateY = (x - centerX) / 10;

      // Update card transform
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;

      // Update glare effect
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `
        radial-gradient(
          circle at ${glareX}% ${glareY}%,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0) 50%
        )
      `;
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease';
      glare.style.opacity = '1';
      audio.muted = false;
      audio.play().catch(error => {
        console.error("Autoplay prevented:", error);
      });
    };

    const handleMouseLeave = () => {
      card.style.transition = 'transform 0.5s ease, filter 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [revealed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Audio autoplayed!");
        }).catch(error => {
          console.warn("Autoplay blocked:", error);
        });
      }
    }
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden font-sans">
      {/* Background Video */}
      <video
        loop
        muted
        autoPlay
        playsInline
        className="fixed h-full w-full object-cover"
        style={{ 
          opacity: '100%',
          filter: 'blur(8px)',
          transform: 'scale(1.05)'
        }}
      >
        <source src="https://cdn.revoltusercontent.com/attachments/lkEiZBiOiw35GgpSlsxwAUbcck7-CDAHm2Fj052Pf4/2025-05-05%2009-12-48(1).mp4" type="video/mp4" />
      </video>

      {/* Background Music */}
      <audio loop autoPlay muted ref={audioRef} className="hidden">
        <source src="https://cdn.revoltusercontent.com/attachments/lkEiZBiOiw35GgpSlsxwAUbcck7-CDAHm2Fj052Pf4/2025-05-05%2009-12-48(1).mp4" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Overlay Button */}
      {showOverlay && (
        <button
          className="fixed z-50 flex h-full w-full select-none items-center justify-center bg-black/50 backdrop-blur-lg"
          onClick={() => setShowOverlay(false)}
          type="button"
        >
          <div className="text-white page-enter-animation whitespace-pre-wrap break-all px-4 text-lg">
            Tap in
          </div>
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="relative">
          <Card 
            ref={cardRef}
            className="w-full max-w-[500px] bg-black/30 backdrop-blur-md border-white/10 transition-all will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              ref={glareRef}
              className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none rounded-lg"
            />
            <div className="p-8 space-y-8">
              {/* Profile Section */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <img
                    src="https://cdn.revoltusercontent.com/attachments/Ko9pLPSK-LblW8bpETV4eZv3_i37WmwJFoZaKuQYW3/ca2954dfdd0953a4e741b0ff056183fd.png"
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-2 border-white/20"
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-white mb-2">edits_by_dnx</h1>
                  <div className="flex gap-2 justify-center">
                    <Badge variant="secondary">CAR EDITOR</Badge>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="text-gray-300 text-center">
                <hr className="border-white/10 mb-4" />
                With <span style={{textShadow: '0 0 10px white'}}>great</span> power comes <span style={{textShadow: '0 0 10px white'}}>great</span> responsibility. <span style={{textShadow: '0 0 10px white'}}></span>
                <hr className="border-white/10 mt-4" />
              </div>
							

              {/* Social Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="ghost" size="icon" className="hover:bg-white/10" asChild>
                 <a href="https://www.tiktok.com/@dnx.editz">
                  <img src="https://img.icons8.com/?size=100&id=118638&format=png&color=000000" alt="Music" className="h-5 w-5 text-green-500" />
                 </a>
                </Button>
								<Button variant="ghost" size="icon" className="hover:bg-white/10" asChild>
                 <a href="https://www.patreon.com/c/Danciu">
                  <img src="https://img.icons8.com/?size=100&id=I49RSKuKXYoP&format=png&color=000000" alt="Music" className="h-5 w-5 text-green-500" />
                 </a>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/10" asChild>
                 <a href="https://www.instagram.com/danciu246/">
                  <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="Music" className="h-5 w-5 text-green-500" />
                 </a>
                </Button>
              </div>
            </div>
						
            {/* Stats */}
            <div className="absolute right-4 top-4 flex items-center gap-2">
              <Badge variant="outline" className="bg-white/5">
                <span className="text-gray-400"></span>
                <span className="text-white ml-1"></span>
              </Badge>
              <Badge variant="outline" className="bg-white/5">
                <span className="text-gray-400"></span>
                <span className="text-white ml-1"></span>
              </Badge>
            </div>
          </Card>
        </div>
      </div>
      </div>
		
    </main>
  );
}
