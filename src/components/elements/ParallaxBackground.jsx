import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import { ImageBlur } from "./ImageBlur";

export const ParallaxBackground = () => {
  return (
    <div className="fixed inset-0">
      <ImageBlur
        src={WEDDING_DATA.backgroundImage}
        alt="cover"
        fullScreen
        // pilih salah satu:
        // 1) cover = full layar tapi bisa kepotong (umum untuk hero)
        fit="cover"
        objectPosition="center 80%"
        // kalau mau contain (nggak kepotong, tapi mungkin ada ruang kosong):
        // fit="contain"
        // objectPosition="center"

        className="grayscale"
        // kalau mau rounding, contoh:
        // rounded="rounded-2xl"
        priority
      />

      <div className="absolute inset-0 bg-black/80" />
    </div>
  );
};
