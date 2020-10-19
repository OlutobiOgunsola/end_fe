import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {withRouter} from 'react-router-dom';

const ParentContainer = styled.div`
    width: 100%;
    height: auto;
    background: #eee;
    margin-bottom: 0.5rem;
    border: none;
    border-radius: 4px;
    transition: all 0.25s ease-in-out;
    &:hover {
        transform: scale(1.01);
        cursor: pointer;
    }
`
const Container = styled.div`
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
`

const Title = styled.header`
    width: 100%;
    display: inherit;
    flex-flow: row nowrap;
`
const Copy = styled.h4`
    margin: 0;
    font-family: 'Noto Sans Regular';
    font-size: 1rem;
    display: inline-block;
    margin-right: 1rem;
`
const Details = styled.div`
    width: 100%;
    margin: 0;
`
const Description = styled.p`
    width: 100%;
    font-family: 'Josefin Sans Regular';
    font-size: 0.75rem;
    color: ${props =>props.theme.font_dark};
`

const Meta = styled.aside`
    width: 100%;
`
const Verified = styled.p`
    font-family: 'Josefin Sans Regular';
    font-size: 0.5rem;
`
const Status = styled.span`
    padding: 0.5rem;
    box-sizing: border-box;
    font-family: 'Josefin Sans Regular';
    font-size: 0.5rem;
    background: ${props => props.theme.base};
    color: #eee;
    border: none;
    border-radius: 4px;
    margin-left: auto;
    display: block;
    width: fit-content;
`

const Author = styled.p`
    margin: 0;
    padding: 0.25rem 0rem;
    box-sizing: border-box;
    display: inline-block;
    font-family: 'Josefin Sans Regular';
    font-size: 0.75rem;
    line-height: 1rem;
`

const RequestItem = (props) => {
  const data = props.request;

  const [request, setRequest] = useState({
      title: '',
      verified_by: '',
      description: '',
      status: '',
      _id: 'asdasd'
  });

  useEffect(()=>{
      if(data._id !== ''){
          setRequest(data)
      }
  }, [data])

  const goToRequest = () => {
    return props.history.push(`/endsars/admin_secure/requests/${request._id}`)
  };
  return <ParentContainer onClick={goToRequest}>
      <Container>
        <Title>
            <Copy>{request.title !== '' ? request.title : ''}</Copy>
            <Author>
                - @{request.twitter !== '' ? `${request.twitter} | twitter` : `${request.instagram} | instagram`}
            </Author>
        </Title>
        <Details>
            <Description>
                {request.description !== '' ? request.description : ''}
            </Description>
            <Meta>
                <Verified>Verified by {request.verified_by !== '' ? request.verified_by : ''}</Verified>
                <Status>{request.status}</Status>
            </Meta>
        </Details>
      </Container>
  </ParentContainer>
}

export default withRouter(RequestItem);