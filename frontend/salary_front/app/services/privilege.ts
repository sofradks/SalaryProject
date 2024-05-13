export interface PrivilegeRequest {
    name: string;
    allowance: number;
}

export const getAllPrivilege = async () => {
    const response = await fetch("https://localhost:7255/Privilege")

    return response.json();
};

export const createPrivilege = async (privilegeRequest : PrivilegeRequest) => {
    await fetch("https://localhost:7255/Privilege",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(privilegeRequest),
    });
};

export const updatePrivilege = async (id: string, privilegeRequest:PrivilegeRequest) => {
    await fetch(`https://localhost:7255/Privilege/${id}`,{
        method: "PUT",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(privilegeRequest),
    });
}

export const deletePrivilege = async (id: string) => {
    await fetch(`https://localhost:7255/Privilege/${id}`,{
        method: "DELETE",
    });
}