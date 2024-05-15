import { token } from "../page";

export interface PositionRequest {
    name: string;
    hours: number;
    salary: number;
}

export const getAllPositions = async () => {
    const response = await fetch("https://localhost:7255/Position", {
        headers: {
            "Authorization" : `Bearer ${token}`,
        },
    })

    return response.json();
};

export const createPosition = async (positionRequest : PositionRequest) => {
    await fetch("https://localhost:7255/Position",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(positionRequest),
    });
};

export const updatePosition = async (id: string, positionRequest:PositionRequest) => {
    await fetch(`https://localhost:7255/Position/${id}`,{
        method: "PUT",
        headers: {
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(positionRequest),
    });
}

export const deletePosition = async (id: string) => {
    await fetch(`https://localhost:7255/Position/${id}`,{
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${token}`,
        },
    });
}