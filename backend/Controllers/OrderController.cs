using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
   

    // private readonly ILogger<WeatherForecastController> _logger;
    private readonly AppDbContext _db;


    public OrderController(AppDbContext db)
    {
        _db = db;
    }

    // GET: api/Order/categories
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _db.Category.ToListAsync();
        return Ok(categories);
    }

    // Post: api/Order/Create
    [HttpPost("create")]
    public async Task<IActionResult> CreateOrder([FromBody] List<OrderItemDto> itemsDto)
    {
        if (itemsDto == null || !itemsDto.Any())
            return BadRequest("No items provided.");

    // Create execution strategy to handle retries and transactions
    var strategy = _db.Database.CreateExecutionStrategy();
    
    return await strategy.ExecuteAsync(async () =>
    {
        using var transaction = await _db.Database.BeginTransactionAsync();
        
        try
        {
            var order = new Order();

            foreach (var dto in itemsDto)
            {
                // Validate quantity
                if (dto.Quantity < 1)
                {
                    throw new ArgumentException($"Invalid quantity for item '{dto.Name}'. Quantity must be at least 1.");
                }

                // Validate category exists
                var categoryExists = await _db.Category
                    .AnyAsync(c => c.Id == dto.CategoryId);
                
                if (!categoryExists)
                {
                    throw new ArgumentException($"Category with ID {dto.CategoryId} does not exist.");
                }

                // Get or create item
                var item = await _db.Item
                    .FirstOrDefaultAsync(i => i.Name == dto.Name && i.CategoryId == dto.CategoryId);
                
                if (item == null)
                {
                    item = new Item
                    {
                        Name = dto.Name,
                        CategoryId = dto.CategoryId
                    };
                    _db.Item.Add(item);
                    await _db.SaveChangesAsync(); // Save now to get ID
                }

                // Add OrderItem
                var orderItem = new OrderItem
                {
                    Quantity = dto.Quantity,
                    ItemId = item.Id
                };
                order.orditms.Add(orderItem);
            }

            _db.Order.Add(order);
            await _db.SaveChangesAsync();

            // If we reach here, everything succeeded - commit the transaction
            await transaction.CommitAsync();

            return Ok(new { order.Id });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, "An error occurred while creating the order.");
        }
    });
    }
}

