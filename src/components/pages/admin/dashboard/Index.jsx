import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Switch, Route} from 'react-router-dom';
import axios from 'axios';
import withUser from '../../../higher-order/withUser';

import RequestList from './components/list'
import RequestPage from './components/request'

const ParentContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding: 1rem;
    box-sizing: border-box;
    font-size: 16px;
`
const Container = styled.div`
    max-width: 880px;
    margin: 0 auto;
`

const Header = styled.header`
    max-width: 880px;
    margin: 0 auto;
    padding: 0rem 1rem;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    `

const Photo = styled.img`
    display: inline-block;
    width: 40px;
    height :40px;
    border: none;
    border-radius: 50%;
    margin: 0;
`
const Greeting = styled.h5`
    margin: 0;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-size: 0.75rem;
    color: ${props => props.theme.font_dark};
`

const AdminDashboard = (props) => {
    const data = props.user;
    const [user, setUser] = useState(data);
    const [requests, setRequests] = useState([]);

    const requests_fixture = [
        {
            _id: 1,
            twitter: 'sorosole',
            title: 'Water at Lekki',
            description: 'Water at lekki blah blah',
            category: 'logistics',
            status: 'active',
            level: 4,
            notes: [],
        },
        {
            _id: 2,
            twitter: 'sorosole',
            title: 'Oil at Lekki',
            description: 'Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blahSoro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blah Soro soke at lekki blah blahSoro soke at lekki blah blah Soro soke at lekki blah blah',
            category: 'logistics',
            status: 'active',
            level: 4,
            notes: [],
        },
        {
            _id: 3,
            twitter: 'sorosole',
            title: 'Masks at Lekki',
            description: 'Mask at lekki blah blah',
            category: 'legal',
            status: 'new',
            level: 2,
            notes: [{
                id: 1,
                note: 'hello world',
                author: 12345
            }],
        },
        {
            _id: 4,
            twitter: 'sorosole',
            title: 'Show at Agungi',
            description: 'Water at lekki blah blah',
            category: 'medical',
            status: 'active',
            level: 3,
            notes: [],
        }
    ];

    const match = props.match;

    useEffect(()=>{
        if(data.loggedIn){
            setUser(props.user.user)
        }
    }, [data])

    const logout = () => {
        return axios
          .get(`${process.env.REACT_APP_API_PREFIX}/api/auth/logout`)
          .then((res) => {
            if (res.status === 200) {
              localStorage.clear();
              return props.history.push('/');
            }
          })
          .catch((err) => {
              console.log('Request cancelled', err.message);
          });
      };

    return <ParentContainer id='admin_dashboard'>
        <Header>
            <Greeting onClick={logout}>Hi, {user.username ? user.username : 'user'}</Greeting>
        </Header>
        <Container id='admin_dashboard'>
            <Switch>
            <Route
            path={`${match.url}`}
            exact
            component={() => {
              return (
                <RequestList
                  loggedinUser={user}
                />
              );
            }}
          />
          <Route
            path={`${match.url}/:id`}
            component={() => {
              return (
                <RequestPage
                  loggedinUser={user}
                />
              );
            }}
          />
            </Switch>
        </Container>
    </ParentContainer>
}

export default withUser(AdminDashboard, true);
