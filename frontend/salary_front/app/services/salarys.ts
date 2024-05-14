export interface SalaryRequest {
    employeeGuid:string;
    employeeString:string;
    year:number;
    month:number;
}

export const getAllSalarys = async () => {
    const response = await fetch("https://localhost:7255/Salary")

    return response.json();
};

export const createSalary = async (salaryRequest : SalaryRequest) => {
    await fetch("https://localhost:7255/Salary",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(salaryRequest),
    });
};

export const updateSalary = async (id: string, salaryRequest:SalaryRequest) => {
    await fetch(`https://localhost:7255/Salary/${id}`,{
        method: "PUT",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(salaryRequest),
    });
}

export const deleteSalary = async (id: string) => {
    await fetch(`https://localhost:7255/Salary/${id}`,{
        method: "DELETE",
    });
}