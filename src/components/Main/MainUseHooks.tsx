import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import CircleTimer from '../CircleTimer/CircleTimer';
import ActionPanel from '../ActionPanel/ActionPanel';
import Settings from '../Settings/Settings';
import { onSetShowSettings, onSetIsPlay, onChangeTimeType } from '../../reducers/main/actions';
import { onSetSound } from '../../reducers/settings/actions';
// import Timer from '../../shared/Timer';
import { MainState } from '../../reducers/main/main';
import { SettingsState } from '../../reducers/settings/settings';
import './Main.scss';

/* type MainStateComp = {
  percent: number,
  currentTime: number,
  currentRound: number,
} */

type MainProps = {
  main: MainState,
  settings: SettingsState,
  setShowSettings: (value: boolean) => void,
  setIsPlay: (value: boolean) => void,
  setSound: (value: boolean) => void,
  setTypeTime: (value: string) => void,
}

const Main: React.FC<MainProps> = () => {
  const main = useSelector((state: { main: MainState }) => state.main);
  const settings = useSelector((state: { settings: SettingsState }) => state.settings);
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

  const typeTimeRef = useRef(main.typeTime);
  typeTimeRef.current = main.typeTime;


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
    setCurrentTime(settings.time[main.typeTime]);
  }, [settings.time, main.typeTime])

  const onToggleViewSettings = useCallback(() => {
    dispatch(onSetShowSettings(!main.isShowSettings))
  }, [main.isShowSettings, dispatch])

  const onPause = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    dispatch(onSetIsPlay(false));
  }, [dispatch]);

  const onChangeTime = () => {
    const { roundBigBreakNumber, roundCount, time } = settings;

    const newPercent = 100 - ((curTimeRef.current - 1) / time[typeTimeRef.current] * 100);

    let newType: string = typeTimeRef.current;
    let newRound = curRoundRef.current;

    if (curRoundRef.current % roundBigBreakNumber === 0 && typeTimeRef.current === 'work') {
      newType = 'big';
    } else if (typeTimeRef.current === 'work') {
      newType = 'small';
    } else {
      newType = 'work';
      newRound += 1;
    }

    console.log('newPercent', newPercent);
    console.log('curTimeRef.current', curTimeRef.current);
    console.log('typeTimeRef.current', typeTimeRef.current);

    if (curTimeRef.current === 0) {
      dispatch(onChangeTimeType(newType))

      if (roundCount === curRoundRef.current && (typeTimeRef.current === 'small' || typeTimeRef.current === 'big') ) {
        newRound = 1;
        onPause();
      }

      setCurrentRound(newRound);

    } else {
      setPercent(newPercent);
      setCurrentTime((prev) => prev - 1);
    }

  }

  const onPlay = () => {
    timerRef.current = setInterval(onChangeTime, 1000) as unknown as number;
    dispatch(onSetIsPlay(true));
  }

  const onClickNext = useCallback(() => {
    const { roundBigBreakNumber, roundCount } = settings;

    let newType: string = main.typeTime;
    let newRound = currentRound;

    if (currentRound % roundBigBreakNumber === 0 && main.typeTime === 'work') {
      newType = 'big';
    } else if (main.typeTime === 'work') {
      newType = 'small';
    } else {
      newType = 'work';
      newRound += 1;
    }

    if (roundCount === currentRound && (main.typeTime === 'small' || main.typeTime === 'big') ) {
      newRound = 1;
      onPause()
    }

    dispatch(onChangeTimeType(newType))
    setCurrentRound(newRound);

  }, [currentRound, main.typeTime, settings, onPause, dispatch]);

  const onClickReset = useCallback(() => {
    console.log('onClickReset')
    onPause();
    dispatch(onChangeTimeType('work'))
    setCurrentRound(1);
    setPercent(0);
  }, [onPause, dispatch]);

  const onClickSoundOff = useCallback(() => {
    dispatch(onSetSound(true))
  }, [dispatch])
  const onClickSoundOn = useCallback(() => {
    dispatch(onSetSound(false))
  }, [dispatch])

  console.log('render main')

  return (
    <div className="main">
      <Header
        isShowSettings={main.isShowSettings}
        onToggleSettings={onToggleViewSettings}
      />
      <CircleTimer
        time={currentTime}
        percent={percent}
        type={main.typeTime}
        isPlay={main.isPlay}
        onClickPlay={onPlay}
        onClickPause={onPause}
      />
      <ActionPanel
        roundNumber={currentRound}
        roundCount={settings.roundCount}
        soundOff={settings.isSoundOff}
        onClickReset={onClickReset}
        onClickNext={onClickNext}
        onClickSoundOff={onClickSoundOff}
        onClickSoundOn={onClickSoundOn}
      />

      <Settings
        isShow={main.isShowSettings}
      />
    </div>
  );
}

export default Main;

