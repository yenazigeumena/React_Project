import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Calculator() {

  // 계산하는 함수
  const calculate = () => {
    // 사용한 변수들
    let minimumWage = document.querySelector("#minimumWage");
    let dailyWorkingHours = document.querySelector("#dailyWorkingHours");
    let workingHoursPerWeek = document.querySelector("#workingHoursPerWeek");
    let monthlyExtendedWorkingHours = document.querySelector("#monthlyExtendedWorkingHours");
    let tax = document.querySelector("#tax");
    let result = document.querySelector("#result");

    let weeklyHolidayAllowance = 0;

    // 주휴수당 계산 조건
    if (dailyWorkingHours.value * workingHoursPerWeek.value >= 15) {
      // 주휴수당 계산식
      const totalWeeklyHours = dailyWorkingHours.value * workingHoursPerWeek.value;
      const totalExtendedHours = monthlyExtendedWorkingHours.value;
      const hourlyWage = minimumWage.value;
      
      const weeklyWage = totalWeeklyHours * hourlyWage;
      const monthlyWage = weeklyWage * 4.33;

      weeklyHolidayAllowance = (monthlyWage + totalExtendedHours * hourlyWage * 4.33) / (workingHoursPerWeek.value * 4.33);
    } else {
      weeklyHolidayAllowance = 0;
    }

    let salary = (minimumWage.value * dailyWorkingHours.value * workingHoursPerWeek.value * 4) + (monthlyExtendedWorkingHours.value * minimumWage.value);
    let calculate = Math.round(salary + weeklyHolidayAllowance -(salary * tax.value));

    result.innerHTML = `월급 : ${salary.toLocaleString("ko-KR")}<br> 주휴수당 : ${weeklyHolidayAllowance.toLocaleString("ko-KR")}<br>세금 : -${Math.round((salary * tax.value)).toLocaleString("ko-KR")}<br>총 금액 : ${calculate.toLocaleString("ko-KR")}`;
    //result.innerHTML = `${weeklyHolidayAllowance}원 입니다.`;
  };
  const reset = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/'); // Calendar 페이지로 이동
  };
  return (
    <div className="calculator-container">
      <header>
      <button onClick={handleGoBack}>뒤로 가기</button>
      </header>
      <div id = "header_content">
          2023 최저시급은 <span>9,620</span>원입니다.
      </div>
      <div id="content">
          <ul>
              <li>
                  <div>
                    시급 -&gt; 월급
                  <select id="target">
                    <option value="1">시급</option>
                    <option value="2">일급</option>
                    <option value="3">주급</option>
                    <option value="4">월급</option>
                    <option value="5">연봉</option>
                  </select>
                  <select id='conversion'>
                    <option value="1">시급</option>
                    <option value="2">일급</option>
                    <option value="3">주급</option>
                    <option value="4">월급</option>
                    <option value="5">연봉</option>
                  </select>
                  </div>
              </li>
              <li>
                <label for="minimumWage">시급</label><input id="minimumWage" placeholder="예시: 9620"/>
              </li>
              <li>
                  <label for="dailyWorkingHours">일일 근무시간</label>
                  <select id="dailyWorkingHours">
                      <option disabled selected hidden>선택</option>
                      <option value="0.5">30분</option>
                      <option value="1">1시간</option>
                      <option value="1.5">1시간 30분</option>
                      <option value="2">2시간</option>
                      <option value="2.5">2시간 30분</option>
                      <option value="3">3시간</option>
                      <option value="3.5">3시간 30분</option>
                      <option value="4">4시간</option>
                      <option value="4.5">4시간 30분</option>
                      <option value="5">5시간</option>
                      <option value="5.5">5시간 30분</option>
                      <option value="6">6시간</option>
                      <option value="6.5">6시간 30분</option>
                      <option value="7">7시간</option>
                      <option value="7.5">7시간 30분</option>
                      <option value="8">8시간</option>
                      <option value="8.5">8시간 30분</option>
                      <option value="9">9시간</option>
                      <option value="9.5">9시간 30분</option>
                  </select>
              </li>
              <li>
                  <label for="workingHoursPerWeek">일주 근무시간</label>
                  <select id="workingHoursPerWeek">
                      <option disabled selected hidden>선택</option>
                      <option value="1">1일</option>
                      <option value="2">2일</option>
                      <option value="3">3일</option>
                      <option value="4">4일</option>
                      <option value="5">5일</option>
                      <option value="6">6일</option>
                      <option value="7">7일</option>
                  </select>
              </li>
              <li>
                  <label for="weekly_overtime_hours">주 연장 근무시간</label>
                  <select id="weekly_overtime_hours">
                      <option disabled selected hidden>선택</option>
                      <option value="0.5">30분</option>
                      <option value="1">1시간</option>
                      <option value="1.5">1시간 30분</option>
                      <option value="2">2시간</option>
                      <option value="2.5">2시간 30분</option>
                      <option value="3">3시간</option>
                      <option value="3.5">3시간 30분</option>
                      <option value="4">4시간</option>
                      <option value="4.5">4시간 30분</option>
                      <option value="5">5시간</option>
                      <option value="5.5">5시간 30분</option>
                      <option value="6">6시간</option>
                      <option value="6.5">6시간 30분</option>
                      <option value="7">7시간</option>
                      <option value="7.5">7시간 30분</option>
                      <option value="8">8시간</option>
                      <option value="8.5">8시간 30분</option>
                      <option value="9">9시간</option>
                      <option value="9.5">9시간 30분</option>
                  </select>
              </li>
              <li>
                  <label for="monthlyExtendedWorkingHours">월 연장 근무시간</label>
                  <select id="monthlyExtendedWorkingHours">
                      <option disabled selected hidden>선택</option>
                      <option value="0.5">30분</option>
                      <option value="1">1시간</option>
                      <option value="1.5">1시간 30분</option>
                      <option value="2">2시간</option>
                      <option value="2.5">2시간 30분</option>
                      <option value="3">3시간</option>
                      <option value="3.5">3시간 30분</option>
                      <option value="4">4시간</option>
                      <option value="4.5">4시간 30분</option>
                      <option value="5">5시간</option>
                      <option value="5.5">5시간 30분</option>
                      <option value="6">6시간</option>
                      <option value="6.5">6시간 30분</option>
                      <option value="7">7시간</option>
                      <option value="7.5">7시간 30분</option>
                      <option value="8">8시간</option>
                      <option value="8.5">8시간 30분</option>
                      <option value="9">9시간</option>
                      <option value="9.5">9시간 30분</option>
                  </select>
              </li>
              <li>
                  <label for="tax">세금</label>
                  <select id="tax">
                      <option disabled selected hidden>선택</option>
                      <option value="0">미적용</option>
                      <option value="0.094">9.4%(4대보험)</option>
                      <option value="0.033">3.3%(소득세)</option>
                  </select>
              </li>
              <li>
                  <button id="calculate" onClick={calculate}>계산하기</button>
                  <button id="reset" onClick={reset}>초기화</button>
              </li>
          </ul> 
      </div>
      <div id='result'></div>
    </div>
  );
}

export default Calculator;