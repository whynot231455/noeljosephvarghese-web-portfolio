"use client";


import { SegmentedCharacter } from "./SegmentedCharacter";
import { cn } from "@/lib/utils";

interface SegmentedTextProps {
  text: string;
  size?: number; // Base size of the grid cells
  className?: string;
  lineGap?: number; // gap between lines in px
  charGap?: number; // gap between chars in px
}

export const SegmentedText = ({
  text,
  size = 12,
  className,
  lineGap = 16,
  charGap = 8,
}: SegmentedTextProps) => {
  // Split by spaces or explicit newlines if any
  const lines = text.split(" ");

  return (
    <div className={cn("flex flex-col", className)} style={{ gap: lineGap }}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="flex flex-wrap" style={{ gap: charGap }}>
          {line.split("").map((char, charIdx) => {
            // Global index for staggered animation across all lines
            const globalIndex = lines.slice(0, lineIdx).join("").length + charIdx;
            return (
              <SegmentedCharacter
                key={charIdx}
                char={char}
                size={size}
                staggerIndex={globalIndex}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
