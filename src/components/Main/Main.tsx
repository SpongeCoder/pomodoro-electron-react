import React, {Component} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import CircleTimer from '../CircleTimer/CircleTimer';
import ActionPanel from '../ActionPanel/ActionPanel';
import { onSetShowSettings, onSetIsPlay } from '../../reducers/main/actions';
import { onSetSound } from '../../reducers/settings/actions';
import Timer from '../../shared/Timer';
import { MainState } from '../../reducers/main/main';
import { SettingsState } from '../../reducers/settings/settings';

type MainStateComp = {
  time: number
}

type MainProps = {
  main: {
    isShowSettings: boolean,
    isPlay: boolean,
  },
  settings: {
    isSoundOff: boolean
  },
  setShowSettings: (value: boolean) => void,
  setIsPlay: (value: boolean) => void,
  setSound: (value: boolean) => void
}

class Main extends Component<MainProps, MainStateComp> {
  public timer: Timer;

  constructor(props: MainProps) {
    super(props);

    this.state = {
      time: 10
    }

    this.timer = new Timer(1000);
  }

  componentDidMount = () => {
    this.timer.start(this.onChangeTime);
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  onToggleSettings = () => {
    const { main, setShowSettings } = this.props;
    setShowSettings(!main.isShowSettings);
  }

  onChangeTime = () => {
    const { time } = this.state;

    if (time !== 100)
      this.setState((state) => {
        return {
          time: state.time + 1
        }
      });
    else
      this.setState({time: 0})
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
    const { time } = this.state;

    return (
      <div>
        <Header
          isShowSettings={main.isShowSettings}
          onToggleSettings={this.onToggleSettings}
        />
        <CircleTimer time={time} />
        <ActionPanel
          isPlay={main.isPlay}
          roundNumber={1}
          roundCount={4}
          soundOff={settings.isSoundOff}
          onClickPlay={this.onClickPlay}
          onClickPause={this.onClickPause}
          onClickReset={this.onClickReset}
          onClickNext={this.onClickNext}
          onClickSoundOff={this.onClickSoundOff}
          onClickSoundOn={this.onClickSoundOn}
        />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
