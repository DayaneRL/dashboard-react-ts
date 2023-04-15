import React from "react";
import { Grid } from "./styles";

import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";

interface ChildrenProps {
    children: React.ReactNode;
};

const Layout: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Content>
                { children }
            </Content>
        </Grid>
    );
}
export default Layout;