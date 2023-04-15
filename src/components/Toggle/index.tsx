import React from "react";
import { Container, ToggleLabel, ToggleSelector } from "./styles";

const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector 
            checked={true} 
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={()=>{}}
        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
);
export default Toggle;