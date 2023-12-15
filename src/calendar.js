import React, { useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachWeekOfInterval, getMonth, addMonths, subMonths } from 'date-fns';
import Modal from './Modal';
import './calendar.css'

function Calendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState({});
  const [memoModalVisible, setMemoModalVisible] = useState(false);

  
  const weeksInMonth = eachWeekOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };


  const updateSectionHeader = (date) => {
    const headerElement = document.getElementById('section-header');
    if (headerElement) {
      headerElement.textContent = format(date, 'yyyy년 MM월 dd일');
    }
  };

  const handleAddScheduleClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleAddMemoClick = () => {
    setMemoModalVisible(true);
  };
  const handleMemoModalClose = () => {
    setMemoModalVisible(false);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setMemo(memos[newDate.toISOString()] || '');
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const handleAddMemo = () => {
    setMemos({ ...memos, [date.toISOString()]: memo });
  };


  const UnimplementedFunction = () => {
    alert("구현이 덜 된 기능입니다.");
  }

  return (
    <div className="calendar-container">
      <header>
        <div id='logo'>어플리케이션 로고</div>
        <button onClick={() => navigate('/calculator')}>계산기</button>
      </header>
      <div id='content'>
        <header>
          <ul>
            <li onClick={prevMonth}>&lt;</li>       
            <li onClick={UnimplementedFunction}>오늘</li>
            <li onClick={nextMonth}>&gt;</li>
            <li><span>{format(currentDate, 'yyyy년 MM월')}</span></li>
          </ul>
          <button onClick={handleAddScheduleClick}>일정 추가하기</button>
          <button onClick={handleAddMemo}>메모 추가</button>

          {modalVisible && (
            <Modal onClose={handleModalClose}>
              <ul>
                <li>
                  <label for="title">제목</label>
                  <input id='title' type="text" name="title" placeholder='일정 제목' />
                </li>
                <li>
                  <label for="date">날짜</label>
                  <input id='date' type="date" name="date" />
                </li>
                <li>
                  <label for='location'>장소</label>
                  <input id='location' type="text" name="location" placeholder='장소 입력' />
                </li>
                <li>
                  <label for='explanation'>설명</label>
                  <input id='explanation' type="text" name="location" placeholder='설명 추가' />
                </li>
              </ul>
              <button onClick={UnimplementedFunction}>추가</button>
            </Modal>
          )}

{memoModalVisible && (
        <Modal onClose={handleMemoModalClose}>
          <ul>
            <li>
              <label htmlFor="memoTitle">제목</label>
              <input id="memoTitle" type="text" name="memoTitle" placeholder="메모 제목" />
            </li>
            <li>
              <label htmlFor="memoDate">날짜</label>
              <input id="memoDate" type="date" name="memoDate" />
            </li>
            <li>
              <label htmlFor="memoContent">메모 내용</label>
              <textarea
                id="memoContent"
                name="memoContent"
                placeholder="메모를 입력하세요"
                value={memo}
                onChange={handleMemoChange}
              />
            </li>
          </ul>
          <button onClick={handleAddMemo}>메모 추가</button>
        </Modal>
      )}   
      
        </header>
        <div id='flexWrap'>
          <table>
            <thead>
              <tr>
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeksInMonth.map((week, index) => (
                <tr key={index}>
                  {Array.from({ length: 7 }, (_, i) => i).map((dayOfWeek) => {
                    const day = new Date(week.getTime() + dayOfWeek * 24 * 60 * 60 * 1000);
                    const isCurrentMonth = getMonth(day) === getMonth(currentDate);
                    const isDayOver31 = day.getDate() > 31;
                    const isSelected = selectedDate && selectedDate.getTime() === day.getTime();

                    return (
                      <td
                        className={`date ${isSelected ? 'selected' : ''}`}
                        key={day.getTime()}
                        style={{
                          opacity: isCurrentMonth && !isDayOver31 ? 1 : 0.5,
                          background: isSelected ? '#f7f7f7' : '',
                        }}
                        onClick={() => {
                          if (selectedDate) {
                            const selectedDateElement = document.querySelector(
                              `.date[data-date="${format(selectedDate, 'yyyy-MM-dd')}"]`
                            );
                            if (selectedDateElement) {
                              selectedDateElement.style.background = '#fff';
                            }
                          }
                          setSelectedDate(day);
                          updateSectionHeader(day);
                        }}
                      >
                      <div>
                        {format(day, 'dd')}
                      </div>
                      </td>
                      );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div id='section'>
            <header id='section-header'></header>
            <ul id='day-schedule'>
              <li>
                  <span className='line'></span>
                  <span id='schedule_title'>오늘의 할 일</span>
                  <button onClick={UnimplementedFunction}>제거</button>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;