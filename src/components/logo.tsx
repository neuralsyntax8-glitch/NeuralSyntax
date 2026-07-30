import Image from "next/image"

export default function NeuralSyntaxLogo({ size = 60 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo.jpg"
        alt="NeuralSyntax"
        width={size * 3}
        height={size}
        className="object-contain"
        priority
        style={{ maxHeight: size, width: "auto" }}
      />
    </div>
  )
}
