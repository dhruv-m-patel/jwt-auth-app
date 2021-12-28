import React from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

interface PageProps {
    children: React.ReactNode;
    fluid?: boolean;
}

export default function Page({ fluid = false, children }: PageProps) {
    return (
        <Container>
            {fluid ? (
                <React.Fragment>{children}</React.Fragment>
            ) : (
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
            )}
        </Container>
    );
}
