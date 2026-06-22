import React from "react"

type PieceColor = "black" | "white"
type BoardMatrix = (0 | PieceColor)[][]

interface BoardProps {
  board: BoardMatrix
  setBoard: React.Dispatch<React.SetStateAction<BoardMatrix>>
  boardId: string | null
  selectedPiece: PieceColor | null
}

export default function Board({
  board,
  setBoard,
  boardId,
  selectedPiece
}: BoardProps) {

  async function handleCellClick(row: number, col: number) {
    if (!selectedPiece || !boardId) return

    const index = row * 8 + col

    const response = await fetch(`/api/training-board/${boardId}/set-piece`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cell: index,
        color: selectedPiece
      })
    })

    const data = await response.json()

    const parsed = JSON.parse(data.board.board)
    setBoard(parsed)
  }

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const index = rowIndex * 8 + colIndex
          const isDark = (rowIndex + colIndex) % 2 === 1

          return (
            <div
              key={index}
              className="cell"
              style={{ background: isDark ? "#5f6527" : "#f7f6d8" }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell === "black" && <div className="piece black" />}
              {cell === "white" && <div className="piece white" />}
            </div>
          )
        })
      )}
    </div>
  )
}
