import React, {useMemo, useState} from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import emojis from '../../utils/emojis';
import { useTheme } from "../../hooks/theme";
import Toggle from "../Toggle";

const MainHeader: React.FC = () => {

    const {toggleTheme, theme} = useTheme();

    const [darkTheme, setDarkTheme] = useState(()=> theme.title==='dark'?true:false);

    const emoji = useMemo(()=>{
        const index = Math.floor(Math.random() * emojis.length);
        return emojis[index];
    },[]);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return (
        <Container>
            <Toggle 
                labelLeft='Light'
                labelRight='Dark'
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>dayane lima</UserName>
            </Profile>
        </Container>
    );
}
export default MainHeader;