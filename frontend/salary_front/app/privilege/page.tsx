"use client";

import { Button } from "antd";
import { Privileges } from "../components/privilege";
import { useEffect, useState } from "react";
import { createPrivilege, deletePrivilege, getAllPrivilege, PrivilegeRequest, updatePrivilege } from "../services/privilege";
import Title from "antd/es/skeleton/Title";
import { CreateUpdatePrivilege, Mode } from "../components/CreateUpdatePrivilege";

export default function PrivilegePage()
{
    const defaultValues = {
        name: "",
        allowance: 0,
    } as Privilege

    const [values,setValues] = useState<Privilege>(defaultValues);

    const [privileges, setPrivileges] = useState<Privilege[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] =useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getPrivileges = async () =>{ 
            const privileges = await getAllPrivilege();
            setLoading(false);
            setPrivileges(privileges);
        };
        getPrivileges();
    }, [])

    const handleCreatePrivilege = async (request: PrivilegeRequest) => {
        await createPrivilege(request);
        closeModal();
        
        const privileges = await getAllPrivilege();
        setPrivileges(privileges);
    };

    const handleUpdatePrivilege =async (id:string, request: PrivilegeRequest) => {
        await updatePrivilege(id,request);
        closeModal();

        const privileges = await getAllPrivilege();
        setPrivileges(privileges);
    };

    const handleDeletePrivilege = async (id: string) => {
        await deletePrivilege(id);
        closeModal();

        const privileges = await getAllPrivilege();
        setPrivileges(privileges);
    };

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (privilege: Privilege) => {
        setMode(Mode.Edit);
        setValues(privilege);
        setIsModalOpen(true);
    };

    
    return ( 
        <div>
            <div style={{display: "flex", justifyContent: "end", margin: "2vh"}}><Button type="primary" onClick={() => openModal()}>Добавить</Button></div>
            
            <CreateUpdatePrivilege mode={mode} 
                values={values} 
                isModalOpen={isModalOpen} 
                handleCreate={handleCreatePrivilege} 
                handleUpdate={handleUpdatePrivilege}
                handleCancel={closeModal}
            />

            {loading ? (
            <Title>Loading</Title>
            ) : (
                <Privileges privileges={privileges} 
                handleDelete={handleDeletePrivilege} 
                handleOpen={openEditModal}
                />
            )}
        </div>
    )
}