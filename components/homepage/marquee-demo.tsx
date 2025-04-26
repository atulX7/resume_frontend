"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Akash",
    username: "@akash",
    body: "The ATS score analysis helped me optimize my resume perfectly. Got callbacks from top companies!",
    img: "https://avatar.vercel.sh/akash",
  },
  {
    name: "Manish",
    username: "@manish",
    body: "Mock interviews were incredibly realistic. The AI feedback helped me improve significantly.",
    img: "https://avatar.vercel.sh/manish",
  },
  {
    name: "Rohit",
    username: "@rohit",
    body: "The resume enhancement tool transformed my CV completely. Highly recommended!",
    img: "https://avatar.vercel.sh/rohit",
  },
  {
    name: "Anudeep",
    username: "@anudeep",
    body: "Career insights were spot-on! Helped me make better decisions about my career path.",
    img: "https://avatar.vercel.sh/anudeep",
  },
  {
    name: "Yogesh",
    username: "@yogesh",
    body: "Amazing tool! Landed my dream job after using the ATS optimization features.",
    img: "https://avatar.vercel.sh/jessica",
  },
  {
    name: "Yash",
    username: "@yash",
    body: "The AI interview practice made me so much more confident. Great platform!",
    img: "https://avatar.vercel.sh/yash",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="relative h-8 w-8">
          <Image
            className="rounded-full"
            fill
            sizes="32px"
            alt={`${name}'s avatar`}
            src={img}
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm dark:text-gray-300">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Join thousands of professionals who have transformed their careers with our platform
        </p>
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}