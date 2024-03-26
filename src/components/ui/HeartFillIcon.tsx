'use client';
import { useLikesContext } from '@/context/LikesContext';
import { useEffect } from 'react';
import { PiHeartFill } from 'react-icons/pi';

export default function HeartFillIcon() {
  const { isUpdating, setIsUpdating } = useLikesContext();

  useEffect(() => {
    isUpdating && setTimeout(() => setIsUpdating(false), 800);
  }, [isUpdating]);

  return <PiHeartFill className={`text-red-500 ${isUpdating && 'animate-palpitate'} group-hover:scale-110`} />;
}
