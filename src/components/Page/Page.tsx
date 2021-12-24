import React from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

interface PageProps {
    children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
    return (
        <Container>
            <Grid
                container
                spacing={2}
                columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            >
                <Grid item xs={1} sm={1} md={3} lg={4} />
                <Grid item xs={10} sm={10} md={6} lg={4}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
}
