using Microsoft.EntityFrameworkCore;
using CandidateMove.Backend.Models;

namespace CandidateMove.Backend.Data;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
}
