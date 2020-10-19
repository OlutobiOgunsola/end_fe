import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import {Link, withRouter} from 'react-router-dom';
import Axios from 'axios';

const ParentContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: ${props => props.theme.base};
    padding: 1rem;
    box-sizing: border-box;
    font-size: 16px;
    overflow: hidden;
`
const Container = styled.div`
    max-width :  300px;
    height: 30%;
    margin: 0 auto;
    position: relative;
    top: 35%;
`

const SubTitle = styled.h5`
    font-family: 'Noto Sans Regular';
    color: ${props => props.theme.saturated_contrast};
    margin: 1rem 0rem 0.5rem 0rem;
    text-align: center;
`

const Form = styled.form`
    width: 100%;
    height: auto;
    display: flex;
    flex-flow: column nowrap;
    padding: 0rem 0.5rem;
    box-sizing: border-box;
`
const Label = styled.label`
    position: absolute;
    top: -2000px;
`
const Input = styled.input`
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 0.75rem;
    /* border: solid .5px #ccc; */
    padding: 0.5rem;
    box-sizing: border-box;
    color: #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
    box-sizing: border-box;
    border: none;
    background: rgba(0,0,0,0.2);
    box-shadow: 2px 4px 4px rgba(0,0,0,0.25);
    transition: all 0.25s ease-in-out;
    font-family: 'Josefin Sans Regular';
    &:focus {
        background: rgba(255,255,255,0.2);
        color: white;
    }
`

const Button = styled(Link)`
    width: 150px;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    margin: 0 auto;
    padding: 1.5rem 1rem;
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
    font-size: 0.75rem;
    border-radius: 4px;
    border: none;
    line-height: calc(100% - 1rem);
    background: #E3C14B;
    color: white;
    opacity: 0.8;
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 1;
    }
`
const EmptyStateText = styled.h5`
  font-family: 'Noto Sans Regular';
  text-align: center;
  color: ${(props) => props.theme.saturated_contrast};
  margin: 16px 0px 8px 0px;
  width: 100%;
`;
const EmptyStateSubtext = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin: 0px 0px 40px 0px;
  color: ${(props) => props.theme.saturated_contrast};
`;

const Auth = (props) => {
    const [username, setUsername]= useState('');
    const [pwd, setPwd]= useState('');
    const handleUsername = (e) => {
        const value = e.target.value
        return setUsername(prev => {return value})
    }

    const handlePwd = (e) => {
        const value = e.target.value
        return setPwd(prev => {return value})
    }
    
    const submit = () => {
        const headers = {
             'Content-Type': 'application/json',
        }

        const reqObj = {};
        reqObj.username = username;
        reqObj.password = pwd;

        return Axios.post(`${process.env.REACT_APP_API_PREFIX}/api/auth/login`, reqObj, {
            headers
        }).then(res=>{
            if(res.status === 200) {
                localStorage.setItem('endsars_id', res.data.data._id);
                props.history.push('/endsars/admin_secure')
            }
        }).catch(err => {
            console.log(err)
            alert('Error logging in. Invalid credentials')
        })
    }

  return <ParentContainer>
      <Container>
        <Form>
            <SubTitle>Enter details to login</SubTitle>
            <Label htmlFor='title'>Username</Label>
            <Input onChange={handleUsername} name='username' id='username' type='text' placeholder='Username' />
            <Label htmlFor='password'>Password</Label>
            <Input onChange={handlePwd} name='password' id='password' type='password' placeholder='Password'/>
            <Button to='#' onClick={submit}>Submit</Button>
        </Form>
      </Container>
  </ParentContainer>
}

export default withRouter(Auth);