"use client";

import { Button, Select } from "antd";
import { Tables } from "../components/tables";
import { useEffect, useState } from "react";
import { createTable, deleteTable, getAllTables, TableRequest, updateTable } from "../services/table";
import Title from "antd/es/skeleton/Title";
import { getAllEmployees } from "../services/employee";
import { utils, writeFile } from "xlsx";
//import { CreateUpdatePosition, Mode } from "../components/CreateUpdatePosition";

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

export default function PositionPage()
{
    // const defaultValues = {
    //     name: "",
    //     hours: 0,
    //     salary: 0,
    // } as Position

    // const [values,setValues] = useState<Position>(defaultValues);

    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState<Employee[]>([]);
    //const [isModalOpen, setIsModalOpen] =useState(false);
    //const [mode, setMode] = useState(Mode.Create);

    const [employeeGuid, setEmployeeGuid] = useState<string>("");
    const [employeeString, setEmployeeString] = useState<string>("");
    

    useEffect(() => {
        const getTables = async () =>{ 
            const tables = await getAllTables();
            setLoading(false);
            setTables(tables);
            
        };
        getTables();

        const getEmployees = async () =>{ 
            const employees = await getAllEmployees();
            setLoading(false);
            setEmployees(employees);
            setEmployeeGuid(employees[0].id)
        };
        getEmployees();

        

    }, [])

    

    const loadTables = async () =>{
        const tables = await getAllTables();
        setTables(tables);
    }

    const handleCreateTable = async (request: TableRequest) => {
        await createTable(request);
        // closeModal();
        
        const tables = await getAllTables();
        setTables(tables);
    };

    const handleUpdateTable =async (id:string, request: TableRequest) => {
        await updateTable(id,request);
        // closeModal();

        const tables = await getAllTables();
        setTables(tables);
    };

    const handleDeleteTable = async (id: string) => {
        await deleteTable(id);
        // closeModal();

        const tables = await getAllTables();
        setTables(tables);
    };

    // const openModal = () => {
    //     setMode(Mode.Create);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setValues(defaultValues);
    //     setIsModalOpen(false);
    // };

    // const openEditModal = (position: Position) => {
    //     setMode(Mode.Edit);
    //     setValues(position);
    //     setIsModalOpen(true);
    // };

    const updateData = async () => {
        const tables = await getAllTables();
        setTables(tables);
    }

    const exportData = async () => {
        updateData();
        let tableData: any[] = [];
        tables.map((table : Table) => (
            tableData.push({
                ФИО_Сотрудника: table.employeeString ,
                Год_отметки:table.year ,
                Месяц_отметки:table.month ,
                День_отметки:table.month,
                Отметка:table.status,
            })))
        var wb = utils.book_new(),
        ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb,ws,"Табель");
        writeFile(wb,"Табель.xlsx");
    };
    //onClick={()=> exportData()}
    


    
    return ( 
        <div>
            {/* <div style={{display: "flex", justifyContent: "end", margin: "2vh"}}><Button type="primary" onClick={() => openModal()}>Добавить</Button></div> */}
            
            {/* <CreateUpdatePosition mode={mode} 
                values={values} 
                isModalOpen={isModalOpen} 
                handleCreate={handleCreatePosition} 
                handleUpdate={handleUpdatePosition}
                handleCancel={closeModal}
            /> */}
            <div style={{margin: "2vh"}}><Button onClick={()=> exportData()} style={{display: "inline", color:"white", backgroundColor:"green", marginRight:"63%"} }>Экспорт</Button>
            <Select
                value={employeeGuid}
                style={{margin:"1vh", width:"30%"}}
                onChange={(e,o) => {
                    setEmployeeGuid(e); 
                    setEmployeeString(e);
                    loadTables();
                }}
                options={setEmployeeOptions(employees)}
            />
            </div>
            

            {loading ? (
            <Title>Loading</Title>
            ) : (
                <Tables tables={tables} 
                handleDelete={handleDeleteTable} 
                handleCreate={handleCreateTable}
                handleUpdate={handleUpdateTable}
                emp={employeeGuid}
                // handleOpen={openEditModal}
                />
            )}
        </div>
    )
}