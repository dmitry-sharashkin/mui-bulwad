import React from "react";

import styles from "./styles.module.css";

import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useGetCoursesQuery } from "../../store/courses/courses.api";
import dayjs from "dayjs";

export default function Main() {
  const { data } = useGetCoursesQuery();

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {data?.payload.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={6}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <p className={styles.cardText}>{item.description}</p>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Typography>
                    <span>
                      {dayjs(item.created_at).locale("ru").format("DD.MM.YYYY")}
                    </span>
                  </Typography>
                  <Box>
                    <Button size="small">Открыть</Button>
                    <Button size="small">Подписаться</Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
