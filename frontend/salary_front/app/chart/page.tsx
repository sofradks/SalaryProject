"use client";

import { Button, Select } from "antd";
import { Salarys } from "../components/salary";
import { useEffect, useState } from "react";
import { createSalary, deleteSalary, getAllSalarys, SalaryRequest, updateSalary } from "../services/salarys";
import Title from "antd/es/skeleton/Title";
import { CreateUpdateSalary, Mode } from "../components/CreateUpdateSalary";
import { getAllEmployees } from "../services/employee";
import { utils, writeFile } from "xlsx";
import { useRouter } from "next/navigation";
import { token } from "../page";
import { Doughnut } from "react-chartjs-2";
import { Charts } from "../components/chart";
import { getAllTables } from "../services/table";


// export const setEmployeeOptions = (employees: Employee[]) => {
//     let employeeOptions: { label: string, value:string }[] = [];
//     employees.map((employee:Employee) => (
//         employeeOptions.push({
//             value:employee.id,
//             label:`${employee.surname} ${employee.name} ${employee.patronymic}`,
//         })
//     ))
    
//     return (employeeOptions)
// }

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

export default function Chart()
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
        const [employeeGuid, setEmployeeGuid] = useState<string>("");
        const [employees, setEmployees] = useState<Employee[]>([]);
        const [year, setYear] = useState<number>(0);
        const [month, setMonth] = useState<number>(0);
        const [tables, setTables] = useState<Table[]>([]);
        // const [isModalOpen, setIsModalOpen] =useState(false);
        // const [mode, setMode] = useState(Mode.Create);
        // const [employeesArr, setEmployees] = useState<Employee[]>([]);

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


            const getTables = async () =>{ 
                const tables = await getAllTables();
                setLoading(false);
                setTables(tables);
                
            };
            getTables();
        }, [])

        

        // const handleCreateSalary = async (request: SalaryRequest) => {
        //     await createSalary(request);
        //     closeModal();
            
        //     const salarys = await getAllSalarys();
        //     setSalarys(salarys);
        // };

        // const handleUpdateSalary =async (id:string, request: SalaryRequest) => {
        //     await updateSalary(id,request);
        //     closeModal();

        //     const salarys = await getAllSalarys();
        //     setSalarys(salarys);
        // };

        // const handleDeleteSalary = async (id: string) => {
        //     await deleteSalary(id);
        //     closeModal();

        //     const salarys = await getAllSalarys();
        //     setSalarys(salarys);
        // };

        // const openModal = () => {
        //     setMode(Mode.Create);
        //     setIsModalOpen(true);
        // };

        // const closeModal = () => {
        //     setValues(defaultValues);
        //     setIsModalOpen(false);
        // };

        // const openEditModal = (salary: Salary) => {
        //     setMode(Mode.Edit);
        //     setValues(salary);
        //     setIsModalOpen(true);
        // };

        // const updateData = async () => {
        //     const salarys = await getAllSalarys();
        //     setSalarys(salarys);
        // }

        // const exportData = async () => {
        //     updateData();
        //     let tableData: any[] = [];
        //     salarys.map((salary : Salary) => (
        //         tableData.push({
        //             Сотрудник: salary.employeeString,
        //             Год_расчета:salary.year,
        //             Месяц_расчета:salary.month,
                    
        //             Отработанные_часы:salary.hours,
        //             Заработная_плата:salary.summ,
        //         })))
        //     var wb = utils.book_new(),
        //     ws = utils.json_to_sheet(tableData);
        //     utils.book_append_sheet(wb,ws,"Salary");
        //     writeFile(wb,"Salary.xlsx");
        // };
        
        const loadSalarys = async () =>{
            const tables = await getAllSalarys();
            setSalarys(tables);
        }
        
        return ( 
            <div>
                    {/* <Select
                    value={employeeGuid}
                    style={{margin:"1vh", width:"30%"}}
                    onChange={(e,o) => {
                        setEmployeeGuid(e); 
                        loadSalarys();
                    }}
                    options={setEmployeeOptions(employees)}
                /> */}
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
                {/* <div style={{margin: "2vh"}}><Button onClick={()=> exportData()}  style={{display: "inline", color:"white", backgroundColor:"green"}}>Экспорт</Button>
                <Button style={{display: "inline", marginLeft:"87%"}} type="primary" onClick={() => openModal()}>Добавить</Button>
                </div>
                
                <CreateUpdateSalary mode={mode} 
                    values={values} 
                    isModalOpen={isModalOpen} 
                    handleCreate={handleCreateSalary} 
                    handleUpdate={handleUpdateSalary}
                    handleCancel={closeModal}
                    employeesArr={employeesArr}
                /> */}
                <div style={{width:"50%"}}>
                {loading ? (
                <Title>Loading</Title>
                ) : (
                    // <Salarys salarys={salarys} 
                    // handleDelete={handleDeleteSalary} 
                    // handleOpen={openEditModal}
                    // />

                    <Charts salarys = {salarys} month = {month} year ={year} tables = {tables} />
                )}
                </div>
            </div>
        )
    }
}