using System;
using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://*:{port}");

builder.Services.AddHealthChecks();

//  Define CORS
var allowedOrigins = "_AllowOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins,
        policy =>
        {
            policy.AllowAnyOrigin() // 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add sql server services to the container.
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
//             sqlOptions => sqlOptions.EnableRetryOnFailure()
//     )
//     );

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var dbContextSvc = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    //Migration: This is the programmatic equivalent to Update-Database
    await dbContextSvc.Database.MigrateAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowedOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
