import React from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container } from "./styles";

const Dashboard: React.FC = () => {

    const options  = [
        {value: 'Dayane', label: 'Dayane'},
        {value: 'Freen', label: 'Freen'},
        {value: 'Becky', label: 'Becky'}
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={options} onChange={()=>{}}/>
            </ContentHeader>
        </Container>
    );
}
export default Dashboard;