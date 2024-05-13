import { EmployeeRequest } from "../services/employee";
import { Modal, Input, DatePicker, Select } from "antd";
import { title } from "process";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { getAllPositions } from "../services/position";
import { getAllPrivilege } from "../services/privilege";
import { Privileges } from "./privilege";

interface Props {
    mode: Mode;
    values: Employee;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: EmployeeRequest) => void;
    handleUpdate: (id: string, request: EmployeeRequest) => void;
    privilegesArr: Privilege[];
    positionsArr: Position[];
}


export enum Mode{
    Create,
    Edit,
}

export const setPositionOptions = (positions: Position[]) => {
    let positionOptions: { label: string, value:string }[] = [];
    positions.map((position:Position) => (
        positionOptions.push({
            value:position.id,
            label:position.name,
        })
    ))
    return (positionOptions)
}

export const setPrivilegeOptions = (privileges: Privilege[]) => {
    let privilegeOptions: { label: string, value:string }[] = [];
    privileges.map((privilege:Privilege) => (
        privilegeOptions.push({
            value:privilege.id,
            label:privilege.name,
        })
    ))
    return (privilegeOptions)
}


export const CreateUpdateEmployee = ({mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
    privilegesArr,
    positionsArr,
    }:Props) => {
        const [surname, setSurname] = useState<string>("");
        const [name, setName] = useState<string>("");
        const [patronymic, setPatronymic] = useState<string>("");
        const [snils, setSnils] = useState<string>("");
        const [pSeria, setPSeria] = useState<string>("");
        const [pNumber, setPNumber] = useState<string>("");
        const [rate, setRate] = useState<number>(0);
        const [dateOfReceipt, setDateOfReceipt] = useState<Date>(new Date());
        const [dateOfDismissal, setDateOfDismissal] = useState<Date>(new Date());
        const [privilegesGuid, setPrivilegesGuid] = useState<string[]>([]);
        const [privilegesString, setPrivilegesString] = useState<string[]>([]);
        const [positionGuid, setPositionGuid] = useState<string>("");
        const [positionString, setPositionString] = useState<string>("");
        
        const [positions,setPositions] = useState<Position[]>([])
        const [privileges,setPrivileges] = useState<Privilege[]>([])
            


        useEffect(() => {
            setSurname(values.surname);
            setName(values.name);
            setPatronymic(values.patronymic);
            setSnils(values.snils);
            setPSeria(values.pSeria);
            setPNumber(values.pNumber);
            setRate(values.rate);
            setDateOfReceipt(values.dateOfReceipt);
            setDateOfDismissal(values.dateOfDismissal);
            setPrivilegesGuid(values.privilegesGuid);
            setPrivilegesString(values.privilegesString);
            setPositionGuid(values.positionGuid);
            setPositionString(values.positionString);
            setPositions(positionsArr);
            setPrivileges(privilegesArr);
        },[values,positionsArr,privilegesArr]);

        const handleOnOk =async () => {
            const employeeRequest ={surname, name, patronymic, snils, pSeria, pNumber, rate, dateOfReceipt, dateOfDismissal, 
                privilegesGuid, privilegesString, positionGuid, positionString};

            mode == Mode.Create ? handleCreate(employeeRequest) : handleUpdate(values.id, employeeRequest);
        }

        return (
            <Modal title={mode === Mode.Create ? "Добавить" : "Изменить"} 
                open={isModalOpen}
                cancelText={"Отмена"}
                onOk = {handleOnOk}
                onCancel = {handleCancel}
                >

                <div className="employee_modal">
                    <Input
                        value = {surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Фамилия" 
                        style={{margin:"1vh"}}
                    />
                    <Input
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя" 
                        style={{margin:"1vh"}}
                    />
                    <Input
                        value = {patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                        placeholder="Отчество" 
                        style={{margin:"1vh"}}
                    />
                    <Select
                        value={positionGuid}
                        style={{margin:"1vh"}}
                        onChange={(e,o) => {setPositionGuid(e); setPositionString(e)}}
                        options={setPositionOptions(positions)}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        style={{margin:"1vh", width: '100%' }}
                        placeholder="Выберите льготу/надбавку"
                        value={privilegesGuid.length == 0 ? undefined:privilegesGuid}
                        onChange={(e,o) => {setPrivilegesGuid(e); setPrivilegesString(e)}}
                        options={setPrivilegeOptions(privileges)}
                    />
                    <Input
                        value = {rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="Ставка" 
                        style={{margin:"1vh", width: '100%' }}
                    />
                    <Input
                        value = {snils}
                        onChange={(e) => setSnils(e.target.value)}
                        placeholder="СНИЛС" 
                        style={{margin:"1vh"}}
                    />
                    <Input
                        value = {pSeria}
                        onChange={(e) => setPSeria(e.target.value)}
                        placeholder="Серия" 
                        style={{margin:"1vh"}}
                    />
                    <Input
                        value = {pNumber}
                        onChange={(e) => setPNumber(e.target.value)}
                        placeholder="Номер" 
                        style={{margin:"1vh"}}
                    />
                    <DatePicker 
                        allowClear = {false}
                        //value = {dateOfReceipt=="" ? null  : dayjs(dateOfReceipt)}
                        value = {dayjs(dateOfReceipt)}
                        onChange={(e,d) => setDateOfReceipt(d)}
                        style={{margin:"1vh"}}
                    />
                    <DatePicker 
                        //value = {dateOfDismissal=="" ? undefined  : dayjs(dateOfDismissal)}
                        allowClear = {true}
                        value = {dateOfDismissal == undefined ? undefined:dayjs(dateOfDismissal)}
                        onChange={(e,d) => setDateOfDismissal(d)}
                        style={{margin:"1vh"}}
                    />
                </div>
            </Modal>
        )
    };