using Microsoft.EntityFrameworkCore;
using CandidateMove.Backend.Models;
using CandidateMove.Backend.Models.Game;


namespace CandidateMove.Backend.Data;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Game> Games => Set<Game>();
    public DbSet<Move> Moves => Set<Move>();
}
