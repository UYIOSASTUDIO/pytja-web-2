"use client";
import React from 'react';

export default function Logo3DP() {
    const pathString = "M 0 0 H 20 V 15 H 5 V 25 H 0 Z M 5 5 V 10 H 15 V 5 Z";
    const Face = ({ z }: { z: number }) => (<> <div className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm" style={{ transform: `translateZ(${z}px)`, clipPath: `path('${pathString}')` }} /> <svg className="absolute inset-0 pointer-events-none" width="20" height="25" style={{ transform: `translateZ(${z}px)` }}> <path d={pathString} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fillRule="evenodd" /> </svg> </>);
    const EdgeH = ({ x, y, w }: { x: number, y: number, w: number }) => (<div className="absolute bg-white/5 backdrop-blur-sm border border-white/40" style={{ left: x, top: y, width: w, height: 5, transform: 'translateY(-2.5px) rotateX(90deg)' }} />);
    const EdgeV = ({ x, y, h }: { x: number, y: number, h: number }) => (<div className="absolute bg-white/5 backdrop-blur-sm border border-white/40" style={{ left: x, top: y, width: 5, height: h, transform: 'translateX(-2.5px) rotateY(90deg)' }} />);

    return (
        <div className="relative w-8 h-8 preserve-3d flex items-center justify-center mr-1">
            <style jsx global>{`@keyframes logo-float { 0%, 100% { transform: translateY(0px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); } 50% { transform: translateY(-4px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); } } .animate-logo-float { animation: logo-float 4s ease-in-out infinite; }`}</style>
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            <div className="relative preserve-3d animate-logo-float" style={{ width: 20, height: 25 }}> <Face z={2.5} /> <Face z={-2.5} /> <EdgeH x={0} y={0} w={20} /> <EdgeV x={20} y={0} h={15} /> <EdgeH x={5} y={15} w={15} /> <EdgeV x={5} y={15} h={10} /> <EdgeH x={0} y={25} w={5} /> <EdgeV x={0} y={0} h={25} /> <EdgeH x={5} y={5} w={10} /> <EdgeV x={15} y={5} h={5} /> <EdgeH x={5} y={10} w={10} /> <EdgeV x={5} y={5} h={5} /> </div>
        </div>
    );
}