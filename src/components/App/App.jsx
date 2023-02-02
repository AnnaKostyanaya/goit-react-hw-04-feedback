import { useState } from 'react';
import Statistics from '../Statistics';
import FeedbackOptions from '../FeedbackOptions';
import Notification from '../Notification';
import Section from '../Section';
import { Container } from './App.styled';


export const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const options = {
    good: 0,
    neutral: 0, 
    bad: 0,
  };

const handleIncrement = (vote) => {
    switch (vote) {
    case 'good':
      setGood(state => state + 1);
      break;

    case 'neutral':
      setNeutral(state => state + 1);
      break;

    case 'bad':
      setBad(state => state + 1);
      break;

    default:
      return;
  }
};

const countTotalFeedback = () => {
  return good + neutral + bad;
}; 

const countPositiveFeedbackPercentage = () => {
  const total = countTotalFeedback(); 
  const positivePers = (good / total) * 100;
  const positivePersFixed = (positivePers).toFixed(2);
  if (!total) {
    return 0;
  }
  return Number(positivePersFixed);
}; 

return (
  <Container>
    <Section title="Please leave feedback">
      <FeedbackOptions options={Object.keys(options)} onLeaveFeedback={handleIncrement} />
    </Section>
    {(good > 0 || neutral > 0 || bad) > 0 ? (
        <Section title="Statistics">
          <Statistics good={good} neutral={neutral} bad={bad} countTotal={countTotalFeedback()} countPositive={countPositiveFeedbackPercentage()} />
        </Section>
    ) : (
      <Notification message="There is no feedback" />
    )}
  </Container>
);

}
