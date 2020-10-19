import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ParentContainer = styled.div`
  width: 100%;
  font-size: 16px;
  background: ${props => props.color};
  border-radius: 4px;
  border: none;
  height: auto;
  color: #023108;
  margin: 0.5rem 0rem;
  box-sizing: border-box;
`
const Container = styled.div`
  padding: 0.75rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  .title-tiny {
    font-size: 0.75rem;
    display: block;
  }
  .t-m-5 {
    margin-top: 0.5rem;
  }
  `

const Details = styled.div`
  width: calc(100% - 228px);
  margin: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
`
const History = styled.div`
  width: 212px;
  margin: 0;
  margin-left: auto;
  overflow: hidden;
  display: inherit;
  flex-flow: column nowrap;
  justify-content: space-between;
`;
const Title = styled.div`
  margin: 0;
  width: 100%;
`
const CardTitle = styled.h5`
  font-size: 0.75rem;
  margin: 0;
  display: inline-block;
  font-family: 'Noto Sans Regular';
  font-weight: 500;
`
const CardSubTitle = styled.p`
  font-size: 0.75rem;
  margin: 0;
  margin-left:0.5rem;
  display: inline-block;
`
const Figure = styled.h5`
  font-family: 'Noto Sans Regular';
  margin: 0;
  margin-top: 1rem;
  font-weight: 500;
  font-size: 0.5rem;

  strong {
    font-family: 'Josefin Sans Light';
    font-size: 3.5rem;
    font-weight: 500;
  }

  .strong-tiny {
      font-size: 1.5rem;
      font-weight: 500;
    }
`
const Disbursed = styled.div`
  margin-top: 0.75rem;
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  background: rgba(240,254,242,0.3);
`

const HistoryItem = styled.div`
  margin: 0.25rem 0rem;
  width: 100%;
  height: auto;
  padding: 0.25rem;
  overflow: hidden;
  color: rgba(242,254,240, 1);
  background: rgba(0,0,0,0.2);
`

const HistoryTitle = styled.h5`
  margin: 0;
  width: 100%;
  height: 1rem;
  font-size: 0.75rem;
  font-family: 'Noto Sans Regular';
  font-weight: 500;
`

const HistoryValue = styled.h5`
  margin: 0;
  width: 100%;
  height: 1rem;
  font-size: 0.75rem;
  font-family: 'Noto Sans Regular';
  font-weight: 700;
`
const Card = (props) => {
  const propdata = props.data;
  const [data, setData] = useState(propdata)
  useEffect(()=>{
    console.log(propdata)
    setData(propdata)
  }, [propdata])
  const colors = {
   finance: '#7AFA8B', medical: '#9E92EC', legal: '#E3BD9B', 
  }
  return <ParentContainer className='home-card' color={colors[props.type]}>
      <Container>
        <Details>
          <Title>
            <CardTitle><strong>{props.type.toUpperCase()}</strong></CardTitle>
            {props.type === 'finance' && <CardSubTitle>AMOUNT DONATED</CardSubTitle>}
            {props.type === 'legal' && <CardSubTitle>PROTESTERS FREED</CardSubTitle>}
            {props.type === 'medical' && <CardSubTitle>PATIENTS TREATED</CardSubTitle>}
          </Title>
          <Figure>
            <strong>{props.data.total}</strong>
          </Figure>
          <Disbursed>
            <CardTitle className='title-tiny'>DISBURSED</CardTitle>
            <Figure className='t-m-5'>
              <strong className="strong-tiny">{props.data.disbursed}</strong>
            </Figure>
          </Disbursed>
        </Details>
        <History>
          <CardTitle><strong>HISTORY</strong></CardTitle>
          {props.data.history && props.data.history.length > 0 && props.data.history.slice(0,3).map(history=>{
            return <HistoryItem key={history.id}>
              <HistoryTitle>{history.title}</HistoryTitle>
              <HistoryValue>{history.value}</HistoryValue>
            </HistoryItem>
          })}
        </History>
      </Container>
  </ParentContainer>

}

export default Card