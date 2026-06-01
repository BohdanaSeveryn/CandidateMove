using CandidateMove.Backend.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using CandidateMove.Backend.DTOs;
using CandidateMove.Backend.Models.Game;
using System.Text.Json;

[ApiController]
[Route("api/training-board")]
public class TrainingBoardController : ControllerBase
{
    private readonly AppDbContext _db;

    public TrainingBoardController(AppDbContext db)
    {
        _db = db;
        
    }

    private int[][] CreateStartingBoard(int size)
    {
        var board = new int[size][];
        for (int r = 0; r < size; r++)
        {
            board[r] = new int[size];
            for (int c = 0; c < size; c++)
                board[r][c] = 0;
        }
        return board;
    }

    [HttpPost("create")]
    public IActionResult CreateTrainingBoard()
    {
        var board = new Game
        {
            Id = Guid.NewGuid(),
            BoardSize = 8,
            Board = JsonSerializer.Serialize(CreateStartingBoard(8)),
            IsLocked = false,
            Status = GameStatus.Training
        };

        _db.Games.Add(board);
        _db.SaveChanges();

        return Ok(board);
    }

    // 1. Set piece
    [HttpPost("{id:guid}/set-piece")]
    public IActionResult SetPiece(Guid id, [FromBody] SetPieceDto dto)
    {
        var session = _db.Games.FirstOrDefault(g => g.Id == id);
        if (session == null)
            return NotFound("Training board session not found");

        if (session.IsLocked)
            return BadRequest("Board is locked");

        int size = session.BoardSize;

        // 1. Check bounds
        if (dto.Row < 0 || dto.Row >= size || dto.Col < 0 || dto.Col >= size)
            return BadRequest("Coordinates out of board bounds");

        // 2. Check dark square
        if ((dto.Row + dto.Col) % 2 == 0)
            return BadRequest("Only dark squares can contain pieces");

        // 3. Validate piece value
        if (dto.Value < 1 || dto.Value > 4)
            return BadRequest("Invalid piece value. Allowed: 1–4");

        // 4. Parse board JSON
        var board = JsonSerializer.Deserialize<int[][]>(session.Board);

        // 5. Check if cell is empty
        if (board[dto.Row][dto.Col] != 0)
            return BadRequest("Cell is already occupied");

        // 6. Place piece
        board[dto.Row][dto.Col] = dto.Value;

        // 7. Save
        session.Board = JsonSerializer.Serialize(board);
        _db.SaveChanges();

        return Ok(new
        {
            success = true,
            message = "Piece placed successfully",
            board = session.Board
        });
    }

    // 2. Remove piece
    [HttpPost("{id:guid}/remove-piece")]
    public IActionResult RemovePiece(Guid id, [FromBody] RemovePieceDto dto)
    {
        // TODO: implement
        return Ok();
    }

    // 3. Move piece (free move)
    [HttpPost("{id:guid}/move-piece")]
    public IActionResult MovePiece(Guid id, [FromBody] MovePieceDto dto)
    {
        // TODO: implement
        return Ok();
    }

    // 4. Clear board
    [HttpPost("{id:guid}/clear")]
    public IActionResult ClearBoard(Guid id)
    {
        // TODO: implement
        return Ok();
    }

    // 5. Reset board (start position)
    [HttpPost("{id:guid}/reset")]
    public IActionResult ResetBoard(Guid id)
    {
        // TODO: implement
        return Ok();
    }

    // 6. Lock board
    [HttpPost("{id:guid}/lock")]
    public IActionResult LockBoard(Guid id)
    {
        // TODO: implement
        return Ok();
    }

    // 7. Unlock board
    [HttpPost("{id:guid}/unlock")]
    public IActionResult UnlockBoard(Guid id)
    {
        // TODO: implement
        return Ok();
    }
}
