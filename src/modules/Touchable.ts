import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { Animated, Platform, StyleSheet } from "react-native";
import TimerMixin from "react-timer-mixin";

interface Inset {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface TouchableProps {
  accessible?: boolean;
  disabled?: boolean;
  onPress?: (e: any) => void;
  onPressIn?: (e: any) => void;
  onPressOut?: (e: any) => void;
  onLayout?: (e: any) => void;
  onLongPress?: (e: any) => void;
  delayPressIn?: number;
  delayPressOut?: number;
  delayLongPress?: number;
  pressRetentionOffset?: Inset;
  hitSlop?: Inset;
  activeValue?: number;
  press?: Animated.Value;
  pressDuration?: number;
  children?: ReactNode;
}

const ensurePositiveDelayProps = () => {};

const THROTTLE_MS = 500;

function throttle<T>(this: T, fn: (this: T, ...args: any[]) => any, throttleMs: number) {
  let lastCall: Date | null = null;

  return function (this: T, ...args: any[]): void {
    const now = new Date();
    if (lastCall === null || now.valueOf() - lastCall.valueOf() > throttleMs) {
      fn.apply(this, args);
      lastCall = new Date();
    }
  }.bind(this);
}



const styles = StyleSheet.create<any>({
  touchable: Platform.select({
    web: {
      cursor: 'pointer',
    },
    ios: {},
    android: {},
    sketch: {},
    vr: {},
  }),
});

class Touchable extends Component<TouchableProps> {
  static propTypes = {
    accessible: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    onLayout: PropTypes.func,
    onLongPress: PropTypes.func,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    delayLongPress: PropTypes.number,
    pressRetentionOffset: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      bottom: PropTypes.number,
      right: PropTypes.number,
    }),
    hitSlop: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      bottom: PropTypes.number,
      right: PropTypes.number,
    }),
    activeValue: PropTypes.number,
    press: PropTypes.instanceOf(Animated.Value),
    pressDuration: PropTypes.number,
    children: PropTypes.node,
  };

  static defaultProps = {
    activeValue: 1,
    delayPressIn: 0,
    delayPressOut: 100,
    delayLongPress: 500,
    pressDuration: 150,
    pressRetentionOffset: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 30,
    },
    press: new Animated.Value(0),
  };

  private _timerMixin = TimerMixin.create();

  componentDidMount() {
    ensurePositiveDelayProps();
  }

  componentDidUpdate() {
    ensurePositiveDelayProps();
  }

  setPressValue(toValue: number) {
    Animated.timing(this.props.press!, {
      toValue,
      duration: this.props.pressDuration,
      useNativeDriver: false,
    }).start();
  }

  touchableHandleActivePressIn = throttle((e: any) => {
    this.setPressValue(this.props.activeValue!);
    this.props.onPressIn && this.props.onPressIn(e);
  }, THROTTLE_MS);

  touchableHandleActivePressOut = throttle((e: any) => {
    this.setPressValue(0);
    this.props.onPressOut && this.props.onPressOut(e);
  }, THROTTLE_MS);

  touchableHandlePress = throttle((e: any) => {
    this.props.onPress && this.props.onPress(e);
  }, THROTTLE_MS);

  touchableHandleLongPress = throttle((e: any) => {
    this.props.onLongPress && this.props.onLongPress(e);
  }, THROTTLE_MS);

  touchableHandleStartShouldSetResponder = () => {
    return !this.props.disabled;
  };

  touchableHandleResponderTerminationRequest = () => {
    return false;
  };

  touchableHandleResponderGrant = (e: any) => {
    this.touchableHandleActivePressIn(e);
  };

  touchableHandleResponderMove = (e: any) => {
    if (
      this.touchableGetPressRectOffset().top >= 0 &&
      this.touchableGetPressRectOffset().bottom >= 0
    ) {
      this.touchableHandleActivePressOut(e);
    } else {
      this.touchableHandleActivePressIn(e);
    }
  };

  touchableHandleResponderRelease = (e: any) => {
    this.touchableHandleActivePressOut(e);
    this.touchableHandlePress(e);
  };

  touchableHandleResponderTerminate = (e: any) => {
    this.touchableHandleActivePressOut(e);
  };

  touchableGetPressRectOffset() {
    return this.props.pressRetentionOffset!;
  }

  touchableGetHitSlop() {
    return this.props.hitSlop;
  }

  touchableGetHighlightDelayMS() {
    return this.props.delayPressIn;
  }

  touchableGetLongPressDelayMS() {
    return this.props.delayLongPress;
  }

  touchableGetPressOutDelayMS() {
    return this.props.delayPressOut;
  }

  render() {
    const child = this.props.children;
    const childStyle =
      child &&
      (child as React.ReactElement).props &&
      (child as React.ReactElement).props.style;
    return React.cloneElement(child as React.ReactElement, {
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      onResponderTerminationRequest:
        this.touchableHandleResponderTerminationRequest,
      onResponderGrant: this.touchableHandleResponderGrant,
      onResponderMove: this.touchableHandleResponderMove,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      style: [styles.touchable, childStyle],
    });
  }
}

export default Touchable;
