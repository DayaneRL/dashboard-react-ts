import React, { useMemo, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import { Container, Content } from "./styles";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listMonths from "../../utils/months";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';
import BarChartBox from "../../components/BarChartBox";

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
       
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        });
        console.log(uniqueYears);

        return uniqueYears.map(year => {
            return {
                value: year, 
                label: year
            }
        })
    },[]);

    const months = useMemo(() => {
        let uniqueMonths: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();

            if(!uniqueMonths.includes(year) && !uniqueMonths.includes(month) && year === yearSelected){
                uniqueMonths.push(month)
            }
        });

        return listMonths.map( (month, index) => {
                return {
                    value: index+1, 
                    label: month
                } 
        }).filter(item => {
            return (uniqueMonths.includes(item.value))
        });
        
    },[yearSelected]);

    const totalExpenses = useMemo(()=>{
        let total:number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month===monthSelected && year===yearSelected){
                try{
                    total += Number(item.amount)
                }catch(error){
                    throw new Error('Invalid amount. Must be a number.');
                }
            }
        });
        return total;
    },[monthSelected, yearSelected]);

    const totalGains = useMemo(()=>{
        let total:number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month===monthSelected && year===yearSelected){
                try{
                    total += Number(item.amount)
                }catch(error){
                    throw new Error('Invalid amount. Must be a number.');
                }
            }
        });
        return total;
    },[monthSelected, yearSelected]);

    const totalBalance = useMemo(()=>{
        return totalGains - totalExpenses;
    },[totalGains, totalExpenses]);

    const message = useMemo(()=>{
        if(totalBalance > 0){
            return {
                title:"Muito bem!",
                description:"Sua carteira está positiva.",
                footerText:"Continue assim. Considere investir.",
                icon: happyImg
            }
        }else if(totalGains===0 && totalExpenses===0){
            return {
                title:"Ops!",
                description:"Neste mês, não há registros de entradas ou saídas.",
                footerText:"Parece que você não fez nenhum registro no mes e ano selecionado.",
                icon:grinningImg
            }
        }else if(totalBalance < 0){
            return {
                title:"Que triste!",
                description:"Neste mês, você gastou mais do que deveria.",
                footerText:"Verifique seus gastos e tente cortar coisas desnecessárias.",
                icon:sadImg
            }
        }else{
            return {
                title:"Ufaa!",
                description:"Neste mês, você gastou exatamente o que ganhou.",
                footerText:"Tome cuidado. No próximo mês tente poupar.",
                icon:grinningImg
            }
        }
    },[totalBalance, totalExpenses, totalGains]);

    const relationExpensesVersusGains = useMemo(()=>{
        const total = totalGains + totalExpenses;
        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains>0? Number(percentGains.toFixed()) : 0,
                color: '#F7931B'
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses>0? Number(percentExpenses.toFixed()): 0,
                color: '#E44C4E'
            }
        ];
        return data;

    },[totalGains, totalExpenses]);

    const historyData = useMemo(()=>{
        return listMonths.map((value,month)=>{

            let amountEntry = 0;
            gains.forEach(gain=>{
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelected){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error('amountEntry is invalid. Must be a number.');
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense=>{
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error('amountOutput is invalid. Must be a number.');
                    }
                }
            });

            return {
                monthNumber: month, 
                month: value.substring(0, 3), 
                amountEntry, 
                amountOutput
            };

        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear && item.amountEntry > 0)
        });
    },[yearSelected]);

    const relationExpensesRecurrentVsEventual = useMemo(()=>{
        let amountRecurent = 0;
        let amountEventual = 0;

        expenses.filter((expense)=>{
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month===monthSelected && year===yearSelected;
        }).forEach((expense)=>{
            if(expense.frequency==='recorrente'){
                return amountRecurent+=Number(expense.amount);
            }
            if(expense.frequency==='eventual'){
                return amountEventual+=Number(expense.amount);
            }
        });
        const total = amountRecurent+amountEventual;
        const percentRecurrent = (amountRecurent/total) * 100;
        const percentEventual  = (amountEventual/total) * 100;

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurent,
                percent: percentRecurrent ? Number(percentRecurrent.toFixed()) : 0,
                color: "#F7931B"
            }, 
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? Number(percentEventual.toFixed()) : 0,
                color: "#E44C4E"
            },
        ];

    },[monthSelected, yearSelected]);
    
    const relationGainsRecurrentVsEventual = useMemo(()=>{
        let amountRecurent = 0;
        let amountEventual = 0;

        gains.filter((gain)=>{
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month===monthSelected && year===yearSelected;
        }).forEach((gain)=>{
            if(gain.frequency==='recorrente'){
                return amountRecurent+=Number(gain.amount);
            }
            if(gain.frequency==='eventual'){
                return amountEventual+=Number(gain.amount);
            }
        });
        const total = amountRecurent+amountEventual;
        const percentRecurrent = (amountRecurent/total) * 100;
        const percentEventual  = (amountEventual/total) * 100;
        
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurent,
                percent: percentRecurrent ? Number(percentRecurrent.toFixed()) : 0,
                color: "#F7931B"
            }, 
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? Number(percentEventual.toFixed()) : 0,
                color: "#E44C4E"
            },
        ];

    },[monthSelected, yearSelected]);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput options={months} onChange={(e) => setMonthSelected(Number(e.target.value))} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => setYearSelected(Number(e.target.value))} defaultValue={yearSelected}/>
            </ContentHeader>

            <Content>

                <WalletBox 
                    title='Saldo'
                    amount={totalBalance}
                    footerLabel='Atualizado com base nas entradas e saídas'
                    icon='dollar'
                    color='#4E41F0'
                />
                <WalletBox 
                    title='Entradas'
                    amount={totalGains}
                    footerLabel='Atualizado com base nas entradas e saídas'
                    icon='arrowUp'
                    color='#F7931B'
                />
                <WalletBox 
                    title='Saídas'
                    amount={totalExpenses}
                    footerLabel='Atualizado com base nas entradas e saídas'
                    icon='arrowDown'
                    color='#E44C4E'
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox data={relationExpensesVersusGains}/>

                <HistoryBox data={historyData} lineColorAmountEntry="#F7931B" lineColorAmountOutput="#E44C4E"/>

                <BarChartBox title="Saídas" data={relationExpensesRecurrentVsEventual}/>
                <BarChartBox title="Entradas" data={relationGainsRecurrentVsEventual}/>

            </Content>
        </Container>
    );
}
export default Dashboard;