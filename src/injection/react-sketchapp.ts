import ReactPrimitives from "../ReactPrimitives";
import Animated from "animated";
import Easing from "animated/lib/Easing";
import {
  View,
  Text,
  Image,
  StyleSheet,
  // TODO(lmr): Dimensions
} from "react-sketchapp";

interface TouchableState {
  touchable: {
    touchState: undefined | string;
    responderID: null | number;
  };
}

const TouchableMixin: {
  touchableGetInitialState(): {
    touchable: { responderID: null; touchState: undefined };
  };
  touchableHandleStartShouldSetResponder(): boolean;
  touchableHandleResponderTerminate(): void;
  touchableHandleResponderRelease(): void;
  touchableHandleResponderTerminationRequest(): boolean;
  touchableHandleResponderMove(): void;
  componentWillUnmount(): void;
  touchableLongPressCancelsPress(): boolean;
  touchableHandleResponderGrant(): void;
} = {
  componentWillUnmount() {},
  touchableGetInitialState() {
    return { touchable: { touchState: undefined, responderID: null } };
  },
  touchableHandleResponderTerminationRequest() {
    return false;
  },
  touchableHandleStartShouldSetResponder() {
    return false;
  },
  touchableLongPressCancelsPress() {
    return true;
  },
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
    OS: "sketch",
    Version: 1,
  },
});

ReactPrimitives.inject({
  Touchable: require("../modules/Touchable")(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
    TouchableMixin
  ),
});
