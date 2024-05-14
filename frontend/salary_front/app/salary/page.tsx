"use client";

import { Button } from "antd";
import { Salarys } from "../components/salary";
import { useEffect, useState } from "react";
import { createSalary, deleteSalary, getAllSalarys, SalaryRequest, updateSalary } from "../services/salarys";
import Title from "antd/es/skeleton/Title";
import { CreateUpdateSalary, Mode } from "../components/CreateUpdateSalary";
import { getAllEmployees } from "../services/employee";

export default function SalaryPage()
{
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
        
        const positions = await getAllSalarys();
        setSalarys(positions);
    };

    const handleUpdateSalary =async (id:string, request: SalaryRequest) => {
        await updateSalary(id,request);
        closeModal();

        const positions = await getAllSalarys();
        setSalarys(positions);
    };

    const handleDeleteSalary = async (id: string) => {
        await deleteSalary(id);
        closeModal();

        const positions = await getAllSalarys();
        setSalarys(positions);
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

    
    return ( 
        <div>
            <div style={{display: "flex", justifyContent: "end", margin: "2vh"}}><Button type="primary" onClick={() => openModal()}>Добавить</Button></div>
            
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