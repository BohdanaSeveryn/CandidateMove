import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function TrainingBoard({ onLogout }: { onLogout: () => void }) {
  const { t } = useTranslation()

  const [board, setBoard] = useState<number[][] | null>(null)
  const [boardId, setBoardId] = useState<string | null>(null)

  useEffect(() => {
    async function createBoard() {
      const token = localStorage.getItem("token")

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/training-board/create`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      )

      if (!response.ok) {
        console.error("Failed to create board")
        return
      }

      const data = await response.json()
      const parsedBoard = JSON.parse(data.board)

      setBoard(parsedBoard)
      setBoardId(data.id)
    }

    createBoard()
  }, [])

  if (!board) {
    return <div>{t("loadingBoard")}</div>
  }

  return (
    <div>
      <button onClick={onLogout}>{t("logout")}</button>

      <h2>{t("trainingBoard")}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${board.length}, 40px)`
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isDark = (rowIndex + colIndex) % 2 === 1

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark ? "#b58863" : "#f0d9b5",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                {cell !== 0 ? cell : ""}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
