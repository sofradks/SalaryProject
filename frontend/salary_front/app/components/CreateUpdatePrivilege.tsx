import { PrivilegeRequest } from "../services/privilege";
import { Modal, Input } from "antd";
import { title } from "process";
import { useEffect, useState } from "react";

interface Props {
    mode: Mode;
    values: Privilege;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: PrivilegeRequest) => void;
    handleUpdate: (id: string, request: PrivilegeRequest) => void;
}

export enum Mode{
    Create,
    Edit,
}

export const CreateUpdatePrivilege = ({mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate}:Props) => {
        const [name, setName] = useState<string>("");
        const [allowance, setallowance] = useState<number>(0);

        useEffect(() => {
            setName(values.name);
            setallowance(values.allowance);
        },[values]);

        const handleOnOk =async () => {
            const privilegeRequest ={name, allowance};

            mode == Mode.Create ? handleCreate(privilegeRequest) : handleUpdate(values.id, privilegeRequest);
        }

        return (
            <Modal title={mode === Mode.Create ? "Добавить" : "Изменить"} 
                open={isModalOpen}
                cancelText={"Отмена"}
                onOk = {handleOnOk}
                onCancel = {handleCancel}
                >

                <div className="privilege_modal">
                    <Input
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Наименование" 
                        style={{margin:"1vh"}}
                    />
                    <Input
                        value = {allowance}
                        onChange={(e) => setallowance(e.target.value)}
                        placeholder="Надбавка" 
                        style={{margin:"1vh"}}
                    />
                </div>
            </Modal>
        )
    };