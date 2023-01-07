import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "../system/colors";
import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {registerUser} from "../services/authService";
import {AxiosError} from "axios/index";
import {ErrorResponse} from "../model/ErrorResponse";
import {isValidEmail} from "../services/validationService";

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

interface SignUpForm {
    username: string,
    password: string,
    email: string
};

const isValidForm = (signUpForm: SignUpForm) => {
    return  isValidEmail(signUpForm.email) && signUpForm.password.length > 0 && signUpForm.username.length > 0;
}

const signUpSubmit = (signUpForm: SignUpForm,
                      navigate: NavigateFunction) => {
    toast.promise(registerUser(signUpForm.username,
        signUpForm.email,
        signUpForm.password), {
        loading: 'Creating user...',
        success: result => {
            navigate("/login");
            return `${result.message}. Please login with your credentials`;
        },
        error: (error:AxiosError<ErrorResponse>) => {
            if(error.response) return error.response.data.message;
            return "Unknown error";
        }
    })
}

const SignUpPage = () => {
    const [signUpForm, setSignUpForm] = useState<SignUpForm>({
        username: "",
        password: "",
        email: ""
    });
    const [clicked, setClicked] = useState(false);
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    error={clicked && signUpForm.username.length < 1}
                                    id="full name"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="family-name"
                                    onChange={(e) => setSignUpForm({
                                        ...signUpForm,
                                        username: e.target.value
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={clicked && !isValidEmail(signUpForm.email)}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setSignUpForm({
                                        ...signUpForm,
                                        email: e.target.value
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={clicked && signUpForm.password.length < 1}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setSignUpForm({
                                        ...signUpForm,
                                        password: e.target.value
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                setClicked(true)
                                if (isValidForm(signUpForm)) {
                                    setClicked(false);
                                    signUpSubmit(signUpForm,navigate);
                                } else {
                                    toast.error('Please fix errors', {duration: 3000});
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignUpPage;
