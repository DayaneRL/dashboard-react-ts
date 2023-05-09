import React, {useEffect, useMemo, useState} from "react";
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { Container, Content, Filters } from "./styles";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listMonths from "../../utils/months";

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC = () => {

    const { type } = useParams();
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [selectFrequency, setSelectFrequency] = useState<string[]>(['recorrente', 'eventual']);

    const pageData = useMemo(()=> {
        return type === 'entry-balance' ? 
        {
            title: 'Entradas',
            lineColor: '#4E41F0',
            listData: gains
        } :
        {
            title: 'Saídas',
            lineColor: '#E44C4E',
            listData: expenses 
        }
    },[type]);
    
    const years = useMemo(() => {
        let uniqueYears: number[] = [];
       
        pageData.listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year, 
                label: year
            }
        })
    },[pageData]);

    const months = useMemo(() => {
        return listMonths.map( (month, index) => {
            return {
                value: index+1, 
                label: month
            } 
        });
        
    },[]);

    const handleFrequencyClick = (frequency: string) => {
        const frequencyIndex = selectFrequency.findIndex(item => item === frequency);
        if(frequencyIndex >= 0){
            const filtered = selectFrequency.filter(item => item === frequency);
            setSelectFrequency(filtered);
        }else{
            setSelectFrequency((prev) =>[...prev, frequency]);
        }
    }

    useEffect(()=>{
        
        const dataFiltered = pageData.listData.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            
            return month === monthSelected && year === yearSelected && selectFrequency.includes(item.frequency);
        });

        const formattedData = dataFiltered.map(item=> {
            return {
                id: uuidv4(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0': '#E44C4E'
            }
        });

        setData(formattedData);
    },[pageData, monthSelected, yearSelected, selectFrequency]);


    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => setMonthSelected(Number(e.target.value))} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => setYearSelected(Number(e.target.value))} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button type="button" className={`tag-filter tag-filter-recurrent ${selectFrequency.includes('recorrente')&&'tag-actived'}`}
                    onClick={()=>handleFrequencyClick('recorrente')}>Recorrentes</button>
                <button type="button" className={`tag-filter tag-filter-eventual ${selectFrequency.includes('eventual')&&'tag-actived'}`}
                    onClick={()=>handleFrequencyClick('eventual')}>Eventuais</button>
            </Filters>

            <Content>
                {data.map(item => (
                    <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.description}
                        subtitle={item.dateFormatted}
                        amount={item.amountFormatted}
                    />
                ))}
            </Content>
        </Container>
    );
}
export default List;