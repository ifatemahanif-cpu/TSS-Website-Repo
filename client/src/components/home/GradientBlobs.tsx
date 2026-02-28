interface BlobConfig {
  width: string;
  maxWidth: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  purple?: boolean;
  blur: string;
  animation: string;
  duration: string;
  opacity: number;
}

export function GradientBlobs({ blobs }: { blobs: BlobConfig[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "inherit" }}>
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: blob.width,
            height: blob.width,
            maxWidth: blob.maxWidth,
            maxHeight: blob.maxWidth,
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
            background: blob.purple
              ? `radial-gradient(circle at 40% 45%, rgba(123,30,122,${blob.opacity}), rgba(123,30,122,${blob.opacity * 0.3}) 65%, transparent 100%)`
              : `radial-gradient(circle at 55% 50%, rgba(42,40,112,${blob.opacity}), rgba(42,40,112,${blob.opacity * 0.3}) 65%, transparent 100%)`,
            filter: `blur(${blob.blur})`,
            animation: `${blob.animation} ${blob.duration} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export const problemBlobs: BlobConfig[] = [
  { width: "40vw", maxWidth: "500px", top: "-5%", right: "-8%", purple: true, blur: "50px", animation: "sectionBlob1", duration: "6s", opacity: 0.15 },
  { width: "35vw", maxWidth: "420px", bottom: "5%", left: "-5%", purple: false, blur: "55px", animation: "sectionBlob2", duration: "7s", opacity: 0.18 },
];

export const originBlobs: BlobConfig[] = [
  { width: "35vw", maxWidth: "450px", top: "5%", left: "-8%", purple: false, blur: "50px", animation: "sectionBlob2", duration: "7s", opacity: 0.15 },
  { width: "30vw", maxWidth: "380px", bottom: "-5%", right: "-5%", purple: true, blur: "55px", animation: "sectionBlob3", duration: "6.5s", opacity: 0.14 },
];

export const teamBlobs: BlobConfig[] = [
  { width: "35vw", maxWidth: "420px", top: "10%", left: "-5%", purple: true, blur: "50px", animation: "sectionBlob3", duration: "6s", opacity: 0.12 },
  { width: "30vw", maxWidth: "360px", bottom: "5%", right: "-8%", purple: false, blur: "55px", animation: "sectionBlob1", duration: "7.5s", opacity: 0.16 },
];

export const servicesBlobs: BlobConfig[] = [
  { width: "35vw", maxWidth: "450px", top: "-5%", right: "-5%", purple: false, blur: "50px", animation: "sectionBlob1", duration: "7s", opacity: 0.15 },
  { width: "30vw", maxWidth: "380px", bottom: "10%", left: "-8%", purple: true, blur: "55px", animation: "sectionBlob2", duration: "6s", opacity: 0.14 },
];

export const ctaBlobs: BlobConfig[] = [
  { width: "40vw", maxWidth: "500px", top: "10%", left: "20%", purple: true, blur: "55px", animation: "sectionBlob1", duration: "6s", opacity: 0.2 },
  { width: "30vw", maxWidth: "380px", top: "-10%", right: "-5%", purple: false, blur: "50px", animation: "sectionBlob3", duration: "7s", opacity: 0.18 },
];
