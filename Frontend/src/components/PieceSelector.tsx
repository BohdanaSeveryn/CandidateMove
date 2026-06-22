import { useTranslation } from "react-i18next"

export default function PieceSelector({ onSelect }: { onSelect: (color: "black" | "white") => void }) {
  const { t } = useTranslation()

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div
        className="piece black"
        onClick={() => onSelect("black")}
        style={{ cursor: "pointer" }}
        title={t("blackPiece")}
      />
      <div
        className="piece white"
        onClick={() => onSelect("white")}
        style={{ cursor: "pointer" }}
        title={t("whitePiece")}
      />
    </div>
  )
}
