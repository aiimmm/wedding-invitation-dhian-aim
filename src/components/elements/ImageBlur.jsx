"use client";

import clsx from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";

/**
 * ImageBlur
 * - Hindari <style jsx> untuk mencegah hydration mismatch di App Router.
 * - Bisa full screen (h-screen) atau aspect-ratio wrapper (padding-top).
 * - Bisa atur fit & position agar crop sesuai kebutuhan.
 */
export const ImageBlur = ({
  src,
  alt,
  title,

  // aspect ratio input (opsional)
  width,
  height,
  aspect, // { width: number, height: number }

  // behavior / styling
  className,
  imgClassName,
  preview = true,
  noStyle = false,
  style,
  rounded,
  priority = false,

  // layout modes
  fullScreen = false, // true => wrapper tinggi 100vh
  fit = "cover", // "cover" | "contain"
  objectPosition = "center 80%", // contoh: "center", "center bottom", "center 70%", dll

  // misc
  unoptimized = true,

  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // Dipakai hanya kalau fullScreen=false
  const aspectRatio = useMemo(() => {
    if (aspect?.width && aspect?.height) return aspect.height / aspect.width;
    if (width && height) return height / width;
    return 9 / 16; // fallback
  }, [aspect?.width, aspect?.height, width, height]);

  const wrapperStyle = useMemo(() => {
    if (fullScreen) {
      return {
        cursor: preview ? "zoom-in" : "default",
      };
    }

    return {
      paddingTop: `${aspectRatio * 100}%`,
      cursor: preview ? "zoom-in" : "default",
    };
  }, [fullScreen, preview, aspectRatio]);

  // Blur background style (mengikuti fit & objectPosition)
  const blurStyle = useMemo(
    () => ({
      position: "absolute",
      inset: 0,
      zIndex: 0,

      filter: "blur(24px)",
      transform: "scale(1.08)",

      backgroundImage: `url(${src})`,
      backgroundPosition: objectPosition,
      backgroundSize: fit,
      backgroundRepeat: "no-repeat",

      transition: "opacity 800ms ease-out",
      opacity: isLoaded ? 0 : 1,
    }),
    [src, isLoaded, objectPosition, fit],
  );

  return (
    <figure
      className={clsx(className, {
        "overflow-hidden": !noStyle,
        "animate-pulse": isLoading,
      })}
      style={style}
      {...rest}
    >
      <div
        className={clsx("relative w-full", fullScreen && "h-screen")}
        style={wrapperStyle}
      >
        {/* Blur background layer */}
        <div aria-hidden="true" style={blurStyle} />

        {/* Real Image */}
        <div className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            title={title || alt}
            fill
            priority={priority}
            unoptimized={unoptimized}
            className={clsx(
              "transition-all duration-700 ease-in-out",
              // penting: fit & position harus di <img> bukan di figure
              fit === "cover" ? "object-cover" : "object-contain",
              isLoading ? "scale-[1.03] blur-xl" : "scale-100 blur-0",
              // optional padding (kalau kamu memang mau)
              // "p-1.5",
              rounded,
              imgClassName,
            )}
            // Next/Image juga bisa diatur via style untuk objectPosition custom
            style={{ objectPosition }}
            onLoad={() => {
              setIsLoaded(true);
              setLoading(false);
            }}
          />
        </div>
      </div>
    </figure>
  );
};
