import styled, {keyframes} from "styled-components";

interface ILegendProps {
    color: string;
}

const animate = keyframes`
    0%{
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;


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

    animation: ${animate} .5s;
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

    @media(max-width: 1200px){
        flex-direction: column;
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

    @media(max-width: 1280px){
        > div {
            width: 30px;
            height: 30px;
        }
    }
`;