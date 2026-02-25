"use client";

import React, { useState } from "react";

export default function ManualShell({ children }: { children: React.ReactNode }) {
    const [activeMethod, setActiveMethod] = useState<"binary" | "source">("binary");

    return (
        <>
            {/* Page Content */}
            {/* Optional: wenn du activeMethod in der Page brauchst, nimm dafür Context/Props (siehe Hinweis unten) */}
            {children}

            {/* Sticky Bottom Bar */}
            <div
                className="fixed bottom-0 inset-x-0 z-[99999] bg-[#050505]/80 backdrop-blur-md border-t border-white/10 pt-4 px-6 md:px-8"
                style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            >
                <div className="max-w-xl mx-auto flex justify-center w-full">
                    <div className="grid grid-cols-2 gap-2 w-full md:w-auto bg-[#0A0A0A] p-1 border border-white/10 rounded-sm shadow-2xl">
                        <button
                            onClick={() => setActiveMethod("binary")}
                            className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 flex justify-center items-center gap-2 rounded-sm whitespace-nowrap ${
                                activeMethod === "binary"
                                    ? "bg-white text-black"
                                    : "text-white/40 hover:text-white"
                            }`}
                        >
                            Core Binary
                        </button>

                        <button
                            onClick={() => setActiveMethod("source")}
                            className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 flex justify-center items-center gap-2 rounded-sm whitespace-nowrap ${
                                activeMethod === "source"
                                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                    : "text-white/40 hover:text-white"
                            }`}
                        >
                            Source Build
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
