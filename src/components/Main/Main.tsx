import React, {Component} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import CircleTimer from '../CircleTimer/CircleTimer';
import ActionPanel from '../ActionPanel/ActionPanel';
import Settings from '../Settings/Settings';
import { onSetShowSettings, onSetIsPlay, onChangeTimeType } from '../../reducers/main/actions';
import { onSetSound } from '../../reducers/settings/actions';
import Timer from '../../shared/Timer';
import { MainState } from '../../reducers/main/main';
import { SettingsState } from '../../reducers/settings/settings';
import './Main.scss';

type MainStateComp = {
  percent: number,
  currentTime: number,
  currentRound: number,
}

type MainProps = {
  main: MainState,
  settings: SettingsState,
  setShowSettings: (value: boolean) => void,
  setIsPlay: (value: boolean) => void,
  setSound: (value: boolean) => void,
  setTypeTime: (value: string) => void,
}

class Main extends Component<MainProps, MainStateComp> {
  public timer: Timer;

  constructor(props: MainProps) {
    super(props);

    this.state = {
      percent: 0,
      currentTime: 0,
      currentRound: 1
    }

    this.timer = new Timer(1000);
  }

  componentDidMount = () => {
   this.setDefaultTime();
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  setDefaultTime = () => {
    const { currentTime } = this.state;
    const { main, settings } = this.props;
    const { typeTime, isPlay } = main;
    const { time } = settings;

    if (isPlay) {
      this.timer.start(this.onChangeTime);
    }

    if (currentTime === 0) {
      this.setState({
        currentTime: time[typeTime],
        percent: 0,
        currentRound: 1
      });
    }
  }

  onToggleSettings = () => {
    const { main, setShowSettings } = this.props;
    setShowSettings(!main.isShowSettings);
  }

  onChangeTime = () => {
    const { currentTime, currentRound } = this.state;
    const { main, settings, setTypeTime } = this.props;
    const { typeTime } = main;
    const { roundBigBreakNumber, roundCount, time } = settings;
    let newPercent = 0;
    let newRound = currentRound;

    newPercent = 100 - ((currentTime - 1) / time[typeTime] * 100)

    if (currentTime === 0) {
      let newType: string = typeTime;

      if (currentRound % roundBigBreakNumber === 0 && typeTime === 'work') {
        newType = 'big';
      } else if (typeTime === 'work') {
        newType = 'small';
      } else {
        newType = 'work';
        newRound += 1;
      }

      setTypeTime(newType);

      if (roundCount === currentRound && (typeTime === 'small' || typeTime === 'big') ) {
        newRound = 1;
        this.onClickPause();
      }

      this.setDefaultTime();
      this.setState({currentRound: newRound})
    } else {
      this.setState(() => {
        return {
          percent: newPercent,
          currentTime: currentTime - 1
        }
      });
    }

  }

  onClickPlay = () => {
    const {setIsPlay} = this.props;
    this.timer.start(this.onChangeTime);
    setIsPlay(true);
  }

  onClickPause = () => {
    const {setIsPlay} = this.props;
    this.timer.stop();
    setIsPlay(false);
  }

  onClickReset = () => {
    const { setTypeTime, settings } = this.props;

    this.onClickPause();
    this.setState({
      currentTime: settings.time.work,
      percent: 0,
      currentRound: 1
    });

    setTypeTime('work');
  }

  onClickNext = () => {
    const { currentRound } = this.state;
    const { main, settings, setTypeTime } = this.props;
    const { typeTime } = main;
    const { time, roundBigBreakNumber, roundCount } = settings;

    let newType: string = typeTime;
    let newTime: number = time.work;
    let newRound = currentRound;

    if (currentRound % roundBigBreakNumber === 0 && typeTime === 'work') {
      newTime = time.big;
      newType = 'big';
    } else if (typeTime === 'work') {
      newTime = time.small;
      newType = 'small';
    } else {
      newTime = time.work;
      newType = 'work';
      newRound += 1;
    }

    if (roundCount === currentRound && (typeTime === 'small' || typeTime === 'big') ) {
      newRound = 1;
      this.onClickPause();
    }

    setTypeTime(newType);

    this.setState({
      currentRound: newRound,
      percent: 0,
      currentTime: newTime
    });

  }

  onClickSoundOff = () => {
    const { setSound } = this.props;
    setSound(true);
  }

  onClickSoundOn = () => {
    const { setSound } = this.props;
    setSound(false);
  }

  render() {
    const { main, settings } = this.props;
    const { percent, currentTime, currentRound } = this.state;
    console.log('render main');
    return (
      <div className="main">
        <Header
          isShowSettings={main.isShowSettings}
          onToggleSettings={this.onToggleSettings}
        />
        <CircleTimer
          time={currentTime}
          percent={percent}
          type={main.typeTime}

          isPlay={main.isPlay}
          onClickPlay={this.onClickPlay}
          onClickPause={this.onClickPause}
        />
        <ActionPanel
          roundNumber={currentRound}
          roundCount={settings.roundCount}
          soundOff={settings.isSoundOff}
          onClickReset={this.onClickReset}
          onClickNext={this.onClickNext}
          onClickSoundOff={this.onClickSoundOff}
          onClickSoundOn={this.onClickSoundOn}
        />

        <Settings isShow={main.isShowSettings} />
      </div>
    );
  }

};

const mapStateToProps = (store: { main: MainState, settings: SettingsState }) => {
  return {
    main: store.main,
    settings: store.settings
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setShowSettings: (value: boolean) => dispatch(onSetShowSettings(value)),
    setIsPlay: (value: boolean) => dispatch(onSetIsPlay(value)),
    setSound: (value: boolean) => dispatch(onSetSound(value)),
    setTypeTime: (value: string) => dispatch(onChangeTimeType(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
