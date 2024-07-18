'use client';
import React from 'react';

import '@/styles/task.css';

interface TaskDistribution {
  worker: string;
  tasks: number;
  objectsPerTask: number;
  ImagesPerTask: number;
}

interface Step4 {
  distribution: TaskDistribution[];
  onPrev: () => void;
  mode: 'object' | 'task';
}

const Step4: React.FC<Step4> = ({ distribution, onPrev, mode }) => {
  return (
    <div className="step">
      <div className="container">
        <div className="step_body">
          <div className="title">Step 4</div>
          <table>
            <thead>
              {mode === 'object' ? (
                <tr>
                  <th>작업자</th>
                  <th>분배 받은 Task</th>
                  <th>작업 할 이미지 갯수</th>
                </tr>
              ) : (
                <tr>
                  <th>작업자</th>
                  <th>분배 받은 Task</th>
                  <th>Task 당 이미지 갯수</th>
                </tr>
              )}
            </thead>
            <tbody>
              {distribution.map((item, index) => (
                <>
                  {mode === 'object' ? (
                    <tr>
                      <td>{item.worker}</td>
                      <td>{item.objectsPerTask}</td>
                      <td>{item.tasks}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{item.worker}</td>
                      <td>{item.tasks}</td>
                      <td>{item.ImagesPerTask}</td>
                    </tr>
                  )}
                </>
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
