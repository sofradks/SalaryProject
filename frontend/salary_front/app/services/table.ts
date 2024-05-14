export interface TableRequest {
    employeeGuid:string ,
    employeeString:string ,
    year:number ,
    month:number ,
    day:number ,
    status:string,
}

export const getAllTables = async () => {
    const response = await fetch("https://localhost:7255/Table")

    return response.json();
};

export const createTable = async (tableRequest : TableRequest) => {
    await fetch("https://localhost:7255/Table",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(tableRequest),
    });
};

export const updateTable = async (id: string, tableRequest:TableRequest) => {
    await fetch(`https://localhost:7255/Table/${id}`,{
        method: "PUT",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(tableRequest),
    });
}

export const deleteTable = async (id: string) => {
    await fetch(`https://localhost:7255/Table/${id}`,{
        method: "DELETE",
    });
}