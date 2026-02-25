// app/template.tsx
"use client";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        // Wir nutzen eine Keyframe-Animation für Opacity und Blur
        <div className="animate-page-transition">
            {children}

            <style jsx global>{`
        @keyframes page-enter {
            0% { 
                opacity: 0; 
                filter: blur(12px); 
                transform: scale(0.98);
            }
            100% { 
                opacity: 1; 
                filter: blur(0px); 
                transform: scale(1);
            }
        }
        .animate-page-transition {
            animation: page-enter 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            width: 100%;
            height: 100%;
        }
      `}</style>
        </div>
    );
}