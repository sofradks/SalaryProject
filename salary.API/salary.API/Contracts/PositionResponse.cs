namespace salary.API.Contracts
{
    public record PositionResponse(
        Guid id,
        string Name,
        decimal Hours,
        decimal Salary);

}
