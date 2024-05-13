import { PositionRequest } from "../services/position";
import { Modal, Input } from "antd";
import { title } from "process";
import { useEffect, useState } from "react";

interface Props {
    mode: Mode;
    values: Position;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: PositionRequest) => void;
    handleUpdate: (id: string, request: PositionRequest) => void;
}

export enum Mode{
    Create,
    Edit,
}

export const CreateUpdatePosition = ({mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate}:Props) => {
        const [name, setName] = useState<string>("");
        const [hours, setHours] = useState<number>(0);
        const [salary, setSalary] = useState<number>(0);

        useEffect(() => {
            setName(values.name);
            setHours(values.hours);
            setSalary(values.salary);
        },[values]);

        const handleOnOk =async () => {
            const positionRequest ={name, hours, salary};

            mode == Mode.Create ? handleCreate(positionRequest) : handleUpdate(values.id, positionRequest);
        }

        return (
            <Modal title={mode === Mode.Create ? "Добавить" : "Изменить"} 
                open={isModalOpen}
                cancelText={"Отмена"}
                onOk = {handleOnOk}
                onCancel = {handleCancel}
                >

                <div className="position_modal">
                    <Input
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Наименование" 
                        style={{margin:"1vh"}}
                    />
                    <Input
                        value = {hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="Запланированные часы" 
                        style={{margin:"1vh"}}
                    />
                    <Input
                        value = {salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Оклад" 
                        style={{margin:"1vh"}}
                    />
                </div>
            </Modal>
        )
    };