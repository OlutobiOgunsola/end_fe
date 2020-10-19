import axios from 'axios';
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

const Label = styled.label`
    position: absolute;
    top: -2000px;
`

const Notes = styled.div`
    display: inherit;
    flex-flow: column nowrap;
    margin: 0;
`

const AddNote = styled.span`
    display: block;
`
const NoteList = styled.span`
    height: auto;
    width: 100%;
`
const Note = styled.p`
    width: 100%;
    margin: 0;
`
const Input = styled.textarea`
    resize: none;
    width: 100%;
    height: 100px;
    padding: 1rem;
    box-sizing: border-box;
    color: #ccc;
    border-radius: 4px;
    border: none;
    background: rgba(0,0,0,0.2);
    box-shadow: 2px 4px 4px rgba(0,0,0,0.25);
    margin-top: 1rem;
    margin-bottom: 1rem;
    transition: all 0.25s ease-in-out;
    font-family: 'Josefin Sans Regular';
    &:focus {
        background: rgba(255,255,255,0.2);
        color: white;
    }
`

const RequestPage = (props) => {
  const match = props.match;

  const [request, setRequest] = useState({
      title: '',
      verified_by: '',
      description: '',
      status: '',
      category: '',
      costs: [],
  });

  useEffect(()=>{
      const id = match.params.id;
      const getRequest = (id) => {
          return axios.get(`${process.env.REACT_APP_API_PREFIX}/api/requests/${id}`).then(res => {
              if(res.status === 200){
                  return setRequest(res.data.data)
              };
          }).then(err => {
              console.log(err)
          })
      };

      getRequest(id)
  }, [])
  return <ParentContainer>
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
                <Status>{request.status ? request.status : ''}</Status>
            </Meta>
        </Details>
        <Notes>
            <AddNote>
                <Label htmlFor='add_note'>Add a note</Label>
                <Input type='text' id='add_note' placeholder='Add a note'/>
            </AddNote>
            <NoteList>
                {request.notes && request.notes.length > 0 && request.notes.map(note => {
                    return <Note>{note}</Note>
                })}
            </NoteList>
        </Notes>
      </Container>
  </ParentContainer>
}

export default withRouter(RequestPage);