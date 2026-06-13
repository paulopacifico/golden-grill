namespace GoldenGrill.Api.Models;

public record PlaceOrderRequest(List<PlaceOrderItemRequest> Items);

public record PlaceOrderItemRequest(int ProductId, string ProductName, decimal UnitPrice, int Quantity);

public record OrderResponse(int Id, DateTime CreatedAt, decimal TotalPrice, string Status, List<OrderItemResponse> Items);

public record OrderItemResponse(int ProductId, string ProductName, decimal UnitPrice, int Quantity);
