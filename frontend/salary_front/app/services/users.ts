export interface UserRequest {
     login: string,
     password: string,
}

export const getUserToken = async (userRequest : UserRequest) => {
    const response = await fetch("https://localhost:7255/User",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
            // "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.by5oAEio2dTP3UilHmxufZ6Q9QRb-LvusBFU8uF6V6w`,
        },
        body: JSON.stringify(userRequest),

        
    });
    return response.json();
};

export const createUser = async (userRequest : UserRequest) => {
    const response = await fetch("https://localhost:7255/User/reg",{
        method: "POST",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(userRequest),

        
    });
    //return response.json();
};

// export const updatePosition = async (id: string, positionRequest:PositionRequest) => {
//     await fetch(`https://localhost:7255/Position/${id}`,{
//         method: "PUT",
//         headers: {
//             "content-type" : "application/json",
//         },
//         body: JSON.stringify(positionRequest),
//     });
// }

// export const deletePosition = async (id: string) => {
//     await fetch(`https://localhost:7255/Position/${id}`,{
//         method: "DELETE",
//     });
// }