"use client";

import { Button } from "antd";
import { Employees } from "../components/employee";
import { useEffect, useState } from "react";
import { createEmployee, deleteEmployee, getAllEmployees, EmployeeRequest, updateEmployee } from "../services/employee";
import Title from "antd/es/skeleton/Title";
import { CreateUpdateEmployee, Mode } from "../components/CreateUpdateEmployee";
import { getAllPositions } from "../services/position";
import { getAllPrivilege } from "../services/privilege";
import { utils, writeFile } from "xlsx";
import dayjs from "dayjs";
import { token } from "../page";
import { useRouter } from "next/navigation";


//////////////////////////////////////////////////////////////////////////// получаем позиции и привилегии







//////////////////////////////////////////////////////////////////////////// получаем позиции и привилегии 



export default function EmployeePage()
{
    const router = useRouter();
    if (token == "")
        router.push("/");
    else{

        const defaultValues = {
            surname: "",
            name: "",
            patronymic: "",
            snils: "",
            pSeria: "",
            pNumber: "",
            rate: 0,
            dateOfReceipt: new Date(),
            dateOfDismissal: new Date(),
            privilegesGuid: new Array<string>,
            privilegesString: new Array<string>,
            positionGuid: "",
            positionString: "",
        } as Employee 

        const [values,setValues] = useState<Employee>(defaultValues);

        const [employees, setEmployees] = useState<Employee[]>([]);
        const [loading, setLoading] = useState(true);
        const [isModalOpen, setIsModalOpen] =useState(false);
        const [mode, setMode] = useState(Mode.Create);

        const [privilegesArr, setPrivilegeValues] = useState<Privilege[]>([]);
        const [positionsArr, setPositionValues] = useState<Position[]>([]);


        useEffect(() => {
            const getEmployees = async () =>{ 
                const employees = await getAllEmployees();
                setLoading(false);
                setEmployees(employees);
            };
            getEmployees();


            const getPositions = async () =>{ 
                const positions = await getAllPositions();
                //const [positionsArr, setPositionValues] = useState<Position[]>([]);
                setPositionValues(positions);
            };
            getPositions();
            
            
            const getPrivileges = async () =>{ 
                const privileges = await getAllPrivilege();
                //const [privilegesArr, setPrivilegeValues] = useState<Privilege[]>([]);
                setPrivilegeValues(privileges);
            };
            getPrivileges();
        }, [])


        const handleCreateEmployee = async (request: EmployeeRequest) => {
            await createEmployee(request);
            closeModal();
            
            const employees = await getAllEmployees();
            setEmployees(employees);
        };

        const handleUpdateEmployee =async (id:string, request: EmployeeRequest) => {
            await updateEmployee(id,request);
            closeModal();

            const employees = await getAllEmployees();
            setEmployees(employees);
        };

        const handleDeleteEmployee = async (id: string) => {
            await deleteEmployee(id);
            closeModal();

            const employees = await getAllEmployees();
            setEmployees(employees);
        };

        const openModal = () => {
            setMode(Mode.Create);
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setValues(defaultValues);
            setIsModalOpen(false);
        };

        const openEditModal = (employee: Employee) => {
            setMode(Mode.Edit);
            setValues(employee);
            setIsModalOpen(true);
        };

        const updateData = async () => {
            const employees = await getAllEmployees();
            setEmployees(employees);
        }

        const getPrivilegesString =  (privil:string[]) => {
            let privString = "";
            privil.map((e) => (
                privString= privString + e
            ))
            return privString;
        }

            const exportData = async () => {
            updateData();
            let tableData: any[] = [];
            employees.map((employee : Employee) => (
                tableData.push({
                    Фамилия:employee.surname,
                    Имя:employee.name,
                    Отчество:employee.patronymic,
                    Должность: employee.positionString,
                    Льготы_Надбавки: getPrivilegesString(employee.privilegesString),
                    СНИЛС: employee.snils,
                    Серия_паспорта: employee.pSeria,
                    Номер_паспорта: employee.pNumber,
                    Ставка: employee.rate,
                    Дата_приема: dayjs(employee.dateOfReceipt).format("YYYY-MM-DD"),
                    Дата_увольнения: employee.dateOfDismissal == "0001-01-01T00:00:00" ? 
                    undefined : dayjs(employee.dateOfDismissal).format("YYYY-MM-DD"),
                    
                    
                })))
            var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
            utils.book_append_sheet(wb,ws,"Сотрудники");
            writeFile(wb,"Сотрудники.xlsx");
        };

        
        return ( 
            <div>
                
                <div style={{margin: "2vh"}}><Button onClick={()=> exportData()} style={{display: "inline", color:"white", backgroundColor:"green"} }>Экспорт</Button>
                <Button style={{display: "inline", marginLeft:"87%"}} type="primary" onClick={() => openModal()}>Добавить</Button>
                </div>
                
                <CreateUpdateEmployee mode={mode} 
                    values={values} 
                    isModalOpen={isModalOpen} 
                    handleCreate={handleCreateEmployee} 
                    handleUpdate={handleUpdateEmployee}
                    handleCancel={closeModal}
                    privilegesArr={privilegesArr}
                    positionsArr={positionsArr}
                />

                {loading ? (
                <Title>Loading</Title>
                ) : (
                    <Employees employees={employees} 
                    handleDelete={handleDeleteEmployee} 
                    handleOpen={openEditModal}
                    />
                )}
            </div>
        )
    }
}