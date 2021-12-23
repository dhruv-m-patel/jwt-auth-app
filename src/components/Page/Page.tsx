import React from "react";
import Grid from "@mui/material/Grid";

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <Grid container spacing={2}>
            <Grid item sm={1} md={2} />
            <Grid item sm={10} md={8}>
                {children}
            </Grid>
        </Grid>
    );
}
