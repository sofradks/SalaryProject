namespace salary.API.Contracts
{
    public record TableRequest(
        Guid EmployeeGuid,
        string EmployeeString,
        decimal Year,
        decimal Month,
        decimal Day,
        string Status );
}
