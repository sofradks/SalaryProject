import { SalaryRequest } from "../services/salarys";
import { Modal, Input, Select } from "antd";
import dayjs from "dayjs";
import { title } from "process";
import { useEffect, useState } from "react";

interface Props {
    mode: Mode;
    values: Salary;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: SalaryRequest) => void;
    handleUpdate: (id: string, request: SalaryRequest) => void;
    employeesArr:Employee[];
}

// interface Emp {
//     guid:string;
//     fio:string;
// }

export enum Mode{
    Create,
    Edit,
}

export const setEmployeeOptions = (employees: Employee[]) => {
    let employeeOptions: { label: string, value:string }[] = [];
    employees.map((employee:Employee) => (
        employeeOptions.push({
            value:employee.id,
            label:`${employee.surname} ${employee.name} ${employee.patronymic}`,
        })
    ))
    return (employeeOptions)
}

export const monthOptions = () => {
    let month: { label: string, value:string }[] = [];
    for (let i = 1; i < 13; i++) {
        month.push({
            value:i.toString(),
            label:i.toString(),
        })
      }
    return month;
}

export const yearOptions = () => {
    let year: { label: string, value:string }[] = [];
    let today = new Date(); 
    let todayYear = today.getFullYear();
    for (let i = todayYear-1; i < todayYear+10; i++) {
        year.push({
            value:i.toString(),
            label:i.toString(),
        })
      }
      return year;
}

export const CreateUpdateSalary = ({mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
    employeesArr}:Props) => {
        const [employeeGuid, setEmployeeGuid] = useState<string>("");
        const [employeeString, setEmployeeString] = useState<string>("");
        const [year, setYear] = useState<number>(0);
        const [month, setMonth] = useState<number>(0);
        const [hours, setHours] = useState<number>(0);
        const [summ, setSumm] = useState<number>(0);
        const [employees,setEmployees] = useState<Employee[]>([])

        useEffect(() => {
            setEmployeeGuid(values.employeeGuid);
            setEmployeeString(values.employeeString);
            // const emp = {
            //     guid:values.employeeGuid,
            //     fio:values.employeeString,
            // } as Emp
            // setEmployee(emp)
            setYear(values.year);
            setMonth(values.month);
            setHours(values.hours);
            setSumm(values.summ);
            setEmployees(employeesArr);
        },[values]);

        const handleOnOk =async () => {
            const salaryRequest ={employeeGuid, employeeString, year, month};

            mode == Mode.Create ? handleCreate(salaryRequest) : handleUpdate(values.id, salaryRequest);
        }

        return (
            <Modal title={mode === Mode.Create ? "Добавить" : "Изменить"} 
                open={isModalOpen}
                cancelText={"Отмена"}
                onOk = {handleOnOk}
                onCancel = {handleCancel}
                >

                <div className="salary_modal">
                    {/* <Input
                        value = {employee}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Наименование" 
                        style={{margin:"1vh"}}
                    /> */}
                    <Select
                        value={employeeGuid}
                        style={{margin:"1vh", width:"50%"}}
                        onChange={(e,o) => {setEmployeeGuid(e); setEmployeeString(e)}}
                        options={setEmployeeOptions(employees)}
                    />
                    <Select
                        value={month}
                        style={{margin:"1vh", width:"20%"}}
                        onChange={(e) => {setMonth(e)}}
                        options={monthOptions()}
                    />
                    <Select
                        value={year}
                        style={{margin:"1vh", width:"20%"}}
                        onChange={(e) => {setYear(e)}}
                        options={yearOptions()}
                    />
                    {/* <Input
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
                    /> */}
                </div>
            </Modal>
        )
    };