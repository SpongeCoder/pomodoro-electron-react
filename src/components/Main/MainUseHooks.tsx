import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import CircleTimer from '../CircleTimer/CircleTimer';
import ActionPanel from '../ActionPanel/ActionPanel';
import Settings from '../Settings/Settings';
import { onSetIsPlay, onChangeTimeType } from '../../reducers/main/actions';
// import Timer from '../../shared/Timer';
import { MainState } from '../../reducers/main/main';
import { SettingsState } from '../../reducers/settings/settings';
import './Main.scss';

const Main: React.FC = () => {
  const typeTime = useSelector((state: { main: MainState }) => state.main.typeTime);
  const isPlay = useSelector((state: { main: MainState }) => state.main.isPlay);
  const settingsTime = useSelector((state: { settings: SettingsState }) => state.settings.time);
  const roundBigBreakNumber = useSelector((state: { settings: SettingsState }) => state.settings.roundBigBreakNumber);
  const roundCount = useSelector((state: { settings: SettingsState }) => state.settings.roundCount);

  const dispatch = useDispatch();
  const timerRef = useRef<number | null>(null);

  const [percent, setPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);

  const curTimeRef = useRef(currentTime);
  curTimeRef.current = currentTime;

  const percentRef = useRef(percent);
  percentRef.current = percent;

  const curRoundRef = useRef(currentRound);
  curRoundRef.current = currentRound;

  const typeTimeRef = useRef(typeTime);
  typeTimeRef.current = typeTime;


  useEffect(() => {
    console.log('useEffect def')
    const timer = timerRef.current as ReturnType<typeof setInterval> | null;

    return () => {
      console.log('end component (stop timer)')
      if (timer) clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect typeTime')
    setPercent(0);
    setCurrentTime(settingsTime[typeTime]);
  }, [settingsTime, typeTime])

  const onPause = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    dispatch(onSetIsPlay(false));
  }, [dispatch]);

  const onChangeTime = () => {
    const newPercent = 100 - ((curTimeRef.current - 1) / settingsTime[typeTimeRef.current] * 100);

    let newType: string = typeTimeRef.current;
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
        onPause();
      }

      setCurrentRound(newRound);
    } else {
      setPercent(newPercent);
      setCurrentTime((prev) => prev - 1);
    }

    console.log('onChangeTime', newPercent, newType, typeTimeRef.current);
  }

  const onPlay = () => {
    timerRef.current = setInterval(onChangeTime, 1000) as unknown as number;
    dispatch(onSetIsPlay(true));
  }

  const onClickNext = useCallback(() => {
    let newType: string = typeTime;
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
      onPause()
    }

    dispatch(onChangeTimeType(newType))
    setCurrentRound(newRound);

  }, [currentRound, typeTime, roundBigBreakNumber, roundCount, onPause, dispatch]);

  const onClickReset = useCallback(() => {
    console.log('onClickReset')
    onPause();
    dispatch(onChangeTimeType('work'))
    setCurrentRound(1);
    setPercent(0);
  }, [onPause, dispatch]);

  console.log('render main')
  return (
    <div className="main">
      <Header />
      <CircleTimer
        time={currentTime}
        percent={percent}
        type={typeTime}
        isPlay={isPlay}
        onClickPlay={onPlay}
        onClickPause={onPause}
      />
      <ActionPanel
        roundNumber={currentRound}
        onClickReset={onClickReset}
        onClickNext={onClickNext}
      />

      <Settings />
    </div>
  );
}

export default Main;

