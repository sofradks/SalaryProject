import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { text } from 'stream/consumers';
import dayjs from 'dayjs';


interface Props{
  salarys: Salary[];
  handleDelete: (id:string) => void;
  handleOpen: (salary: Salary) => void;
}


export const Salarys = ({salarys, handleDelete, handleOpen}: Props) => {

    const columns: TableProps<Salary>['columns']  = [
        {
          title: 'Сотрудник',
          dataIndex: 'employeeString',
          key: 'employeeString',
        },
        {
          title: 'Год расчета',
          dataIndex: 'year',
          key: 'year',
        },
        {
          title: 'Месяц расчета',
          dataIndex: 'month',
          key: 'month',
        },
        {
          title: 'Отработанные часы',
          dataIndex: 'hours',
          key: 'hours',
        },
        {
          title: 'Заработная плата',
          dataIndex: 'summ',
          key: 'summ',
        },
        {
        title: 'Действие',
        key: 'action',
        render: (_, record) => (
          <Space>
            <Button onClick={() => handleOpen(record)}>Изменить</Button>
            <Button danger onClick={() => handleDelete(record.id) }>Удалить</Button>
          </Space>
        ),
        },
      ];
    
    // let dateCheck = new Date("0001-01-01T00:00:00");
    let dataSource: any[] | undefined = [];
    salarys.map((salary : Salary) => (
        dataSource.push({
            id: salary.id,
            employeeGuid: salary.employeeGuid,
            employeeString: salary.employeeString,
            month:salary.month,
            year:salary.year,
            hours:salary.hours,
            summ:salary.summ,
        })
    ));
    return (
        <div className="Table" >
            {
                <Table dataSource={dataSource} columns={columns} />
            }
            
        </div>
        
    )
}