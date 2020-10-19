import React, { useState, useEffect } from 'react';
import styled, {withTheme} from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import RequestItem from '@/components/UI/Request';

const ParentContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  z-index: 9;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
`;

const Container = styled.div`
  width: 100%;
`;

const EmptyStateText = styled.h5`
  text-align: center;
  color: ${(props) => props.theme.font_dark};
  margin: 16px 0px 8px 0px;
  width: 100%;
`;
const EmptyStateSubtext = styled.p`
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin: 0px 0px 40px 0px;
  color: ${(props) => props.theme.font_dark};
`;

const Filter=  styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 1rem;
    .selected {
        background: #F0FEF2;
        color: ${props => props.theme.green};
    }
`
const Tag = styled.span`
    padding: 0.5rem;
    margin-right: 1rem;
    box-sizing: border-box;
    transition: all 0.25s ease-in-out;
    border-radius: 4px;
    border: none;
    font-family: 'Noto Sans Regular';
    font-size: 0.75rem;
    &:hover{
        cursor:pointer;
        background: #F0FEF2;
    }
`
const Input = styled.input`
    width: 200px;
    height: 30px;
    line-height: 30px;
    font-size: 0.75rem;
    padding: 0.5rem;
    margin-right: 1rem;
    box-sizing: border-box;
    color: #aaa;
    border-radius: 4px;
    border: none;
    background: rgba(0,0,0,0.2);
    transition: all 0.25s ease-in-out;
    font-family: 'Josefin Sans Regular';
    &:focus {
        background: rgba(255,255,255,0.2);
        color: ${props => props.theme.font_dark};
    }
`

const RequestList = (props) => {
 const [requests, setRequests] = useState([]);

  useEffect(()=>{
    const getRequests = () => {
        return axios.get(
            `${process.env.REACT_APP_API_PREFIX}/api/request`
        ).then(res => {
            if(res.status === 200){
                setRequests(res.data.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getRequests();
}, [])

  const sortBy = (sortOrder) => {
    const requestsClone = [...requests];

    switch (sortOrder) {
      case 'status':
        const sortedRating = requestsClone.sort((a, b) => {
          return a.status === 'new';
        });
        return setRequests(sortedRating);
      case 'newest':
        const sortedNewest = requestsClone.sort((a, b) => {
          return a.createdAt > b.createdAt;
        });
        return setRequests(sortedNewest);
      default: return requestsClone;
    }
  };

  return (
    <>
      <ParentContainer id="list_requests">
        <Container>
            <Filter>
                <Input type='search' id='search' placeholder='Search' />
                <Tag data-name='new'>New</Tag>
                <Tag data-name='auth'>Authorized</Tag>
            </Filter>
          {requests.length > 0 && requests.reverse().map((request) => {
            return (
              <RequestItem
                user_id={props.loggedinUser._id}
                user_photo={props.loggedinUser.photo}
                key={request._id}
                request={request}
                user_token={props.loggedinUser.jwt}
              />
            );
          })}
          {requests.length === 0 && 
          <> 
            <EmptyStateText>No requests</EmptyStateText>
            <EmptyStateSubtext>No requests available at this time</EmptyStateSubtext>
          </>}
        </Container>
      </ParentContainer>
    </>
  );
};

RequestList.propTypes = {
    user_id: PropTypes.string,
    user_photo: PropTypes.string,
    requests: PropTypes.array,
};

export default withTheme(withRouter(RequestList));
