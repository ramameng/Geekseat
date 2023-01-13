import {
  AppBar,
  Container,
  Toolbar,
  Grid,
  Typography,
  createTheme,
  Box,
} from "@mui/material";

interface Props {
  children?: JSX.Element | undefined;
}

export default function Appbar(props: Props) {
  const theme = createTheme();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid
                container
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    THE STORY: GEEKSEAT WITCH SAGA - RETURN OF THE CODER
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Made Ramayasa - Braviest Programmer
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <Container
          component="main"
          maxWidth="xl"
          sx={{
            padding: theme.spacing(2, 3, 0, 3),
          }}
        >
          {props.children}
        </Container>
      </Box>
    </>
  );
}
