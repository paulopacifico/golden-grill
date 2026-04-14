using Microsoft.EntityFrameworkCore;
using GoldenGrill.Api.Models;

namespace GoldenGrill.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Classic Smash",
                Description = "Double smash patty, cheddar, pickles, mustard",
                Price = 29.90m,
                ImageUrl = "/images/classic-smash.jpg"
            },
            new Product
            {
                Id = 2,
                Name = "BBQ Bacon Crunch",
                Description = "Crispy bacon, BBQ sauce, onion rings, cheddar",
                Price = 34.90m,
                ImageUrl = "/images/bbq-bacon-crunch.jpg"
            },
            new Product
            {
                Id = 3,
                Name = "Spicy Jalapeño",
                Description = "Jalapeños, pepper jack, chipotle mayo, lettuce",
                Price = 31.90m,
                ImageUrl = "/images/spicy-jalapeno.jpg"
            }
        );
    }
}
