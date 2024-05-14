namespace salary.API.Contracts
{
    public record SalaryRequest(
        Guid EmployeeGuid ,
        string EmployeeString ,
        decimal Year ,
        decimal Month);
        //decimal Hours ,
        //decimal Summ );
}
