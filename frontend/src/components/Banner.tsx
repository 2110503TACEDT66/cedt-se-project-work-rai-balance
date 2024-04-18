"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Banner() {
  const { data: session } = useSession();
  console.log(session?.user);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const images = ["/img/cover1.png", "/img/cover2.png", "/img/cover3.png"];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="block relative">
      <Image
        src={randomImage}
        alt="about"
        width={6000}
        height={6000}
        layout="responsive"
        objectFit="cover"
        className="w-full h-auto"
      />
    </div>
  );
}
