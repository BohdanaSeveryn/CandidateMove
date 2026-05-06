using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using CandidateMove.Backend.Data;
using CandidateMove.Backend.Models;
using CandidateMove.Backend.DTOs;

namespace CandidateMove.Backend.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
        // This is a placeholder for the authentication logic.
        // In a real application, you would implement proper authentication and token generation.
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        public AuthController(AppDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest("Email already in use.");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Email = dto.Email,
                CreatedAt = DateTime.UtcNow
            };
            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Name, user.Email });
        }
    }

}
