import styled from "styled-components";

interface ITagProps {
    color: string;
}

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};
    list-style: none;
    border-radius: 10px;
    margin: 10px 0;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all.3s;

    position: relative;

    &:hover {
        opacity: .7;
        transform:  translateX(10px);
    }

    >div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }

    > div span{
        font-weight: 500;
        font-size: 18px;
    }
`;

export const Tag = styled.div<ITagProps>`
    position: absolute;
    left: 0;
    background-color: ${props => props.color};
    width: 10px;
    /* height: 60%; */
    height: 100%;
    border-radius: 10px;
`;