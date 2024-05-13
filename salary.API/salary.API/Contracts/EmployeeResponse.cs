namespace salary.API.Contracts
{
    public record EmployeeResponse(
        Guid id,
        string Surname,
        string Name,
        string Patronymic,
        string Snils,
        string PSeria,
        string PNumber,
        decimal Rate,
        DateTime DateOfReceipt,
        DateTime DateOfDismissal,
        Guid PositionGuid,
        string PositionString,
        List<Guid> PrivilegesGuid,
        List<string> PrivilegesString);
}
