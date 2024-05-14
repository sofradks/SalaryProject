import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { text } from 'stream/consumers';
import dayjs from 'dayjs';

interface Props{
  employees: Employee[];
  handleDelete: (id:string) => void;
  handleOpen: (employee: Employee) => void;
}


export const Employees = ({employees, handleDelete, handleOpen}: Props) => {

    const columns: TableProps<Employee>['columns']  = [
        {
          title: 'Фамилия',
          dataIndex: 'surname',
          key: 'surname',
        },
        {
          title: 'Имя',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Отчество',
          dataIndex: 'patronymic',
          key: 'patronymic',
        },
        {
          title: 'Должность',
          dataIndex: 'positionString',
          key: 'positionString',
        },
        {
          title: 'Льготы/Надбавки',
          dataIndex: 'privilegesString',
          key: 'privilegesString',
        },
        {
          title: 'СНИЛС',
          dataIndex: 'snils',
          key: 'snils',
        },
        {
          title: 'Серия паспорта',
          dataIndex: 'pSeria',
          key: 'pSeria',
        },
        {
          title: 'Номер паспорта',
          dataIndex: 'pNumber',
          key: 'pNumber',
        },
        {
          title: 'Ставка',
          dataIndex: 'rate',
          key: 'rate',
        },
        {
          title: 'Дата приема',
          dataIndex: 'dateOfReceipt',
          key: 'dateOfReceipt',
        },
        {
          title: 'Дата увольнения',
          dataIndex: 'dateOfDismissal',
          key: 'dateOfDismissal',
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
    
    let dateCheck = new Date("0001-01-01T00:00:00");
    let dataSource: any[] | undefined = [];
    employees.map((employee : Employee) => (
        dataSource.push({
            id: employee.id,
            surname:employee.surname,
            name:employee.name,
            patronymic:employee.patronymic,
            snils: employee.snils,
            pSeria: employee.pSeria,
            pNumber: employee.pNumber,
            rate: employee.rate,
            dateOfReceipt: dayjs(employee.dateOfReceipt).format("YYYY-MM-DD"),
            dateOfDismissal: employee.dateOfDismissal == "0001-01-01T00:00:00" ? 
              undefined : dayjs(employee.dateOfDismissal).format("YYYY-MM-DD"),
            //dateOfDismissal: dayjs(employee.dateOfDismissal).format("DD-MM-YYYY"),
            privilegesGuid: employee.privilegesGuid,
            privilegesString: employee.privilegesString,
            positionGuid: employee.positionGuid,
            positionString: employee.positionString,
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