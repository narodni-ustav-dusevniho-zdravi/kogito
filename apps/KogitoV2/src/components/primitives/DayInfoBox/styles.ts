import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    margin-top: 2px;
    background-color: rgba(255, 231, 231, 0.5);
  `,
  Wrapper: styled.View`
    flex-direction: row;
  `,
  DayBox: styled.View`
    background-color: #ffe7e7;
    flex: 0 0 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
  `,
  TitleBox: styled.View`
    flex: 1 1 auto;
    padding: 12px 24px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.Text`
    color: #3c3f64;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
  `,
  TextDay: styled.Text`
    color: #3b0600;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
  `,
  TextDayInWeek: styled.Text`
    color: #3b0600;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
  `,
};

export default S;
