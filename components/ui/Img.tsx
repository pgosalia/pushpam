import Image, { type ImageProps } from "next/image";

/** Tiny solid-colour placeholder shown while an image loads (blur-up). */
const TONE_COLOURS: Record<string, string> = {
  maroon: "#541020",
  ink: "#26221f",
  gold: "#5e4115",
  green: "#123628",
  slate: "#2b3441",
  rose: "#8a4650",
  ivory: "#efe5d0",
};

export function blurFor(tone = "maroon") {
  const c = TONE_COLOURS[tone] ?? TONE_COLOURS.maroon;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='10'><rect width='8' height='10' fill='${c}'/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

type Props = Omit<ImageProps, "placeholder" | "blurDataURL"> & { tone?: string };

/**
 * next/image with a blur placeholder. Pass `sizes` for responsive hints:
 * they take effect once you swap the placeholders for real photographs and
 * host with image optimisation (see README).
 */
export function Img({ tone, alt, ...props }: Props) {
  return <Image alt={alt} placeholder="blur" blurDataURL={blurFor(tone)} {...props} />;
}
