import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "../system/colors";
import {loginUser} from "../services/authService";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {ErrorResponse} from "../model/ErrorResponse";
import {useState} from "react";
import {isValidEmail} from "../services/validationService";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Link from "@mui/material/Link";

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" >
                Office Management Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const isValidForm = (loginForm: LoginForm) => {
    return  isValidEmail(loginForm.email) && loginForm.password.length > 0;
}

const loginSubmit = (email: string,
                      password: string,
                     navigate: NavigateFunction) => {
    toast.promise(loginUser(email, password), {
        loading: 'Logging in...',
        success: result => {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
            return `Welcome back ${result.username} !`;
        },
        error: (error:AxiosError<ErrorResponse>) => {
            if(error.response) return error.response.data.message;
            return "Unknown error";
        }
    })
};

interface LoginForm {
    email: string,
    password: string
}

const LoginPage = () => {
    const [clicked, setClicked] = useState(false);
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={clicked && !isValidEmail(loginForm.email)}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setLoginForm({
                                ...loginForm,
                                email: e.target.value
                            })}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={clicked && loginForm.password.length < 1}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setLoginForm({
                                ...loginForm,
                                password: e.target.value
                            })}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                setClicked(true);
                                if (isValidForm(loginForm)) {
                                    setClicked(false);
                                    loginSubmit(loginForm.email, loginForm.password, navigate);
                                } else {
                                    toast.error('Please fix errors', {duration: 3000});
                                }
                            }}
                            endIcon={<LockOpenIcon />}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage;
