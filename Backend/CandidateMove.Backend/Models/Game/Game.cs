using CandidateMove.Backend.Models.Game;
public class Game
{
    public int BoardSize { get; set; }
    public string Board { get; set; }

    public Guid Id { get; set; }

    public Guid Player1Id { get; set; }
    public Guid Player2Id { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? FinishedAt { get; set; }

    public GameStatus Status { get; set; } = GameStatus.InProgress;
    public Guid CurrentPlayerId { get; set; }

    //Timers
    public int Player1TimeSeconds { get; set; }
    public int Player2TimeSeconds { get; set; }

    public DateTime? LastMoveAt { get; set; }

    public List<Move> Moves { get; set; } = new List<Move>();
    public bool IsLocked { get; set; }
}