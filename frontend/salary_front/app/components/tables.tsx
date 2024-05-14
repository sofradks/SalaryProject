import React, { useEffect, useState } from 'react';
import { Button, Calendar, Input, Space, Table, Tag } from 'antd';
import type { CalendarProps, TableProps } from 'antd';
import { text } from 'stream/consumers';
import dayjs, { Dayjs } from 'dayjs';
import { TableRequest } from '../services/table';

interface Props{
    tables: Table[];
    handleCreate: (request: TableRequest) => void;
    handleDelete: (id:string) => void;
    handleUpdate: (id: string, request: TableRequest) => void;
    emp:string;
}

const defaultTable = {
    id:"",
    employeeGuid:"" ,
    employeeString:"" ,
    year:0 ,
    month:0 ,
    day:0 ,
    status:"",
} as Table

let employeeGuid:string = "";
let employeeString:string = "";
let year:number = 0;
let month:number = 0;
let day:number = 0;

const getListData = (value:Dayjs ,tables:Table[], emp:string) => {
  let t:Table = defaultTable;
  tables.map((e) => {
    if (e.year == value.year() && e.month-1 == value.month() && e.day == value.date() && e.employeeGuid == emp)
      t = e;
  })
  if (t.id!=defaultTable.id)
  return t;
}



export const Tables = ({tables, handleDelete, handleCreate, handleUpdate,emp}: Props) => {
  employeeGuid = emp
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  
  // const [employeeGuid, setemployeeGuid] = useState<string>("");
  // const [employeeString, setemployeeString] = useState<string>("");
  // const [year, setyear] = useState<number>(0);
  // const [month, setmonth] = useState<number>(0);
  // const [day, setday] = useState<number>(0);
  // const [status, setstatus] = useState<string>("");

//   useEffect(() => {
//     setemployeeGuid(empId);
//     setemployeeString(empId);
//     setyear(dateValue.year);
//     setmonth(dateValue.month);
//     setday(dateValue.date);
//     setstatus(status);
// }, [])


  const checkActivity = async (status:string,table:Table, dateValue:Dayjs, ) => {

    year = dateValue.year();
    month = dateValue.month()+1;
    day = dateValue.date();


    const tableRequest = {employeeGuid, employeeString, year, month, day, status};
    if (status == "")
      await handleDelete(table.id);
    else if (table.id == "") 
      await handleCreate(tableRequest);
    else
      await handleUpdate(table.id, tableRequest);
  }



  // const onSelect = (newValue: Dayjs) => {
  //   setValue(newValue);
  //   setSelectedValue(newValue);
  // };

  // const onPanelChange = (newValue: Dayjs) => {
  //   setValue(newValue);
  // };



  const dateCellRender = (value: Dayjs) => {
    const table = getListData(value,tables,employeeGuid);
    return (
      <div style={{display: "flex", justifyContent: "end"}}>
        <Input
            value = {table==undefined ? "" : table.status}
            onChange={(e) => {
              // setemployeeGuid(empId);
              // setemployeeString(empId);
              // setyear(value.year);
              // setmonth(value.month);
              // setday(value.date);
              // setstatus(e.target.value);
              checkActivity(e.target.value, table==undefined ? defaultTable : table,value)
            } }
            style={{margin:"1vh", width:"30%"}}
          />
      </div>
          
      )
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
      <Calendar  cellRender={cellRender} />
      //value={value} onSelect={onSelect} onPanelChange={onPanelChange}
  );
















    // const columns: TableProps<Table>['columns']  = [
    //     {
    //       title: 'Наименование',
    //       dataIndex: 'name',
    //       key: 'name',
    //     },
    //     {
    //       title: 'Запланированные часы',
    //       dataIndex: 'hours',
    //       key: 'hours',
    //     },
    //     {
    //       title: 'Оклад',
    //       dataIndex: 'salary',
    //       key: 'salary',
    //     },
    //     {
    //     title: 'Действие',
    //     key: 'action',
    //     render: (_, record) => (
    //       <Space >
    //         <Button onClick={() => handleOpen(record)}>Изменить</Button>
    //         <Button danger onClick={() => handleDelete(record.id) }>Удалить</Button>
    //       </Space>
    //     ),
    //     },
    //   ];
    

    // let dataSource: any[] | undefined = [];
    // tables.map((table : Table) => (
    //     dataSource.push({
    //         id: position.id,
    //         name: position.name,
    //         hours: position.hours,
    //         salary: position.salary,
    //     })
    // ));
    // return (
    //     <div className="Table" >
    //         {
    //             <Table dataSource={dataSource} columns={columns} />
    //         }
            
    //     </div>
        
    // )
}