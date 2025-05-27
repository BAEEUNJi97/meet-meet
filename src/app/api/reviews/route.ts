import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  code?: string;
  message?: string;
}

export async function POST(req: NextRequest) {

  const authHeader = req.headers.get("authorization"); 
  const token = authHeader?.split(" ")[1];
  const { gatheringId, score, comment } = await req.json();

  if (score < 0 || score > 5) {
    return NextResponse.json(
      { code: 'INVALID_SCORE', message: 'score는 1부터 5 사이여야 합니다' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.API_URI_DEV}/reviews`,
      {
        gatheringId,
        score,
        comment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return new NextResponse(JSON.stringify(response.data), { status: 201 });
    
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    const errorCode = err.response?.data?.code;

    switch (errorCode) {
      case 'INVALID_TOKEN':
        return NextResponse.json(
          { code: 'INVALID_TOKEN', message: '유효하지 않은 토큰입니다' },
          { status: 401 }
        );
      case 'FORBIDDEN':
        return NextResponse.json(
          { code: 'FORBIDDEN', message: '모임에 참석하지 않았습니다' },
          { status: 403 }
        );
      case 'NOT_FOUND':
        return NextResponse.json(
          { code: 'NOT_FOUND', message: '모임을 찾을 수 없습니다' },
          { status: 404 }
        );
      default:
        return NextResponse.json(
          {
            code: 'UNKNOWN_ERROR',
            message: err.response?.data?.message || '알 수 없는 오류가 발생했습니다',
          },
          { status: 500 }
        );
    }
  }
}
