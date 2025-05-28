"use client";

import { useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext } from "@/providers/AuthProvider";

interface ReviewModalProps {
  reviewData: {
    teamId: string;
    gatheringId: number;
    userId: number;
  };
  onClose: () => void;
}

interface ErrorResponse {
  code?: string;
  message?: string;
}

export default function ReviewModal({ reviewData, onClose }: ReviewModalProps) {
  const [score, setScore] = useState(1);
  const [comment, setComment] = useState("");

  const { token } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.post(
        "/api/reviews",
        {
          gatheringId: reviewData.gatheringId,
          score,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("리뷰가 성공적으로 등록되었습니다.");
      onClose();
    } catch (error: unknown) {
      const err = error as AxiosError<ErrorResponse>;
      const res = err.response?.data;

      if (res?.code === "INVALID_TOKEN") {
        alert("유효하지 않은 토큰입니다.");
      } else if (res?.code === "FORBIDDEN") {
        alert("모임에 참석하지 않았습니다.");
      } else if (res?.code === "NOT_FOUND") {
        alert("모임을 찾을 수 없습니다.");
      } else {
        alert("리뷰 등록에 실패했습니다.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">리뷰 작성</h2>
        <label className="block mb-2">별점 (1~5):</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="border p-2 w-full mb-4"
          min={1}
          max={5}
        />

        <label className="block mb-2">코멘트:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            취소
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
