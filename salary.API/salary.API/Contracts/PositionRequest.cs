namespace salary.API.Contracts
{
    public record PositionRequest(
        string Name,
        decimal Hours,
        decimal Salary);
}
