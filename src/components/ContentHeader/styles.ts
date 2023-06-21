import styled from "styled-components";

interface ITitleContainerProps {
    lineColor: string;
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    @media(max-width:320px){
        flex-direction: column;
    }
`;

export const TitleContainer = styled.div<ITitleContainerProps>`
    > h1 {
        color: ${props => props.theme.colors.white};
        &::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 10px solid ${props => props.lineColor};
            border-radius: 10px;
        }

        @media(max-width:420px){
            font-size: 18px;
            &::after {
                content: '';
                display: block;
                width: 55px;
                border-bottom: 7px solid ${props => props.lineColor};
                border-radius: 10px;
            }
        }
    }`;

export const Controllers = styled.div`
    display: flex;

    @media(max-width:320px){
        width: 100%;
        justify-content: space-around;
        margin-top: 20px;
    }
`;