'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '@/styles/task.css';
import { MockImage } from '@/app/api/images/route';

interface Step1 {
  onNext: () => void;
  setDistributeImages: (images: number) => void;
}

const Step1: React.FC<Step1> = ({ onNext, setDistributeImages }) => {
  const [totalImages, setTotalImages] = useState<MockImage[]>([]);
  const [percent, setPercent] = useState<number>(0);
  const [localDistributeImage, setLocalDistributeImage] = useState<number>();

  useEffect(() => {
    const fetchTotalImages = async () => {
      try {
        const res = await axios.get<MockImage[]>('/api/images');
        setTotalImages(res.data);
      } catch (error) {
        console.error('error : ', error);
      }
    };

    fetchTotalImages();
  }, []);


  useEffect(() => {
    const numDistributeImage = Math.floor(
      totalImages?.length * (percent / 100)
    );
    setLocalDistributeImage(numDistributeImage); // 현재 단계에서 바로 확인하기 위함
    setDistributeImages(numDistributeImage); // 부모 컴포넌트로 보낼 값
  }, [percent]);

  return (
    <div className="step">
      <div className="container">
        <div className="step_body">
          <div className="title">step1</div>
          <p className="total_image">
            총 이미지 갯수 : {totalImages?.length} 개
          </p>
          <div className="image_percent">
            <b>작업에 분배할 이미지 비율을 설정해주세요</b>
            <input
              type="number"
              onChange={(e) => {
                return setPercent(parseFloat(e.currentTarget.value));
              }}
              defaultValue={percent}
            />
          </div>
          <div className="result">
            설정한 비율에 따른 분배할 이미지 수 : {localDistributeImage} 개
          </div>
        </div>
        <div className="btn_wrap">
          <button type="button">이전</button>
          <button onClick={onNext}>다음</button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
