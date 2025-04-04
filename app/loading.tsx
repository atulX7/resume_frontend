import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white via-teal-50/20 to-teal-100/20 backdrop-blur-sm z-50">
      <div className="relative flex flex-col items-center gap-8 p-10 rounded-3xl bg-white/90 shadow-2xl border border-teal-100">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl opacity-20 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
        
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-20 rounded-full bg-teal-400 blur-sm" />
          <div className="absolute inset-0 animate-pulse opacity-40 rounded-full bg-teal-300" />
          <Loader2 className="h-16 w-16 animate-spin text-teal-600 relative" />
        </div>

        <div className="space-y-3 text-center relative">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce" />
          </div>
          <p className="text-2xl font-semibold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
            Loading
          </p>
          <p className="text-sm text-gray-500 max-w-[200px]">
            Preparing your content, just a moment...
          </p>
        </div>

        <div className="w-52 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}