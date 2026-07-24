import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prajval's Resume",
  description: "Prajval Mahadev Injar - Resume",
};

export default function ResumePage() {
  return (
    <div className="w-full h-screen bg-[#030509]">
      <iframe
        src="/resume.pdf"
        title="Prajval's Resume"
        className="w-full h-full border-none"
      />
    </div>
  );
}
