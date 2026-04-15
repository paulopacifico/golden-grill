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
                ImageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"
            },
            new Product
            {
                Id = 2,
                Name = "BBQ Bacon Crunch",
                Description = "Crispy bacon, BBQ sauce, onion rings, cheddar",
                Price = 34.90m,
                ImageUrl = "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80"
            },
            new Product
            {
                Id = 3,
                Name = "Spicy Jalapeño",
                Description = "Jalapeños, pepper jack, chipotle mayo, lettuce",
                Price = 31.90m,
                ImageUrl = "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80"
            }
        );
    }
}
