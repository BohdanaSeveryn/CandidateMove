using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CandidateMove.Backend.Data;
using CandidateMove.Backend.Models.Game;
using CandidateMove.Backend.Models;
using System.Text.Json;

namespace CandidateMove.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GameController : ControllerBase
{
    private readonly AppDbContext _db;

    public GameController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("create")]
    public IActionResult CreateGame()
    {
        Guid guid = Guid.Parse(
            User.FindFirst("userId")!.Value);
        var userId = guid;

        var game = new Game
        {
            Id = Guid.NewGuid(),
            Player1Id = userId,
            Status = GameStatus.WaitingForPlayer,
            CreatedAt = DateTime.UtcNow,
            CurrentPlayerId = userId,
            Player1TimeSeconds = 900, // 15 minutes
            Player2TimeSeconds = 900,
            BoardSize = 8,
            Board = JsonSerializer.Serialize(CreateStartingBoard(8)),
            IsLocked = false
        };

        _db.Games.Add(game);
        _db.SaveChanges();

        return Ok(game);
    }

    [HttpPost("join/{gameId:guid}")]
    public IActionResult JoinGame(Guid gameId)
    {
        var userId = Guid.Parse(User.FindFirst("userId")!.Value);
        var game = _db.Games.FirstOrDefault(g => g.Id == gameId);

        if (game == null)
        {
            return NotFound("Game not found.");
        }

        if (game.Player2Id == userId || game.Player1Id == userId)
        {
            return BadRequest("You are already part of this game.");
        }

        if (game.Player2Id != Guid.Empty)
        {
            return BadRequest("Game already has two players.");
        }

        game.Player2Id = userId;
        game.Status = GameStatus.InProgress;
        game.LastMoveAt = DateTime.UtcNow;
        _db.SaveChanges();

        return Ok(game);
    }

    [HttpGet("{gameId:guid}")]
    public IActionResult GetGame(Guid gameId)
    {
        Guid guid = Guid.Parse(
            User.FindFirst("userId")!.Value);
        var userId = guid;
        var game = _db.Games
        .Include(g => g.Moves)
        .FirstOrDefault(g => g.Id == gameId);

        if (game == null)
        {
            return NotFound("Game not found.");
        }

        if (game.Player1Id != userId && game.Player2Id != userId)
        {
            return Forbid("You are not a player in this game.");
        }

        return Ok(game);
    }

    private int[][] CreateStartingBoard(int size)
    {
        var board = new int[size][];
        
        for (int row = 0; row < size; row++)
        {
            board[row] = new int[size];

            for (int col = 0; col < size; col++)
            {
                bool isDarkSquare = (row + col) % 2 == 1;
                if (isDarkSquare)
                {
                    board[row][col] = 0; 
                    continue;
                }
                int rowOfPieces = (size == 8 ? 3 : 4);
                if (row < rowOfPieces)
                {
                    board[row][col] = 1; // Player 1 pieces
                }
                else if (row >= size - rowOfPieces)
                {
                    board[row][col] = 2; // Player 2 pieces
                }
                else if (row >= size - rowOfPieces)
                {
                    board[row][col] = 2; // Player 2 pieces
                }
                else
                {
                    board[row][col] = 0; // Empty square
                }
            }  
        }
        return board;
    }
}