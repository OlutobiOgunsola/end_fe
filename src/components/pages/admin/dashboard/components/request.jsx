import axios from 'axios';
import React, {useState, useEffect} from 'react';
import styled, {withTheme} from 'styled-components';
import {withRouter, Link} from 'react-router-dom';

const ParentContainer = styled.div`
    width: 100%;
    height: auto;
`
const Container = styled.div`
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    @media(max-width: 600px){
        flex-flow: column nowrap;
    }
`

const Main = styled.div`
    display: inherit;
    flex-flow: column nowrap;
    width: calc(100% - 316px);

    @media(max-width: 780px){
        width: calc(100% - 266px);   
     }

     @media(max-width: 600px){
        width: 100%;
    }
`

const Side = styled.div`
    display: inherit;
    flex-flow: column nowrap;
    width: 300px;

    @media(max-width: 780px){
        width: 250px;
    }
    @media(max-width: 600px){
        width: 100%;
    }
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
    padding: 0.25rem;
    box-sizing: border-box;
    font-family: 'Josefin Sans Regular';
    font-size: 0.5rem;
    background: ${props => props.theme.base};
    color: #eee;
    border: none;
    border-radius: 4px;
    display: inline-block;
    margin-left: auto;
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
    border: solid 1px ${props => props.theme.base};
    border-radius: 4px;
    position: relative;
    padding: 1rem 0.5rem;
    margin-top: 1.5rem;
    box-sizing: border-box;
    @media(max-width:500px){
        padding: 0.5rem;
    };
    
    h6 {
        font-family: 'Noto Sans Regular';
        font-size: 1rem;
        position: absolute;
        top: -3rem;
        padding: 0rem 1rem;
        box-sizing: border-box;
        background: white;
    };
`
const Note = styled.p`
    width: 100%;
    margin: 0.5rem 0rem;
    padding: 1rem 0rem;
    box-sizing: border-box;
    border-bottom: solid 1px ${props => props.theme.base};
    font-family: 'Josefin Sans Light';
    font-weight: 700;
    font-size: 0.75rem;
    color: ${props => props.theme.font_dark};
`
const Input = styled.textarea`
    resize: none;
    width: 100%;
    height: 50px;
    padding: 1rem;
    box-sizing: border-box;
    color: #aaa;
    border-radius: 4px;
    border: none;
    background: rgba(0,0,0,0.1);
    margin-top: 1rem;
    margin-bottom: .5rem;
    transition: all 0.25s ease-in-out;
    font-family: 'Josefin Sans Regular';
    &:focus {
        background: rgba(255,255,255,0.2);
        color: ${props => props.theme.font_dark};
    }
`
const InputTiny = styled.input`
    resize: none;
    width: 100%;
    height: 30px;
    padding: 0.5rem;
    box-sizing: border-box;
    color: #aaa;
    border-radius: 4px;
    border: none;
    background: rgba(0,0,0,0.1);
    margin-top: 1rem;
    transition: all 0.25s ease-in-out;
    font-family: 'Josefin Sans Regular';
    &:focus {
        background: rgba(255,255,255,0.2);
        color: ${props => props.theme.font_dark};
    }
`

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

const Actions = styled.section`
  height: 30px;
  width: 100%;
`
const Action = styled.span`
    padding: 0.25rem;
    margin-right: 0.5rem;
    border-radius: 4px;
    border: none;
    opacity: 0.7;
    box-sizing: border-box;
    color: white;
    font-family: 'Noto Sans Regular';
    font-size: 0.5rem;
    transition: all 0.25s ease-in-out;
    background: ${props => {
        switch(props.color){
            case 'red': 
              return props.theme.red;
            case 'green': 
              return props.theme.base;
            default: 
              return null;
        }
    }};
    
    &:hover{
        cursor: pointer;
        opacity: 1;
    }
`

const Costs = styled.section`
    width: 100%;
    height: auto;
    @media(max-width: 600px){
        max-height: 250px;
        overflow-y: scroll;
    }
`

const AddCost = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
`

const CostTitle = styled.div`
    width: calc(100% - 116px);
`

const Amount = styled.div`
    width: 100px;
    margin-left: auto;
`

const Justification = styled.div`
    width: 100%;
