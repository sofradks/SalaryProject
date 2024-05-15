"use client";

import { Button } from "antd";
import { Salarys } from "../components/salary";
import { useEffect, useState } from "react";
import { createSalary, deleteSalary, getAllSalarys, SalaryRequest, updateSalary } from "../services/salarys";
import Title from "antd/es/skeleton/Title";
import { CreateUpdateSalary, Mode } from "../components/CreateUpdateSalary";
import { getAllEmployees } from "../services/employee";
import { utils, writeFile } from "xlsx";
import { useRouter } from "next/navigation";
import { token } from "../page";


export default function SalaryPage()
{
    const router = useRouter();
    if (token == "")
        router.push("/");
    else{

        const defaultValues = {
            id:"",
            employeeGuid:"",
            employeeString:"",
            year:0,
            month:0,
            summ:0,
            hours:0,
        } as Salary

        const [values,setValues] = useState<Salary>(defaultValues);

        const [salarys, setSalarys] = useState<Salary[]>([]);
        const [loading, setLoading] = useState(true);
        const [isModalOpen, setIsModalOpen] =useState(false);
        const [mode, setMode] = useState(Mode.Create);
        const [employeesArr, setEmployees] = useState<Employee[]>([]);

        useEffect(() => {
            const getSalarys = async () =>{ 
                const salarys = await getAllSalarys();
                setLoading(false);
                setSalarys(salarys);
            };
            getSalarys();

            const getEmployees = async () =>{ 
                const employees = await getAllEmployees();
                setLoading(false);
                setEmployees(employees);
            };
            getEmployees();
        }, [])

        const handleCreateSalary = async (request: SalaryRequest) => {
            await createSalary(request);
            closeModal();
            
            const salarys = await getAllSalarys();
            setSalarys(salarys);
        };

        const handleUpdateSalary =async (id:string, request: SalaryRequest) => {
            await updateSalary(id,request);
            closeModal();

            const salarys = await getAllSalarys();
            setSalarys(salarys);
        };

        const handleDeleteSalary = async (id: string) => {
            await deleteSalary(id);
            closeModal();

            const salarys = await getAllSalarys();
            setSalarys(salarys);
        };

        const openModal = () => {
            setMode(Mode.Create);
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setValues(defaultValues);
            setIsModalOpen(false);
        };

        const openEditModal = (salary: Salary) => {
            setMode(Mode.Edit);
            setValues(salary);
            setIsModalOpen(true);
        };

        const updateData = async () => {
            const salarys = await getAllSalarys();
            setSalarys(salarys);
        }

        const exportData = async () => {
            updateData();
            let tableData: any[] = [];
            salarys.map((salary : Salary) => (
                tableData.push({
                    Сотрудник: salary.employeeString,
                    Год_расчета:salary.year,
                    Месяц_расчета:salary.month,
                    
                    Отработанные_часы:salary.hours,
                    Заработная_плата:salary.summ,
                })))
            var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
            utils.book_append_sheet(wb,ws,"Salary");
            writeFile(wb,"Salary.xlsx");
        };
    
        
        return ( 
            <div>
                <div style={{margin: "2vh"}}><Button onClick={()=> exportData()}  style={{display: "inline", color:"white", backgroundColor:"green"}}>Экспорт</Button>
                <Button style={{display: "inline", marginLeft:"87%"}} type="primary" onClick={() => openModal()}>Добавить</Button>
                </div>
                
                <CreateUpdateSalary mode={mode} 
                    values={values} 
                    isModalOpen={isModalOpen} 
                    handleCreate={handleCreateSalary} 
                    handleUpdate={handleUpdateSalary}
                    handleCancel={closeModal}
                    employeesArr={employeesArr}
                />

                {loading ? (
                <Title>Loading</Title>
                ) : (
                    <Salarys salarys={salarys} 
                    handleDelete={handleDeleteSalary} 
                    handleOpen={openEditModal}
                    />
                )}
            </div>
        )
    }
}