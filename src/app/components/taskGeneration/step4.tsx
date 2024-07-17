'use client';
// Next.js에서 클라이언트 컴포넌트를 사용하도록 설정합니다.

import React from 'react';
// React 라이브러리를 가져옵니다.

import '@/styles/task.css';
// 스타일 시트를 가져옵니다.

interface TaskDistribution {
  worker: string;
  tasks: number;
  imagesPerTask: number;
}
// TaskDistribution 인터페이스를 정의합니다.
// worker는 작업자의 이름이고, tasks는 할당된 작업의 개수입니다.

interface Step4 {
  distribution: TaskDistribution[];
  onPrev: () => void;
}
// Step4 컴포넌트의 props 타입을 정의합니다.
// distribution은 작업 분배 결과를 나타내는 배열입니다.
// onPrev는 이전 단계로 돌아가는 함수입니다.

const Step4: React.FC<Step4> = ({ distribution, onPrev }) => {
  return (
    <div className="step">
      <div className="container">
        <div className="step_body">
          <div className="title">Step 4: Distribution Results</div>
          <table>
            <thead>
              <tr>
                <th>Worker</th>
                <th>Assigned Tasks</th>
              </tr>
            </thead>
            <tbody>
              {distribution.map((item, index) => (
                <tr key={index}>
                  <td>{item.worker}</td>
                  <td>{item.tasks}</td>
                  <td>{item.imagesPerTask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="btn_wrap">
          <button type="button" onClick={onPrev}>
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
