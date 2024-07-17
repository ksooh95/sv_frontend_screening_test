'use client';
import Step1 from '@/app/components/taskGeneration/step1';
import Step2 from '@/app/components/taskGeneration/step2';
import Step3 from '@/app/components/taskGeneration/step3';
import Step4 from '@/app/components/taskGeneration/step4';
import React, { useState } from 'react';

const TaskGenerationPage = () => {
  const [step, setStep] = useState<number>(1); // 단계
  const [distributeImages, setDistributeImages] = useState<number>(0);
  const [mode, setMode] = useState<'object' | 'task'>('object'); // 현재 모드
  const [objectCount, setObjectCount] = useState<number>(0); // Object 모드에서 입력받은 값
  const [taskCount, setTaskCount] = useState<number>(0); // task 모드에서 입력받은 값
  const [taskDistribution, setTaskDistribution] = useState<
    { worker: string; tasks: number }[]
  >([]); // task의 갯수와 작업자들
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  console.log('비율계산 이미지 분개 값 :', distributeImages);
  console.log('모드 :', mode);
  console.log('task 갯수 :', taskCount);
  console.log(
    'tasks:',
    mode === 'object' ? distributeImages / objectCount : taskCount
  );
  console.log('mode:', mode);
  console.log('objectCount:', objectCount);
  return (
    <div className="home">
      <div className="container">
        {step === 1 && (
          <Step1 onNext={nextStep} setDistributeImages={setDistributeImages} />
        )}
        {step === 2 && (
          <Step2
            onNext={nextStep}
            onPrev={prevStep}
            setMode={setMode}
            setObjectCount={setObjectCount}
            setTaskCount={setTaskCount}
          />
        )}
        {step === 3 && (
          <Step3
            onNext={(distribution) => {
              setTaskDistribution(distribution);
              nextStep();
            }}
            tasks={
              mode === 'object' ? distributeImages / objectCount : taskCount
            }
            mode={mode}
            objectCount={objectCount}
          />
        )}

        {step === 4 && (
          <Step4 onPrev={prevStep} distribution={taskDistribution} />
        )}
      </div>
    </div>
  );
};

export default TaskGenerationPage;
