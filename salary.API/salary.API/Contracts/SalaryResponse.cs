namespace salary.API.Contracts
{
    public record SalaryResponse(
        Guid id,
        Guid EmployeeGuid,
        string EmployeeString,
        decimal Year,
        decimal Month,
        decimal Hours,
        decimal Summ);
}