`

const CostList = styled.div`
    width: 100%;
    margin: 0;
    margin-top: 1rem;
    box-sizing: border-box;
    h6 {
        margin: 0.5rem 0rem 1rem 0rem;
    }
`

const Button = styled(Link)`
    width: 50px;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    margin: 0;
    margin-left: auto;
    padding: 0.5rem;
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
    font-size: 0.75rem;
    border-radius: 4px;
    border: none;
    background: ${props => props.theme.base};
    color: white;
    opacity: 0.8;
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 1;
    }
`
const CostItem = styled.div`
    width: 100%;
    height: auto;
    background: rgba(0,0,0,0.1);
    margin: 0;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    border: none;
    padding: 0.5rem;
    box-sizing: border-box;
`

const CostHeader = styled.header`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    margin: 0rem 0rem 0.5rem 0rem;
`
const TitleBar = styled.h5`
    font-family: 'Noto Sans Regular';
    font-size: 0.75rem;
    color: ${props => props.theme.font_dark};
    width: calc(100%-91px);
    margin: 0;
`
const AuthorBar = styled.p`
    font-family: 'Noto Sans Regular';
    font-size: 0.5rem;
    color: ${props => props.theme.font_dark};
    width: 75px;
    margin: 0;
    margin-left: auto;
`


const CostAmount = styled.h4`
    font-family: 'Josefin Sans Regular';
    font-size: 0.75rem;
    color: ${props => props.theme.font_dark};
    width: 100%;
    margin: 0rem 0rem 0.5rem 0rem;
`

const CostJustification = styled.p`
    font-family: 'Noto Sans Regular';
    font-size: 0.5rem;
    color: ${props => props.theme.font_dark};
    width: 100%;
    margin: 0rem 0rem 0.5rem 0rem;
`

const RequestPage = (props) => {
  const match = props.match;
  const user = props.loggedinUser;
  const [addCost, setAddCost] = useState(false);

  const [note, setNote] = useState('');

  const [costTitle, setCostTitle] = useState('');
  const [costAmount, setCostAmount] = useState(0);
  const [costJustification, setCostJustification] = useState('');
  const [render, setRender] = useState(false);

  const handleNote = (e) => {
    const value = e.target.value;
    return setNote(prev => {
        return value;
    })
}

  const handleCostTitle = (e) => {
      const value = e.target.value;
      return setCostTitle(prev => {
          return value;
      })
  }

  const handleCostAmount = (e) => {
    const value = e.target.value;
    return setCostAmount(prev => {
        return value;
    })
}

const handleCostJustification = (e) => {
    const value = e.target.value;
    return setCostJustification(prev => {
        return value;
    })
}

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
          return axios.get(`${process.env.REACT_APP_API_PREFIX}/api/request/${id}`).then(res => {
              if(res.status === 200){
                  return setRequest(res.data.data)
              };
          }).catch(err => {
              console.log(err)
          })
      };

      getRequest(id)
  }, [render])

  const showAddCost = () => {
      return setAddCost(!addCost)
  }

  const submitAddCost = (e) => {
      e.preventDefault();

      const headers = {
        Authorization: `Bearer ${user.jwt}`,
        'Content-Type': 'application/json'
      }

      const costObj = {};
      costObj.title = costTitle;
      costObj.justification = costJustification;
      costObj.amount = costAmount;
      costObj.parent_request = request._id;
      return axios.post(`${process.env.REACT_APP_API_PREFIX}/api/costs/add`, costObj, {
          headers, withCredentials: true,
      }).then(res => {
          if(res.status === 200){
              alert('Cost added successfully');
              setRender(!render);
          }
      }).catch(err => {
          alert('Error adding cost');
          console.log(err)
      });
  }

  const submitAddNote = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${user.jwt}`,
      'Content-Type': 'application/json'
    }

    const noteObj = {};
    noteObj.note = note;
    return axios.post(`${process.env.REACT_APP_API_PREFIX}/api/request/${request._id}/add_note`, noteObj, {
        headers, withCredentials: true,
    }).then(res => {
        if(res.status === 200){
            alert('Note added successfully');
            setRender(!render);
        }
    }).catch(err => {
        alert('Error adding note');
        console.log(err)
    });
}

