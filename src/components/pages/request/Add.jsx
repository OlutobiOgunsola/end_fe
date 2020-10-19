import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom';
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
    max-width :  880px;
    height: auto;
    margin: 0 auto;
`

const SubTitle = styled.h5`
    font-family: 'Noto Sans Regular';
    color: ${props => props.theme.saturated_contrast};
    margin: 1rem 0rem 0.5rem 0rem;
`

const Form = styled.form`
    width: 100%;
    height: auto;
    display: flex;
    flex-flow: column nowrap;
    padding: 0rem 0.5rem;
    box-sizing: border-box;
`

const Categories = styled.div`
    width: 100%;
    height: 100px;
    display: inherit;
    flex-flow: row nowrap;
    margin-bottom: 2rem;
    box-sizing: border-box;
    justify-content: space-between;
    .selected{
        background: rgba(255,255,255,0.2);
        border: solid .5px #7AFA8B;
        border-radius: 4px;

        span .circle {
            background: #7AFA8B;
        }
    }
`

const Category = styled.span`
    width: 19%;
    height: 100%;
    display: inherit;
    flex-flow: column nowrap;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    border: none;
    position: relative;
    border-radius: 4px;
    background: rgba(0,0,0,0.2);
    color: #ccc;
    border-radius: 4px;
    transition: all 0.25s ease-in-out;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`

const Head = styled.span`
    height: 20px;
    line-height: 20px;
    width: 100%;
`

const Circle = styled.span`
    width: 10px;
    height: 10px;
    border: solid .5px #ccc;
    border-radius: 50%;
    position: absolute;
    right: 16px;
    top: 12px;
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

const Description = styled.textarea`
    resize: none;
    width: 100%;
    height: 150px;
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

const Icon = styled.span`
    height: calc(100% - 20px);
`

const Contact = styled.div`
    width: 100%;
    height: 30px;
    display: inherit;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
    box-sizing: border-box;
`

const Insta = styled.span`
    width: calc(50% - 8px);
`

const Twitter = styled.span`
    width: calc(50% - 8px);
`

const Button = styled(Link)`
    width: 150px;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    margin: 0;
    margin-left: auto;
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

const AddRequest = (props) => {

    const medRef = useRef(null);
    const legalRef = useRef(null);
    const logisticsRef = useRef(null);
    const emergencyRef = useRef(null);
    const othersRef = useRef(null);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [twitter, setTwitter] = useState('');
    const [insta, setInsta] = useState('');
    const [category, setCategory] = useState('');
    const [success, setSuccess] = useState(false)
    const [reqID, setReqID] = useState('') 

    const refArray = [medRef, legalRef, logisticsRef, emergencyRef, othersRef];

    const selectCategory = (e) => {
        e.preventDefault();
        const target = e.target;
        refArray.forEach(ref => {
             ref.current.classList.remove('selected')
             return null;
        })

        target.classList.add('selected');
        setCategory(target.dataset.name);
        return null;
    }

    const noPropagate = (e) => {
        e.stopPropagation();
    };

    const handleTitle = (e) => {
        const value = e.target.value
        return setTitle(prev => {return value})
    }

    const handleDesc = (e) => {
        const value = e.target.value
        return setDesc(prev => {return value})
    }
    
    const handleTwitter = (e) => {
        const value = e.target.value
        return setTwitter(prev => {return value})
    }

    const handleInsta = (e) => {
        const value = e.target.value
        return setInsta(prev => {return value})
    }

    const submit = () => {
        const headers = {
             'Content-Type': 'application/json',
        }

        const reqObj = {};
        reqObj.title = title;
        reqObj.description = desc;
        reqObj.insta = insta;
        reqObj.twitter = twitter;
        reqObj.request_category = category;

        return Axios.post(`${process.env.REACT_APP_API_PREFIX}/api/request/add`, reqObj, {
            headers
        }).then(res=>{
            if(res.status === 200) {
                setSuccess(true);
                setReqID(res.data.data._id)
            }
        }).catch(err => {
            alert('Error adding request. Please try again')
        })
    }

  return <ParentContainer>
      <Container>
        {success && 
            <>
                <EmptyStateText>Success!</EmptyStateText>
                <EmptyStateSubtext>You have successfully logged a request. Your request id is {reqID !== '' ? `${reqID}` : 'undefined lol. Go back home'}</EmptyStateSubtext>
                <Button to='/'>Go Home</Button>
            </>
        }

        {!success && 
        <>
        <Button to='/'>Go Back</Button>
        <Form>
            <SubTitle>Choose a category</SubTitle>
            <Categories>
                <Category data-name='medical' ref={medRef} onClick={selectCategory}>
                   <Head onClick={noPropagate}>Medical <Circle className='circle'/></Head>
                </Category>

                <Category data-name='legal' ref={legalRef} onClick={selectCategory}>
                <Head onClick={noPropagate}>Legal <Circle className='circle'/></Head>
                </Category>

                <Category data-name='logistics' ref={logisticsRef} onClick={selectCategory}>
                <Head onClick={noPropagate}>Logistics <Circle className='circle'/></Head>          
                </Category>

                <Category data-name='others' ref={othersRef} onClick={selectCategory}>
                <Head onClick={noPropagate}>Others <Circle className='circle' /></Head>                    
                </Category>

                <Category data-name='emergency' ref={emergencyRef} onClick={selectCategory}>
                <Head onClick={noPropagate}>Emergency <Circle className='circle'/></Head>                    
                </Category>
            </Categories>
            <Label htmlFor='title'>Title</Label>
            <Input value={title} onChange={handleTitle} name='title' id='title' type='text' placeholder='Title' />
            <Label htmlFor='description'>Description</Label>
            <Description value={desc} onChange={handleDesc} name='description' id='description' placeholder='Description'/>
            <SubTitle>How can we reach you?</SubTitle>
            <Contact>
                <Insta>
                    <Input  value={insta} onChange={handleInsta} name='insta' id='insta_handle' type='text' placeholder='IG handle' />
                    <Label htmlFor='insta'>Instagram handle</Label>
                </Insta>
                <Twitter>
                    <Input value={twitter} onChange={handleTwitter} name='twitter' id='twitter_handle' type='text' placeholder='Twitter handle' />
                    <Label htmlFor='twitter'>Twitter handle</Label>
                </Twitter>
            </Contact>
            <Button to='#' onClick={submit}>Submit</Button>
        </Form>
        </>
        }
      </Container>
  </ParentContainer>
}

export default AddRequest;