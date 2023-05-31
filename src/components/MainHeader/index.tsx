import React, {useMemo, useState} from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import Toggle from "../Toggle";
import emojis from '../../utils/emojis';
import { useTheme } from "../../hooks/theme";

const MainHeader: React.FC = () => {

    const {toggleTheme, theme} = useTheme();

    const [darkTheme, setDarkTheme] = useState(()=> theme.title==='dark'?true:false);

    const emoji = useMemo(()=>{
        const index = Math.floor(Math.random() * emojis.length);
        return emojis[index];
    },[]);

    return (
        <Container>
            <Toggle 
                labelLeft='Light'
                labelRight='Dark'
                checked={darkTheme}
                onChange={()=>{
                    setDarkTheme(!darkTheme);
                    toggleTheme();
                }}
            />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>dayane lima</UserName>
            </Profile>
        </Container>
    );
}
export default MainHeader;