const verifyRequest = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${user.jwt}`,
      'Content-Type': 'application/json'
    }
    return axios.post(`${process.env.REACT_APP_API_PREFIX}/api/request/${request._id}/verify`, null, {
        headers, withCredentials: true,
    }).then(res => {
        if(res.status === 200){
            alert('Request verified');
            setRender(!render);
        }
    }).catch(err => {
        alert('Error verifying request');
        console.log(err)
    });
}

const pushRequest = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${user.jwt}`,
      'Content-Type': 'application/json'
    }
    return axios.post(`${process.env.REACT_APP_API_PREFIX}/api/request/${request._id}/push`, null, {
        headers, withCredentials: true,
    }).then(res => {
        if(res.status === 200){
            alert('Request verified');
            setRender(!render);
        }
    }).catch(err => {
        alert('Error verifying request');
        console.log(err)
    });
}

  return <ParentContainer>
      <Container>
          <Main>
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
                <Verified>Verified by {request.verified_by && request.verified_by !== '' ? request.verified_by.username : 'UNVERIFIED'}</Verified>
            </Meta>
        </Details>
        <Actions>
            <Action color='green' onClick={showAddCost}>Add Cost</Action>
            {request.verified && <Action color='green' onClick={pushRequest}>Push to level {`${request.level+1}`}</Action>}
            {!request.verified && <Action color='green' onClick={verifyRequest}>Mark as Verified</Action>}
            <Action color='red'>Flag</Action>
            <Status>{request.status ? request.status : ''}</Status>
        </Actions>
        <Costs>
            {addCost && <AddCost>
                <CostTitle>
                    <Label htmlFor='add_cost_title'>Add title</Label>
                    <InputTiny value={costTitle} onChange={handleCostTitle} type='numer' id='add_cost_title' placeholder='Title'/>
                </CostTitle>
                <Amount>
                    <Label htmlFor='add_cost_amount'>Add amount</Label>
                    <InputTiny value={costAmount} onChange={handleCostAmount} type='number' id='add_cost_amount' placeholder='Amount'/>
                </Amount>
                <Justification>
                    <Label htmlFor='add_cost_justification'>Add a justification</Label>
                    <Input value={costJustification} onChange={handleCostJustification} type='text' id='add_cost_justification' placeholder='Input justification'/>
                </Justification>
                <Button to='#' onClick={submitAddCost}>></Button>
            </AddCost>}
            <CostList>
            <h6>COSTS</h6>
                {request.costs && request.costs.length > 0 && request.costs.reverse().map(cost => {
                    return <CostItem key={cost._id}>
                                <CostHeader><TitleBar>{cost.title}</TitleBar><AuthorBar>{cost.requester.username}</AuthorBar></CostHeader>
                                <CostAmount>{cost.amount}</CostAmount>
                                <CostJustification>{cost.justification}</CostJustification>
                                <Actions>
                                    <Action color='green'>Approve</Action>
                                    <Action color='red'>Reject</Action>
                                </Actions>
                            </CostItem>
                })}
                {request.costs && request.costs.length === 0 && <>
                    <EmptyStateText>No costs!</EmptyStateText>
                    <EmptyStateSubtext>This request has no costs yet. Add a cost above.</EmptyStateSubtext>
                </>}
            </CostList>
        </Costs>
        </Main>
        <Side>
        <Notes>
            <AddNote>
                <Label htmlFor='add_note'>Add a note</Label>
                <Input onChange={handleNote} value={note} type='text' id='add_note' placeholder='Add a note'/>
                <Button  to='#' onClick={submitAddNote}>></Button>
            </AddNote>
            <NoteList>
            <h6>NOTES</h6>
                {request.notes && request.notes.length > 0 && request.notes.reverse().map(note => {
                    return <Note>{note.note} - {note.author}</Note>
                })}
                {request.notes && request.notes.length === 0 && <>
                    <EmptyStateText>No notes!</EmptyStateText>
                    <EmptyStateSubtext>This request has no notes yet. Add a note above.</EmptyStateSubtext>
                </>}
            </NoteList>
        </Notes></Side>
      </Container>
  </ParentContainer>
}

export default withRouter(withTheme(RequestPage));