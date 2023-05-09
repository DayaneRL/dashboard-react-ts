import styled from "styled-components";

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 100%;
    height: 360px;
    display: flex;
    flex-direction: column;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    margin: 10px 0;
    padding: 25px 20px;
    border-radius: 7px;
`;

export const ChartContainer = styled.div`
    flex: 1;
`;

export const ChartHeader = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;

    >h2{
        margin-bottom: 20px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;
    display: flex;
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    margin-left: 7px;
    >div {
        background-color: ${props => props.color};
        width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 18px;
        line-height: 40px;
        text-align: center;
    }
    >span{
        margin-left: 5px;
    }
`;