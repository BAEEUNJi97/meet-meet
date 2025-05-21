import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';


export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        if(request.headers.get('Authorization') === null) {
            return NextResponse.json(
                { code: 'UNAUTHORIZED', message: '토큰이 없습니다.' },
                { status: 401 }
            );
        }

        const response = await axios.post(`${process.env.API_URI_DEV}/gatherings`, formData, {
                headers: {
                    'Authorization': request.headers.get('Authorization') || '',
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log('API 응답 성공:', response.status);
        return NextResponse.json(response.data, { status: 201 });

    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        
        const err = error as AxiosError;
        if (err.response) {
            console.error('서버 응답 상태:', err.response.status);
            console.error('서버 응답 데이터:', err.response.data);
            return NextResponse.json(
                err.response.data,
                { status: err.response.status || 500 }
            );
        } else if (err.request) {
            console.error('요청만 됨, 응답 없음');
            return NextResponse.json(
                { code: 'SERVER_ERROR', message: '서버에서 응답이 없습니다.' },
                { status: 500 }
            );
        } else {
            console.error('요청 설정 중 오류:', err.message);
            return NextResponse.json(
                { code: 'REQUEST_ERROR', message: err.message || '요청 중 오류가 발생했습니다.' },
                { status: 500 }
            );
        }
    }
}


export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const response = await axios.get(`${process.env.API_URI_DEV}/gatherings`, {
            params: Object.fromEntries(searchParams),
            headers: {
                'Authorization': request.headers.get('Authorization') || '',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);

        const err = error as AxiosError;
        if (err.response) {
            console.error('서버 응답 상태:', err.response.status);
            console.error('서버 응답 데이터:', err.response.data);
            return NextResponse.json(
                err.response.data,
                { status: err.response.status || 500 }
            );
        }

        return NextResponse.json(
            { code: 'SERVER_ERROR', message: '서버에서 응답이 없습니다.' },
            { status: 500 }
        );
    }
}
