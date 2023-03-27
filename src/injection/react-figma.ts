import ReactPrimitives from '../ReactPrimitives';
import Animated from 'animated';
import Easing from 'animated/lib/Easing';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-figma';

interface TouchableMixin {
  componentWillUnmount(): void;
  touchableGetInitialState(): { touchable: { touchState: undefined; responderID: null } };
  touchableHandleResponderTerminationRequest(): boolean;
  touchableHandleStartShouldSetResponder(): boolean;
  touchableLongPressCancelsPress(): boolean;
  touchableHandleResponderGrant(): void;
  touchableHandleResponderRelease(): void;
  touchableHandleResponderTerminate(): void;
  touchableHandleResponderMove(): void;
}

const TouchableMixin: TouchableMixin = {
  componentWillUnmount() {},
  touchableGetInitialState() {
    return { touchable: { touchState: undefined, responderID: null } };
  },
  touchableHandleResponderTerminationRequest() { return false; },
  touchableHandleStartShouldSetResponder() { return false; },
  touchableLongPressCancelsPress() { return true; },
  touchableHandleResponderGrant() {},
  touchableHandleResponderRelease() {},
  touchableHandleResponderTerminate() {},
  touchableHandleResponderMove() {},
};

Animated.inject.FlattenStyle(StyleSheet.flatten);

ReactPrimitives.inject({
  StyleSheet,
  View,
  Text,
  Image,
  Easing,
  Animated: {
    ...Animated,
    View: Animated.createAnimatedComponent(View),
    Text: Animated.createAnimatedComponent(Text),
    Image: Animated.createAnimatedComponent(Image),
  },
  Platform: {
    OS: 'figma',
    Version: 1,
  },
});

import Touchable from '../modules/Touchable';

ReactPrimitives.inject({
// @ts-ignore
  Touchable: Touchable(
      Animated,
      StyleSheet,
      ReactPrimitives.Platform,
      TouchableMixin,
  ),
});
