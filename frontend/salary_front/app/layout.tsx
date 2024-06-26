import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import Link from "next/link";

const items =[
  {key: "home", label: <Link href={"/"}>Главная</Link>},
  {key: "position", label: <Link href={"/position"}>Должности</Link>},
  {key: "privilege", label: <Link href={"/privilege"}>Льготы/Надбавки</Link>},
  {key: "employee", label: <Link href={"/employee"}>Сотрудники</Link>},
  {key: "table", label: <Link href={"/table"}>Табель</Link>},
  {key: "salary", label: <Link href={"/salary"}>Зарплата</Link>},
]


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
        <Layout style={{minHeight: "100vh"}}>
          <Header>
            <Menu theme="dark" mode="horizontal" items = {items} style = {{flex: 1, minWidth: 0}}>
            </Menu>
          </Header> 
          <Content style={{padding: "0 40px"}}> {children}</Content>
          {/* <Footer style={{textAlign:"center"}}>
            Footer
          </Footer> */}
          
        </Layout>
      </body>
    </html>
  );
}
