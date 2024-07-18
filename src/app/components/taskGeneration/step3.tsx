'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/task.css';
import { MockUser } from '@/app/api/users/route';

interface Step3 {
  onNext: (
    distribution: { worker: string; tasks: number; objectsPerTask: number }[]
  ) => void; 
  tasks: number; 
  mode: 'object' | 'task'; 
  objectCount: number; 
  distributeImages: number;
}

const Step3: React.FC<Step3> = ({
  onNext,
  tasks,
  mode,
  objectCount,
  distributeImages,
}) => {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get('/api/users');
        setUsers(res.data); 
      } catch (error) {
        console.error('Error fetching workers', error); 
      }
    };

    fetchWorkers(); 
  }, []); 



  const handleWorkerSelect = (worker: string) => {
    setSelectedWorkers((prev) =>
      prev.includes(worker)
        ? prev.filter((w) => w !== worker)
        : [...prev, worker]
    ); // 선택된 작업자 목록을 업데이트 (체크박스를 선택/해제할 때마다 상태 변경)
  };

  const distributeTasks = () => {
    const workerCount = selectedWorkers.length; // 선택된 작업자 수
    let taskDistribution: {
      worker: string;
      tasks: number;
      objectsPerTask: number;
      ImagesPerTask: number;
    }[];

    const totalObjects = tasks * objectCount; // 총 object 개수
    const objectsPerWorker = Math.floor(totalObjects / workerCount); // 작업자당 할당될 object 수
    const extraObjects = totalObjects % workerCount; // 남은 object 수
    const tasksPerWorker = Math.floor(tasks / workerCount); // 작업자당 할당될 작업 수
    const extraTasks = tasks % workerCount; // 남은 작업 수
    const imagePerTask = Math.floor(distributeImages / tasks); // 분배율에서 계산된 이미지갯수 / task 갯수

    if (mode === 'object') {
      // Object based 모드: 각 작업에 포함될 object의 개수를 기준으로 작업을 생성합니다.

      taskDistribution = selectedWorkers.map((worker, i) => ({
        worker,
        tasks: objectsPerWorker + (i < extraObjects ? 1 : 0), // 작업자에게 할당될 object 수
        objectsPerTask: objectCount,
      }));
    } else {
      // Task based 모드: 생성할 작업의 개수를 기준으로 작업을 생성합니다.

      taskDistribution = selectedWorkers.map((worker, i) => ({
        worker,
        tasks: tasksPerWorker + (i < extraTasks ? 1 : 0),
        ImagesPerTask: Math.floor(
          distributeImages / (tasksPerWorker + (i < extraTasks ? 1 : 0))
        ),
      }));
    }

    onNext(taskDistribution); // 작업 분배 결과를 전달하고 다음 단계로 이동
  };

  return (
    <div className="step">
      <div className="container">
        <div className="step_body">
          <div className="title">Step 3</div>
          <b className="step3_title">작업자 분배</b>
          <div>
            <h3>작업자 목록:</h3>
            <ul className="worker_list">
              {users.map((worker, i) => {
                return (
                  <li key={i}>
                    <input
                      type="checkbox"
                      checked={selectedWorkers.includes(worker.name)}
                      onChange={() => handleWorkerSelect(worker.name)}
                      id={`worker${i}`}
                    />
                    <label htmlFor={`worker${i}`}>{worker.name}</label>
                  </li>
                );
              })}
            </ul>
          </div>
          <button onClick={distributeTasks} className="done_btn">
            작업 분배
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
