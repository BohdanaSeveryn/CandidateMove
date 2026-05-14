namespace CandidateMove.Backend.Models.Game;
public class Move
{
    public Guid Id { get; set; }
    public Guid GameId { get; set; }
    public Guid PlayerId { get; set; }

    public int MoveNumber{ get; set; }
    public string Action { get; set; } = string.Empty; // This could be a move notation or description
    public DateTime CreatedAt { get; set; }
}