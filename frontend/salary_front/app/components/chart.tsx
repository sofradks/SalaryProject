import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { text } from 'stream/consumers';
import dayjs from 'dayjs';
import {Chart as ChartJS} from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
import {CategoryScale, Colors} from 'chart.js'; 
import { Chart }            from 'react-chartjs-2'
ChartJS.register(CategoryScale);
ChartJS.register(Colors);

interface Props{
  salarys: Salary[];
  month:number;
  year:number;
  tables:Table[];
}

interface doughnut{
  label: string,
  data:number,
}

// let dataSource: [{
//   label: string,
//   data:number,
// }] 

const defaultTable = {
  label:"В этот период нет ни одной зарплаты",
  data:1,
  borderRadius:5,
} 

// const defaultData = [defaultTable]

let employeeGuid:string = "";
let employeeString:string = "";
let year:number = 0;
let month:number = 0;
let day:number = 0;

const getListData = (salarys:Salary[], month:number, year : number) => {
  let length = 0;
  let dataSource: { label: string; data: number; borderRadius: number; }[] = []
  salarys.map((e) => {
    if (e.year == year && e.month == month ){
      dataSource.push({
        label:e.employeeString,
        data: e.summ,
        borderRadius:5,
      } )
      length = length+1;
    }
  })
  if (length==0)
    dataSource.push(defaultTable);
  return dataSource;
}

const getLabels = (tables:Table[], month:number, year : number) =>{
  let labels: { label: string; }[] = [];
  tables.map((e) => {
    if (e .year == year && e.month == month ){
      labels.push({
        label:e.employeeString,
      });
    length = length+1;
  }})
  return labels;
}


export const Charts = ({salarys, month, year, tables}: Props) => {

    // const columns: TableProps<Salary>['columns']  = [
    //     {
    //       title: 'Сотрудник',
    //       dataIndex: 'employeeString',
    //       key: 'employeeString',
    //     },
    //     {
    //       title: 'Год расчета',
    //       dataIndex: 'year',
    //       key: 'year',
    //     },
    //     {
    //       title: 'Месяц расчета',
    //       dataIndex: 'month',
    //       key: 'month',
    //     },
    //     {
    //       title: 'Отработанные часы',
    //       dataIndex: 'hours',
    //       key: 'hours',
    //     },
    //     {
    //       title: 'Заработная плата',
    //       dataIndex: 'summ',
    //       key: 'summ',
    //     },
    //     {
    //     title: 'Действие',
    //     key: 'action',
    //     render: (_, record) => (
    //       <Space>
    //         <Button onClick={() => handleOpen(record)}>Изменить</Button>
    //         <Button danger onClick={() => handleDelete(record.id) }>Удалить</Button>
    //       </Space>
    //     ),
    //     },
    //   ];
    
    // let dateCheck = new Date("0001-01-01T00:00:00");
    let dataSourcee: any[] | undefined = [];
    salarys.map((salary : Salary) => (
      dataSourcee.push({
            label: salary.employeeString
        })
    ));
    let dataArr = getListData(salarys, month, year);
    let datasets: number[] = []
    dataArr.map(element => {
      datasets.push(element.data)
    });
    let labelsArr = getLabels(tables, month, year);
    let labelsSet = new Set<string>();
    labelsArr.map(e => {
      labelsSet.add(e.label)
    });
    let labels: any[] = [];
    labelsSet.forEach(e => {
      labels.push(e)
    });


    return (
      
        <div className="Charts" >
            {
                // <Bar data={{
                //   labels: dataArr.map(e => e.label), 
                //   datasets: dataArr,
                // }}/>
                <Doughnut  data={{
                  labels: labels, 
                  datasets:[{
                    label:"count",
                    data:datasets,
                    borderRadius:2,
                    backgroundColor: ['#FFB1C1','#9BD0F5']
                  }] ,
                  
                }}/>
            }
            
        </div>
        
    )
}