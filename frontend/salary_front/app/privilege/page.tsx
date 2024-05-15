"use client";

import { Button } from "antd";
import { Privileges } from "../components/privilege";
import { useEffect, useState } from "react";
import { createPrivilege, deletePrivilege, getAllPrivilege, PrivilegeRequest, updatePrivilege } from "../services/privilege";
import Title from "antd/es/skeleton/Title";
import { CreateUpdatePrivilege, Mode } from "../components/CreateUpdatePrivilege";
import { utils, writeFile } from "xlsx";
import { useRouter } from "next/navigation";
import { token } from "../page";

export default function PrivilegePage()
{
    const router = useRouter();
    if (token == "")
        router.push("/");
    else{
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

        const updateData = async () => {
            const privileges = await getAllPrivilege();
            setPrivileges(privileges);
        }

        const exportData = async () => {
            updateData();
            let tableData: any[] = [];
            privileges.map((privilege : Privilege) => (
                tableData.push({
                    Наименование: privilege.name,
                    Надбавка: privilege.allowance,
                })))
            var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
            utils.book_append_sheet(wb,ws,"Льготы_Надбавки");
            writeFile(wb,"Льготы_Надбавки.xlsx");
        };
        //onClick={()=> exportData()}

        
        return ( 
            <div>
                <div style={{margin: "2vh"}}><Button onClick={()=> exportData()} style={{display: "inline", color:"white", backgroundColor:"green"} }>Экспорт</Button>
                <Button style={{display: "inline", marginLeft:"87%"}} type="primary" onClick={() => openModal()}>Добавить</Button>
                </div>
                
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
}