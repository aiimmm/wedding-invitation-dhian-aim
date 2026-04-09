import Image from "next/image";

export const ParallaxBackground = () => {
  return (
    <>
      <Image
        src="/images/cover_v1.webp"
        alt="cover"
        fill
        className="object-cover object-bottom sm:object-[center_80%] grayscale max-sm:scale-115"
        priority
      />

      <div className="absolute inset-0 bg-black/80" />
    </>
  );
};
