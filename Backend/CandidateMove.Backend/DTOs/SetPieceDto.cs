public class SetPieceDto
{
    public int Row { get; set; }
    public int Col { get; set; }
    public int Value { get; set; } // 0 = empty, 1 = player 1 piece, 2 = player 2 piece
}