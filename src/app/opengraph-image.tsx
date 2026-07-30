import { ImageResponse } from "next/og"

export const alt = "NeuralSyntax – Master AI and Coding Before AnyOne Else"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #131420 0%, #1A233A 100%)",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "Space Grotesk, sans-serif",
            background: "linear-gradient(90deg, #17DED1, #3D8EFF, #8A3DFF)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Master AI and Coding
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "Space Grotesk, sans-serif",
            background: "linear-gradient(90deg, #17DED1, #3D8EFF, #8A3DFF)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Before AnyOne Else
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 28,
            color: "#B8C2D1",
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Reading-style AI & coding tutorials for all levels
        </div>
      </div>
    ),
    size
  )
}
