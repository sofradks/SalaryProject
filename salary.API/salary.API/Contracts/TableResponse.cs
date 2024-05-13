namespace salary.API.Contracts
{
    public record TableResponse(
        Guid id,
        Guid EmployeeGuid ,
        string EmployeeString ,
        decimal Year ,
        decimal Month ,
        decimal Day ,
        string Status );
}
