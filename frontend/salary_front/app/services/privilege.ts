import { token } from "../page";

export interface PrivilegeRequest {
    name: string;
    allowance: number;
}

export const getAllPrivilege = async () => {
    const response = await fetch("https://localhost:7255/Privilege",
        {
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        }
    )

    return response.json();
};

export const createPrivilege = async (privilegeRequest : PrivilegeRequest) => {
    await fetch("https://localhost:7255/Privilege",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(privilegeRequest),
    });
};

export const updatePrivilege = async (id: string, privilegeRequest:PrivilegeRequest) => {
    await fetch(`https://localhost:7255/Privilege/${id}`,{
        method: "PUT",
        headers: {
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(privilegeRequest),
    });
}

export const deletePrivilege = async (id: string) => {
    await fetch(`https://localhost:7255/Privilege/${id}`,{
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${token}`,
        },
    });
}