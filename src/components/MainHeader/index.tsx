import React, {useMemo} from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import Toggle from "../Toggle";
import emojis from '../../utils/emojis';

const MainHeader: React.FC = () => {

    const emoji = useMemo(()=>{
        const index = Math.floor(Math.random() * emojis.length);
        return emojis[index];
    },[]);

    return (
        <Container>
            <Toggle />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>dayane lima</UserName>
            </Profile>
        </Container>
    );
}
export default MainHeader;