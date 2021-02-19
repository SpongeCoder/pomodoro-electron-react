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

const Main: React.FC = () => {
  const typeTime = useSelector((state: { main: MainState }) => state.main.typeTime);
  const currentRound = useSelector((state: { main: MainState }) => state.main.currentRound);
  const settingsTime = useSelector((state: { settings: SettingsState }) => state.settings.time);
  const roundBigBreakNumber = useSelector((state: { settings: SettingsState }) => state.settings.roundBigBreakNumber);
  const roundCount = useSelector((state: { settings: SettingsState }) => state.settings.roundCount);
  const isPlay = useSelector((state: { main: MainState }) => state.main.isPlay);

  const dispatch = useDispatch();
  const timerRef = useRef<number | null>(null);

  const [timeState, setTimeState] = useState({time: 0, percent: 0});

  const curTimeRef = useRef(timeState.time);
  curTimeRef.current = timeState.time;

  const percentRef = useRef(timeState.percent);
  percentRef.current = timeState.percent;

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
    setTimeState({
      time: settingsTime[typeTime],
      percent: 0
    });
  }, [settingsTime, typeTime])

  const onChangeTime = useCallback(() => {
    const newPercent = 100 - ((curTimeRef.current - 1) / settingsTime[typeTimeRef.current] * 100);

    let newType: TimeTypeType = typeTimeRef.current;
    let newRound = curRoundRef.current;

    if (curTimeRef.current === 0) {
      if (curRoundRef.current % roundBigBreakNumber === 0 && typeTimeRef.current === 'work') {
        newType = 'big';
      } else if (typeTimeRef.current === 'work') {
        newType = 'small';
      } else {
        newType = 'work';
        newRound += 1;
      }

      dispatch(onChangeTimeType(newType))

      if (roundCount === curRoundRef.current && (typeTimeRef.current === 'work') ) {
        newRound = 1;
        dispatch(onSetIsPlay(false));
      }

      dispatch(onSetCurrentRound(newRound));
    } else {
      setTimeState((prev)=> {
        return {
          percent: newPercent,
          time: prev.time - 1
        }
      })
    }
  }, [dispatch, roundCount, roundBigBreakNumber, settingsTime])

  useEffect(() => {
    if (!isPlay && timerRef.current) clearInterval(timerRef.current);
    if (isPlay) timerRef.current = setInterval(onChangeTime, 1000) as unknown as number;
  }, [isPlay, onChangeTime])

  const onClickNext = useCallback(() => {
    let newType: TimeTypeType = typeTime;
    let newRound = currentRound;

    if (currentRound % roundBigBreakNumber === 0 && typeTime === 'work') {
      newType = 'big';
    } else if (typeTime === 'work') {
      newType = 'small';
    } else {
      newType = 'work';
      newRound += 1;
    }

    if (roundCount === currentRound && (typeTime === 'small' || typeTime === 'big') ) {
      newRound = 1;
      dispatch(onSetIsPlay(false));
    }

    dispatch(onChangeTimeType(newType));
    dispatch(onSetCurrentRound(newRound));
  }, [currentRound, typeTime, roundBigBreakNumber, roundCount, dispatch]);

  const onClickReset = useCallback(() => {
    console.log('onClickReset')
    dispatch(onSetIsPlay(false));
    dispatch(onChangeTimeType('work'));
    dispatch(onSetCurrentRound(1));
    setTimeState({time: settingsTime[typeTime], percent: 0})
  }, [dispatch, settingsTime, typeTime]);

  console.log('render main')
  return (
    <div className="main">
      <Header />
      <CircleTimer
        time={timeState.time}
        percent={timeState.percent}
      />
      <ActionPanel
        onClickReset={onClickReset}
        onClickNext={onClickNext}
      />
      <Settings />
    </div>
  );
}

export default Main;

