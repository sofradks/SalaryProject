import { token } from "../page";

export interface EmployeeRequest {
    surname: string;
    name: string;
    patronymic: string;
    snils: string;
    pSeria: string;
    pNumber: string;
    rate: number;
    dateOfReceipt: Date;
    dateOfDismissal: Date;
    privilegesGuid: string[];
    privilegesString: string[];
    positionGuid: string;
    positionString: string;
}

export const getAllEmployees = async () => {
    const response = await fetch("https://localhost:7255/Employee", {
        headers: {
            "Authorization" : `Bearer ${token}`,
        },
    })

    return response.json();
};

export const createEmployee = async (employeeRequest : EmployeeRequest) => {
    await fetch("https://localhost:7255/Employee",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(employeeRequest),
    });
};

export const updateEmployee = async (id: string, employeeRequest:EmployeeRequest) => {
    await fetch(`https://localhost:7255/Employee/${id}`,{
        method: "PUT",
        headers: {
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(employeeRequest),
    });
}

export const deleteEmployee = async (id: string) => {
    await fetch(`https://localhost:7255/Employee/${id}`,{
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${token}`,
        },
    });
}