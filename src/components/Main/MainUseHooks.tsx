import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import CircleTimer from '../CircleTimer/CircleTimer';
import ActionPanel from '../ActionPanel/ActionPanel';
import Settings from '../Settings/Settings';
import { onSetIsPlay, onChangeTimeType, onSetCurrentRound } from '../../reducers/main/actions';
import { MainState, TimeTypeType } from '../../reducers/main/main';
import { SettingsState } from '../../reducers/settings/settings';
import './Main.scss';

const { ipcRenderer } = window.require('electron');

const onShowBallon = (type: TimeTypeType) => {
  const timeType = {
    big: 'пойти на большой перерыв',
    small: 'отдохнуть',
    work: 'пойти работать'
  }
  let text = 'Время ';

  text += timeType[type];
  ipcRenderer.send('DISPLAY_BALLON', text);
}

const getNewType = (currentRound: number, roundBigBreakNumber: number, typeTime: TimeTypeType) => {
  let newType: TimeTypeType;

  if (currentRound % roundBigBreakNumber === 0 && typeTime === 'work') {
    newType = 'big';
  } else if (typeTime === 'work') {
    newType = 'small';
  } else {
    newType = 'work';
  }

  return newType;
}

const Main: React.FC = () => {
  const { typeTime, currentRound, isPlay } = useSelector((state: { main: MainState }) => state.main);
  const { time, roundBigBreakNumber, roundCount } = useSelector((state: { settings: SettingsState }) => state.settings);

  const dispatch = useDispatch();
  const timerRef = useRef<number | null>(null);

  const [timeState, setTimeState] = useState(0);

  const curTimeRef = useRef(timeState);
  curTimeRef.current = timeState;

  const curRoundRef = useRef(currentRound);
  curRoundRef.current = currentRound;

  const typeTimeRef = useRef(typeTime);
  typeTimeRef.current = typeTime;

  useEffect(() => {
    const timer = timerRef.current as ReturnType<typeof setInterval> | null;
    return () => {
      if (timer) clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    setTimeState(time[typeTime]);
  }, [time, typeTime])

  const onChangeTime = useCallback(() => {
    let newType: TimeTypeType = typeTimeRef.current;
    let newRound = curRoundRef.current;

    if (curTimeRef.current === 0) {
      newType = getNewType(curRoundRef.current, roundBigBreakNumber, typeTimeRef.current);
      if (newType === 'work') newRound += 1;

      if (roundCount === curRoundRef.current && (typeTimeRef.current === 'work') ) {
        newRound = 1;
        dispatch(onSetIsPlay(false));
      } else {
        onShowBallon(newType);
      }

      dispatch(onChangeTimeType(newType));
      dispatch(onSetCurrentRound(newRound));
    } else {
      setTimeState((t)=> t - 1)
    }
  }, [dispatch, roundCount, roundBigBreakNumber])

  useEffect(() => {
    if (!isPlay && timerRef.current) clearInterval(timerRef.current);
    if (isPlay) timerRef.current = setInterval(onChangeTime, 1000) as unknown as number;
  }, [isPlay, onChangeTime])

  const onClickNext = useCallback(() => {
    let newType: TimeTypeType = typeTime;
    let newRound = currentRound;

    newType = getNewType(currentRound, roundBigBreakNumber, typeTime);
    if (newType === 'work') newRound += 1;

    if (roundCount === currentRound && (typeTime === 'small' || typeTime === 'big') ) {
      newRound = 1;
      dispatch(onSetIsPlay(false));
    }

    dispatch(onChangeTimeType(newType));
    dispatch(onSetCurrentRound(newRound));
    onShowBallon(newType);
  }, [currentRound, typeTime, roundBigBreakNumber, roundCount, dispatch]);

  const onClickReset = useCallback(() => {
    dispatch(onSetIsPlay(false));
    dispatch(onChangeTimeType('work'));
    dispatch(onSetCurrentRound(1));
    setTimeState(time[typeTime]);
  }, [dispatch, time, typeTime]);

  return (
    <div className="main">
      <Header />
      <CircleTimer time={timeState}/>
      <ActionPanel
        onClickReset={onClickReset}
        onClickNext={onClickNext}
      />
      <Settings />
    </div>
  );
}

export default Main;

