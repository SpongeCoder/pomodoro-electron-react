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
  time: number,
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
      time: 0,
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
    const { time } = this.state;
    const { main, settings } = this.props;
    const { typeTime, isPlay } = main;
    const { workTime, smallBreakTime, bigBreakTime } = settings;

    if (isPlay) {
      this.timer.start(this.onChangeTime);
    }

    if (time === 0) {
      switch(typeTime) {
        case 'work':
          this.setState({time: workTime, percent: 0});
          break;
        case 'small':
          this.setState({time: smallBreakTime, percent: 0});
          break;
        case 'big':
          this.setState({time: bigBreakTime, percent: 0});
          break;
        default:
      }
    }
  }

  onToggleSettings = () => {
    const { main, setShowSettings } = this.props;
    setShowSettings(!main.isShowSettings);
  }

  onChangeTime = () => {
    const { time, currentRound } = this.state;
    const { main, settings, setTypeTime } = this.props;
    const { typeTime } = main;
    const { workTime, smallBreakTime, bigBreakTime } = settings;
    let newPercent: number;

    switch(typeTime) {
      case 'work':
        newPercent = 100 - ((time - 1) / workTime * 100)
        break;
      case 'small':
        newPercent = 100 - ((time - 1) / smallBreakTime * 100)
        break;
      case 'big':
        newPercent = 100 - ((time - 1) / bigBreakTime * 100)
        break;
      default:
        newPercent = 0;
    }

    if (time === 0) {
      if (typeTime === 'work') setTypeTime('small');
      if (typeTime === 'small') setTypeTime('work');
      this.setDefaultTime();
      this.setState({
        currentRound: currentRound + 1
      })
    } else {
      this.setState(() => {
        return {
          percent: Math.round(newPercent),
          time: time - 1
        }
      });
    }

  }

  onClickPlay = () => {
    const {setIsPlay} = this.props;
    setIsPlay(true);
    this.timer.start(this.onChangeTime);
  }

  onClickPause = () => {
    const {setIsPlay} = this.props;
    setIsPlay(false);
    this.timer.stop();
  }

  onClickReset = () => {}

  onClickNext = () => {}

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
    const { percent, time, currentRound } = this.state;

    return (
      <div className="main">
        <Header
          isShowSettings={main.isShowSettings}
          onToggleSettings={this.onToggleSettings}
        />
        <CircleTimer
          time={time}
          percent={percent}
          type={main.typeTime}
        />
        <ActionPanel
          isPlay={main.isPlay}
          roundNumber={currentRound}
          roundCount={settings.roundCount}
          soundOff={settings.isSoundOff}
          onClickPlay={this.onClickPlay}
          onClickPause={this.onClickPause}
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
