'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/calendar.css';

const CalendarComponent = () => {
  const { push } = useRouter();
  //한국 표준시 정확히 가져오기 위하여 선언하였습니다.
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  );

  const [currentMonth, setCurrentMonth] = useState<number>(now.getMonth());
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  // 특정 월의 일수를 계산하는 함수입니다.
  const daysInMonth = (month: number, year: number): number =>
    new Date(year, month + 1, 0).getDate();
  // 특정 월의 첫 날이 무슨 요일인지 계산하는 함수입니다.
  const firstDayOfMonth = (month: number, year: number): number =>
    new Date(year, month, 1).getDay();
  // 현재 보고 있는 월을 저장하는 상태입니다.
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth + 1);
  };
  const handlePrevtMonth = () => {
    setCurrentMonth(currentMonth - 1);
  };
  // 날짜 클릭 핸들러 함수입니다.
  const handleDateClick = (day: number) => {
    // 클릭한 날짜를 담습니다.
    const clickedDate = new Date(now.getFullYear(), currentMonth, day);

    // 조건1. 첫 번째 날짜를 선택하거나 두 번째 날짜를 선택한 후 초기화하는 경우
    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      setSelectedDates({ start: clickedDate, end: null });
    } else if (selectedDates.start && !selectedDates.end) {
      // 조건2. 두 번째 날짜를 선택하는 경우
      if (clickedDate.getTime() === selectedDates.start.getTime()) {
        // 조건2_1. 두 번째 날짜가 첫 번째 날짜와 같은 경우 초기화
        setSelectedDates({ start: null, end: null });
      } else if (clickedDate < selectedDates.start) {
        // 조건2_2. 두 번째 날짜가 첫 번째 날짜보다 이전인 경우
        setSelectedDates({ start: clickedDate, end: selectedDates.start });
      } else {
        // 조건2_3. 두 번째 날짜가 첫 번째 날짜보다 이후인 경우
        setSelectedDates({ ...selectedDates, end: clickedDate });
      }
    }
  };

  // 날짜 범위 시각적으로 표시
  const isSelected = (day: number) => {
    // 주어진 날짜를 생성합니다
    const date = new Date(now.getFullYear(), currentMonth, day);
    if (!selectedDates.start) return false; // 선택된 시작 날짜가 없는 경우
    if (selectedDates.start && !selectedDates.end) {
      // 선택된 시작 날짜만 있는 경우
      return date.getTime() === selectedDates.start.getTime();
    }
    // 선택된 날짜 범위 내에 있는지 확인
    return (
      selectedDates.start &&
      selectedDates.end &&
      date >= selectedDates.start &&
      date <= selectedDates.end
    );
  };

  // 캘린더를 렌더링하는 함수입니다.
  const renderCalendar = () => {
    const daysInCurrentMonth = daysInMonth(currentMonth, now.getFullYear()); // 현재 월의 일수
    const firstDay = firstDayOfMonth(currentMonth, now.getFullYear()); // 현재 월의 첫 날의 요일

    const calendarDays = []; // 현재 월의 일수 들어가는 배열
    // 첫째 날의 앞부분을 빈칸으로 채웁니다,
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty_day"></div>);
    }

    // 월의 날짜 추가
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const isToday = now.getDate() === i && now.getMonth() === currentMonth;
      calendarDays.push(
        <div
          key={i}
          className={`day day${i} ${isSelected(i) ? 'selected' : ''} ${
            isToday && !isSelected(i) ? 'today' : ''
          }`} // 선택된 날짜에 selected 클래스 추가하고, 오늘로 표시되는 날에는 today를 추가합니다
          onClick={() => handleDateClick(i)}
        >
          <span>{i}</span>
        </div>
      );
    }

    // 마지막 날 뒤에 빈칸들 추가
    const remainingDays = 7 - (calendarDays.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        calendarDays.push(
          <div key={`empty-end-${i}`} className="empty_day"></div>
        );
      }
    }

    return calendarDays;
  };

  return (
    <div className="container">
      <button type="button" onClick={() => push('/')} className='home_btn'>
        홈으로
      </button>
      <div className="title">
        <h1>Calendar</h1>
      </div>
      <div className="month">
        <button
          onClick={handlePrevtMonth}
          className={currentMonth === now.getMonth() - 1 ? 'opacity' : ''}
          disabled={currentMonth === now.getMonth() - 1 ? true : false}
        >
          이전
        </button>
        <h3>{currentMonth + 1}월</h3>
        <button
          onClick={handleNextMonth}
          className={currentMonth === now.getMonth() + 1 ? 'opacity' : ''}
          disabled={currentMonth === now.getMonth() + 1 ? true : false}
        >
          다음
        </button>
      </div>
      <div className="date_wrap">
        <div className="start_date">
          시작 날짜 :{' '}
          {selectedDates.start && (
            <p>
              {selectedDates.start.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
        <div className="end_date">
          끝나는 날짜 :{' '}
          {selectedDates.end && (
            <p>
              {selectedDates.end.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>
      <div className="calendar_body">
        <div className="week">
          {week.map((e, i) => {
            return <span key={i}>{e}</span>;
          })}
        </div>
        <div className="day_wrap">{renderCalendar()}</div>
      </div>
    </div>
  );
};

export default CalendarComponent;
