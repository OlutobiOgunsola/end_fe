import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from './components/Card';

const ParentContainer = styled.div`
    width: 100%;
    height: 100vh;
    font-size: 16px;
    background: ${props => props.theme.base};
    padding: 2rem;
    box-sizing: border-box;
`
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`

const Finance = styled.span`
    display: inline-block;
    width: 580px;
`
const Medical = styled.span`
    display: inline-block;
    width: 580px;
`

const Legal = styled.span`
    display: inline-block;
    width: 580px;
`

const News = styled.span`
    display: inline-block;
    width: 580px;
    height: 190px;
    overflow-y: scroll;
    margin-top: 10px;
`

const NewsItem = styled.div`
    width: 100%;
    height: 30px;
    font-size: 0.75rem;
    line-height: 30px;
    background: rgba(245,253,243,0.3);
    color: ${props => props.theme.saturated_contrast};
    border-radius: 4px;
    border: none;
    padding: 0rem 0.5rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
    }
`

const Header = styled.header`
    width: 100%;
    height: 50px;
    margin-bottom: 1rem;
    box-sizing: border-box;
    display: inherit;
    flex-flow: row nowrap;
`

const Updates = styled.div`
    width: calc(100% - 176px);
    height: 100%;
`

const Update = styled.span`
    display: inline-block;
    padding: 1rem;
    margin: 0rem 0.5rem;
    box-sizing: border-box;
    height: 100%;
    border: none;
    border-radius: 4px;
    background: rgba(242,254,245,0.3);
    font-family: 'Noto Sans Regular';
    color: ${props => props.theme.saturated_contrast};
    opacity: 0.8;
    transition: all 0.25s ease-in-out;
    &:first-child {
     background: rgba(0,0,0,0);
     opacity: 1;
    }
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`

const Button = styled(Link)`
    width: 150px;
    height: 100%;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    margin: 0;
    padding: 1.5rem 2rem;
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
const Cards = styled.div`
    display: inherit;
    flex-flow: row wrap;
    justify-content: space-between;
`;

const Home = (props) => {
    const state = props.state;
    const [appState, setAppState] = useState(state);

    useEffect(()=>{
        // console.log('state', state)
        if(state.active = true){
            // setAppState(state.data)
        }
    }, [state])

    return <ParentContainer className='home-card'>
    <Container>
        <Header>
            <Updates>
                <Update>Hotspot Updates</Update>
                <Update>LEKKI</Update>
                <Update>NEKEDE</Update>
            </Updates>
            <Button to='/add_request'>New Request ></Button>
        </Header>
        <Cards>
            <Finance>
                <Card type='finance' data={appState ? appState.finance : {}} />
            </Finance>
            <Medical>
                <Card type='medical' data={appState ? appState.medical : {}} />
            </Medical>
            <Legal>
                <Card type='legal' data={appState ? appState.legal : {}} />
            </Legal>
            <News>
                {state.news.map(news => {
                    console.log(news)
                    return <NewsItem key={news.id}>
                        {news.title}
                    </NewsItem>
                })}
            </News>
        </Cards>
    </Container>
</ParentContainer>

}

export default Home