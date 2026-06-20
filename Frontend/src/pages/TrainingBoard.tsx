import { useEffect, useState } from "react"
import Board from "../components/Board"

type PieceColor = "black" | "white"
type BoardMatrix = (0 | "black" | "white")[][]

export default function TrainingBoard() {
  const [boardId, setBoardId] = useState<string | null>(null)
  const [board, setBoard] = useState<BoardMatrix>([])
  const [selectedPiece, setSelectedPiece] = useState<PieceColor | null>(null)

  useEffect(() => {
    async function createBoard() {
      const token = localStorage.getItem("token")

      const response = await fetch("/api/training-board/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      setBoardId(data.id)
      setBoard(JSON.parse(data.board))
    }

    createBoard()
  }, [])

  return (
    <div>
      <h1>Training Board</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div
          className="piece black"
          onClick={() => setSelectedPiece("black")}
        />
        <div
          className="piece white"
          onClick={() => setSelectedPiece("white")}
        />
      </div>

      <Board
        board={board}
        setBoard={setBoard}
        boardId={boardId}
        selectedPiece={selectedPiece}
      />
    </div>
  )
}
